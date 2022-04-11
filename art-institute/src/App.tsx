
import './App.css';
import ArtworkDetails from './components/ArtworkDetails';
import ArtworkList from './components/ArtworkList';
import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";

function App() {
  return (
    <div className="App">
       <BrowserRouter>
          <Routes>
            <Route path="/" element={<ArtworkDetails/>} />
            <Route path="/details/:id" element={<ArtworkList/>} />
          </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
