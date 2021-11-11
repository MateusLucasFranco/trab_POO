import { Request, Response } from 'express'
import { StockServices } from '../services/StockServices'

class StockController {

    async create(request: Request, response: Response) {
        const {product_id, amount} = request.body
        const stockServices = new StockServices()

        try {
            const stock = await stockServices.create({product_id, amount});
            return response
                        .json(stock);
        } catch(err) {
            return response
                        .status(400)
                        .json({message: err.message})
        }
    }

    async index(request: Request, response: Response) {
        const stockServices = new StockServices();

        try {
            const stock = await stockServices.index();
            return response
                        .json(stock)

        } catch(err) {
            return response
                        .status(400)
                        .json({message: err.message})
        }
    }

    async delete(request: Request, response: Response) {
        const stockServices = new StockServices();
        const { id } = request.params;

        try {
            await stockServices.delete({id});

            return response
                        .status(200)
                        .json({message: "Estoque excluido !"})
        } catch(err) {
            return response
                        .status(400)
                        .json({message: err.message})
        }
    }
}

export { StockController }