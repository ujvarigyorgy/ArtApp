import {useEffect, useState} from 'react'
import { useLocation } from 'react-router';
import { useDispatch , useSelector } from 'react-redux';
import axios from 'axios';
import {setFavorite} from '../redux/actions/favoriteActions';
import { motion } from "framer-motion"
import {toast} from "react-toastify"
import "react-toastify/dist/ReactToastify.css"

toast.configure()

function ArtworkList() {
    const dispatch = useDispatch()
    const state:any = useSelector((state) => state)
    const location = useLocation()
    const [details,setDetails] = useState<any>(null)
    const [imgid,setImgId] = useState<string>('')

    useEffect(() => {
        getDetails()
    },[]);


    const getDetails = async() => {
        await axios 
        .get(`https://api.artic.edu/api/v1/artworks/${location.state}`)
        .then((res:any)=>{
            setDetails(res.data.data)
            setImgId(res.data.data.image_id)
        })
        .catch((err:any) => {
            console.log(err,'error')
        })
    }

    const addToFavorite = (item:any) => {
        let newArray : any = state.favoriteArtworks.favorites
        newArray.push(item)
        dispatch(setFavorite(newArray))
        toast.info("Added to favorites",{position:toast.POSITION.TOP_CENTER, hideProgressBar:true,autoClose:2000})
    }


  return (
    <div>
        {
            details &&
            <motion.div className='detail-container' >
                <motion.div initial={{opacity:0}} animate={{ opacity:  1 }} transition={{duration:1}}>
                    <img src={`https://www.artic.edu/iiif/2/${imgid}/full/843,/0/default.jpg`} alt='' />
                </motion.div>
                <motion.div className='details-info-container' initial={{opacity:0}} animate={{ opacity:  1 }} transition={{duration:3}}>
                    <div>
                        <div className='art-title'>{details.artist_display}</div>
                        <div>{details.credit_line}</div>
                        <div>{details.date_display}</div>
                        <div>Department: {details.department_title}</div>
                        <div>Place of Origin : {details.place_of_origin}</div>
                        <button type="button" className="btn btn-secondary btn-sm" onClick={()=> addToFavorite(details)}>Add to favorites</button>
                    </div>
                </motion.div>
            </motion.div>
        }
    </div>
  );
}

export default ArtworkList;
