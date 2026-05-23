import { DataSource } from 'typeorm';
import { TransaccionHistoricoVenta } from 'src/transaccion-historico-venta/entities/transaccion-historico-venta.entity';
import { CreateTransaccionHistoricoVentaDto } from 'src/transaccion-historico-venta/dto/create-transaccion-historico-venta.dto';

export const TransaccionHistoricoVentas: CreateTransaccionHistoricoVentaDto[] =
  [
    {
      fecha_operacion: '2026-05-10',
      id_instrumento: 1,
      precio_instrumento: 100,
      dni_usuario: 12345678,
    },
    {
      fecha_operacion: '2022-01-02',
      id_instrumento: 2,
      precio_instrumento: 200,
      dni_usuario: 12345679,
    },
  ];

export async function seedTransaccionHistoricoVenta(
  dataSource: DataSource,
): Promise<void> {
  const repo = dataSource.getRepository(TransaccionHistoricoVenta);

  console.info('Seeding Transaccion Historico Venta...');

  await dataSource.query('SET FOREIGN_KEY_CHECKS = 0');
  await dataSource.query('TRUNCATE TABLE transaccion_historico_venta');
  await dataSource.query('SET FOREIGN_KEY_CHECKS = 1');

  const data = repo.create(TransaccionHistoricoVentas);
  await repo.save(data);

  console.info('Transaccion Historico Venta seed completado.');
}
