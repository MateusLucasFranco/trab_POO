import { Entity, PrimaryColumn, CreateDateColumn, Column, UpdateDateColumn, JoinColumn, ManyToOne } from 'typeorm'
import { v4 as uuid } from 'uuid'
import { Supplier } from './Suppliers'
import { Product } from './Product';

@Entity('suppliersOrders')
class SuppliersOrders {
    @PrimaryColumn()
    id: string;

    @JoinColumn({ name: 'supplier_id' })
    @ManyToOne( () => Supplier )
    supplier: Supplier;

    @Column()
    supplier_id: string;

    @JoinColumn({ name: 'product_id' })
    @ManyToOne( () => Product )
    product: Product;

    @Column()
    product_id: string;

    @Column()
    amount: number;

    @Column()
    unitaryValue: number;

    @Column()
    dateOrder: Date;

    @UpdateDateColumn()
    updated_at: Date;

    @CreateDateColumn()
    created_at: Date;

    constructor() {
        if (!this.id) {
            this.id = uuid();
        }
    }
}

export { SuppliersOrders }
