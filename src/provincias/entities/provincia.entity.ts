import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity('provincias')
export class Provincia {
    @PrimaryGeneratedColumn()
    id:number
    @Column()  
    provincia:string
}
