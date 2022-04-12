import { useDispatch , useSelector } from 'react-redux';
import {useEffect, useState} from 'react'



function FavArtworks() {

// const favorites:any = useSelector((state) => state)
const state:any = useSelector((state) => state)

const dispatch = useDispatch()

useEffect(() => {
    // console.log(favorites,'favorites')   

},[]);




    return (
      <div>
          <button onClick={() => console.log(state.allArtworks.favorites,'fav')}>console</button>
          
           {
               Object.keys(state.allArtworks.favorites).map((i) => (
                <div>
                      <div>
                            <div key={i}>{state.allArtworks.favorites[i].title}</div>
                            <img src={state.allArtworks.favorites[i].thumbnail.lqip} alt=""/>
                            <button>Remove from favorite</button>
                     </div>
                </div>
            ))
          } 
       
      </div>
    );
  }
  
  export default FavArtworks;
  