// backend/routes/cars.js
const express = require("express");
const router = express.Router();
const carModel = require("../models/car");

//home route - display all cars - get all cars
router.get("/", (req, res) => {
  const cars = carModel.getAllCars();
  res.json(cars);
});

//route to get car by id
router.get("/:id", (req, res) => {
  const { id } = req.params;
  const car = carModel.getCarById(parseInt(id));
  if (!car) {
    return res.status(404).json({ message: "Car not found" });
  }
  res.json(car);
});

//route to add new car
router.post("/", (req, res) => {
  const { brand, model, year } = req.body;
  const newCar = carModel.addCar({ brand, model, year });
  res.status(201).json(newCar);
});

//route to update car
router.put("/:id", (req, res) => {
  const { id } = req.params;
  const { brand, model, year } = req.body;
  const updatedCar = carModel.updateCar(parseInt(id), { brand, model, year });
  if (!updatedCar) {
    return res.status(404).json({ message: "Car not found" });
  }
  res.json(updatedCar);
});

//route to delete car by id
router.delete("/:id", (req, res) => {
  const { id } = req.params;
  const deletedCar = carModel.deleteCar(parseInt(id));
  if (!deletedCar) {
    return res.status(404).json({ message: "Car not found" });
  }
  res.json(deletedCar);
});

//export
module.exports = router;
