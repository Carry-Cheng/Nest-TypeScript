import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";

@Entity('music')
export class Music {
  @PrimaryGeneratedColumn()
  id: number

  @Column('longblob', { default: null })
  data: string

  @Column('int', { default: null, name: 'data_size' })
  dataSize: number

  @Column('longblob', { default: null })
  lyric: string

  @Column('int', { default: null, name: 'lyric_size' })
  lyricSize: number
  
}