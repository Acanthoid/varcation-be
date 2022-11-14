import { NextFunction, Request, Response } from "express";
import mongoose from "mongoose";
import CitiesModel from "../models/CitiesModel";

const createCities = (req: Request, res: Response, next: NextFunction) => {
  const { name } = req.body;
  const cities = new CitiesModel({
    id: new mongoose.Types.ObjectId(),
    name,
  });

  return cities
    .save()
    .then((cities) => {
      res.status(201).json({ cities });
    })
    .catch((error) => {
      res.status(500).json({ error });
    });
};

const readCity = (req: Request, res: Response, next: NextFunction) => {
  const cityId = req.params.cityId;
  return CitiesModel.findById(cityId)
    .then((city) =>
      city
        ? res.status(200).json({ city })
        : res.status(404).json({
            message: "Not Found",
          })
    )
    .catch((error) => {
      res.status(500).json({ error });
    });
};
const readAllCities = (req: Request, res: Response, next: NextFunction) => {
  return CitiesModel.find()
    .then((cities) => res.status(200).json({ cities }))
    .catch((error) => {
      res.status(500).json({ error });
    });
};

const updateCity = (req: Request, res: Response, next: NextFunction) => {
  const cityId = req.params.cityId;
  return CitiesModel.findById(cityId)
    .then((city) => {
      if (city) {
        city.set(req.body);
        return city
          .save()
          .then((city) => {
            res.status(201).json({ city });
          })
          .catch((error) => {
            res.status(500).json({ error });
          });
      } else {
        res.status(404).json({
          message: "Not Found",
        });
      }
    })
    .catch((error) => {
      res.status(500).json({ error });
    });
};
const deleteCity = (req: Request, res: Response, next: NextFunction) => {
  const cityId = req.params.cityId;
  return CitiesModel.findByIdAndDelete(cityId)
    .then((city) => {
      city
        ? res.status(201).json({ message: "deleted" })
        : res.status(404).json({ message: "Not Found" });
    })
    .catch((error) => {
      res.status(500).json({ error });
    });
};
export default {
  createCities,
  readCity,
  readAllCities,
  updateCity,
  deleteCity,
};
