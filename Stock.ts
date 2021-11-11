import { Entity, PrimaryColumn, CreateDateColumn, Column, UpdateDateColumn, JoinColumn, ManyToOne } from 'typeorm'
import { v4 as uuid } from 'uuid'
import { Product } from './Product';

@Entity('stock')
class Stock {
    @PrimaryColumn()
    id: string;

    @JoinColumn({ name: 'product_id' })
    @ManyToOne( () => Product )
    product: Product;

    @Column()
    product_id: string;

    @Column()
    amount: number;

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

export { Stock }