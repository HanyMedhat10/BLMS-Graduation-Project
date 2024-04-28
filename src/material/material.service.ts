import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateMaterialDto } from './dto/create-material.dto';
import { UpdateMaterialDto } from './dto/update-material.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from 'src/auth/entities/user.entity';
import { MaterialType } from './entities/enum/material.enum';
import * as fs from 'fs';
import { Material } from 'src/material/entities/material.entity';
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
      path: file.filename,
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

  async update(id: number, updateMaterialDto: UpdateMaterialDto) {
    let material = await this.findOne(id);
    switch (material.materialType) {
      case MaterialType.Docs:
      case MaterialType.Video:
        if (updateMaterialDto.path != null) {
          throw new BadRequestException('do not update path for docs or video');
        }
        material = Object.assign(material, updateMaterialDto);
        return material;
      case MaterialType.Link:
        material = Object.assign(material, updateMaterialDto);
        return material;
      default:
        throw new NotFoundException('the material not found');
    }
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
        break;
      default:
        throw new NotFoundException('the material not found');
    }
    return `This action removes a #${id} material`;
  }
}
