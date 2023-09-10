import React, { useEffect, useState } from "react";
import { ConnectSVG } from "../../utils/ConnectSVG";
import { WalletSVG } from "../../utils/WalletSVG";
import { getWalletAddress } from "../../utils/WalletUtils";
import { ErrorHandler } from "../../utils/ErrorsHandler";
import { message } from "antd";

const Connect = () => {
  const [account, setAccount] = useState("");
  const [messageApi, contextHolder] = message.useMessage();

  const handleWallet = async () => {
    try {
      const address = await getWalletAddress();
      setAccount(address);
    } catch (error) {
      const newError = ErrorHandler(error)
      messageApi.open({
        type: 'warning',
        content: newError.message
      })
    }
  };


  useEffect(() => {
    handleWallet()
  }, [])

  return (
    <>
      {contextHolder}
      <button
        type="button"
        className="inline-flex items-center justify-center px-4 py-2 text-base font-medium leading-6 text-black whitespace-no-wrap bg-[#ffff00] border border-transparent shadow-sm hover:bg-[#ffff00] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#ffff00] btn"
        disabled={!!account}
        onClick={handleWallet}
      >
        {account ? (
          <>
            <WalletSVG />{" "}
            <span className="ml-2">{`0x...${account.substring(
              account.length - 8
            )}`}</span>{" "}
          </>
        ) : (
          <>
            <ConnectSVG />
            <span className="ml-2">CONNECT WALLET</span>
          </>
        )}
      </button>
    </>
  );
};

export default Connect;
