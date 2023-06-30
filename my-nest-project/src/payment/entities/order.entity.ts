import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { HydratedDocument } from 'mongoose';

export type OrderDocument = HydratedDocument<OrderEntity>;
export type OrderStatus = 'CREATED' | 'APPROVED' | 'COMPLETED';

@Schema({ collection: 'Order' })
export class OrderEntity {
  @Prop({ type: mongoose.Schema.Types.ObjectId })
  id: string;

  @Prop({ type: String, required: true })
  orderId: string;

  @Prop({ type: String, default: 'CREATED' })
  status: OrderStatus;

  @Prop({ type: String, required: true })
  referenceId: string; // referenced id to the cart
}

export const OrderSchema = SchemaFactory.createForClass(OrderEntity);