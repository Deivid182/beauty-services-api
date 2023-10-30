import { Router } from 'express';
import { createService, deleteService, getService, getServices, updateService } from '../controllers/service.controller';
import { validateSchema } from '../middleware/validate.schema';
import { serviceSchema, updateSchema } from '../schemas/service.schema';

const servicesRouter = Router();

servicesRouter.get('/', getServices);

servicesRouter.post('/', validateSchema(serviceSchema), createService);

servicesRouter.get('/:id', getService);

servicesRouter.patch('/:id', validateSchema(updateSchema), updateService);

servicesRouter.delete('/:id', deleteService);

export default servicesRouter