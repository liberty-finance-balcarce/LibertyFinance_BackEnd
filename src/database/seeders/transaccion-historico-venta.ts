import { DataSource } from 'typeorm';
import { TransaccionHistoricoVenta } from 'src/transaccion-historico-venta/entities/transaccion-historico-venta.entity';
import { CreateTransaccionHistoricoVentaDto } from 'src/transaccion-historico-venta/dto/create-transaccion-historico-venta.dto';

export const TransaccionHistoricoVentas: CreateTransaccionHistoricoVentaDto[] =
  [
    {
      fecha_operacion: '2025-08-28',
      id_instrumento: 1,
      precio_instrumento: 10000,
      dni_usuario: 26134695,
    },
    {
      fecha_operacion: '2025-07-12',
      id_instrumento: 2,
      precio_instrumento: 5000,
      dni_usuario: 35000000,
    },
    {
      fecha_operacion: '2026-09-16',
      id_instrumento: 6,
      precio_instrumento: 500000,
      dni_usuario: 52000000,
    },
    {
      fecha_operacion: '2025-12-25',
      id_instrumento: 3,
      precio_instrumento: 24000,
      dni_usuario: 36000000,
    },
  ];

export async function seedTransaccionHistoricoVenta(
  dataSource: DataSource,
): Promise<void> {
  const repo = dataSource.getRepository(TransaccionHistoricoVenta);

  console.info('Seeding Transaccion Historico Venta...');

  const data = TransaccionHistoricoVentas.map((item) => {
    return repo.create({
      ...item,
      id_instrumento: { id_instrumento: item.id_instrumento } as any,
      dni_usuario: { dni_usuario: item.dni_usuario } as any,
    });
  });

  await repo.save(data);

  console.info('Transaccion Historico Venta seed completado.');
}
