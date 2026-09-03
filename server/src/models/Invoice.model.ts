import mongoose, { Schema } from 'mongoose';
import { IInvoiceDocument } from '../types/models.types';

const invoiceSchema = new Schema<IInvoiceDocument>(
  {
    organizationId: {
      type: Schema.Types.ObjectId,
      ref: 'Organization',
      required: true,
      index: true,
    },
    stripeInvoiceId: {
      type: String,
      index: true,
    },
    amount: {
      type: Number,
      required: true,
    },
    currency: {
      type: String,
      default: 'usd',
    },
    status: {
      type: String,
      enum: ['paid', 'open', 'void', 'uncollectible'],
      default: 'paid',
    },
    paidAt: {
      type: Date,
    },
    pdfUrl: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);

export const Invoice = mongoose.model<IInvoiceDocument>('Invoice', invoiceSchema);
