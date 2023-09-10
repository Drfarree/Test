import { useState, useEffect } from 'react';
import { getWalletBalance } from '../../utils/WalletUtils';
import { message } from "antd";

function CurrentWalletBalance(props) {
    const [messageApi, contextHolder] = message.useMessage();
    const [tokenPrice, setTokenPrice] = useState(null)
    const tokenIcon = 'https://cdn.moralis.io/eth/0xa0b86991c6218b36c1d19d4a2e9eb0ce3606eb48.png'

    const handleWallet = async () => {
        const walletBalance = getWalletBalance()
        return walletBalance;
    };


    // Use useEffect to start the timer when the component mounts
    useEffect(() => {
        handleWallet().then(
            tokenPrice => { setTokenPrice(tokenPrice) }
        ).catch((error) => {

        })
    }, []);


    return (
        <>
            {!!tokenPrice && <>
                <img src={tokenIcon} alt="Token icon" className="h-[25px]" />
                <span style={{ marginLeft: '5px' }} className='font-mono font-bold text-zinc-300 text-xl'>
                    {tokenPrice} PK
                </span>
            </>
            }
        </>
    )
}


export default CurrentWalletBalance;