import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";

@Entity()
export class MusicInfo {
  @PrimaryGeneratedColumn()
  id: number

  @Column('int', { default: null })
  source_id: number

  @Column('varchar', { default: null })
  name: string

  @Column('int', { default: null })
  hot: number

  @Column('int', { default: null })
  star: number

  @Column('int', { default: null })
  singer_id: number

  @Column('varchar', { default: null })
  lyricist: string

  @Column('varchar', { default: null })
  composer: string

  @Column('varchar', { default: null })
  arranger: string

  @Column('int', { default: null })
  album_id: number

  @Column('int', { default: null })
  lyric_id: number

  @Column('datetime', { default: null })
  issue_time: Date
}