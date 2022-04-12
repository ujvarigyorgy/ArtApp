import { useDispatch , useSelector } from 'react-redux';
import {useEffect, useState} from 'react'
import { motion } from "framer-motion"

function FavArtworks() {

// const favorites:any = useSelector((state) => state)
const state:any = useSelector((state) => state)

const dispatch = useDispatch()

useEffect(() => {
    // console.log(favorites,'favorites')   

},[]);




    return (
      <div>
           {
               Object.keys(state.allArtworks.favorites).map((i) => (
                <motion.div initial={{opacity:0}} animate={{ opacity:  1 }} transition={{duration:2}} className='artworks-box'>
                      <div>
                            <div key={i}>{state.allArtworks.favorites[i].title}</div>
                            <img className='thumbnail-img' src={`https://www.artic.edu/iiif/2/${state.allArtworks.products[i].image_id}/full/843,/0/default.jpg`} alt='' />
                            <button>Remove from favorite</button>
                     </div>
                </motion.div>
            ))
          } 
      </div>
    );
  }
  
  export default FavArtworks;
  