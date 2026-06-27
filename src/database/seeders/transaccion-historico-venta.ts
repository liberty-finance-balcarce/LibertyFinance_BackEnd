import { DataSource } from 'typeorm';
import { TransaccionHistoricoVenta } from 'src/transaccion-historico-venta/entities/transaccion-historico-venta.entity';
import { CreateTransaccionHistoricoVentaDto } from 'src/transaccion-historico-venta/dto/create-transaccion-historico-venta.dto';

export const TransaccionHistoricoVentas: CreateTransaccionHistoricoVentaDto[] =
  [
    {
      fecha_operacion: '2025-12-31',
      id_instrumento: 7,
      precio_instrumento: 68000,
      dni_usuario: 40000000,
      cantidad_paquetes: 1,
      precio_paquete: 100,
      cantidad_instrumento_vendido:0.00147058,
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
