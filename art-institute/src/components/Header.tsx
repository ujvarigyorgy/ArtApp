import { useNavigate} from "react-router-dom";




const Header = () => {
    const navigate = useNavigate()

    const goHome = () => {
        navigate(`/`)
    }
    
    const goToFavorite = () => {
        navigate('/favorite')
    }
    return (
        <div>
           <button onClick={()=> goToFavorite()}>Favorite</button>
           <button onClick={()=> goHome()}>Home</button>
        </div>
    );
  };
  
  export default Header;