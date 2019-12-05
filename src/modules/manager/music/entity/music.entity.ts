import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";

@Entity()
export class Music {
  @PrimaryGeneratedColumn()
  id: number

  @Column()
  data: string
}