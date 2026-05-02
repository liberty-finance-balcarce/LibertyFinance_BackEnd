import { DataSource } from "typeorm";
import { DeepPartial } from "typeorm";
import { TransaccionHistoricoCompra } from "src/transaccion-historico-compra/entities/transaccion-historico-compra.entity";


export const TransaccionesHistoricoCompra: DeepPartial<TransaccionHistoricoCompra>[] = [
    {
        fecha_operacion: '2025-08-26',
        id_instrumento: {id_instrumento: 1} ,
        precio_instrumento: 10000,
        dni_usuario: {dni_usuario: 12345678},
    },
    {
        fecha_operacion: '2025-07-10',
        id_instrumento: {id_instrumento: 2},
        precio_instrumento: 5000,
        dni_usuario: {dni_usuario: 87654321},
    },
    {
        fecha_operacion: '2026-09-14',
        id_instrumento: {id_instrumento: 6},
        precio_instrumento: 500000,
        dni_usuario: {dni_usuario: 87658951},
    },
    {
        fecha_operacion: '2025-12-23',
        id_instrumento: {id_instrumento: 3},
        precio_instrumento: 24000,
        dni_usuario: {dni_usuario: 63554321},
    }
];

export async function seedTransaccionHistoricoCompra(dataSource: DataSource): Promise<void> {
    const repository = dataSource.getRepository(TransaccionHistoricoCompra);

    console.info('Seeding transacción historico compra...');

    await dataSource.query('SET FOREIGN_KEY_CHECKS = 0;');
    await dataSource.query('TRUNCATE TABLE transaccion_historico_compra;');
    await dataSource.query('SET FOREIGN_KEY_CHECKS = 1;');
    
    const data = repository.create(TransaccionesHistoricoCompra);
    await repository.save(data);

    console.info('Transacción historico compra seed completado.');
}