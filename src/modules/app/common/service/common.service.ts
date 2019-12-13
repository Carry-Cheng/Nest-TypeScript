import { Injectable, Inject, HttpException, HttpStatus } from "@nestjs/common";
import { Connection } from "typeorm";
import { QuerySourceDTO } from "../dto/query-source.dto";

@Injectable()
export class CommonService {
  constructor(
    @Inject('DATABASE_CONNECTION') private readonly connection: Connection
  ) {}

  async getSource(query: QuerySourceDTO) :Promise<{}> {
    console.info('getSource')
    let data = null
    let sql = `
    SELECT data FROM music
    WHERE music.id = ${query.sourceId}
    `
    await this.connection.manager.query(sql)
    .then(result => {
      if (result[0]) {
        data = result[0]
      }
    }).catch((error) => {
      throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR)
    })
    console.info('end getSource')
    console.info(data)
    return data
  }

}