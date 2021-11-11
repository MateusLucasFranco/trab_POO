import { getCustomRepository} from 'typeorm'
import { SuppliersRepository } from '../repositories/SuppliersRepository'

interface ISuppliersCreate {
    name_supplier: string;
    email: string;
}


class SuppliersServices {

    async create({name_supplier, email}: ISuppliersCreate) {

        const suppliersRepository = getCustomRepository(SuppliersRepository)

        const emailAlreadyExist = await suppliersRepository.findOne({ email })

        if (emailAlreadyExist) {
            throw new Error('Email já existente.')
        }

        const suppliers = suppliersRepository.create ({
            name_supplier,
            email,
        })

        await suppliersRepository.save(suppliers)

        return suppliers
    }

    async index() {

        const suppliersRepository = getCustomRepository(SuppliersRepository);
        const suppliers = await suppliersRepository.find();
        return suppliers

    }

}

export { SuppliersServices }