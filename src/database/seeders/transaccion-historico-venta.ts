import { DataSource } from 'typeorm';
import { TransaccionHistoricoVenta } from 'src/transaccion-historico-venta/entities/transaccion-historico-venta.entity';
import { CreateTransaccionHistoricoVentaDto } from 'src/transaccion-historico-venta/dto/create-transaccion-historico-venta.dto';

export const TransaccionHistoricoVentas: CreateTransaccionHistoricoVentaDto[] =
  [
    {
      fecha_operacion: '2025-08-26',
      id_instrumento: 1,
      precio_instrumento: 10000,
      dni_usuario: 26134695,
      cantidad_paquetes: 10,
      precio_paquete: 1000,
    },
    {
      fecha_operacion: '2025-07-10',
      id_instrumento: 2,
      precio_instrumento: 5000,
      dni_usuario: 37398970,
      cantidad_paquetes: 5,
      precio_paquete: 1000,
    },
    {
      fecha_operacion: '2026-09-14',
      id_instrumento: 6,
      precio_instrumento: 500000,
      dni_usuario: 52000000,
      cantidad_paquetes: 3,
      precio_paquete: 166666.66,
    },
    {
      fecha_operacion: '2025-12-23',
      id_instrumento: 3,
      precio_instrumento: 24000,
      dni_usuario: 36000000,
      cantidad_paquetes: 2,
      precio_paquete: 12000,
    },
  ];

export async function seedTransaccionHistoricoVenta(
  dataSource: DataSource,
): Promise<void> {
  const repo = dataSource.getRepository(TransaccionHistoricoVenta);

  console.log('Revisando Tabla de Transacciones Historico Venta...');
  const existDatos = await repo.count();
  if (existDatos > 0) {
    console.log('La tabla de Transacciones Historico Venta NO ESTA VACÍA.');
    return;
  }

  const data = TransaccionHistoricoVentas.map((item) => {
    return repo.create({
      ...item,
      id_instrumento: { id_instrumento: item.id_instrumento } as any,
      dni_usuario: { dni_usuario: item.dni_usuario } as any,
    });
  });

  await repo.save(data);

  console.log('Tabla de Transacciones Historico Venta Sembrada Correctamente.');
}
