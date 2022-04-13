import { useNavigate, Link} from "react-router-dom";


const Header = () => {
    const navigate = useNavigate()

    const goHome = () => {
        navigate(`/`)
    }
    
    const goToFavorite = () => {
        navigate('/favorite')
    }
    return (
        <div className="nav-menu">
            <Link style={{ textDecoration: 'none',color:"black" }} to="/favorite">Favorite Artworks</Link>
            <Link style={{ textDecoration: 'none', color:"black" }} to="/">Home</Link>
        </div>
    );
  };
  
  export default Header;