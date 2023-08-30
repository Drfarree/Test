import { ethers } from "ethers";

const getWalletAddress = async () => {
    try {
        const provider = await getWalletInfo();
        const signer = provider.getSigner();
        const address = await signer.getAddress();
        return address;
    } catch (error) {
        console.error(error);
    }
}

const getWalletInfo = async () => {
    try {
        const provider = new ethers.providers.Web3Provider(window.ethereum);
        await provider.send("eth_requestAccounts", []);
        return provider
    } catch (error) {
        console.error(error);
    }
}

const isWalletConnected = async () => {
    try {
        const address = await getWalletAddress();
        if (address)
            return true
        else
            return false
    } catch (error) {
        return false
    }
}


export { getWalletAddress, isWalletConnected };
