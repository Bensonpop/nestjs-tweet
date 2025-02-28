import { Controller, Get, Post, Body, Patch, Param, Delete, UseInterceptors, UploadedFile, UseGuards, Request } from '@nestjs/common';
import { ProfilesService } from './profiles.service';
import { CreateProfileDto } from './dto/create-profile.dto';
import { UpdateProfileDto } from './dto/update-profile.dto';
import { FileInterceptor } from '@nestjs/platform-express';
import {diskStorage, Multer} from 'multer';
import { extname } from 'path';
import { AuthGuard } from 'src/auth/auth.guard';
import sharp from 'sharp';
import * as fs from 'fs';
import { constants } from 'buffer';
import { getUserId } from 'src/decorators/userID';
import { AdminGuard } from 'src/auth/AdminGuard';


@UseGuards(AuthGuard)
@Controller('profiles')
export class ProfilesController {
  constructor(private readonly profilesService: ProfilesService) {}

 
  @Post()
  @UseInterceptors(
    FileInterceptor('avatar', {
      storage: diskStorage({
        destination: './uploads',
        filename: (req, file, callback) => {
          const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
          callback(null, uniqueSuffix + extname(file.originalname));
        },
      }),
    }),
  )
  async create(
    @Body() createProfileDto: CreateProfileDto,
    @getUserId() id: number, // ✅ Ensure this extracts the correct user ID
    @UploadedFile() file: Express.Multer.File,
  ) {
    try {
      if (!file) {
        throw new Error('File upload failed'); // Handle missing file scenario
      }

      

      const compressedImagePath = `./uploads/compressed-${file.filename}`;
      

      // Compress image using sharp
      await sharp(file.path)
        .resize({ width: 800 }) // Max width 800px, maintain aspect ratio
        .jpeg({ quality: 80 }) // Compress JPEG with 80% quality
        .toFile(compressedImagePath);
     
      
      // Delete original file if it exists
      if (fs.existsSync(file.path)) {
        fs.unlinkSync(file.path);
      }

      const imageUrl = `http://localhost:3000/uploads/compressed-${file.filename}`;
      

      // Save to database
      return this.profilesService.create(createProfileDto, id, imageUrl);
    } catch (error) {
      console.error('Error processing image upload:', error.message);
      throw error;
    }
  }

  @UseGuards(AdminGuard)
  @Get('all')
  findAll() {
    return this.profilesService.findAll();
  }

  @Get()
  findOne( @getUserId() id: number) {  
    return this.profilesService.findOne(id);
  }

  @Patch()
  @UseInterceptors(
    FileInterceptor('avatar', {
      storage: diskStorage({
        destination: './uploads',
        filename: (req, file, callback) => {
          const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
          callback(null, uniqueSuffix + extname(file.originalname));
        },
      }),
    }),
  )
  async update(
    @getUserId() id: number,
    @Body() updateProfileDto: UpdateProfileDto,
    @UploadedFile() file: Express.Multer.File
  ) {
    try {
      let imageUrl = null;
  
      if (file) {
        const compressedImagePath = `./uploads/compressed-${file.filename}`;
  
        // Compress image using sharp
        try {
          await sharp(file.path)
            .resize({ width: 800 })
            .jpeg({ quality: 80 })
            .toFile(compressedImagePath);
        } catch (error) {
          console.error("Image compression failed:", error);
          throw new Error("Image processing error");
        }
  
        // Delete original file if it exists
        if (fs.existsSync(file.path)) {
          try {
            fs.unlinkSync(file.path);
          } catch (error) {
            console.error("Error deleting original file:", error);
          }
        }
  
        imageUrl = `http://localhost:3000/uploads/compressed-${file.filename}`;
        console.log('File uploaded and compressed:', compressedImagePath);
      }
  
      // Save to database
      return this.profilesService.update(id, updateProfileDto, imageUrl);
    } catch (error) {
      console.error('Error processing update:', error.message);
      throw new Error('Profile update failed');
    }
  }
  
  @Delete()
  remove( @getUserId() id: number) {
    return this.profilesService.remove(id);
  }
}
