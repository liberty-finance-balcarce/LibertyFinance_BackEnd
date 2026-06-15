import { Controller, Get, UseGuards, Req } from '@nestjs/common';
import { ReportesService } from './reportes.service';
import { JwtAuthGuard } from '../auth/guards/jwt-auth/jwt-auth.guard'
import { RolesGuard } from '../auth/guards/roles/roles.guard'; 
import { Roles } from '../auth/decorators/roles.decorator';
import { ResponseDTO } from 'src/common/dto/response.dto';
import { ResumenData, ResumenByInstrumento } from './reportes.service';

interface UsuarioAutenticado {
  sub: number;       // o string, dependiendo de cómo manejes tus IDs en la base de datos
  email: string;
  rol: string;
}

// 3. Extendemos el Request de Express para que reconozca a nuestro usuario tipado
interface RequestConUsuario extends Request {
  user: UsuarioAutenticado;
}

@Controller('reportes')
export class ReportesController {
  constructor(private readonly reportesService: ReportesService) {}

  @Get('resumen')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(1, 2)
  obtenerResumen(@Req() req: RequestConUsuario): Promise<ResponseDTO<ResumenData>> { // 4. Tipamos el objeto 'req' y el retorno de la función
    const dni_usuario = req.user.sub; // Ahora TypeScript sabe perfectamente que 'id' existe y de qué tipo es
    return this.reportesService.crearInformeResumen(dni_usuario);
  }
}
