import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { Delete } from '@nestjs/common/decorators/http/request-mapping.decorator';
import { CoursesService } from './courses.service';
import { CreateCourseDto } from './dto/create-course-dto';
import { UpdateCourseDto } from './dto/update-course.dto';

@Controller('courses')
export class CoursesController {
  constructor(private readonly coursesService: CoursesService) {}

  @Get()
  findAll() {
    return this.coursesService.findAll();
    //return response.status(200).send('Listagem dos cursos');
  }
  @Get(':id')
  findOnde(@Param('id') id: string) {
    return this.coursesService.findOne(id);
    //return `Retorna um curso ${id}`;
  }

  @Post()
  //@HttpCode(HttpStatus.NO_CONTENT)
  create(@Body() createCourseDto: CreateCourseDto) {
    return this.coursesService.create(createCourseDto);
    //return body;
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateCourseDto: UpdateCourseDto) {
    return this.coursesService.update(id, updateCourseDto);
    //return `Atualização do curso ${id}`;
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    this.coursesService.remove(id);
  }
}
