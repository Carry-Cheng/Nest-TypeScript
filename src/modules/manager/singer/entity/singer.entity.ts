
import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from "typeorm";

@Entity('singer')
export class Singer {
  @PrimaryGeneratedColumn()
  id: number

  @Column('varchar', { default: null })
  name: string

  @Column('int', { default: null })
  sex: number

  @Column('varchar', { default: null })
  info: string

  @Column('varchar', { default: null })
  country: string
}