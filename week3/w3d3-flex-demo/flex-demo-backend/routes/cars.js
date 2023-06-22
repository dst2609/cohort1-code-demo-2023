// backend/routes/cars.js
const express = require("express");
const router = express.Router();
const carModel = require("../models/car");

//home route - display all cars - get all cars
router.get("/", (req, res) => {
  const cars = carModel.getAllCars();
  res.json(cars);
});

// //route to get car by id
// router.get("/:id", (req, res) => {
//   const { id } = req.params;
//   const car = carModel.getCarById(parseInt(id));
//   if (!car) {
//     return res.status(404).json({ message: "Car not found" });
//   }
//   res.json(car);
// });

// //route to add new car
// router.post("/", (req, res) => {
//   const { brand, model, year } = req.body;
//   const newCar = carModel.addCar({ brand, model, year });
//   res.status(201).json(newCar);
// });

//Error handling in routes
router.get("/:id", (req, res) => {
  try {
    const { id } = req.params;
    const car = carModel.getCarById(parseInt(id));
    if (!car) {
      return res
        .status(404)
        .json({ message: "Car not found in the Cars array" });
    }
    res.json(car);
  } catch (error) {
    res.status(500).json({ message: "Server Error" });
  }
});

// Create a new car
router.post("/", (req, res) => {
  try {
    const { brand, model, year } = req.body;
    if (!brand || !model || !year) {
      return res
        .status(400)
        .json({ message: "Please provide brand, model, and year" });
    }
    const newCar = carModel.addCar({ brand, model, year });
    res.status(201).json(newCar);
  } catch (error) {
    res.status(500).json({ message: "Server Error" });
  }
});

//

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
