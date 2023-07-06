import React, { useState, useEffect } from "react";
import axios from "axios";
import "./NewCars.css";

const NewCars = () => {
  const [newCar, setNewCar] = useState({ brand: "", model: "", year: "" });
  const [existingCars, setExistingCars] = useState([]);

  const fetchExistingCars = async () => {
    try {
      const randomValue = Math.random(); // Generate a random value

      //advanced- optional [cache]
      //using cacheBust is advanced topic- its optional
      const response = await axios.get(
        `http://localhost:3001/api/cars?_cacheBust=${randomValue}`
      );
      const newCarsData = response.data.filter((car) => car.is_new);
      setExistingCars(newCarsData);
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewCar((prevCar) => ({ ...prevCar, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("http://localhost:3001/api/cars", {
        ...newCar,
        is_new: true,
      });
      setNewCar({ brand: "", model: "", year: "" });
      fetchExistingCars();
    } catch (error) {
      console.error("Error:", error);
    }
  };

  useEffect(() => {
    fetchExistingCars();
  }, []);

  return (
    <div className="new-cars-container">
      <h1 className="title">New Cars</h1>
      <h2 className="subtitle">Add New Car</h2>
      <form onSubmit={handleSubmit} className="form">
        <div className="form-group">
          <label className="label">Brand:</label>
          <input
            type="text"
            name="brand"
            value={newCar.brand}
            onChange={handleInputChange}
            className="input"
            required
          />
        </div>
        <div className="form-group">
          <label className="label">Model:</label>
          <input
            type="text"
            name="model"
            value={newCar.model}
            onChange={handleInputChange}
            className="input"
            required
          />
        </div>
        <div className="form-group">
          <label className="label">Year:</label>
          <input
            type="text"
            name="year"
            value={newCar.year}
            onChange={handleInputChange}
            className="input"
            required
          />
        </div>
        <button type="submit" className="button">
          Add New Car
        </button>
      </form>

      <h2 className="subtitle">Existing Cars</h2>
      <ul className="car-list">
        {existingCars.map((car) => (
          <li key={car.id} className="car-item">
            {car.brand} {car.model} ({car.year})
          </li>
        ))}
      </ul>
    </div>
  );
};

export default NewCars;
