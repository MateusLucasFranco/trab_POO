import { Query } from 'typeorm/driver/Query'
import {MigrationInterface, QueryRunner, Table} from "typeorm";


export class CreateStock1636499431317 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(
            new Table({
                name: "stock",
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
                        name: "amount",
                        type: "number",
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
        await queryRunner.dropTable('stock')

    }

}
