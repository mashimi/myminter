import { useEffect, useState } from "react";

import logo from './img/logo.png'

import { makeStyles } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import CssBaseline from '@material-ui/core/CssBaseline';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import List from '@material-ui/core/List';
import Typography from '@material-ui/core/Typography';
import Breadcrumbs from '@material-ui/core/Breadcrumbs';
import Link from '@material-ui/core/Link';

import { connectWallet, mintNFT } from './utils/interact.js'

const drawerWidth = 240;

const axios = require('axios');
const fs = require('fs');
const FormData = require('form-data');


const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
  },
  size: {
    height: 30,
    width: 110
  },
  appBar: {
    width: `calc(100% - 0px)`,
    marginLeft: drawerWidth,
    backgroundColor: "Grey"
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
  },
  drawerPaper: {
    width: drawerWidth,
  },
  pageLinks: {
    marginLeft:"60%"
    //marginTop:100
  },
  // necessary for content to be below app bar
  toolbar: theme.mixins.toolbar,
  content: {
    flexGrow: 1,
    backgroundColor: theme.palette.background.default,
    padding: theme.spacing(3),
  },
}));

const UploadArtwork = (props) => {

  //State variables
  const [isConnected, setConnectedStatus] = useState(false);
  const [walletAddress, setWallet] = useState("");
  const [status, setStatus] = useState("");
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
//  const [url, setURL] = useState("");
  const [artwork, setArtwork] = useState("");
  const [waveform, setWaveform] = useState("");
  const [genre, setGenre] = useState("");
  const [artist, setArtist] = useState("");

 const [picture, setPicture] = useState(null);

  const [file, setFile] = useState(null);
  const [error, setError] = useState(null);

  const [IPFSHash, setIPFS] = useState("");


  const [image, setImage] = useState({ preview: '', raw: '' })

  const types = ["image/png", "image/jpeg", "image/jpg"];

let data = new FormData();

const handleChange = (e) => {
 setImage({
  preview: URL.createObjectURL(e.target.files[0]),
  raw: e.target.files[0]
 })
 
 let selectedFile = e.target.files[0];
 //data.append('file',selectedFile)
 data.set('file', selectedFile);
//console.log(data.get('file'))
 if (selectedFile) {
    if (types.includes(selectedFile.type)) {
        setError(null);
        setFile(selectedFile);
    } else {
        setFile(null);
        setError("Please select an image file (png or jpg)");
    }
}
 handleFinalChange(data)
}

const handleFinalChange = (data) => {
     const url = `https://api.pinata.cloud/pinning/pinFileToIPFS`;
     axios
        .post(url, data, {
            maxBodyLength: 'Infinity', 
            headers: {
                pinata_api_key: '3909709b462fddedb9e2',
                pinata_secret_api_key: 'a9635a25e859b4b2c9a0c5c0cdb05ef3cbe81b4e469ea4f0064eca9fdba2f15f'
            }
        })
        .then(function (response) {
            //handle your response here
            console.log(response)
            setIPFS(response.data.IpfsHash)
        })
        .catch(function (error) {
            //handle error here
            console.log(error)
        });
}

const url = `https://api.pinata.cloud/pinning/pinFileToIPFS`;

const handleUpload = async (e) => {
    e.preventDefault()
    
};
   

   
 let myname = "Kiri"

  const classes = useStyles();

  return (
    <>
      <AppBar position="fixed" className={classes.appBar}>

        <Toolbar>
          <Typography variant="h6" noWrap>
            MyriseToken
          </Typography>
        

          <Breadcrumbs aria-label="breadcrumb" className={classes.pageLinks}>
            <Link color="inherit" href="/UploadAudio" >
              Upload Audio
  </Link>
            <Link color="inherit" href="/" >
              Mint Token
  </Link>
            <Typography color="textPrimary">Upload Artwork</Typography>
          </Breadcrumbs>
        </Toolbar>
      </AppBar>
      <br />
      <br />
        <h1 id="uploadTitle">Upload your artwork here in order to receive your  URL for minting.</h1>
        <h3> Step One : Select Your File </h3>
        <h3> Step Two : After You Have Selected Your File , The URL Below Will Update. </h3>
        <h3> Step Three : Make A Note Of This URL Because You Will Need It When Minting. </h3>
      <br />
      <br />

      <form>
                <label>
                    <input type="file" onChange={handleChange} />
                    
                </label>

            </form>
            <h3> Your url is : <h3 id="urlTitle"> https://gateway.pinata.cloud/ipfs/{IPFSHash} </h3> </h3>
    </>
  );
};

export default UploadArtwork;
