import { Injectable, Inject } from "@nestjs/common";
import { Connection } from "typeorm";

@Injectable()
export class UploadService {
  constructor(
    @Inject('DATABASE_CONNECTION') private readonly connection: Connection
  ) {}
}
