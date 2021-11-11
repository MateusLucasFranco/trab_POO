import { Request, Response } from 'express'
import { SuppliersOrdersServices } from '../services/SuppliersOrdersServices'
import { StockServices } from '../services/StockServices'

class SuppliersOrdersController {

    async create(request: Request, response: Response) {
        let { supplier_id, product_id, amount, unitaryValue, dateOrder } = request.body
        const suppliersOrdersServices = new SuppliersOrdersServices()
        
        dateOrder = new Date(dateOrder)

        try {
        const suppliersOrders = await suppliersOrdersServices.create({ supplier_id, product_id, amount, unitaryValue, dateOrder})

        return response
                    .status(200)
                    .json(suppliersOrders)

        } catch(err:any) {
            return response
                    .status(400)
                    .json({message: err.message})
        }
        
    }

    async index (request: Request, response: Response) {
        const suppliersOrdersServices = new SuppliersOrdersServices();

        try {
            const suppliersOrders = await suppliersOrdersServices.index();
            return response
                        .json(suppliersOrders)

        } catch(err) {
            return response
                        .status(400)
                        .json({message: err.message})
        }
    }

    async show(request: Request, response: Response) {
        const suppliersOrdersServices = new SuppliersOrdersServices();
        const { id } = request.params;
        try {
            const suppliersOrders = await suppliersOrdersServices.show({ id });
            return response
                        .json(suppliersOrders)

        } catch(err) {
            return response
                        .status(400)
                        .json({message: err.message})
        }
    }

    async delete(request: Request, response: Response) {
        const suppliersOrdersServices = new SuppliersOrdersServices();
        const stockServices = new StockServices();
        const { id } = request.params;

        try {
            await suppliersOrdersServices.delete({id});
            await stockServices.delete({id});

            return response
                        .status(200)
                        .json({message: "Compra excluida !"})
        } catch(err) {
            return response
                        .status(400)
                        .json({message: err.message})
        }
    }

    async update(request: Request, response: Response) {
        let { supplier_id, product_id, amount, unitaryValue, dateOrder } = request.body;
        const { id } = request.params;
        const suppliersOrdersServices = new SuppliersOrdersServices();

        dateOrder = new Date(dateOrder)

        try {
            const suppliersOrders = await suppliersOrdersServices.update({ id, supplier_id, product_id, amount, unitaryValue, dateOrder });

            return response
                        .json(suppliersOrders);
        } catch(err) {
            return response.status(400).json({message: err.message})
        }
    }
}

export { SuppliersOrdersController }