import { Provincia } from "src/provincias/entities/provincia.entity";
import { Column, Entity, JoinColumn, ManyToOne, PrimaryColumn, PrimaryGeneratedColumn } from "typeorm";

@Entity("usuarios")
export class Usuario{
  @PrimaryColumn()
  dni_usuario: number
  @Column()  
  nombre:string
  @Column()  
  apellido:string
  @Column({unique:true})
  mail:string
  @Column({select:false})
  contraseña:string
  @Column() 
  numero_telefono:string
  @Column()
  direccion: string
  @Column()
  id_perfilinv:number
  @Column() 
  id_codigo_referidos:number
  @Column() 
  id_rol:number
  @ManyToOne(()=>Provincia,{nullable:false})       //@ManyToOne(()=>Provincia)
  @JoinColumn({name:'id_provincia'})
  provincia:Provincia      //provincia:Provincia
}

