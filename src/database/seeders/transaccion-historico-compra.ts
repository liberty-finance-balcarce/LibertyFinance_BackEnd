import { DataSource } from 'typeorm';
import { CreateTransaccionHistoricoCompraDto } from 'src/transaccion-historico-compra/dto/create-transaccion-historico-compra.dto';
import { TransaccionHistoricoCompra } from 'src/transaccion-historico-compra/entities/transaccion-historico-compra.entity';

export const TransaccionesHistoricoCompra: CreateTransaccionHistoricoCompraDto[] =
  [
    {
      fecha_operacion: '2025-08-26',
      id_instrumento: 7,
      precio_instrumento: 65000,       
      dni_usuario: 40000000,
      cantidad_paquetes: 2,
      precio_paquete: 100,
      cantidad_instrumento_comprado:0.00307692,      

    },
    {
      fecha_operacion: '2025-07-10',
      id_instrumento: 8,
      precio_instrumento: 2000,      
      dni_usuario: 40000000,
      cantidad_paquetes: 3,
      precio_paquete: 100,
      cantidad_instrumento_comprado:0.15,
    },
    {
      fecha_operacion: '2025-08-29',
      id_instrumento: 7,
      precio_instrumento: 59000,    
      dni_usuario: 40000000,
      cantidad_paquetes: 4,
      precio_paquete: 100,
      cantidad_instrumento_comprado:0.006779661,
    },
    {
      fecha_operacion: '2025-12-23',
      id_instrumento: 8,
      precio_instrumento: 1600,   
      dni_usuario: 40000000,
      cantidad_paquetes: 2,
      precio_paquete: 100,
      cantidad_instrumento_comprado:0.125,      
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
