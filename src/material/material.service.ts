import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateMaterialDto } from './dto/create-material.dto';
import { UpdateMaterialDto } from './dto/update-material.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Material } from './entities/material.entity';
import { User } from 'src/auth/entities/user.entity';
import { MaterialType } from './entities/enum/material.enum';
import * as fs from 'fs';
@Injectable()
export class MaterialService {
  constructor(
    @InjectRepository(Material)
    private readonly materialRepository: Repository<Material>,
  ) {}
  async uploadFile(
    file: Express.Multer.File,
    title: string,
    courseId: number,
    currentUser: User,
    materialType: MaterialType = MaterialType.Docs,
  ) {
    const material = this.materialRepository.create({
      title: title,
      path: file.path,
      materialType: materialType,
      course: { id: courseId },
      createBy: currentUser,
    });
    return await this.materialRepository.save(material);
  }
  addLink(createMaterialDto: CreateMaterialDto, currentUser: User) {
    const material = this.materialRepository.create({
      ...createMaterialDto,
      createBy: currentUser,
    });
    return this.materialRepository.save(material);
  }
  async findAll() {
    return await this.materialRepository.find();
  }

  async findOne(id: number) {
    return await this.materialRepository.findOne({ where: { id } });
  }

  update(id: number, updateMaterialDto: UpdateMaterialDto) {
    return `This action updates a #${id} material`;
  }

  async remove(id: number) {
    const material = await this.findOne(id);
    switch (material.materialType) {
      case MaterialType.Docs:
      case MaterialType.Video:
        try {
          fs.unlinkSync(material.path);
        } catch (error) {
          new BadRequestException('Error deleting file');
        }
        break;
      case MaterialType.Link:
        await this.materialRepository.remove(material);
    }
    return `This action removes a #${id} material`;
  }
}
