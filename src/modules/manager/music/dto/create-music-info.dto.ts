export class CreateMusicInfoDTO {
  readonly id: number
  readonly sourceId: number
  readonly name: string
  readonly hot: number
  readonly star: number
  readonly singerId: number
  readonly composer: string
  readonly lyricist: string
  readonly arranger: string
  readonly albumId: number
  readonly lyricId: number
  readonly issueTime: Date
}
