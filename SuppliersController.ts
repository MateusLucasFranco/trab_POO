import { Request, Response } from 'express'
import { SuppliersServices } from '../services/SuppliersServices'

class SuppliersController {

    async create(request: Request, response: Response) {
        const {name_supplier, email} = request.body
        const suppliersServices = new SuppliersServices()

        try {
            const suppliers = await suppliersServices.create({name_supplier, email});
            return response
                        .json(suppliers);
        } catch(err) {
            return response
                        .status(400)
                        .json({message: err.message})
        }
    }

    async index(request: Request, response: Response) {
        const suppliersServices = new SuppliersServices();

        try {
            const suppliers = await suppliersServices.index();
            return response
                        .json(suppliers)

        } catch(err) {
            return response
                        .status(400)
                        .json({message: err.message})
        }
    }
}

export { SuppliersController }