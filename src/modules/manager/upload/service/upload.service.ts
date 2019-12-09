import { MusicInfo } from './../../music/entity/music-info.entity';
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
    let { id } = uploadDTO
    if (!id) {
      throw new HttpException('音乐ID不能为空', HttpStatus.INTERNAL_SERVER_ERROR)
    }
    if (file) {
      let { mimetype, buffer, size } = file
      if (mimetype !== 'audio/mp3') {
        throw new HttpException('音乐格式不是audio/mp3', HttpStatus.INTERNAL_SERVER_ERROR)
      }
      // find source_id
      let sourceId = 0
      let hasSourceId = false
      let sqlSourceId = `SELECT source_id FROM music_info WHERE music_info.id = ${id}`
      await this.connection.manager.query(sqlSourceId).then(res => {
        if (res[0].source_id) {
          hasSourceId = true
          sourceId = res[0].source_id
        }
      }).catch(error => {
        throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR)
      })
      if (hasSourceId) {
        await this.connection.manager.createQueryBuilder().update(Music)
        .set({data: buffer, dataSize: size})
        .where("id = :id", {id: sourceId})
        .execute()
        .catch(error => {
          throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR)
        })
      } else {
        let music = new Music()
        music.data = buffer
        music.dataSize = size
        await this.connection.manager.save(music)
        .then(model => {
          sourceId = model.id
        }).catch(error => {
          throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR)
        })
        await this.connection.manager.createQueryBuilder().update(MusicInfo)
        .set({sourceId: sourceId})
        .where("id = :id", {id: id})
        .execute()
        .catch(error => {
          throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR)
        })
      }
      return sourceId
    } else {
      throw new HttpException('音乐文件不能为空', HttpStatus.INTERNAL_SERVER_ERROR)
    }
  }

  async uploadLyric(file: any, uploadDTO: UploadDTO): Promise<{}> {
    let { id } = uploadDTO
    if (!id) {
      throw new HttpException('音乐ID不能为空', HttpStatus.INTERNAL_SERVER_ERROR)
    }
    if (file) {
      let { mimetype, buffer, size, originalname } = file
      let regExp = /\S.lrc/g
      if (mimetype !== 'application/octet-stream' && !regExp.test(originalname)) {
        throw new HttpException('歌词格式不是.lrc格式', HttpStatus.INTERNAL_SERVER_ERROR)
      }
      // find source_id
      let sourceId = 0
      let hasSourceId = false
      let sqlSourceId = `SELECT source_id FROM music_info WHERE music_info.id = ${id}`
      await this.connection.manager.query(sqlSourceId).then(res => {
        if (res[0].source_id) {
          hasSourceId = true
          sourceId = res[0].source_id
        }
      }).catch(error => {
        throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR)
      })
      if (hasSourceId) {
        await this.connection.manager.createQueryBuilder().update(Music)
        .set({lyric: buffer, lyricSize: size})
        .where("id = :id", {id: sourceId})
        .execute()
        .catch(error => {
          throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR)
        })
      } else {
        let music = new Music()
        music.lyric = buffer
        music.lyricSize = size
        await this.connection.manager.save(music)
        .then(model => {
          sourceId = model.id
        }).catch(error => {
          throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR)
        })
        await this.connection.manager.createQueryBuilder().update(MusicInfo)
        .set({sourceId: sourceId})
        .where("id = :id", {id: id})
        .execute()
        .catch(error => {
          throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR)
        })
      }
      return sourceId
    } else {
      throw new HttpException('歌词文件不能为空', HttpStatus.INTERNAL_SERVER_ERROR)
    }
  }

}
