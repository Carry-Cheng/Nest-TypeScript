import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";

@Entity('album')
export class Album {
  @PrimaryGeneratedColumn()
  id: number

  @Column('varchar', { default: null })
  name: string

  @Column('int', { default: null })
  singer_id: number

  @Column('varchar', { default: null })
  info: string

  @Column('datetime', { default: null })
  publish_time: Date

}