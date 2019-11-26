import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";

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

  @Column()
  publishTime: Date
  
}