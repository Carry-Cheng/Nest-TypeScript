
import { Injectable, Inject } from '@nestjs/common'
import { Album } from '../entity/album.entity'
import { CreateAlbumDTO } from '../dto/create-album.dto'
import { QueryAlbumDTO } from '../dto/query-album.dto'
import { Connection } from 'typeorm'
@Injectable()
export class AlbumService {
  constructor(
    @Inject('DATABASE_CONNECTION') private readonly connection: Connection
  ) {}
  async createAlbum(AlbumDTO: CreateAlbumDTO) {
    let album = new Album()
    album.name = AlbumDTO.albumName
    album.singerId = AlbumDTO.singerId
    album.info = AlbumDTO.albumInfo
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
      LEFT JOIN singer singer ON singer.id = album.singer_id
      WHERE album.name LIKE '%${queryDTO.keyword}%'
    `
    let sql2 = `
      SELECT album.id, album.name AS albumName, album.singer_id AS singerId, album.info AS albumInfo,
        date_format(album.publish_time,'%Y-%m-%d') AS publishTime, singer.name AS singerName FROM album
      LEFT JOIN singer singer ON singer.id = album.singer_id
      WHERE album.name LIKE '%${queryDTO.keyword}%'
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

  async searchAlbum(queryDTO: QueryAlbumDTO): Promise<CreateAlbumDTO[]> {
    let albums = []
    await this.connection
      .createQueryBuilder().select('album').from(Album, 'album')
      .where('album.id LIKE :keyword OR album.name LIKE :keyword')
      .setParameter('keyword', `%${queryDTO.keyword}%`)
      .orderBy('album.id', 'ASC')
      .getMany().then((result) => {
        albums = result
      }).catch((err) => {
        console.info(err)
        albums = []
      })
    return albums
  }
}
