import { DataSource } from 'typeorm';
import { CreateTransaccionHistoricoCompraDto } from 'src/transaccion-historico-compra/dto/create-transaccion-historico-compra.dto';
import { TransaccionHistoricoCompra } from 'src/transaccion-historico-compra/entities/transaccion-historico-compra.entity';

export const TransaccionesHistoricoCompra: CreateTransaccionHistoricoCompraDto[] =
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
      dni_usuario: 35000000,
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

export async function seedTransaccionHistoricoCompra(
  dataSource: DataSource,
): Promise<void> {
  const repository = dataSource.getRepository(TransaccionHistoricoCompra);

  console.info('Seeding transacción historico compra...');

  const data = TransaccionesHistoricoCompra.map((item) => {
    return repository.create({
      ...item,
      id_instrumento: { id_instrumento: item.id_instrumento } as any,
      dni_usuario: { dni_usuario: item.dni_usuario } as any,
    });
  });

  await repository.save(data);

  console.info('Transacción historico compra seed completado.');
}
