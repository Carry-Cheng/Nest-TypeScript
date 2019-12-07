import { Code } from './../../../../enum/code';
import { Type } from 'class-transformer'
import { IsInt, IsNotEmpty } from 'class-validator'
export class UploadDTO {

  @Type(() => Number)
  @IsNotEmpty({ message: 'id is not empty', context: { code: Code.PARAM_NOT_EMPTY } })
  @IsInt({ message: 'id is not number', context: { code: Code.PARAM_TYPE_ERROR } })
  readonly id: number

  @Type(() => Number)
  @IsInt({ message: 'id is not number', context: { code: Code.PARAM_TYPE_ERROR } })
  readonly sourceId: number

}
