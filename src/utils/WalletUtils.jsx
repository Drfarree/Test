import { ethers } from "ethers";
import TokenABI from '../ABIS/tokenABI.json'
import LiquidityPoolABI from '../ABIS/LiquidityPoolABI.json'
import NodeManagerABI from '../ABIS/NodeManagerABI.json'


const TOKEN_CONTRACT_ADDRESS = "0x5fB17bc2C2DDB36FD62D9eC51fB7D9EdaB2b09e7"
const LIQUIDITY_POOL_CONTRACT_ADDRESS = '0x2D202Ea971a2F73b40c9668d1D906D6D47776247'
const NODE_MANAGER_CONTRACT_ADDRESS = '0x6c935331e47F2267cab239467F1a8154dA56bc9e'
const WHITELIST_CONTRACT_ADDRESS = '0x2EBF10d47F06bfF5861e84fB6B52b53547D1A32F'

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

const getDecimals = async () => {
    const walletAddress = await getWalletAddress()
    const provider = await getWalletProvider()

    // direccion del contrato token 
    const tokenContractAddress = TOKEN_CONTRACT_ADDRESS;
    const tokenContractAbi = ["function decimals() view returns (uint8)"];

    const tokenContract = new ethers.Contract(tokenContractAddress, tokenContractAbi, provider);
    const tokenDecimals = await tokenContract.decimals();

    return tokenDecimals

}

// TODO: Truncar/redondear  3 decimals ?¿
const getWalletBalance = async () => {
    const walletAddress = await getWalletAddress()
    const provider = await getWalletProvider()

    // direccion del contrato token 
    const tokenContractAddress = TOKEN_CONTRACT_ADDRESS;
    // Abi de la funcion balanceOf para mostrar balance
    const tokenContractAbi = ["function balanceOf(address) view returns (uint256)"];

    const tokenContract = new ethers.Contract(tokenContractAddress, tokenContractAbi, provider);
    const tokenBalance = await tokenContract.balanceOf(walletAddress);

    const decimals = await getDecimals()
    const totalBalance = (tokenBalance)/10**(decimals)

    return totalBalance
}

const getTokenPrice = async () => {
    const provider = await getWalletProvider()

    const tokenContractAddress = LIQUIDITY_POOL_CONTRACT_ADDRESS;
    const tokenContractAbi = ["function getTokenPrice() view returns (uint256)"];

    const tokenContract = new ethers.Contract(tokenContractAddress, tokenContractAbi, provider);
    const tokenPrice = await tokenContract.getTokenPrice();
    return tokenPrice;
};

const approveAndSwapTokens = async (token_amount) => {
    try {

        const provider = await getWalletProvider()

        const signer = provider.getSigner()
        const decimals = await getDecimals()
        const contract = new ethers.Contract(TOKEN_CONTRACT_ADDRESS, TokenABI, signer)


        const result = await contract.approve(LIQUIDITY_POOL_CONTRACT_ADDRESS, BigInt(token_amount)*BigInt(10)**BigInt(decimals))

        await result.wait()

        const contractLP = new ethers.Contract(LIQUIDITY_POOL_CONTRACT_ADDRESS, LiquidityPoolABI, signer)


        const resultLP = await contractLP.swapTokensForETH(BigInt(token_amount)*BigInt(10)**BigInt(decimals))

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

const swapTokensForETH = async (token_amount) => {

    try {
        const provider = await getWalletProvider()

        const signer = provider.getSigner()
        const decimals = await getDecimals()

        const contract = new ethers.Contract(LIQUIDITY_POOL_CONTRACT_ADDRESS, LiquidityPoolABI, signer)

        const result = await contract.swapTokensForETH(parseInt(token_amount*10**decimals))

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






export { getWalletAddress, getWalletBalance, getTokenPrice, approveAndSwapTokens, SwapETHforTokens, depositNodeManager, getDecimals, swapTokensForETH };
