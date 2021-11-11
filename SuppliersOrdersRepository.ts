import { EntityRepository, Repository } from 'typeorm'
import { SuppliersOrders } from '../entities/SuppliersOrders'

@EntityRepository(SuppliersOrders)
class SuppliersOrdersRepository extends Repository<SuppliersOrders> {

}

export { SuppliersOrdersRepository };