
import { Injectable, Inject } from "@nestjs/common";
import { Singer } from './../entity/singer.entity'
import { CreateSingerDTO } from './../dto/create-singer.dto'
import { QuerySingerDTO } from './../dto/query-singer.dto'
import { Connection } from "typeorm"
@Injectable()
export class SingerService {
  constructor(
    @Inject('DATABASE_CONNECTION') private readonly connection: Connection
  ) {}
  async createSinger(singerDTO: CreateSingerDTO) {
    let singer = new Singer()
    singer.name = singerDTO.name
    singer.sex = singerDTO.sex
    singer.info = singerDTO.info
    singer.country = singerDTO.country
    await this.connection.manager.save(singer)
    .then(singer => {
      console.info(singer.id)
    }).catch(error => {
      console.info(error)
    })
  }

  async getSinger(queryDTO: QuerySingerDTO): Promise<{}> {
    let pageSize = 10, pageNum = 1
    if (queryDTO.pageSize) {
      pageSize = queryDTO.pageSize
    }
    if (queryDTO.pageNum) {
      pageNum = queryDTO.pageNum
    }
    let singers = [], total = 0
    await this.connection
      .createQueryBuilder().select('singer').from(Singer, 'singer').where('singer.name LIKE :keyword')
      .setParameter('keyword', `%${queryDTO.keyword}%`)
      .getMany().then((result) => {
        total = result.length
      }).catch((err) => {
        console.info(err)
        total = 0
      })
    await this.connection
      .createQueryBuilder().select('singer').from(Singer, 'singer').where('singer.name LIKE :keyword')
      .setParameter('keyword', `%${queryDTO.keyword}%`).orderBy('singer.id', 'ASC')
      .offset(pageSize * (pageNum - 1)).limit(pageSize)
      .getMany().then((result) => {
        singers = result
      }).catch((err) => {
        console.info(err)
        singers = []
      })
    return {
      list: singers,
      total
    }
  }

  async searchSinger(queryDTO: QuerySingerDTO): Promise<CreateSingerDTO[]> {
    let singers = []
    await this.connection
      .createQueryBuilder().select('singer').from(Singer, 'singer')
      .where('singer.id LIKE :keyword OR singer.name LIKE :keyword')
      .setParameter('keyword', `%${queryDTO.keyword}%`)
      .orderBy('singer.id', 'ASC')
      .getMany().then((result) => {
        singers = result
      }).catch((err) => {
        console.info(err)
        singers = []
      })
    return singers
  }
}
