import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";

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
  
}