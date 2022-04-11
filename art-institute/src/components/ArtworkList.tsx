import {useEffect, useState} from 'react'
import { useLocation } from 'react-router';
import axios from 'axios';


function ArtworkList() {

    const location = useLocation()
    const [details,setDetails] = useState<any>(null)
    

    useEffect(() => {
        getDetails()
    },[]);


    const getDetails = async() => {
        const response:any  = await axios 
        .get(`https://api.artic.edu/api/v1/artworks/${location.state}`)
        .then((res:any)=>{
            console.log(res.data.data,'response')
            setDetails(res.data.data)
        })
        .catch((err:any) => {
            console.log(err,'error')
        })
    }

  return (
    <div>
        {
            details &&
            <div>
                <div>{details.artist_display}</div>
                <img className='detail-image' src={details.thumbnail.lqip}></img>
            </div>
        }
    </div>
  );
}

export default ArtworkList;
