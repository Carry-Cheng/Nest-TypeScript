import { createConnection } from "typeorm";
export const databaseProvider = [
  {
    provide: 'DATABASE_CONNECTION',
    useFactory: async () => await createConnection({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'root',
      password: 'zc123456',
      database: 'db_music',
      entities: [__dirname + '/../**/*.entity{.ts,.js}'],
      synchronize: true
    })
  }
]