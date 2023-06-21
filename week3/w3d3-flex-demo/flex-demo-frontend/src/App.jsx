import React, { useState, useEffect } from "react";
import axios from "axios";
import CarDetail from "./Components/CarDetail/CarDetail";
import "./App.css";

const App = () => {
  const [cars, setCars] = useState([]);
  const [newCar, setNewCar] = useState({
    brand: "",
    model: "",
    year: "",
  });
  const [selectedCarId, setSelectedCarId] = useState(null);
  const [showCarDetails, setShowCarDetails] = useState(false);

  useEffect(() => {
    fetchCars();
  }, []);

  const fetchCars = async () => {
    try {
      const response = await axios.get("http://localhost:3000/api/cars");
      setCars(response.data);
    } catch (error) {
      console.error("Error fetching cars:", error);
    }
  };

  const addCar = async () => {
    try {
      const response = await axios.post(
        "http://localhost:3000/api/cars",
        newCar
      );
      setCars([...cars, response.data]);
      setNewCar({ brand: "", model: "", year: "" });
    } catch (error) {
      console.error("Error adding car:", error);
    }
  };

  const updateCar = async (carId) => {
    try {
      const response = await axios.put(
        `http://localhost:3000/api/cars/${carId}`,
        newCar
      );
      const updatedCars = cars.map((car) =>
        car.id === carId ? response.data : car
      );
      setCars(updatedCars);
      setNewCar({ ...newCar, brand: "", model: "", year: "" });
    } catch (error) {
      console.error("Error updating car:", error);
    }
  };

  const deleteCar = async (carId) => {
    try {
      await axios.delete(`http://localhost:3000/api/cars/${carId}`);
      const updatedCars = cars.filter((car) => car.id !== carId);
      setCars(updatedCars);
    } catch (error) {
      console.error("Error deleting car:", error);
    }
  };

  const handleInputChange = (e) => {
    setNewCar({
      ...newCar,
      [e.target.name]: e.target.value,
    });
  };

  const handleCarSelection = (carId) => {
    setSelectedCarId(carId);
    setShowCarDetails(false); // Reset the showCarDetails state when a car is selected
  };

  const handleViewCarDetails = (carId) => {
    setSelectedCarId(carId);
    setShowCarDetails(true);
  };

  return (
    <div className="app">
      <h2>Car List</h2>
      <ul className="car-list">
        {cars.map((car) => (
          <li key={car.id} className="car-item">
            <div>
              <span className="car-brand">{car.brand}</span> {car.model} (
              {car.year})
            </div>
            <div>
              <button className="btn-update" onClick={() => updateCar(car.id)}>
                Edit
              </button>
              <button
                className="btn-view"
                onClick={() => handleViewCarDetails(car.id)}
              >
                View
              </button>
              <button className="btn-delete" onClick={() => deleteCar(car.id)}>
                Delete
              </button>
            </div>
          </li>
        ))}
      </ul>

      <h2>Add New Car</h2>
      <div className="add-car-form">
        <div className="form-row">
          <label>Brand:</label>
          <input
            type="text"
            name="brand"
            value={newCar.brand}
            onChange={handleInputChange}
          />
        </div>
        <div className="form-row">
          <label>Model:</label>
          <input
            type="text"
            name="model"
            value={newCar.model}
            onChange={handleInputChange}
          />
        </div>
        <div className="form-row">
          <label>Year:</label>
          <input
            type="number"
            name="year"
            value={newCar.year}
            onChange={handleInputChange}
          />
        </div>
        <button className="btn-add" onClick={addCar}>
          Add Car
        </button>
      </div>

      <h2>Selected Car</h2>
      {selectedCarId && (
        <div className="car-details">
          {showCarDetails ? (
            <CarDetail carId={selectedCarId} />
          ) : (
            <p>No car details to display. Click "View" to see the details.</p>
          )}
        </div>
      )}
    </div>
  );
};

export default App;
