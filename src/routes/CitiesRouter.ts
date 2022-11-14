import express from "express";
import controller from "../controllers/CitiesController";

const router = express.Router();

router.post("/create", controller.createCities);
router.get("/get/:cityId", controller.readCity);
router.get("/get", controller.readAllCities);
router.patch("/update/:cityId", controller.updateCity);
router.delete("/delete/:cityId", controller.deleteCity);

export default router;
