import React, { useState, useEffect } from "react";
import { Input, Modal, message, FloatButton } from "antd";
import {
    ArrowDownOutlined,
    DownOutlined,
    SwapOutlined
} from "@ant-design/icons";
import { getWalletAddress, getTokenPrice, approveTokens, SwapETHforTokens } from "../../utils/WalletUtils";
import { ErrorHandler } from "../../utils/ErrorsHandler";

const tokenList = [{
    "ticker": "ETH",
    "img": "https://cdn.moralis.io/eth/0xa0b86991c6218b36c1d19d4a2e9eb0ce3606eb48.png",
    "name": "USD Coin",
    "address": "0xa0b86991c6218b36c1d19d4a2e9eb0ce3606eb48",
    "decimals": 18
},
{
    "ticker": "Token",
    "img": "https://cdn.moralis.io/eth/0x514910771af9ca656af840dff83e8264ecf986ca.png",
    "name": "Chainlink",
    "address": "0x514910771af9ca656af840dff83e8264ecf986ca",
    "decimals": 18
}]

function SwapComponent(props) {
    // Mensajes
    const [messageApi, contextHolder] = message.useMessage();
    const [isLoading, setIsLoading] = useState(false);
    const [isSuccess, setIsSucess] = useState(null);
    // Wallet address
    const [walletAddress, setWalletAddress] = useState();
    // Tokens
    const [tokenFromAmount, setTokenFrom] = useState(null);
    const [tokenToAmount, setTokenTo] = useState(null);
    const [tokenOne, setTokenOne] = useState(tokenList[0]);
    const [tokenTwo, setTokenTwo] = useState(tokenList[1]);
    // Show modal managment
    const [isSelectTokenModalOpen, setIsSelectTokenModalOpen] = useState(false);
    const [isSwapTokenModalOpen, setSwapTokenModalOpen] = useState(false);
    // Change token
    const [changeToken, setChangeToken] = useState(1);
    // Token price
    const [prices, setPrices] = useState(null);

    // Open Swap Component Modal
    const showModal = () => {
        // Comprobar que la Wallet está conectada y además no tiene request pendientes
        getWalletAddress().then(
            walletAddress => {
                fetchPrices()
                setWalletAddress(walletAddress)
                setIsSelectTokenModalOpen(true)
            }
        ).catch(error => {
            const newError = ErrorHandler(error)
            messageApi.open({
                type: 'warning',
                content: newError.message,
                duration: 0,
            })
        }
        )
    };

    const handleOk = () => {
        setIsSelectTokenModalOpen(false);
    };

    const handleCancel = () => {
        setIsSelectTokenModalOpen(false);
    };


    function changeAmount(e) {
        setTokenFrom(e.target.value);
        const ethByToken = (prices.ratio / (10 ** 9))
        //TODO: Cambiar
        if (e.target.value && prices)
            if (tokenOne.address === tokenList[0].address)
                setTokenTo(parseInt(e.target.value / ethByToken))
            else
                setTokenTo(e.target.value * ethByToken)

    }

    function switchTokens() {
        setPrices(null);
        setTokenFrom(null);
        setTokenTo(null);
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
        setTokenFrom(null);
        setTokenTo(null);
        if (changeToken === 1) {
            setTokenOne(tokenList[i]);
            fetchPrices(tokenList[i].address, tokenTwo.address)
        } else {
            setTokenTwo(tokenList[i]);
            fetchPrices(tokenOne.address, tokenList[i].address)
        }
        setSwapTokenModalOpen(false);
    }

    const fetchPrices = async () => {
        if (walletAddress)
            getTokenPrice().then(
                tokenPrice => {
                    setPrices({ ratio: tokenPrice })
                }
            ).catch((error) => {

            })
    }

    const fetchDexSwap = async () => {
        setIsLoading(true)
        setIsSelectTokenModalOpen(false)
        const fnCallbackSucess = () => {
            messageApi.open({
                type: 'success',
                content: 'OK'
            })
            setIsLoading(false)
            setIsSucess(true)
        }

        const fnCallbackError = () => {
            setIsLoading(false)
            setIsSucess(false)
        }

        let fnToCall = undefined;

        if (tokenOne.address === tokenList[0].address)
            fnToCall = SwapETHforTokens
        else
            fnToCall = approveTokens

        fnToCall(tokenFromAmount).then(() => fnCallbackSucess()).catch(() => fnCallbackError())

    }

    useEffect(() => {
        // Set up an interval to fetch data every 10 seconds
        const intervalId = setInterval(() => {
            fetchPrices();
        }, 1000);

        // Clear the interval when the component unmounts to prevent memory leaks
        return () => clearInterval(intervalId);
    }, [])


    useEffect(() => {
        if (!isSelectTokenModalOpen) {
            setTokenFrom(null)
            setTokenTo(null)
        }
    }, [isSelectTokenModalOpen])

    useEffect(() => {
        messageApi.destroy();
        if (isLoading) {
            messageApi.open({
                type: 'loading',
                content: 'Transaction is Pending...',
                duration: 0,
            })
        }

    }, [isLoading])

    useEffect(() => {
        messageApi.destroy();
        if (isSuccess) {
            messageApi.open({
                type: 'success',
                content: 'Transaction Successful',
                duration: 1.5,
            })
        } else {
            //TODO: 
            messageApi.open({
                type: 'error',
                content: 'Transaction Failed',
                duration: 1.50,
            })
        }
    }, [isSuccess])


    const SwapTokenModal = (
        <Modal
            open={isSwapTokenModalOpen}
            footer={null}
            onCancel={() => setSwapTokenModalOpen(false)}
            title="Select a token"
        >
            <div className="border-t-[1px]  border-solid border-[#363e54] mt-[20px] flex flex-col gap-[10px]">
                {tokenList?.map((e, i) => {
                    return (
                        <div
                            className="flex justify-start items-center pl-[20px] pt-[10px] pb-[10px] hover:cursor-pointer hover:bg-[#1f2639]"
                            key={i}
                            onClick={() => modifyToken(i)}
                        >
                            <img src={e.img} alt={e.ticker} className="h-[22px]  ml-[5px]" />
                            <div className="tokenChoiceNames">
                                <div className="ml-[10px] text-[16px] font-medium">{e.name}</div>
                                <div className="ml-[10px] text-[13px] font-light text-[#51596f]">{e.ticker}</div>
                            </div>
                        </div>
                    );
                })}
            </div>
        </Modal>
    )



    return (

        <>
            <FloatButton icon={<SwapOutlined />} type="primary" tooltip={<div>Swap tokens</div>} onClick={showModal} />
            <Modal open={isSelectTokenModalOpen} onCancel={handleCancel} onOk={handleOk} footer={null} closeIcon={null}>
                {contextHolder}
                {SwapTokenModal}
                <div className="flex flex-col justify-start items-start pl-[30px] pr-[30px]">
                    <h1 className="m-4 text-2xl font-extrabold leading-none tracking-tight text-gray-900 dark:text-white uppercase"><span className="text-[35px] font-[650]">S</span>wap</h1>
                    <div className="relative">
                        <Input
                            placeholder="0"
                            value={tokenFromAmount}
                            onChange={changeAmount}
                        />
                        <Input placeholder="0" value={tokenToAmount} />
                        <div className="bg-[#3a4157] w-[35px] h-[35px] items-center justify-center flex rounded-[8px] absolute top-[80px] left-[45%] text-[#5F6783] border-[3px] border-solid  border-[#0E111B] text-[18px] duration-[0.3s] hover:text-white hover:cursor-pointer" onClick={switchTokens}>
                            <ArrowDownOutlined className=" switchArrow" />
                        </div>
                        <div className="swapAsset top-[36px] right-[20px]" onClick={() => openModal(1)}>
                            <img src={tokenOne.img} alt="assetOneLogo" className="h-[22px]  ml-[5px]" />
                            {tokenOne.ticker}
                            <DownOutlined />
                        </div>
                        <div className="swapAsset top-[135px] right-[20px]" onClick={() => openModal(2)}>
                            <img src={tokenTwo.img} alt="assetOneLogo" className="h-[22px]  ml-[5px]" />
                            {tokenTwo.ticker}
                            <DownOutlined />
                        </div>
                    </div>
                    <div
                        className="swapButton"
                        disabled={!tokenFromAmount}
                        onClick={fetchDexSwap}>Swap</div>
                </div>
            </Modal>
        </>
    );
}

export default SwapComponent;