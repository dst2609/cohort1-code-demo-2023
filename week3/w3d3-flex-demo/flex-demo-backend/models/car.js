// backend/models/car.js
let cars = [
  { id: 1, brand: "Tesla", model: "Model S Plaid", year: 2023 },
  { id: 2, brand: "BMW", model: "M8 Competition", year: 2021 },
  { id: 3, brand: "Acura", model: "Integra", year: 2000 },
];

//Get all cars
const getAllCars = () => {
  return cars;
};

//Get car by ID
const getCarById = (id) => {
  return cars.find((car) => car.id === id);
};

//Add a new car
const addCar = (car) => {
  const newCar = { id: cars.length + 1, ...car };
  cars.push(newCar);
  return newCar;
};

//Update existing car
const updateCar = (id, updatedCar) => {
  const carIndex = cars.findIndex((car) => car.id === id);
  if (carIndex === -1) {
    return null;
  }
  const updated = { id, ...updatedCar };
  cars[carIndex] = updated;
  return updated;
};

//Delete Car
const deleteCar = (id) => {
  const carIndex = cars.findIndex((car) => car.id === id);
  if (carIndex === -1) {
    return null;
  }
  const deletedCar = cars[carIndex];
  cars.splice(carIndex, 1);
  return deletedCar;
};

//export
module.exports = {
  getAllCars,
  getCarById,
  addCar,
  updateCar,
  deleteCar,
};
