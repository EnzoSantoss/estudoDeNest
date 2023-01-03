import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { Course } from './entities/course.entity';

@Injectable()
export class CoursesService {
  private courses: Course[] = [
    {
      id: 1,
      name: 'Fundametos do nest',
      description: 'Fundamentos do nest',
      tags: ['node.js'],
    },
  ];

  findAll() {
    return this.courses;
  }

  findOne(id: string) {
    const course = this.courses.find((item) => {
      return item.id === Number(id);
    });

    if (!course) {
      throw new HttpException(
        ` Course ID ${id} not found `,
        HttpStatus.NOT_FOUND,
      );
    } else {
      return course;
    }
  }

  create(createCourseDto: any) {
    this.courses.push(createCourseDto);
  }

  update(id: string, updateCreateCourseDto: any) {
    const indexCourse = this.courses.findIndex((course) => {
      return course.id === Number(id);
    });

    this.courses[indexCourse] = updateCreateCourseDto;
  }

  remove(id: string) {
    const indexCourse = this.courses.findIndex((course) => {
      return course.id === Number(id);
    });

    if (indexCourse >= 0) {
      this.courses.slice(indexCourse, 1);
    }
  }
}
