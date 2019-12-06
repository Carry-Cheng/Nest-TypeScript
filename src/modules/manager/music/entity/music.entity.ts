import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";

@Entity('music')
export class Music {
  @PrimaryGeneratedColumn()
  id: number

  @Column('blob', { default: null })
  data: string

  @Column('blob', { default: null })
  lyric: string
  
}