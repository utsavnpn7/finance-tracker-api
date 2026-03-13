import mongoose, { Document, Schema } from "mongoose";
enum TransactionType {
  Income = "income",
  Expense = "expense",
}
export interface ITransaction extends Document {
  serviceName: string;
  transactionType: TransactionType;
  userId: mongoose.Types.ObjectId;
  ammount: number;
}
const TransactionSchema: Schema = new Schema(
  {
    serviceName: { type: String, required: true, trim: true },
    transactionType: {
      type: String,
      enum: Object.values(TransactionType),
      required: true,
    },
    userId: { type: Schema.Types.ObjectId, ref: "User", required: true },
    ammount: { type: Number, required: true, min: 0 },
  },
  {
    timestamps: true,
  },
);
export default mongoose.model<ITransaction>("Transaction", TransactionSchema);
