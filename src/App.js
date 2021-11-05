import './App.css';
import Minter from './Minter'
import UploadArtwork from './UploadArtwork'
import UploadAudio from './UploadAudio'
import { BrowserRouter, Route, Switch } from 'react-router-dom';


function App() {
  return (
    <div className="App">
            <main>
            
            <Route exact path='/' component={Minter} />
            <Route exact path='/UploadArtwork' component={UploadArtwork} />
            <Route exact path='/UploadAudio' component={UploadAudio} />      
           
        </main>
    </div>
  );
}

export default App;
