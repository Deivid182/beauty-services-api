import { Request, Response } from 'express';
import { validateId } from '../helpers';
import ServiceModel from '../models/service.model';
import { ServiceType } from '../schemas/service.schema';

export const createService = async (req: Request<{}, {}, ServiceType>, res: Response) => {
  try {
    const service = new ServiceModel({
      name: req.body.name,
      price: req.body.price,
    });

    await service.save();

    res.status(201).json(service);


  } catch (error) {
    console.log(error, 'ERROR_CREATE_SERVICE');
    res.status(500).json({ message: 'Error creating service' });
  }
}

export const getServices = async (req: Request, res: Response) => {
  try {
    const services = await ServiceModel.find();

    res.status(200).json(services);
  } catch (error) {
    console.log(error, 'ERROR_GET_SERVICES');
    res.status(500).json({ message: 'Error getting services' });
  }
}

export const getService = async (req: Request, res: Response) => {
  try {
    
    if(!validateId(req.params.id)) {
      return res.status(400).json({ message: 'Invalid ID' });
    }

    const service = await ServiceModel.findById(req.params.id);

    if (!service) {
      return res.status(404).json({ message: 'Service not found' });
    }

    res.status(200).json(service);

  } catch (error) {
    console.log(error, 'ERROR_GET_SERVICE');
    res.status(500).json({ message: 'Error getting service' });
  }
}

export const updateService = async (req: Request, res: Response) => {
  try {
    
    if(!validateId(req.params.id)) {
      return res.status(400).json({ message: 'Invalid ID' });
    }

    const service = await ServiceModel.findById(req.params.id);

    if (!service) {
      return res.status(404).json({ message: 'Service not found' });
    }
    
    const updatedService = await ServiceModel.findByIdAndUpdate(req.params.id, req.body, { new: true });

    res.status(200).json(updatedService);


  } catch (error) {
    console.log(error, 'ERROR_UPDATE_SERVICE');
    res.status(500).json({ message: 'Error updating service' });
  }
}

export const deleteService = async (req: Request, res: Response) => {
  try {
    if(!validateId(req.params.id)) {
      return res.status(400).json({ message: 'Invalid ID' });
    }

    const service = await ServiceModel.findByIdAndDelete(req.params.id);

    if (!service) {
      return res.status(404).json({ message: 'Service not found' });
    }

    res.status(200).json({ message: 'Service deleted successfully' });

  } catch (error) {
    console.log(error, 'ERROR_DELETE_SERVICE');
    res.status(500).json({ message: 'Error deleting service' });
  }
}