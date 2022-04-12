import {useEffect, useState} from 'react'
import { useLocation } from 'react-router';
import { useDispatch , useSelector } from 'react-redux';
import axios from 'axios';




function ArtworkList() {

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
        let itemsToAdd = []
        itemsToAdd.push(item)
        // dispatch(setFavorite(itemsToAdd))
        console.log(item,'asd')
    }



  return (
    <div>
        {
            details &&
            <div>
                <div>{details.artist_display}</div>
                <img className='detail-image' src={img}></img>
                {/* <div>{img}</div> */}
                <a href={img}>link text</a>
                <button onClick={()=> addToFavorite(details)}>Add to favorites</button>
            </div>
        }
    </div>
  );
}

export default ArtworkList;
