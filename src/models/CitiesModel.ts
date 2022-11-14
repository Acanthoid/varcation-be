import mongoose, { Document, Schema } from "mongoose";

export interface ICity {
  name: String;
}

export interface ICityModel extends ICity, Document {}
const CitySchema: Schema = new Schema(
  {
    name: { type: String, required: true },
  },
  {
    versionKey: false,
  }
);

export default mongoose.model<ICityModel>("City", CitySchema);
