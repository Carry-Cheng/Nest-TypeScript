import { Injectable, Inject, HttpException, HttpStatus } from "@nestjs/common";
import { Connection } from "typeorm";

@Injectable()
export class RecommendService {
  constructor(
    @Inject('DATABASE_CONNECTION') private readonly connection: Connection
  ) {}

  async getRecommendList() :Promise<any[]> {
    let lists = []
    let sql = `
    SELECT MI.id, MI.source_id AS sourceId, MI.name AS musicName,
    MI.hot, MI.star, MI.singer_id AS singerId, MI.album_id AS albumId,
    S.name AS singerName, A.name AS albumName
    FROM music_info AS MI
    LEFT JOIN singer AS S ON MI.singer_id = S.id
    LEFT JOIN album AS A ON MI.album_id = A.id
    INNER JOIN music AS M ON MI.source_id = M.id
    ORDER BY MI.hot DESC, A.publish_time DESC
    LIMIT 0, 10
    `
    await this.connection.manager.query(sql)
    .then(result => {
      lists = result
    }).catch((error) => {
      throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR)
    })
    return lists
  }

}