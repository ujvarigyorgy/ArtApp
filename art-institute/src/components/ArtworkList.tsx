import axios from 'axios';
import {useEffect, useState} from 'react'
import { useDispatch , useSelector } from 'react-redux';
import {setProducts} from '../redux/actions/productActions';
import {setFavorite} from '../redux/actions/favoriteActions';
import { useNavigate} from "react-router-dom";
import Loader from './Loader'
import { motion } from "framer-motion"


function ArtworkDetails() {
    const dispatch = useDispatch()
    const products:any = useSelector((state) => state)
    const [loading, setLoading] = useState<boolean>(false);
    const [searchedItems, setSearched] = useState<boolean>(false);
    const [searchedResults, setSearchedResult] = useState<any>();
    const [favoriteItems, setFavoriteItems] = useState<[]>([]);
    const [textToSearch, setText] = useState<string>('');
    const [currentPage, setCurrentpage] = useState<number>(4600);
    const navigate = useNavigate()


    useEffect(() => {
        getArtist()
    },[currentPage,searchedResults]);

    const getArtist = async() => {
        setLoading(true);
        const response:any  = await axios
        .get(`https://api.artic.edu/api/v1/artworks?page=${currentPage}&limit=25`)
        .then((res:any)=>{
            dispatch(setProducts(res.data.data))
             console.log(products,'products')
             console.log(res.data,'result')

            setLoading(false)
        })
        .catch((err:any) => {
            console.log(err,'error')
            setLoading(false)
        })
    }

    const goToDetails = (id:number) => {
        navigate(`/details/:${id}`,{state:id})
    }

    const goToFavorite = () => {
        navigate('/favorite')
    }

    const search = async (keyword:string) => {
        setLoading(true);
        const response:any  = await axios
        .get(`https://api.artic.edu/api/v1/artworks/search?${keyword}`)
        .then((res:any)=>{
            console.log(res.data.data,'search result')
            setSearchedResult(res.data.data)
            setLoading(false)
            setSearched(true)
        })
        .catch((err:any) => {
            console.log(err,'error')
            setLoading(false)
            setSearched(false)
        })

    }

    

    const addToFavorite = (item:any) => {
        let newArray : any = [...favoriteItems]
        if(!newArray.includes(item)){
            newArray.push(item)
            setFavoriteItems(newArray)
            dispatch(setFavorite(newArray))
        }
      

    }
    // const removeFromFavorite = (item:any) => {
    //     let newArray : any = [...favoriteItems]
    //     console.log(item.id,'item')
    //     if(newArray.includes(item)){
    //         for (var i = 0; i < newArray.length; i++) {
    //             if (newArray[i].id === item.id) {
    //                 console.log(newArray[i],'objjj')
    //                 console.log(i,'talas')
    //                 newArray.splice(i, 1);
    //             }
    //         }
    //             dispatch(setFavorite(newArray))

    //     }
    // }


  return (
      <motion.div initial={{opacity:0}} animate={{ opacity:  1 }} transition={{duration:2}} className='artwork-list-container'>
      {
          loading ?
          (
              <Loader/>
          )
          :
          (
            <div>
                <div className='search-bar-container'>
                    <input className="form-control" placeholder="Search between artworks..." aria-label="Recipient's username" aria-describedby="basic-addon2" onChange={(e)=>setText(e.target.value)} type="text" />
                    <button type="button" className="btn btn-primary btn-sm" onClick={()=> search(textToSearch)} >Search</button>
                </div>
                {
                    searchedItems ?
                    (
                        <button type="button" className="btn btn-primary btn-sm" onClick={()=> setSearched(false)}>Back</button>
                    )
                    :
                    (
                        <div className='navigation-button-container'>
                         <button type="button" className="btn btn-primary btn-sm" onClick={()=> setCurrentpage(currentPage+1)}>Previus</button>
                         <button type="button" className="btn btn-primary btn-sm" onClick={()=> setCurrentpage(currentPage+1)}>Next</button>
                        </div>
                    )
                }
                <div  className='artworks-container'>
                    { 
                         searchedItems ?
                         (
                            Object.keys(searchedResults).map((i) => (
                                <motion.div initial={{opacity:0}} animate={{ opacity:  1 }} transition={{duration:2}}  key={i} className='artworks-box'>
                                    <div onClick={() => goToDetails(products.allArtworks.products[i].id)}>
                                        <div className='art-title' key={i}>{products.allArtworks.products[i].title}</div>
                                        <img className='thumbnail-img' src={`https://www.artic.edu/iiif/2/${products.allArtworks.products[i].image_id}/full/843,/0/default.jpg`} alt='' />
                                    </div>
                                    <div className='fav-button-container'>
                                         <button type="button" className="btn btn-primary btn-sm">Add to favorit</button>
                                    </div>
                                </motion.div>
                            ))
                         )
                         :
                         (
                             products && !searchedItems &&
                             <>
                             {
                                  Object.keys(products.allArtworks.products).map((i) =>(
                                    <div className='image-preview' key={i}>
                                        <div onClick={() => goToDetails(products.allArtworks.products[i].id)}>
                                            <div className='art-title' key={i}>{products.allArtworks.products[i].title}</div>
                                            <img className='thumbnail-img' src={`https://www.artic.edu/iiif/2/${products.allArtworks.products[i].image_id}/full/843,/0/default.jpg`} alt='' />
                                        </div>
                                        <div className='fav-button-container'>
                                            <button type="button" className="btn btn-primary btn-sm" onClick={()=> addToFavorite(products.allArtworks.products[i])}>Add to favorites</button>
                                        </div>
                                    </div>
                                ))
                             }
                             </>
                         )
                    }
                </div>
            </div>
          )
      }
      </motion.div>
  );
}

export default ArtworkDetails;
