import { IsNumber, IsString, IsNotEmpty} from "class-validator";
import {Type} from "class-transformer";

export class LoginDTO{
  @IsNotEmpty({message: 'El DNI es obligatorio.'})
  @Type(()=>Number)
  @IsNumber({},{message: 'El DNI debe ser numerico.'})
  dni_usuario:number;   
  @IsNotEmpty({message: 'La contraseña es obligatoria.'})
  @IsString({message: 'La contraseña debe ser una cadena de texto.'})
  contraseña:string;
}