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
    flexGrow: 0,
    backgroundColor: theme.palette.background.default,
    padding: theme.spacing(3),
    
  },
}));

const Minter = (props) => {

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



  useEffect(async () => { //TODO: implement

  });

  const connectWalletPressed = async () => { //TODO: implement
    const walletResponse = await connectWallet();
    setConnectedStatus(walletResponse.connectedStatus)
    setStatus(walletResponse.status)
    if (isConnected) {
      setWallet(walletAddress)
    }
  };

  const onMintPressed = async () => { //TODO: implement
    const { status } = await mintNFT(artist,artwork,waveform, name, genre);
    setStatus(status);
  };
  
  //const  mintTestPress = async () => {
 //   console.log(name)
 //   console.log(genre)
 //   console.log(waveform)
  //  console.log(artwork)
 //   console.log(artist)
 // }

  useEffect(async () => {
    if (window.ethereum) { //if Metamask installed
      try {
        const accounts = await window.ethereum.request({ method: "eth_accounts" }) //get Metamask wallet
        if (accounts.length) { //if a Metamask account is connected
          setConnectedStatus(true);
          setWallet(accounts[0]);
        } else {
          setConnectedStatus(false);
          setStatus("🦊 Connect to Metamask using the top right button.");
        }
      } catch {
        setConnectedStatus(false);
        setStatus(
          "🦊 Connect to Metamask using the top right button. " +
          walletAddress
        );
      }
    }
  });

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
            <Link color="inherit" href="/UploadArtwork" >
              Upload Artwork
  </Link>
            <Typography color="textPrimary">Mint Token</Typography>
          </Breadcrumbs>
        </Toolbar>
      </AppBar>
      <br />
      <br />

      <div className="Minter">
        <button id="walletButton" onClick={connectWalletPressed}>
          {isConnected ? (
            "👛 Connected: " +
            String(walletAddress).substring(0, 6) +
            "..." +
            String(walletAddress).substring(38)
          ) : (
            <span>👛 Connect Wallet</span>
          )}
        </button>

        <br></br>
        <h1 id="title">The Future Of Music Ownership!</h1>
        <p>
          Simply add your asset's waveform, track name, artwork , artist name and genre, then press "Mint."
      </p>
        <form>
          <h2>Link To Artwork: ( Upload Your Artwork First ) </h2>
          <input
            type="text"
            placeholder="e.g. https://gateway.pinata.cloud/ipfs/<hash>"
            onChange={(event) => setArtwork(event.target.value)}
          />
          <h2>Link To Waveform: ( Upload Your Audio File First )</h2>
          <input
            type="text"
            placeholder="e.g. https://firebasestorage.googleapis.com/v0/b/distrotoken-hosting.appspot.com/o/<Stuff>"
            onChange={(event) => setWaveform(event.target.value)}
          />
          <h2>Release Name: </h2>
          <input
            type="text"
            placeholder="e.g. My first Audio NFT!"
            onChange={(event) => setName(event.target.value)}
          />
          <h2>Artist Name: </h2>
          <input
            type="text"
            placeholder="e.g. Michael Jackson ;)"
            onChange={(event) => setArtist(event.target.value)}
          />
          <h2>Genre:</h2>
          <select id="genres" name="genres" onChange={(event) => setGenre(event.target.value)}>
          <option value="Alternative">
              Alternative
            </option>
            <option value="Alternative / College Rock">
              Alternative / College Rock
            </option>
            <option value="Alternative / Goth Rock">
              Alternative / Goth Rock
            </option>
            <option value="Alternative / Grunge">
              Alternative / Grunge
            </option>
            <option value="Alternative / Indie Rock">
              Alternative / Indie Rock
            </option>
            <option value="Alternative / New Wave">
              Alternative / New Wave
            </option>
            <option value="Alternative / Punk">
              Alternative / Punk
            </option>
            <option value="Blues">
              Blues
            </option>
            <option value="Blues / Acoustic Blues">
              Blues / Acoustic Blues
            </option>
            <option value="Blues / Chicago Blues">
              Blues / Chicago Blues
            </option>
            <option value="Blues / Classic Blues">
              Blues / Classic Blues
            </option>
            <option value="Blues / Contemporary Blues">
              Blues / Contemporary Blues
            </option>
            <option value="Blues / Country Blues">
              Blues / Country Blues
            </option>
            <option value="Blues / Delta Blues">
              Blues / Delta Blues
            </option>
            <option value="Blues / Electric Blues">
              Blues / Electric Blues
            </option>
            <option value="Children's Music">
              Children's Music
            </option>
            <option value="Children's Music / Lullabies">
              Children's Music / Lullabies
            </option>
            <option value="Children's Music / Sing-Along">
              Children's Music / Sing-Along
            </option>
            <option value="Country">
              Country
            </option>
            <option value="Country / Alternative Country">
              Country / Alternative Country
            </option>
            <option value="Country / Americana">
              Country / Americana
            </option>
            <option value="Country / Bluegrass">
              Country / Bluegrass
            </option>
            <option value="Country / Contemporary Bluegrass">
              Country / Contemporary Bluegrass
            </option>
            <option value="Country / Contemporary Country">
              Country / Contemporary Country
            </option>
            <option value="Country / Country Gospel">
              Country / Country Gospel
            </option>
            <option value="Country / Honky Tonk">
              Country / Honky Tonk
            </option>
            <option value="Country / Outlaw Country">
              Country / Outlaw Country
            </option>
            <option value="Country / Traditional Bluegrass">
              Country / Traditional Bluegrass
            </option>
            <option value="Country / Traditional Country">
              Country / Traditional Country
            </option>
            <option value="Country / Urban Cowboy">
              Country / Urban Cowboy
            </option>
            <option value="Dance">
              Dance
            </option>
            <option value="Dance / Breakbeat">
              Dance / Breakbeat
            </option>
            <option value="Dance / Garage">
              Dance / Garage
            </option>
            <option value="Dance / Hardcore">
              Dance / Hardcore
            </option>
            <option value="Dance / House">
              Dance / House
            </option>
            <option value="Dance / Jungle/Drum’n’bass">
              Dance / Jungle/Drum’n’bass
            </option>
            <option value="Dance / Techno">
              Dance / Techno
            </option>
            <option value="Dance / Trance">
              Dance / Trance
            </option>
            <option value="Dance / Trap">
              Dance / Trap
            </option>
            <option value="Electronic">
              Electronic
            </option>
            <option value="Electronic / Ambient">
              Electronic / Ambient
            </option>
            <option value="Electronic / Downtempo">
              Electronic / Downtempo
            </option>
            <option value="Electronic / Dubstep">
              Electronic / Dubstep
            </option>
            <option value="Electronic / Electronica">
              Electronic / Electronica
            </option>
            <option value="Electronic / Future Bass">
              Electronic / Future Bass
            </option>
            <option value="Electronic / IDM/Experimental">
              Electronic / IDM/Experimental
            </option>
            <option value="Electronic / Industrial">
              Electronic / Industrial
            </option>
            <option value="Electronic / Minimalism">
              Electronic / Minimalism
            </option>
            <option value="Folk">
              Folk
            </option>
            <option value="Hip Hop/Rap">
              Hip Hop/Rap
            </option>
            <option value="Hip Hop/Rap / Alternative Rap">
              Hip Hop/Rap / Alternative Rap
            </option>
            <option value="Hip Hop/Rap / Dirty South">
              Hip Hop/Rap / Dirty South
            </option>
            <option value="Hip Hop/Rap / East Cost Rap">
              Hip Hop/Rap / East Coast Rap
            </option>
            <option value="Hip Hop/Rap / Gangsta Rap">
              Hip Hop/Rap / Gangsta Rap
            </option>
            <option value="Hip Hop/Rap / Hardcore Rap">
              Hip Hop/Rap / Hardcore Rap
            </option>
            <option value="Hip Hop/Rap / Hip-Hop">
              Hip Hop/Rap / Hip-Hop
            </option>
            <option value="Hip Hop/Rap / Latin Rap">
              Hip Hop/Rap / Latin Rap
            </option>
            <option value="Hip Hop/Rap / Old School Rap">
              Hip Hop/Rap / Old School Rap
            </option>
            <option value="Hip Hop/Rap / Rap">
              Hip Hop/Rap / Rap
            </option>
            <option value="Hip Hop/Rap / Underground Rap">
              Hip Hop/Rap / Underground Rap
            </option>
            <option value="Hip Hop/Rap / West Coast Rap">
              Hip Hop/Rap / West Coast Rap
            </option>
            <option value="Holiday">
              Holiday
            </option>
            <option value="Holiday / Chanukah">
              Holiday / Chanukah
            </option>
            <option value="Holiday / Christmas">
              Holiday / Christmas
            </option>
            <option value="Holiday / Christmas: Children’s">
              Holiday / Christmas: Children’s
            </option>
            <option value="Holiday / Christmas: Classic">
              Holiday / Christmas: Classic
            </option>
            <option value="Holiday / Christmas: Classical">
              Holiday / Christmas: Classical
            </option>
            <option value="Holiday / Christmas: Jazz">
              Holiday / Christmas: Jazz
            </option>
            <option value="Holiday / Christmas: Modern">
              Holiday / Christmas: Modern
            </option>
            <option value="Holiday / Christmas: Pop">
              Holiday / Christmas: Pop
            </option>
            <option value="Holiday / Christmas: R&amp;B">
              Holiday / Christmas: R&amp;B
            </option>
            <option value="Holiday / Christmas: Religious">
              Holiday / Christmas: Religious
            </option>
            <option value="Holiday / Christmas: Rock">
              Holiday / Christmas: Rock
            </option>
            <option value="Holiday / Easter">
              Holiday / Easter
            </option>
            <option value="Holiday / Halloween">
              Holiday / Halloween
            </option>
            <option value="Holiday / Thanksgiving">
              Holiday / Thanksgiving
            </option>
            <option value="Inspirational">
              Inspirational
            </option>
            <option value="Jazz">
              Jazz
            </option>
            <option value="Jazz / Avant-Garde Jazz">
              Jazz / Avant-Garde Jazz
            </option>
            <option value="Jazz / Big Band">
              Jazz / Big Band
            </option>
            <option value="Jazz / Contemporary Jazz">
              Jazz / Contemporary Jazz
            </option>
            <option value="Jazz / Cool">
              Jazz / Cool
            </option>
            <option value="Jazz / Crossover Jazz">
              Jazz / Crossover Jazz
            </option>
            <option value="Jazz / Dixieland">
              Jazz / Dixieland
            </option>
            <option value="Jazz / Easy Listening">
              Jazz / Easy Listening
            </option>
            <option value="Jazz / Fusion">
              Jazz / Fusion
            </option>
            <option value="Jazz / Hard Bop">
              Jazz / Hard Bop
            </option>
            <option value="Jazz / Latin Jazz">
              Jazz / Latin Jazz
            </option>
            <option value="Jazz / Mainstream Jazz">
              Jazz / Mainstream Jazz
            </option>
            <option value="Jazz / Ragtime">
              Jazz / Ragtime
            </option>
            <option value="Jazz / Smooth Jazz">
              Jazz / Smooth Jazz
            </option>
            <option value="Jazz / Trad Jazz">
              Jazz / Trad Jazz
            </option>
            <option value="Latin">
              Latin
            </option>
            <option value="Latin/ Alternativo &amp; Rock Latino">
              Latin / Alternativo &amp; Rock Latino
            </option>
            <option value="Latin/ Baladas y Boleros">
              Latin / Baladas y Boleros
            </option>
            <option value="Latin / Contemporary Latin">
              Latin / Contemporary Latin
            </option>
            <option value="Latin / Pop Latino">
              Latin / Pop Latino
            </option>
            <option value="Latin / Raíces">
              Latin / Raíces
            </option>
            <option value="Latin / Reggaeton y Hip-Hop">
              Latin / Reggaeton y Hip-Hop
            </option>
            <option value="Latin / Regional Mexicano">
              Latin / Regional Mexicano
            </option>
            <option value="Latin / Salsa y Tropical">
              Latin / Salsa y Tropical
            </option>
            <option value="New Age">
              New Age
            </option>
            <option value="New Age / Healing">
              New Age / Healing
            </option>
            <option value="New Age / Meditation">
              New Age / Meditation
            </option>
            <option value="New Age / Nature">
              New Age / Nature
            </option>
            <option value="New Age / Relaxation">
              New Age / Relaxation
            </option>
            <option value="New Age / Travel">
              New Age / Travel
            </option>
            <option value="Pop">
              Pop
            </option>
            <option value="Pop / Adult Contemporary">
              Pop / Adult Contemporary
            </option>
            <option value="Pop / Britpop">
              Pop / Britpop
            </option>
            <option value="Pop / Pop/Rock">
              Pop / Pop/Rock
            </option>
            <option value="Pop / Singer/Songwriter">
              Pop / Singer/Songwriter
            </option>
            <option value="Pop / Soft Rock">
              Pop / Soft Rock
            </option>
            <option value="Pop / Teen Pop">
              Pop / Teen Pop
            </option>
            <option value="R&amp;B/Soul">
              R&amp;B/Soul
            </option>
            <option value=" R&amp;B/Soul / Contemporary R&amp;B">
              R&amp;B/Soul / Contemporary R&amp;B
            </option>
            <option value=" R&amp;B/Soul / Disco">
              R&amp;B/Soul / Disco
            </option>
            <option value=" R&amp;B/Soul / Doo Wop">
              R&amp;B/Soul / Doo Wop
            </option>
            <option value=" R&amp;B/Soul / Funk">
              R&amp;B/Soul / Funk
            </option>
            <option value=" R&amp;B/Soul / Motown">
              R&amp;B/Soul / Motown
            </option>
            <option value=" R&amp;B/Soul / Neo-Soul">
              R&amp;B/Soul / Neo-Soul
            </option>
            <option value=" R&amp;B/Soul / Soul">
              R&amp;B/Soul / Soul
            </option>
            <option value="Reggae">
              Reggae
            </option>
            <option value="Reggae / Dub">
              Reggae / Dub
            </option>
            <option value="Reggae / Roots Reggae">
              Reggae / Roots Reggae
            </option>
            <option value="Reggae / Ska">
              Reggae / Ska
            </option>
            <option value="Rock">
              Rock
            </option>
            <option value="Rock / Adult Alternative">
              Rock / Adult Alternative
            </option>
            <option value="Rock / American Trad Rock">
              Rock / American Trad Rock
            </option>
            <option value="Rock / Arena Rock">
              Rock / Arena Rock
            </option>
            <option value="Rock / Blues-Rock">
              Rock / Blues-Rock
            </option>
            <option value="Rock / British Invasion">
              Rock / British Invasion
            </option>
            <option value="Rock / Death Metal/Black Metal">
              Rock / Death Metal/Black Metal
            </option>
            <option value="Rock / Glam Rock">
              Rock / Glam Rock
            </option>
            <option value="Rock / Hair Metal">
              Rock / Hair Metal
            </option>
            <option value="Rock / Hard Rock">
              Rock / Hard Rock
            </option>
            <option value="Rock / Heavy Metal">
              Rock / Heavy Metal
            </option>
            <option value="Rock / Jam Bands">
              Rock / Jam Bands
            </option>
            <option value="Rock / Prog-Rock/Art Rock">
              Rock / Prog-Rock/Art Rock
            </option>
            <option value="Rock / Psychedelic">
              Rock / Psychedelic
            </option>
            <option value="Rock / Rockabilly">
              Rock / Rockabilly
            </option>
            <option value="Rock / Rock &amp; Roll">
              Rock / Rock &amp; Roll
            </option>
            <option value="Rock / Roots Rock">
              Rock / Roots Rock
            </option>
            <option value="Rock / Southern Rock">
              Rock / Southern Rock
            </option>
            <option value="Rock / Surf">
              Rock / Surf
            </option>
            <option value="Rock / Tex-Mex">
              Rock / Tex-Mex
            </option>
            <option value="Soundtrack">
              Soundtrack
            </option>
            <option value="Soundtrack / Foreign Cinema">
              Soundtrack / Foreign Cinema
            </option>
            <option value="Soundtrack / Musicals">
              Soundtrack / Musicals
            </option>
            <option value="Soundtrack / Original Score">
              Soundtrack / Original Score
            </option>
            <option value="Soundtrack / TV Soundtrack">
              Soundtrack / TV Soundtrack
            </option>
            <option value="Spoken Word">
              Spoken Word
            </option>
            <option value="Vocal">
              Vocal
            </option>
            <option value="Vocal / Standards">
              Vocal / Standards
            </option>
            <option value="Vocal / Traditional Pop">
              Vocal / Traditional Pop
            </option>
            <option value="Vocal / Vocal Jazz">
              Vocal / Vocal Jazz
            </option>
            <option value="Vocal / Vocal Pop">
              Vocal / Vocal Pop
            </option>
            <option value="World">
              World
            </option>
            <option value="World / Afrobeat">
              World / Afrobeat
            </option>
            <option value="World / Afro Pop">
              World / Afro Pop
            </option>
            <option value="World / Christian &amp; Gospel">
              World / Christian &amp; Gospel
            </option>
            <option value="World / Tango">
              World / Tango
            </option>
          </select>
        </form>
        <button id="mintButton" onClick={onMintPressed}>
          Mint NFT
      </button>
        <p id="status">
          {status}
        </p>
      </div>
    </>
  );
};

export default Minter;
