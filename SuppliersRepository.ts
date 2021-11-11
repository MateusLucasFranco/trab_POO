import { EntityRepository, Repository } from 'typeorm'
import { Supplier } from '../entities/Suppliers'

@EntityRepository(Supplier)
class SuppliersRepository extends Repository<Supplier> {
    
}

export { SuppliersRepository };