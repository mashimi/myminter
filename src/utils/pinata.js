require('dotenv').config();
const key = process.env.REACT_APP_PINATA_KEY;
//"642927a9d15ec98a0d39"
const secret  = process.env.REACT_APP_PINATA_SECRET;
//"0071ef8376ebbd6f0be7a3b73fe8d4e267709e1088f12ea37ae23412d06f3116"
//process.env.REACT_APP_PINATA_SECRET;
const bearer = process.env.REACT_APP_BEARER_KEY ;

const axios = require('axios');

export const pinJSONToIPFS = async(JSONBody) => {
    const url = `https://api.pinata.cloud/pinning/pinJSONToIPFS`;
    //making axios POST request to Pinata ⬇️
    return axios 
        .post(url, JSONBody, {
            headers: {
               pinata_api_key: key,
               pinata_secret_api_key: secret,
               
            }
        })
        .then(function (response) {
           return {
               success: true,
               pinataUrl: "https://gateway.pinata.cloud/ipfs/" + response.data.IpfsHash
           };
        })
        .catch(function (error) {
            console.log(error)
            return {
                success: false,
                message: error.message,
            }
           
    });
};