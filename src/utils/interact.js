import {pinJSONToIPFS} from './pinata.js'

require('dotenv').config();
const alchemyKey = process.env.REACT_APP_ALCHEMY_KEY;
const { createAlchemyWeb3 } = require("@alch/alchemy-web3");
const web3 = createAlchemyWeb3(alchemyKey); 



const contractABI = require('../contract-abi.json')
const contractAddress = "0x92f144c7208Dba83bBe54bae220D3a38fbA729b6";
//"0x6B59Be0921B2A88BbC9a56f1f702Bc6E604976Ae";
//"0x08AAd78675102A61FAf7cf5D9997d242c17b80D4";
//"0x4C4a07F737Bf57F6632B6CAB089B78f62385aCaE";
//"0x92f144c7208Dba83bBe54bae220D3a38fbA729b6";

export const connectWallet = async () => {
    if (window.ethereum) {
        try {
            const address = await window.ethereum.enable();
            const obj = {
                connectedStatus:true,
                status:"",
                address:address
            }
            return obj;
        } catch (error) {
            return {
                connectedStatus: false,
                status: "🦊 Connect to Metamask using the button on the top right"
            }
        }
    } else {
        return {
            connectedStatus: false,
            status: "🦊  You must install Metamask into your browser: https://metamask.io/download.html"
        }
    }
};

export const mintNFT = async(artist,artwork,waveform, name, genre) => {
   
    //error handling

  
    //make metadata
    const metadata = new Object();
    metadata.name = name;
    //metadata.image = url;
    metadata.genre = genre;
    metadata.artist = artist;
    metadata.image = artwork;
    metadata.waveform = waveform;


    //pinata pin request
    const pinataResponse = await pinJSONToIPFS(metadata);
    console.log(pinataResponse)
    if (!pinataResponse.success) {
        return {
            success: false,
            status: "😢 Something went wrong while uploading your tokenURI.",
        }
    } 
    const tokenURI = pinataResponse.pinataUrl;  

    //load smart contract
    window.contract = await new web3.eth.Contract(contractABI, contractAddress);//loadContract();

    //set up your Ethereum transaction
    const transactionParameters = {
        to: contractAddress, // Required except during contract publications.
        from: window.ethereum.selectedAddress, // must match user's active address.
        'data': window.contract.methods.mintNFT(window.ethereum.selectedAddress, tokenURI).encodeABI() //make call to NFT smart contract 
    };
  
    //sign transaction via Metamask
    try {
        const txHash = await window.ethereum
            .request({
                method: 'eth_sendTransaction',
                params: [transactionParameters],
            });
        return {
            success: true,
            status: "✅ Check out your transaction on Etherscan: https://etherscan.io/tx/" + txHash
        }
    } catch (error) {
        return {
            success: false,
            status: "😥 Something went wrong: " + error.message
        }
    }
}