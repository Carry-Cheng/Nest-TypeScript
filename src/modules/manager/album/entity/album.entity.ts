import { Singer } from './../../singer/entity/singer.entity'
import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from "typeorm";

@Entity()
export class Album {
  @PrimaryGeneratedColumn()
  id: number

  @Column()
  albumName: string

  @Column()
  singerId: number

  @Column()
  albumInfo: string

  @Column({ type: 'datetime' })
  publishTime: Date
  
  // @ManyToOne(() => Singer, singer => singer.albums)
  // singer: Singer
}