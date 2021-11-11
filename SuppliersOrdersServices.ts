import {  SuppliersOrdersRepository } from '../repositories/SuppliersOrdersRepository'
import { getCustomRepository} from 'typeorm'
import { SuppliersOrders } from '../entities/SuppliersOrders'

interface ICreateSuppliersOrders {
    supplier_id: string;
    product_id: string;
    amount: number;
    unitaryValue: number;
    dateOrder: Date;
}

interface ISuppliersOrdersID {
    id: string;
}

interface ISuppliersOrdersUpdate {
    id: string;
    supplier_id: string;
    product_id: string;
    amount: number;
    unitaryValue: number;
    dateOrder: Date;
}

class SuppliersOrdersServices {

    async create({supplier_id, product_id, amount, unitaryValue, dateOrder}: ICreateSuppliersOrders){
        const suppliersOrdersServicesRepository = getCustomRepository(SuppliersOrdersRepository);

        const suppliersOrders = suppliersOrdersServicesRepository.create({
            supplier_id,
            product_id,
            amount,
            unitaryValue,
            dateOrder,
        })

        await suppliersOrdersServicesRepository.save(suppliersOrders)

        return suppliersOrders
    }

    async index() {

        const suppliersOrdersRepository = getCustomRepository(SuppliersOrdersRepository);
        const suppliersOrders = await suppliersOrdersRepository.find({
            relations: ['supplier', 'product']
        });
        return suppliersOrders

    }

    async show({ id }: ISuppliersOrdersID) {

        const suppliersOrdersRepository = getCustomRepository(SuppliersOrdersRepository);
        const suppliersOrders = await suppliersOrdersRepository.findOne(
            { id },
            { relations: ['supplier', 'product'] })

        if(!suppliersOrders) {
            throw new Error('Pedido de compra não encontrado')
        }
        return suppliersOrders
    }

    async delete({id }: ISuppliersOrdersID) {

        const suppliersOrdersRepository = getCustomRepository(SuppliersOrdersRepository);  //Utilizado para ter acesso aos comandos da tabela, add, delete, edit, etc.

        let suppliersOrders = await suppliersOrdersRepository.findOne({ id })

        if(!suppliersOrders) {
            throw new Error('Nenhuma compra com fornecedor foi encontrado.')
        }

        return await suppliersOrdersRepository.delete({ id })
    }

    async update({ id, supplier_id, product_id, amount, unitaryValue, dateOrder}: ISuppliersOrdersUpdate) {
        const suppliersOrdersRepository = getCustomRepository(SuppliersOrdersRepository);

        let suppliersOrders = await suppliersOrdersRepository.findOne({ id })
        
        if(!suppliersOrders) {
            throw new Error('Nenhuma compra encontrada com este ID.')
        }

        await suppliersOrdersRepository.update(id, {
            supplier_id,
            product_id,
            amount,
            unitaryValue,
            dateOrder,
        })

        suppliersOrders = await suppliersOrdersRepository.findOne(
            { id },
            { relations: ['supplier', 'product']})

        return suppliersOrders

    }
}

export { SuppliersOrdersServices }