import { Injectable } from '@nestjs/common';
import { CreateTeacherassistDto } from './dto/create-teacherassist.dto';
import { UpdateTeacherassistDto } from './dto/update-teacherassist.dto';

@Injectable()
export class TeacherassistService {
  create(createTeacherassistDto: CreateTeacherassistDto) {
    return 'This action adds a new teacherassist';
  }

  findAll() {
    return `This action returns all teacherassist`;
  }

  findOne(id: number) {
    return `This action returns a #${id} teacherassist`;
  }

  update(id: number, updateTeacherassistDto: UpdateTeacherassistDto) {
    return `This action updates a #${id} teacherassist`;
  }

  remove(id: number) {
    return `This action removes a #${id} teacherassist`;
  }
}
