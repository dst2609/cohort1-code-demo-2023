import React, { useEffect, useState } from "react";
import axios from "axios";

const CarDetail = ({ carId }) => {
  const [car, setCar] = useState(null);

  useEffect(() => {
    fetchCar();
  }, [carId]);

  const fetchCar = async () => {
    try {
      const response = await axios.get(
        `http://localhost:3000/api/cars/${carId}`
      );
      setCar(response.data);
    } catch (error) {
      console.error("Error fetching car:", error);
    }
  };

  if (!car) {
    return <div>Loading car details...</div>;
  }

  return (
    <div>
      <h2>Car Details</h2>
      <p>Brand: {car.brand}</p>
      <p>Model: {car.model}</p>
      <p>Year: {car.year}</p>
    </div>
  );
};

export default CarDetail;
