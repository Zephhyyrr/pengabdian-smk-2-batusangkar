import { Router } from 'express';
import { createBarangController, deleteBarangController, getAllBarangController, getBarangByIdController, updateBarangController } from '../controllers/barang.controller';
import { barangValidator } from '../validators/barang.validator';
import { handleValidationErrors } from '../middlewares/handle_validation_errors';

export const barangRouter = Router()

barangRouter.get('/', getAllBarangController)
barangRouter.get('/:id', getBarangByIdController)
barangRouter.post('/', barangValidator, handleValidationErrors, createBarangController)
barangRouter.put('/:id', barangValidator, handleValidationErrors, updateBarangController)
barangRouter.delete('/:id', deleteBarangController)

export default barangRouter