import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";

@Entity('album')
export class Album {
  @PrimaryGeneratedColumn()
  id: number

  @Column('varchar', { default: null, name: 'name' })
  name: string

  @Column('int', { default: null, name: 'singer_id' })
  singerId: number

  @Column('varchar', { default: null, name: 'info' })
  info: string

  @Column('datetime', { default: null, name: 'publish_time' })
  publishTime: Date

}