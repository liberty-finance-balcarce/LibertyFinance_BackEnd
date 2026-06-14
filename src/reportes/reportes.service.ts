import { Injectable, HttpStatus } from '@nestjs/common';
import { ResponseDTO } from 'src/common/dto/response.dto';

@Injectable()
export class ReportesService {


async crearInformeResumen(usuarioId:number):Promise<ResponseDTO>{
    console.log(usuarioId);
    return {
      statusCode: HttpStatus.OK,
      message: 'Resumen enviado exitosamente',
    };
}


}
