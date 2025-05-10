import{ Router } from 'express';
import { createBarangController, deleteBarangController, getAllBarangController, getBarangByIdController, updateBarangController } from '../controllers/barang.controller';

export const barangRouter = Router()

barangRouter.get('/', getAllBarangController)
barangRouter.get('/:id', getBarangByIdController)
barangRouter.post('/', createBarangController)
barangRouter.put('/:id', updateBarangController)
barangRouter.delete('/:id', deleteBarangController)

export default barangRouter