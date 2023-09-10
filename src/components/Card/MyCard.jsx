import React, { useState } from "react";
import { depositNodeManager } from "../../utils/WalletUtils";

export default function MyCard({ item }) {
  const { price, currency, image, name, description } = item;
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSucess] = useState(null);

  const handleBuy = () => {
    depositNodeManager(price).then(() => {

    }).catch(() => {

    })
  }

  return (
    <div className="flex items-center justify-center">
      <div className="w-full p-4">
        <div
          className="flex flex-col justify-center p-2 bg-white rounded-lg shadow-2xl card"
          style={{ width: 390, height: 'fit-content' }}
        >
          <div className="prod-img">
            <img
              src={image}
              className="object-cover object-center m-auto rounded-lg"
            //   width={200}
            //   height={200}
            />
          </div>
          <div className="prod-title">
            <p className="text-2xl font-bold text-gray-900 uppercase">{name}</p>
            {/* <p className="text-sm text-gray-400 uppercase">{description}</p> */}
          </div>
          <div className="grid gap-10 prod-info">
            <div className="flex flex-col items-center justify-between text-gray-900 md:flex-row pt-5">
              <p className="text-xl font-bold">
                {price} {currency}
              </p>
              {/* <ButtonServiceRedirect textButton="Buy Now" hasArrow={false}/> */}

              <button className="inline-block items-center w-full px-6 py-3 mb-3 text-lg border-2 border-gray-200 rounded-full sm:mb-0 hover:bg-[#ffff00]  sm:w-auto text-gray-400 duration-200 hover:bg-opacity-50 hover:border-gray-400 hover:text-gray-500 bg-gray-100" onClick={handleBuy}>
                Buy Now
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
