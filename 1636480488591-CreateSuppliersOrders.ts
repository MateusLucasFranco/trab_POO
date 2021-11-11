import { Query } from 'typeorm/driver/Query'
import {MigrationInterface, QueryRunner, Table} from "typeorm";

export class CreateSuppliersOrders1636480488591 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(
            new Table({
                name: "suppliersOrders",
                columns: [
                    {
                        name: "id",
                        type: "uuid",
                        isPrimary: true,
                    },
                    {
                        name: "product_id",
                        type: "uuid",
                        isNullable: true
                    },
                    {
                        name: "supplier_id",
                        type: "uuid",
                        isNullable: true,
                    },
                    {
                        name: "amount",
                        type: "number",
                    },
                    {
                        name: "unitaryValue",
                        type: "number",
                    },
                    {
                        name: "dateOrder",
                        type: "Date",
                    },
                    {
                        name: "updated_at",
                        type: "timestamp",
                        default: "now()",
                    },
                    {
                        name: "created_at",
                        type: "timestamp",
                        default: "now()"
                    }
                ],
                foreignKeys: [
                    {
                        name: 'FKSupplier',
                        referencedTableName: 'suppliers',
                        referencedColumnNames: ['id'],
                        columnNames: ['supplier_id'],
                        onDelete: 'SET NULL', //CASCADE - exclui
                        onUpdate: 'SET NULL', //CASCADE - exclui
                    },
                    {
                        name: 'FKProduct',
                        referencedTableName: 'products',
                        referencedColumnNames: ['id'],
                        columnNames: ['product_id'],
                        onDelete: 'SET NULL', //CASCADE - exclui
                        onUpdate: 'SET NULL', //CASCADE - exclui
                    },
                ]
            })
        )
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable('suppliersOrders')
    }

}