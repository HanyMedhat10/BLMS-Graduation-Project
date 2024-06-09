import { Injectable } from '@nestjs/common';
import { CreateDashBoardDto } from './dto/create-dash-board.dto';
import { UpdateDashBoardDto } from './dto/update-dash-board.dto';

@Injectable()
export class DashBoardService {
  create(createDashBoardDto: CreateDashBoardDto) {
    return 'This action adds a new dashBoard';
  }

  findAll() {
    return `This action returns all dashBoard`;
  }

  findOne(id: number) {
    return `This action returns a #${id} dashBoard`;
  }

  update(id: number, updateDashBoardDto: UpdateDashBoardDto) {
    return `This action updates a #${id} dashBoard`;
  }

  remove(id: number) {
    return `This action removes a #${id} dashBoard`;
  }
}
