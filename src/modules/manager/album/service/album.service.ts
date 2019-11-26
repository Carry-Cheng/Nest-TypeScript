
import { Injectable, Inject } from "@nestjs/common";
import { Album } from '../entity/album.entity'
import { CreateAlbumDTO } from '../dto/create-album.dto'
import { QueryAlbumDTO } from '../dto/query-album.dto'
import { Connection } from "typeorm"
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
    await this.connection
      .createQueryBuilder().select('Album').from(Album, 'album').where('album.albumName LIKE :keyword')
      .setParameter('keyword', `%${queryDTO.keyword}%`)
      .getMany().then((result) => {
        total = result.length
      }).catch((err) => {
        console.info(err)
        total = 0
      })
    await this.connection
      .createQueryBuilder().select('Album').from(Album, 'album').where('album.albumName LIKE :keyword')
      .setParameter('keyword', `%${queryDTO.keyword}%`).orderBy('album.id', 'ASC')
      .offset(pageSize * (pageNum - 1)).limit(pageSize)
      .getMany().then((result) => {
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
