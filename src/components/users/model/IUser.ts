import { Document } from "mongoose";

export default interface IUser extends Document {
  first_name: string;
  last_name: string;
  email: string;
  mobile: string;
  addresses: [object];
  total_orders: number;
  wallet: number;
  created_at: Date;
}
