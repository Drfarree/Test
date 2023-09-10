import { ethers } from "ethers";
import TokenABI from '../ABIS/tokenABI.json'
import LiquidityPoolABI from '../ABIS/LiquidityPoolABI.json'
import NodeManagerABI from '../ABIS/NodeManagerABI.json'


const TOKEN_CONTRACT_ADDRESS = "0x8a0d6FF3C82f6278584A7fEFAf455b4c9D4b5817"
const LIQUIDITY_POOL_CONTRACT_ADDRESS = '0xa1E5D63e967eE13afA9E6eB6Cf6A5B6962c2E17c'
const NODE_MANAGER_CONTRACT_ADDRESS = '0x26b45F01AD51bf522135B65Cf8742D94141749Dd'

// PRIVADAS
const getWalletProvider = async () => {
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    await provider.send("eth_requestAccounts", []);
    return provider
}




// PÚBLICAS
const getWalletAddress = async () => {
    const provider = await getWalletProvider();
    const signer = provider.getSigner();
    const address = await signer.getAddress();
    return address;
}


const getWalletBalance = async () => {
    const walletAddress = await getWalletAddress()
    const provider = await getWalletProvider()

    // direccion del contrato token 
    const tokenContractAddress = "0x8a0d6FF3C82f6278584A7fEFAf455b4c9D4b5817";
    // Abi de la funcion balanceOf para mostrar balance
    const tokenContractAbi = ["function balanceOf(address) view returns (uint256)"];

    const tokenContract = new ethers.Contract(tokenContractAddress, tokenContractAbi, provider);
    const tokenBalance = await tokenContract.balanceOf(walletAddress);
    return tokenBalance.toString()
}

const getTokenPrice = async () => {
    const provider = await getWalletProvider()

    const tokenContractAddress = "0xa1E5D63e967eE13afA9E6eB6Cf6A5B6962c2E17c";
    const tokenContractAbi = ["function getTokenPrice() view returns (uint256)"];

    const tokenContract = new ethers.Contract(tokenContractAddress, tokenContractAbi, provider);
    const tokenPrice = await tokenContract.getTokenPrice();
    return tokenPrice;
};

const approveTokens = async (token_amount) => {
    try {

        const provider = await getWalletProvider()

        const signer = provider.getSigner()
        const contract = new ethers.Contract(TOKEN_CONTRACT_ADDRESS, TokenABI, signer)


        const result = await contract.approve(LIQUIDITY_POOL_CONTRACT_ADDRESS, token_amount)

        await result.wait()

        const contractLP = new ethers.Contract(LIQUIDITY_POOL_CONTRACT_ADDRESS, LiquidityPoolABI, signer)


        const resultLP = await contractLP.swapTokensForETH(token_amount)

        await resultLP.wait()
    } catch (error) {
        console.error("Failed approve", error)
    }
}

const SwapETHforTokens = async (eth_amount) => {
    try {
        const provider = await getWalletProvider()

        const signer = provider.getSigner()

        const contract = new ethers.Contract(LIQUIDITY_POOL_CONTRACT_ADDRESS, LiquidityPoolABI, signer)

        const result = await contract.swapETHForTokens({ value: ethers.utils.parseEther(String(eth_amount)) })

        await result.wait()

    } catch (error) {
        console.error("Failed approve", error)
    }
}

const depositNodeManager = async (token_amount) => {
    try {
        const provider = await getWalletProvider()

        const signer = provider.getSigner();

        const contract = new ethers.Contract(TOKEN_CONTRACT_ADDRESS, TokenABI, signer);
        const result_TOKEN = await contract.approve(NODE_MANAGER_CONTRACT_ADDRESS, token_amount);

        await result_TOKEN.wait()

        const contract_NM = new ethers.Contract(NODE_MANAGER_CONTRACT_ADDRESS, NodeManagerABI, signer);

        const result = await contract_NM.deposit(token_amount)

        await result.wait();
    } catch (error) {
        console.error("Failed approve", error);
    }
};






export { getWalletAddress, getWalletBalance, getTokenPrice, approveTokens, SwapETHforTokens, depositNodeManager };
