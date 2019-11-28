
import { Injectable, Inject } from "@nestjs/common";
import { Album } from '../entity/album.entity'
import { CreateAlbumDTO } from '../dto/create-album.dto'
import { QueryAlbumDTO } from '../dto/query-album.dto'
import { Connection } from "typeorm"
import { Singer } from '../../singer/entity/singer.entity'
@Injectable()
export class AlbumService {
  constructor(
    @Inject('DATABASE_CONNECTION') private readonly connection: Connection
  ) {}
  async createAlbum(AlbumDTO: CreateAlbumDTO) {
    let album = new Album()
    album.albumName = AlbumDTO.albumName
    album.singerId = AlbumDTO.singerId
    album.albumInfo = AlbumDTO.albumInfo
    album.publishTime = AlbumDTO.publishTime
    await this.connection.manager.save(album)
      .then(album => {
        console.info(album.id)
      }).catch(error => {
        console.info(error)
      })
  }

  async getAlbum(queryDTO: QueryAlbumDTO): Promise<{}> {
    let pageSize = 10, pageNum = 1
    if (queryDTO.pageSize) {
      pageSize = queryDTO.pageSize
    }
    if (queryDTO.pageNum) {
      pageNum = queryDTO.pageNum
    }
    let albums = [], total = 0
    let sql1 = `
      SELECT COUNT(*) AS total FROM album
      LEFT JOIN singer singer ON singer.id = album.singerId
      WHERE album.albumName LIKE '%${queryDTO.keyword}%'
    `
    let sql2 = `
      SELECT album.id, albumName, singerId, albumInfo,
        date_format(publishTime,'%Y-%m-%d') AS publishTime, singer.name AS singerName FROM album
      LEFT JOIN singer singer ON singer.id = album.singerId
      WHERE album.albumName LIKE '%${queryDTO.keyword}%'
      ORDER BY album.id ASC
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
      albums = result
    }).catch((err) => {
      console.info(err)
      albums = []
    })
    return {
      list: albums,
      total
    }
  }
}
