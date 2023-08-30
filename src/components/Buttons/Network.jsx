import React from "react";
import { NetworkSVG } from "../../utils/NetworkSVG";

export const Network = () => {
  return (
    <button
      type="button"
      className="inline-flex items-center justify-center px-4 py-2 text-base font-medium leading-6 text-black whitespace-no-wrap bg-[#cec8d1] border border-transparent shadow-sm hover:bg-[#cec8d1] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#cec8d1] btn grey"
    >
      <NetworkSVG />
      NETWORK
    </button>
  );
};