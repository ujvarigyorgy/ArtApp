
import './App.css';
import ArtworkDetails from './pages/ArtworkDetails';
import ArtworkList from './pages/ArtworkList';
import FavArtworks from './pages/FavArtworks';
import Header from './components/Header';
import 'bootstrap/dist/css/bootstrap.min.css';

import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";

function App() {
  return (
    <div className="App">
       <BrowserRouter>
        <Header/>
          <Routes>
            <Route path="/" element={<ArtworkList/>} />
            <Route path="/details/:id" element={<ArtworkDetails/>} />
            <Route path="/favorite" element={<FavArtworks/>} />
          </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
