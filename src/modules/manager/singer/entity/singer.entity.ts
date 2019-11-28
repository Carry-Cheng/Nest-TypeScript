
import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from "typeorm";
import { Album } from "../../album/entity/album.entity"

@Entity()
export class Singer {
  @PrimaryGeneratedColumn()
  id: number

  @Column()
  name: string

  @Column()
  sex: number

  @Column()
  info: string

  @Column()
  country: string

  // @OneToMany(() => Album, album => album.singer)
  // albums: Album[]
}