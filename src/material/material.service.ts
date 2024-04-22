import { Injectable } from '@nestjs/common';
import { CreateMaterialDto } from './dto/create-material.dto';
import { UpdateMaterialDto } from './dto/update-material.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Material } from './entities/material.entity';
import { User } from 'src/auth/entities/user.entity';
import { MaterialType } from './entities/enum/material.enum';

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
  ) {
    const material = this.materialRepository.create({
      title: title,
      path: file.path,
      materialType: MaterialType.File,
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

  remove(id: number) {
    return `This action removes a #${id} material`;
  }
}
