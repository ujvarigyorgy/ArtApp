import {Link} from "react-router-dom";
import { useState,useEffect } from 'react';

const Header = () => {

    const [show, setShow] = useState(false);
    const [lastScrollY, setLastScrollY] = useState(0);

    useEffect(() => {
        if (typeof window !== 'undefined') {
          window.addEventListener('scroll', controlNavbar);
    
          // cleanup function
          return () => {
            window.removeEventListener('scroll', controlNavbar);
          };
        }
      }, [lastScrollY]);

        const controlNavbar = () => {
        if (typeof window !== 'undefined') { 
            if (window.scrollY > lastScrollY) {
            setShow(true); 
            } else {
            setShow(false);  
            }

            setLastScrollY(window.scrollY); 
        }
        };


    return (
        <div className={`active ${show && 'hidden'}`}>
            <Link style={{ textDecoration: 'none',color:"black" }} to="/favorite">Favorite Artworks</Link>
            <Link style={{ textDecoration: 'none', color:"black" }} to="/">Home</Link>
        </div>
    );
  };
  
  export default Header;