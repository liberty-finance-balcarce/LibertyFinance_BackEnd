import { Body, Controller, Post, UseGuards, Req } from '@nestjs/common';
import { type Request } from 'express';
import { ApiBearerAuth, ApiOperation, ApiResponse, ApiTags, ApiBody } from '@nestjs/swagger';
import { CompraVentaService } from './compra-venta.service';
import { CreateTransaccionHistoricoCompraDto } from '../transaccion-historico-compra/dto/create-transaccion-historico-compra.dto';
import { CreateTransaccionHistoricoVentaDto } from '../transaccion-historico-venta/dto/create-transaccion-historico-venta.dto';
import { CreateCompraDto } from './dto/create-compra.dto';
import { CreateVentaDto } from './dto/create-venta.dto';
import { ResponseDTO } from 'src/common/dto/response.dto';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth/jwt-auth.guard';
import { RolesGuard } from 'src/auth/guards/roles/roles.guard';
import { Roles } from 'src/auth/decorators/roles.decorator';

@ApiTags('Compra y Venta')
@Controller('compra-venta')
export class CompraVentaController {
  constructor(private readonly compraVentaService: CompraVentaService) { }

  @Post('comprar')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(1)
  @ApiBearerAuth()
  @ApiOperation({
    description: 'Comprar un instrumento financiero',
  })
  @ApiBody({
    type: CreateCompraDto,
  })
  @ApiResponse({
    status: 200,
    description: 'Transacción historica de compra agregada correctamente.',
  })
  @ApiResponse({
    status: 400,
    description: 'Error en la validación de los datos enviados',
  })
  @ApiResponse({
    status: 404,
    description: 'No se encontró ningún instrumento financiero con ese ID / No se encontró ningún usuario con ese DNI',
  })
  async comprar(
    @Body() compraDto: CreateCompraDto,
    @Req() req: Request
  ): Promise<ResponseDTO> {
    const dni_usuario = (req.user as any).sub;
    const fullDto: CreateTransaccionHistoricoCompraDto = {
      ...compraDto,
      dni_usuario,
    };
    return this.compraVentaService.comprar(fullDto);
  }

  @Post('vender')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(1)
  @ApiBearerAuth()
  @ApiOperation({
    description: 'Vender un instrumento financiero',
  })
  @ApiBody({
    type: CreateVentaDto,
  })
  @ApiResponse({
    status: 200,
    description: 'Transacción historica de venta agregada correctamente.',
  })
  @ApiResponse({
    status: 400,
    description: 'No puedes vender un instrumento que no has comprado previamente / No tienes compras registradas para poder vender',
  })
  @ApiResponse({
    status: 404,
    description: 'No se encontró ningún instrumento financiero con ese ID / No se encontró ningún usuario con ese DNI',
  })
  async vender(
    @Body() ventaDto: CreateVentaDto,
    @Req() req: Request
  ): Promise<ResponseDTO> {
    const dni_usuario = (req.user as any).sub;
    const fullDto: CreateTransaccionHistoricoVentaDto = {
      ...ventaDto,
      dni_usuario,
    };
    return this.compraVentaService.vender(fullDto);
  }
}
