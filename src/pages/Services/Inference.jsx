import React, { useState } from "react";
import MyCard from "../../components/Card/MyCard.jsx";

import Fraud from "../../assets/fraud.jpeg";

//TODO: BBDD
const data = [
  {
    name: "Fraud Prevention",
    image: Fraud,
    description: "description",
    price: 10,
    currency: "PK",
    total_inference: 10,
    projectId: 1,
  },
  {
    name: "Fraud Prevention",
    image: Fraud,
    description: "description",
    price: 100,
    currency: "PK",
    total_inference: 10,
    projectId: 2,
  },
];
//TODO: Que cargue cuando se realizan las llamadas

export default function Inference() {
  return (
    <>
      <div className="container mx-auto">
        <h2 className="text-xl text-white sm:text-4xl md:text-2xl lg:text-3xl xl:text-4xl  mt-6">
          <span className="block xl:inline">INFERENCE MODELS</span>
        </h2>
        <div className="flex items-center justify-center w-full h-full py-24 sm:py-8 px-4">
          {data.map((item, index) => (
            <MyCard item={item} key={item} />
          ))}
        </div>
      </div>
    </>
  );
}
