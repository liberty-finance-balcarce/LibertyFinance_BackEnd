import { DataSource } from "typeorm";
import 'dotenv/config'
const defaultPort = 3306;

export const AppDataSource = new DataSource({
    type: 'mysql',
    host: process.env.DB_HOST ?? 'localhost',
    port: Number(process.env.DB_PORT ?? defaultPort),
    username: process.env.DB_USER ?? 'root',
    password: process.env.DB_PASSWORD ?? 'root',
    database: process.env.DB_NAME ?? 'libertyfinance',
    entities: [__dirname + '/../**/*.entity.{.ts,.js}'],
    synchronize: false
})