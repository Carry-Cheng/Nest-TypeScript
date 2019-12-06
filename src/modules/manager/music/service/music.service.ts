
import { Injectable, Inject } from "@nestjs/common";
import { Connection } from "typeorm"
import { CreateMusicInfoDTO } from "../dto/create-music-info.dto";
import { MusicInfo } from "../entity/music-info.entity";
import { QueryMusicInfoDTO } from "../dto/query-music-info.dto";
@Injectable()
export class MusicService {
  constructor(
    @Inject('DATABASE_CONNECTION') private readonly connection: Connection
  ) {}

  async createMusicInfo(createMusicInfoDTO: CreateMusicInfoDTO) {
    let musicInfo = new MusicInfo()
    musicInfo.name = createMusicInfoDTO.name
    musicInfo.singerId = createMusicInfoDTO.singerId
    musicInfo.composer = createMusicInfoDTO.composer
    musicInfo.lyricist = createMusicInfoDTO.lyricist
    musicInfo.albumId = createMusicInfoDTO.albumId
    musicInfo.issueTime = createMusicInfoDTO.issueTime
    await this.connection.manager.save(musicInfo)
      .then(model => {
        console.info(model.id)
      }).catch(error => {
        console.info(error)
      })
  }

  async getMusicInfo(queryDTO: QueryMusicInfoDTO): Promise<{}> {
    let pageSize = 10, pageNum = 1
    if (queryDTO.pageSize) {
      pageSize = queryDTO.pageSize
    }
    if (queryDTO.pageNum) {
      pageNum = queryDTO.pageNum
    }
    let musicInfos = [], total = 0
    let sql1 = `
      SELECT COUNT(*) AS total FROM music_info AS M
      LEFT JOIN singer AS S ON M.singerId = S.id
      LEFT JOIN album AS A ON M.albumId = A.id
      WHERE M.name LIKE '%${queryDTO.keyword}%' OR S.name LIKE '%${queryDTO.keyword}%' OR A.album_name LIKE '%${queryDTO.keyword}%'
    `
    let sql2 = `
      SELECT M.id, M.name, M.hot, M.star, M.lyricist, M.composer, M.arranger, M.sourceId,
      M.singerId, M.albumId, M.lyricId, date_format(M.issueTime,'%Y-%m-%d') AS issueTime, S.name AS singerName, A.albumName
      FROM music_info AS M
      LEFT JOIN singer AS S ON M.singerId = S.id
      LEFT JOIN album AS A ON M.albumId = A.id
      WHERE M.name LIKE '%${queryDTO.keyword}%' OR S.name LIKE '%${queryDTO.keyword}%' OR A.album_name LIKE '%${queryDTO.keyword}%'
      ORDER BY M.id ASC
      LIMIT ${pageSize * (pageNum - 1)}, ${pageSize}
    `
    await this.connection.manager.query(sql1)
      .then(result => {
        total = parseInt(result[0].total) || 0
      }).catch((err) => {
        console.info(err)
        total = 0
      })
    await this.connection.manager.query(sql2)
    .then(result => {
      musicInfos = result
    }).catch((err) => {
      console.info(err)
      musicInfos = []
    })
    return {
      list: musicInfos,
      total
    }
  }

}
