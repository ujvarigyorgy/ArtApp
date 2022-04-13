import { useDispatch , useSelector } from 'react-redux';
import { motion } from "framer-motion"
import {setFavorite} from '../redux/actions/favoriteActions';
import { useState,useEffect } from 'react';

function FavArtworks() {
const [removedList,setRemovedList] = useState()  

const state:any = useSelector((state) => state)

const dispatch = useDispatch()

useEffect(() => {
  console.log('update')
},[removedList]);


 const removeFromFavorite = (item:any) => {
        let newArray : any = state.favoriteArtworks.favorites
            for (var i = 0; i < newArray.length; i++) {
              if(i == item){
                console.log('bennevan')
                newArray.splice(i, 1);
                console.log(newArray,'removed list')
                setRemovedList(newArray)
                dispatch(setFavorite(newArray))
              }
            }
  }


    return (
      <div>
           {
             state.favoriteArtworks ?
             (
              Object.keys(state.favoriteArtworks.favorites).map((item) => (
                <motion.div key={item} initial={{opacity:0}} animate={{ opacity:  1 }} transition={{duration:2}} className='artworks-box'>
                      <div>
                            <div className='art-title' >{state.favoriteArtworks.favorites[item].title}</div>
                            <img className='thumbnail-img' src={`https://www.artic.edu/iiif/2/${state.favoriteArtworks.favorites[item].image_id}/full/843,/0/default.jpg`} alt='' />
                            <div className='fav-button-container'>
                               <button onClick={()=> removeFromFavorite(item)} type="button" className="btn btn-primary btn-sm">Remove from favorites</button>
                            </div>
                     </div>
                 </motion.div>
              ))
             )
             :
             (
                <>
                Your favorite list is empty
                </>
             )
            
              
          } 
      </div>
    );
  }
  
  export default FavArtworks;
  