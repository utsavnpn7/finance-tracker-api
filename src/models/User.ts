import mongoose, { Document, Schema } from "mongoose";
//MongoDB schema for User

export interface IUser extends Document {
  //extends document in order to define IUser as Document which will later help to access types.objectId
  name: string;
  email: string;
  password: string;
}

const UserSchema: Schema = new Schema(
  {
    name: { type: String, required: true, trim: true },
    email: { type: String, required: true, unique: true, lowercase: true },
    password: { type: String, required: true, minlength: 6 },
  },
  {
    timestamps: true, //mongo time stamp enabled
  },
);

export default mongoose.model<IUser>("User", UserSchema);
