import { PartialType } from '@nestjs/mapped-types';
import { CreateCourseDto } from './create-course-dto';

//Usando a classe createCourseDto como referencia para a classe de update, assim não precisamos colocar todas as propriedades dentro do update
//Vale lembrar que esse pacote "mapped-types" hoje só funciona com a versão 0.13.2 do class validator
export class UpdateCourseDto extends PartialType(CreateCourseDto) {}
