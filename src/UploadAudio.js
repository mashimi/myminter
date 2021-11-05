import { useEffect, useState } from "react";

import logo from './img/logo.png'

import {storage} from "./firebase/firebase"

import { makeStyles } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import CssBaseline from '@material-ui/core/CssBaseline';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import List from '@material-ui/core/List';
import Typography from '@material-ui/core/Typography';
import Breadcrumbs from '@material-ui/core/Breadcrumbs';
import Link from '@material-ui/core/Link';


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

const UploadAudio = (props) => {

  //State variables
const [selectedFile, setSelectedFile] = useState();
const [isFilePicked, setIsFilePicked] = useState(false);
const [isSelected, setIsSelected] = useState();
const allInputs = {imgUrl: ''}
const [imageAsUrl, setImageAsUrl] = useState(allInputs)
const [progressBar, setProgress] = useState()



const changeHandler = (event) => {
  setSelectedFile(event.target.files[0]);
  setIsSelected(true);
};

const handleSubmission = () => {
};

const handleFireBaseUpload = e => {
  e.preventDefault()
console.log('start of upload')
// async magic goes here...
if(selectedFile === '') {
  console.error(`not an image, the image file is a ${typeof(selectedFile)}`)
}
const uploadTask = storage.ref(`/audio/${selectedFile.name}`).put(selectedFile)
//initiates the firebase side uploading 
uploadTask.on('state_changed', 
(snapShot) => {
  //takes a snap shot of the process as it is happening
  console.log(snapShot)
  var progress = (snapShot.bytesTransferred / snapShot.totalBytes) * 100;
  setProgress(progress)
}, (err) => {
  //catches the errors
  console.log(err)
}, () => {
  // gets the functions from storage refences the image storage in firebase by the children
  // gets the download url then sets the image from firebase as the value for the imgUrl key:
  storage.ref('audio').child(selectedFile.name).getDownloadURL()
   .then(fireBaseUrl => {
     setImageAsUrl(prevObject => ({...prevObject, imgUrl: fireBaseUrl}))
   })
   
})

}




  const classes = useStyles();

  return (
    <>
      <AppBar position="fixed" className={classes.appBar}>

        <Toolbar>
        <Typography variant="h6" noWrap>
            MyriseToken
          </Typography>          <Breadcrumbs aria-label="breadcrumb" className={classes.pageLinks}>
            <Link color="inherit" href="/UploadArtwork" >
              Upload Artwork
  </Link>
            <Link color="inherit" href="/" >
              Mint Token
  </Link>
            <Typography color="textPrimary">Upload Audio</Typography>
          </Breadcrumbs>
        </Toolbar>
      </AppBar>
      <br />
      <br />
        <h1 id="uploadTitle">Upload your audio file here in order to receive your  URL for minting.</h1>
        <h3> Step One : Select Your File </h3>
        <h3> Step Two : After You Have Selected Your File , Press The Submit Button. </h3>
        <h3> Step Three : It will take a few seconds for the URL to appear below the 'Submit' button. </h3>
        <h3> Step Four : Make A Note Of This URL Because You Will Need It When Minting. </h3>
        <br />
        <div>
			<input type="file" name="file" onChange={changeHandler} />
			{isSelected ? (
				<div>
					<p>Filename: {selectedFile.name}</p>
					<p>Filetype: {selectedFile.type}</p>
					<p>Size in bytes: {selectedFile.size}</p>
					<p>
						lastModifiedDate:{' '}
						{selectedFile.lastModifiedDate.toLocaleDateString()}
					</p>
				</div>
			) : (
				<p>Select a file to show details</p>
			)}
			<div>
				<button onClick={handleFireBaseUpload}>Submit</button>
			</div>
      <br />
      <p>URL Of Audio: {imageAsUrl.imgUrl} </p>
      <p>Upload is : {progressBar} %</p>
		</div>
    </>
  );
};

export default UploadAudio;
