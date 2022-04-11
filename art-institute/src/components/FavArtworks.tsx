import { useDispatch , useSelector } from 'react-redux';
import { setFavorite } from '../redux/actions/productActions';
import {useEffect, useState} from 'react'



function FavArtworks() {

const favorites:any = useSelector((state) => state)
const dispatch = useDispatch()

useEffect(() => {
    console.log(favorites,'favorites')    
},[]);



    return (
      <div>
       
      </div>
    );
  }
  
  export default FavArtworks;
  