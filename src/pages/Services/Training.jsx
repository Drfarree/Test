import React, { useState } from "react";
import MyCard from "../../components/Card/MyCard.jsx";

import Fraud from "../../assets/fraud.jpeg";


const data = [
  {
    name: "Fraud Prevention",
    image: Fraud,
    description: "description",
    price: 0.0065,
    currency: "BTC"
  }
];

export default function Training() {
  return (
    <>
      <div className="container mx-auto">
        <div className="flex items-center justify-center w-full h-full py-24 sm:py-8 px-4">
          {data.map((item, index) => (
            <MyCard item={item} key={item} />
          ))}
        </div>
      </div>
    </>
  );
}
