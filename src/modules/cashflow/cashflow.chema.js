import mongoose from "mongoose";
const { Schema } = mongoose;

const cashflowSchema = new Schema({
  date: {
    type: Date,
    required: true,
    default: Date.now,
  },
  user: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: false,
  },
  revenue: {
    type: Number,
    required: true,
  },
  cash: {
    type: Number,
    required: true,
  },
  money: {
    type: Number,
    required: true,
  },
  expenses: {
    type: Number,
    required: false,
    default: 0,
  },
  total: {
    type: Number,
    required: true,
    default: Number,
  },
});

const Cashflow = mongoose.model("Cashflow", cashflowSchema);
export default Cashflow;
