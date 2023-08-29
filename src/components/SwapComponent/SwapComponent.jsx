import React, { useState, useEffect } from "react";
import { Input, Modal, message } from "antd";
import {
    ArrowDownOutlined,
    DownOutlined,
} from "@ant-design/icons";
import axios from "axios";
// import { useSendTransaction, useWaitForTransaction } from "wagmi";

const tokenList = [{
    "ticker": "USDC",
    "img": "https://cdn.moralis.io/eth/0xa0b86991c6218b36c1d19d4a2e9eb0ce3606eb48.png",
    "name": "USD Coin",
    "address": "0xa0b86991c6218b36c1d19d4a2e9eb0ce3606eb48",
    "decimals": 6
},
{
    "ticker": "LINK",
    "img": "https://cdn.moralis.io/eth/0x514910771af9ca656af840dff83e8264ecf986ca.png",
    "name": "Chainlink",
    "address": "0x514910771af9ca656af840dff83e8264ecf986ca",
    "decimals": 18
}]

function SwapComponent(props) {
    const { address, isConnected } = props;
    const [messageApi, contextHolder] = message.useMessage();
    const [slippage, setSlippage] = useState(2.5);
    const [tokenOneAmount, setTokenOneAmount] = useState(null);
    const [tokenTwoAmount, setTokenTwoAmount] = useState(null);
    const [tokenOne, setTokenOne] = useState(tokenList[0]);
    const [tokenTwo, setTokenTwo] = useState(tokenList[1]);
    const [isSwapTokenModalOpen, setSwapTokenModalOpen] = useState(false);
    const [changeToken, setChangeToken] = useState(1);
    const [prices, setPrices] = useState(null);
    const [txDetails, setTxDetails] = useState({
        to: null,
        data: null,
        value: null,
    });

    // const { data, sendTransaction } = useSendTransaction({
    //     request: {
    //         from: address,
    //         to: String(txDetails.to),
    //         data: String(txDetails.data),
    //         value: String(txDetails.value),
    //     }
    // })

    // const { isLoading, isSuccess } = useWaitForTransaction({
    // hash: data?.hash,
    // })

    // function handleSlippageChange(e) {
    //     setSlippage(e.target.value);
    // }

    function changeAmount(e) {
        setTokenOneAmount(e.target.value);
        if (e.target.value && prices) {
            setTokenTwoAmount((e.target.value * prices.ratio).toFixed(2))
        } else {
            setTokenTwoAmount(null);
        }
    }

    function switchTokens() {
        setPrices(null);
        setTokenOneAmount(null);
        setTokenTwoAmount(null);
        const one = tokenOne;
        const two = tokenTwo;
        setTokenOne(two);
        setTokenTwo(one);
        fetchPrices(two.address, one.address);
    }

    function openModal(asset) {
        setChangeToken(asset);
        setSwapTokenModalOpen(true);
    }

    function modifyToken(i) {
        setPrices(null);
        setTokenOneAmount(null);
        setTokenTwoAmount(null);
        if (changeToken === 1) {
            setTokenOne(tokenList[i]);
            fetchPrices(tokenList[i].address, tokenTwo.address)
        } else {
            setTokenTwo(tokenList[i]);
            fetchPrices(tokenOne.address, tokenList[i].address)
        }
        setSwapTokenModalOpen(false);
    }

    async function fetchPrices(one, two) {

        const res = await axios.get(`http://localhost:3001/tokenPrice`, {
            params: { addressOne: one, addressTwo: two }
        })


        setPrices(res.data)
    }

    async function fetchDexSwap() {

        const allowance = await axios.get(`https://api.1inch.io/v5.0/1/approve/allowance?tokenAddress=${tokenOne.address}&walletAddress=${address}`)

        if (allowance.data.allowance === "0") {

            const approve = await axios.get(`https://api.1inch.io/v5.0/1/approve/transaction?tokenAddress=${tokenOne.address}`)

            setTxDetails(approve.data);
            console.log("not approved")
            return

        }

        const tx = await axios.get(
            `https://api.1inch.io/v5.0/1/swap?fromTokenAddress=${tokenOne.address}&toTokenAddress=${tokenTwo.address}&amount=${tokenOneAmount.padEnd(tokenOne.decimals + tokenOneAmount.length, '0')}&fromAddress=${address}&slippage=${slippage}`
        )

        let decimals = Number(`1E${tokenTwo.decimals}`)
        setTokenTwoAmount((Number(tx.data.toTokenAmount) / decimals).toFixed(2));

        setTxDetails(tx.data.tx);

    }


    useEffect(() => {
        fetchPrices(tokenList[0].address, tokenList[1].address)
    }, [])

    useEffect(() => {

        if (txDetails.to && isConnected) {
            sendTransaction();
        }
    }, [txDetails])

    // useEffect(() => {

    //     messageApi.destroy();

    //     if (isLoading) {
    //         messageApi.open({
    //             type: 'loading',
    //             content: 'Transaction is Pending...',
    //             duration: 0,
    //         })
    //     }

    // }, [isLoading])

    // useEffect(() => {
    //     messageApi.destroy();
    //     if (isSuccess) {
    //         messageApi.open({
    //             type: 'success',
    //             content: 'Transaction Successful',
    //             duration: 1.5,
    //         })
    //     } else if (txDetails.to) {
    //         messageApi.open({
    //             type: 'error',
    //             content: 'Transaction Failed',
    //             duration: 1.50,
    //         })
    //     }


    // }, [isSuccess])

    const SwapTokenModal = (
        <Modal
            open={isSwapTokenModalOpen}
            footer={null}
            onCancel={() => setSwapTokenModalOpen(false)}
            title="Select a token"
        >
            <div class="border-t-[1px]  border-solid border-[#363e54] mt-[20px] flex flex-col gap-[10px]">
                {tokenList?.map((e, i) => {
                    return (
                        <div
                            class="flex justify-start items-center pl-[20px] pt-[10px] pb-[10px] hover:cursor-pointer hover:bg-[#1f2639]"
                            key={i}
                            onClick={() => modifyToken(i)}
                        >
                            <img src={e.img} alt={e.ticker} class="h-[22px]  ml-[5px]" />
                            <div className="tokenChoiceNames">
                                <div class="ml-[10px] text-[16px] font-medium">{e.name}</div>
                                <div class="ml-[10px] text-[13px] font-light text-[#51596f]">{e.ticker}</div>
                            </div>
                        </div>
                    );
                })}
            </div>
        </Modal>
    )

    return (
        <>
            {contextHolder}
            {SwapTokenModal}
            <div class="flex flex-col justify-start items-start pl-[30px] pr-[30px]">
                <h1 class="m-4 text-2xl font-extrabold leading-none tracking-tight text-gray-900 dark:text-white uppercase"><span class="text-[35px] font-[650]">S</span>wap</h1>
                <div class="relative">
                    <Input
                        placeholder="0"
                        value={tokenOneAmount}
                        onChange={changeAmount}
                        disabled={!prices}
                    />
                    <Input placeholder="0" value={tokenTwoAmount} disabled={true} />
                    <div class="bg-[#3a4157] w-[35px] h-[35px] items-center justify-center flex rounded-[8px] absolute top-[80px] left-[45%] text-[#5F6783] border-[3px] border-solid  border-[#0E111B] text-[18px] duration-[0.3s] hover:text-white hover:cursor-pointer" onClick={switchTokens}>
                        <ArrowDownOutlined className=" switchArrow" />
                    </div>
                    <div class="swapAsset top-[36px] right-[20px]" onClick={() => openModal(1)}>
                        <img src={tokenOne.img} alt="assetOneLogo" class="h-[22px]  ml-[5px]" />
                        {tokenOne.ticker}
                        <DownOutlined />
                    </div>
                    <div class="swapAsset top-[135px] right-[20px]" onClick={() => openModal(2)}>
                        <img src={tokenTwo.img} alt="assetOneLogo" class="h-[22px]  ml-[5px]" />
                        {tokenTwo.ticker}
                        <DownOutlined />
                    </div>
                </div>
                <div class="swapButton" disabled={!tokenOneAmount || !isConnected} onClick={fetchDexSwap}>Swap</div>
            </div>
        </>
    );
}

export default SwapComponent;