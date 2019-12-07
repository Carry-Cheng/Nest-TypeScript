import { Injectable, PipeTransform, ArgumentMetadata } from "@nestjs/common";
import { validate } from "class-validator";
import { plainToClass } from "class-transformer";

@Injectable()
export class ClassTransformPipe implements PipeTransform {
  async transform(value: any, metadata: ArgumentMetadata) {
    console.info('class transform pipe...')
    const { metatype } = metadata
    // create origin class by metatype
    // class transformer
    if (value) {
      for (const key in value) {
        const element = value[key]
        if (element === 'null'|| element === 'undefined') {
          value[key] = null
        }
      }
    }
    const object = plainToClass(metatype, value)
    return object
  }

}