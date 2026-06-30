import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  UseGuards,
} from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { ResponseDTO } from 'src/common/dto/response.dto';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth/jwt-auth.guard';
import { RolesGuard } from 'src/auth/guards/roles/roles.guard';
import { Roles } from 'src/auth/decorators/roles.decorator';
import { PerfilInversorService } from './perfil-inversor.service';
import { CreatePerfilInversorDto } from './dto/create-perfil-inversor.dto';
import { UpdatePerfilInversorDto } from './dto/update-perfil-inversor.dto';
import { PerfilInversor } from './entities/perfil-inversor.entity';

@ApiTags('Perfil Inversor')
@Controller('perfil-inversor')
export class PerfilInversorController {
  constructor(private readonly perfilInversorService: PerfilInversorService) { }

  @Get()
  @ApiOperation({ description: 'Obtener todos los perfiles de inversor' })
  @ApiResponse({
    status: 200,
    description: 'Perfiles de inversor obtenidos correctamente.',
  })
  @ApiResponse({
    status: 404,
    description: 'No se encontraron perfiles de inversor.',
  })
  @ApiResponse({
    status: 500,
    description: 'Error al obtener los perfiles de inversor.',
  })

  async findAll(): Promise<ResponseDTO<PerfilInversor[]>> {
    return await this.perfilInversorService.findAll();
  }

  @Get(':id')
  @ApiOperation({ description: 'Obtener un perfil de inversor por ID' })
  @ApiResponse({
    status: 200,
    description: 'Perfil de inversor obtenido correctamente.',
  })
  @ApiResponse({
    status: 404,
    description: 'No se encontró ningún perfil de inversor.',
  })
  @ApiResponse({
    status: 500,
    description: 'Error al obtener el perfil de inversor.',
  })
  async getById(@Param('id') id: number): Promise<ResponseDTO<PerfilInversor>> {
    return await this.perfilInversorService.getById(id);
  }

  @Get('dni-usuario/:dni_usuario')
  @ApiOperation({
    description: 'Obtener un perfil de inversor por DNI de usuario',
  })
  @ApiResponse({
    status: 200,
    description:
      'Perfil de inversor por DNI de usuario obtenido correctamente.',
  })
  @ApiResponse({
    status: 404,
    description: 'No se encontró ningún perfil de inversor por DNI de usuario.',
  })
  @ApiResponse({
    status: 500,
    description: 'Error al obtener el perfil de inversor por DNI de usuario.',
  })
  async getByDniUsuario(
    @Param('dni_usuario') dni_usuario: number,
  ): Promise<ResponseDTO<PerfilInversor>> {
    return await this.perfilInversorService.getByDniUsuario(dni_usuario);
  }

  @Delete(':id')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(2)
  @ApiBearerAuth()
  @ApiOperation({ description: 'Eliminar un perfil de inversor' })
  @ApiResponse({
    status: 200,
    description: 'Perfil de inversor eliminado correctamente.',
  })
  @ApiResponse({
    status: 404,
    description: 'No se encontró ningún perfil de inversor.',
  })
  @ApiResponse({
    status: 500,
    description: 'Error al eliminar el perfil de inversor.',
  })
  async remove(@Param('id') id: number): Promise<ResponseDTO> {
    return await this.perfilInversorService.remove(id);
  }

  @Post()
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(2)
  @ApiBearerAuth()
  @ApiOperation({ description: 'Crear un perfil de inversor' })
  @ApiResponse({
    status: 200,
    description: 'Perfil de inversor creado correctamente.',
  })
  @ApiResponse({
    status: 400,
    description: 'Error al crear el perfil de inversor.',
  })
  @ApiResponse({
    status: 500,
    description: 'Error al crear el perfil de inversor.',
  })
  async create(
    @Body() createPerfilInversorDto: CreatePerfilInversorDto,
  ): Promise<ResponseDTO> {
    return await this.perfilInversorService.create(createPerfilInversorDto);
  }
  @Patch(':id')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(2)
  @ApiBearerAuth()
  @ApiOperation({ description: 'Actualizar un perfil de inversor' })
  @ApiResponse({
    status: 200,
    description: 'Perfil de inversor actualizado correctamente.',
  })
  @ApiResponse({
    status: 400,
    description: 'Error al actualizar el perfil de inversor.',
  })
  @ApiResponse({
    status: 500,
    description: 'Error al actualizar el perfil de inversor.',
  })
  async update(
    @Param('id') id: number,
    @Body() updatePerfilInversorDto: UpdatePerfilInversorDto,
  ): Promise<ResponseDTO> {
    return await this.perfilInversorService.update(id, updatePerfilInversorDto);
  }
}
