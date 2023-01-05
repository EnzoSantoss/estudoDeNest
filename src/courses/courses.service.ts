import {
  Injectable,
  HttpException,
  HttpStatus,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateCourseDto } from './dto/create-course-dto';
import { UpdateCourseDto } from './dto/update-course.dto';
import { Course } from './entities/course.entity';
import { Tag } from './entities/tag.entity';

@Injectable()
export class CoursesService {
  constructor(
    @InjectRepository(Course)
    private readonly courseRepository: Repository<Course>,

    @InjectRepository(Tag) private readonly tagRespository: Repository<Tag>,
  ) {}

  findAll() {
    return this.courseRepository.find();
  }

  findOne(id: string) {
    const course = this.courseRepository.findOne(id);

    if (!course) {
      throw new NotFoundException(` Course ID ${id} not found `);
    } else {
      return course;
    }
  }

  async create(createCourseDto: CreateCourseDto) {
    const tags = await Promise.all(
      createCourseDto.tags.map((name) => this.preloadTagByName(name)),
    );
    const course = await this.courseRepository.create({
      ...CreateCourseDto,
      tags,
    });
    return this.courseRepository.save(course);
  }

  async update(id: string, updateCourseDto: UpdateCourseDto) {
    //Verificando se existe tag, e se existir, executa o metodo que criamos

    const tags =
      updateCourseDto.tags &&
      (await Promise.all(
        updateCourseDto.tags.map((name) => this.preloadTagByName(name)),
      ));

    //verificando se existe algum item com esse ID no banco e preparando o que esse objeto vai receber na atualização
    const course = await this.courseRepository.preload({
      id: +id,
      ...updateCourseDto,
      tags,
    });

    if (!course) {
      throw new NotFoundException(`Course with ${id} not found`);
    }

    return this.courseRepository.save(course);
  }

  async remove(id: string) {
    const course = await this.courseRepository.findOne(id);
    if (!course) {
      throw new NotFoundException(`Course with ${id} not found`);
    }

    return this.courseRepository.remove(course);
  }

  async preloadTagByName(name: string): Promise<Tag> {
    const tag = await this.tagRespository.findOne({ name });

    if (tag) {
      return tag;
    } else {
      return this.tagRespository.create({ name });
    }
  }
}
