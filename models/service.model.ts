import { getModelForClass, modelOptions, prop } from '@typegoose/typegoose';

@modelOptions({ schemaOptions: { timestamps: true } })

export class Service {
  @prop({ required: true, trim: true })
  name!: string;

  @prop({ required: true })
  price!: number;
}

const ServiceModel = getModelForClass(Service);

export default ServiceModel