import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";

@Entity('music_info')
export class MusicInfo {
  @PrimaryGeneratedColumn()
  id: number

  @Column('int', { default: null, name: 'source_id' })
  sourceId: number

  @Column('varchar', { default: null })
  name: string

  @Column('int', { default: null })
  hot: number

  @Column('int', { default: null })
  star: number

  @Column('int', { default: null, name: 'singer_id' })
  singerId: number

  @Column('varchar', { default: null })
  lyricist: string

  @Column('varchar', { default: null })
  composer: string

  @Column('varchar', { default: null })
  arranger: string

  @Column('int', { default: null, name: 'album_id' })
  albumId: number

  @Column('int', { default: null, name: 'lyric_id' })
  lyricId: number

  @Column('datetime', { default: null, name: 'issue_time' })
  issueTime: Date
}