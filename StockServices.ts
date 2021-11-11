import {  StockRepository } from '../repositories/StockRepository'
import { getCustomRepository} from 'typeorm'
import { Stock } from '../entities/Stock'

interface IDeleteID {
    id: string;
}

interface ICreateStock {
    product_id: string;
    amount: number;
}

class StockServices {

    async create({product_id, amount, }: ICreateStock){
        const stockServicesRepository = getCustomRepository(StockRepository);

        const stock = stockServicesRepository.create({
            product_id,
            amount,
        })

        await stockServicesRepository.save(stock)

        return stock
    }

    async index() {

        const stockRepository = getCustomRepository(StockRepository);
        const stock = await stockRepository.find({
            relations: ['product']
        });
        return stock

    }

    async delete({id }: IDeleteID) {

        const stockRepository = getCustomRepository(StockRepository);

        let stock = await stockRepository.findOne({ id })

        if(!stock) {
            throw new Error('Nenhum produto foi encontrado no estoque')
        }

        return await stockRepository.delete({ id })
    }
}

export { StockServices }