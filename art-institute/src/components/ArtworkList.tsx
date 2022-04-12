import {useEffect, useState} from 'react'
import { useLocation } from 'react-router';
import { useDispatch , useSelector } from 'react-redux';
import axios from 'axios';
import {setFavorite} from '../redux/actions/favoriteActions';


function ArtworkList() {
    const state:any = useSelector((state) => state)
    const location = useLocation()
    const dispatch = useDispatch()
    const [details,setDetails] = useState<any>(null)
    const [imgid,setImgId] = useState<string>('')
    const [img,setImg] = useState<string>('')

    const iiif_url = `https://www.artic.edu/iiif/2/${imgid}`
    
    

    useEffect(() => {
        getDetails()
    },[]);


    const getDetails = async() => {
        const response:any  = await axios 
        .get(`https://api.artic.edu/api/v1/artworks/${location.state}`)
        .then((res:any)=>{
            console.log(res.data.data.image_id,'response')
            setDetails(res.data.data)
            setImgId(res.data.data.image_id)
                axios .get(`https://www.artic.edu/iiif/2/${res.data.data.image_id}/full/843,/0/default.jpg`)
                .then((res:any)=>{
                    console.log(res.data,'response  iiiim')
                    setImg(res.data)
                })
                .catch((err:any) => {
                    // console.log(err,'error')
                })
            
        })
        .catch((err:any) => {
            console.log(err,'error')
        })
    }

    const addToFavorite = (item:any) => {
        console.log(details,'haaalo')
        // console.log(state.allArtworks.favorites,'faaaav')
        let newArray : any = state.allArtworks.favorites
        newArray.push(item)
        dispatch(setFavorite(newArray))
        console.log(newArray,'asd')
    }



  return (
    <div>
        {
            details &&
            <div>
                <div>{details.artist_display}</div>
                <img
                    src={`https://www.artic.edu/iiif/2/${imgid}/full/843,/0/default.jpg`}
                    alt='' />
                <button onClick={()=> addToFavorite(details)}>Add to favorites</button>
            </div>
        }
    </div>
  );
}

export default ArtworkList;
