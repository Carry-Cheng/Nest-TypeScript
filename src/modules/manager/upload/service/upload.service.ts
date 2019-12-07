import { Injectable, Inject, HttpException, HttpStatus } from "@nestjs/common";
import { Connection } from "typeorm";
import { UploadDTO } from "../dto/upload.dto";
import { Music } from './../../music/entity/music.entity';

@Injectable()
export class UploadService {
  constructor(
    @Inject('DATABASE_CONNECTION') private readonly connection: Connection
  ) {}
  
  async uploadMusic(file: any, uploadDTO: UploadDTO): Promise<{}> {
    let { id, sourceId } = uploadDTO
    if (!id) {
      throw new HttpException('音乐ID不能为空', HttpStatus.BAD_REQUEST)
    }
    if (file) {
      let { mimetype, buffer, size } = file
      if (mimetype !== 'audio/mp3') {
        throw new HttpException('音乐格式不是audio/mp3', HttpStatus.BAD_REQUEST)
      }
      // find source_id
      let resss = null;
      console.info('1111111111111');
      let sqlSourceId = `SELECT source_id FROM music_info WHERE music_info.id = ${id}`
      await this.connection.manager.query(sqlSourceId).then(res => {
        console.info(res)
        resss = res[0].source_id
      }).catch(error => {
        throw new HttpException(error, HttpStatus.INTERNAL_SERVER_ERROR)
      })
      console.info('4444444444444444444');
      console.info(resss)

      if (sourceId) {
        // new 
      } else {
        let music = new Music()
        music.data = buffer
        music.dataSize = size
        await this.connection.manager.save(music)
        .then(model => {
          sourceId = model.id
        }).catch(error => {
          throw new HttpException(error, HttpStatus.INTERNAL_SERVER_ERROR)
        })
        return sourceId
      }
    } else {
      throw new HttpException('音乐文件不能为空', HttpStatus.BAD_REQUEST)
    }
  }

  async uploadLyric(file: any, uploadDTO: UploadDTO): Promise<{}> {
    console.info(file)
    return true
  }

}
