import { useDispatch , useSelector } from 'react-redux';
import { setFavorite } from '../redux/actions/productActions';
import {useEffect, useState} from 'react'



function FavArtworks() {

// const favorites:any = useSelector((state) => state)
const products:any = useSelector((state) => state)

const dispatch = useDispatch()

useEffect(() => {
    // console.log(favorites,'favorites')   
    console.log(products,'favorites')    

},[]);



    return (
      <div>
          fav
          {/* {
               Object.keys(favorites.favoriteArtworks.favorites).map((i) => (
                <div>
                      <div>
                            <div key={i}>{favorites.favoriteArtworks.favorites[i].title}</div>
                            <img src="" alt=""/>
                     </div>
                </div>
            ))
          } */}
       
      </div>
    );
  }
  
  export default FavArtworks;
  