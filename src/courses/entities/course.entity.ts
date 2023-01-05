import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  JoinTable,
  ManyToMany,
} from 'typeorm';
import { Tag } from './tag.entity';

//Definindo o nome que eu quero para essa tabela
@Entity('courses')
export class Course {
  @PrimaryGeneratedColumn()
  id: number;
  @Column()
  name: string;
  @Column()
  description: string;

  //Definindo qual é a tabela alvo e qual coluna esta fazendo o relacionamento
  @JoinTable()
  @ManyToMany(() => Tag, (tag) => tag.courses, { cascade: true })
  tags: Tag[];
}
