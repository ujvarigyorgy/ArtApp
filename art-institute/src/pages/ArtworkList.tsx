import axios from 'axios';
import {useEffect, useState} from 'react'
import { useDispatch , useSelector } from 'react-redux';
import {setArtworks} from '../redux/actions/artworkActions';
import {setFavorite} from '../redux/actions/favoriteActions';
import { useNavigate} from "react-router-dom";
import Loader from '../components/Loader'
import { motion } from "framer-motion"
import {toast} from "react-toastify"
import "react-toastify/dist/ReactToastify.css"

toast.configure()

function ArtworkDetails() {
    const dispatch = useDispatch()
    const artworks:any = useSelector((state) => state)
    const [loading, setLoading] = useState<boolean>(false);
    const [searchedItems, setSearched] = useState<boolean>(false);
    const [searchedResults, setSearchedResult] = useState<any>();
    const [textToSearch, setText] = useState<string>('');
    const [currentPage, setCurrentpage] = useState<number>(1);
    const [pages, setPages] = useState<number>();
    const navigate = useNavigate()


    useEffect(() => {
        getArtist()
    },[currentPage,searchedResults]);

    const getArtist = async() => {
        setLoading(true);
        await axios
        .get(`https://api.artic.edu/api/v1/artworks?page=${currentPage}&limit=25`)
        .then((res:any)=>{
            setPages(res.data.pagination.total_pages)
            dispatch(setArtworks(res.data.data))
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

    const search = async (keyword:string) => {
        setLoading(true);
        await axios
        .get(`https://api.artic.edu/api/v1/artworks/search?q=${keyword}`)
        .then((res:any)=>{
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
        let newArray : any = artworks.favoriteArtworks.favorites
        if(!newArray.includes(item)){
            newArray.push(item)
            dispatch(setFavorite(newArray))
            toast.info("Added to favorites",{position:toast.POSITION.TOP_CENTER, hideProgressBar:true,autoClose:2000})
        }
        else{
            console.log('contains already')
        }
    }
   

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
                    <button type="button" className="btn btn-secondary btn-sm" onClick={()=> search(textToSearch)} >Search</button>
                </div>
                {
                    searchedItems ?
                    (
                        <button type="button" className="btn btn-secondary btn-sm" onClick={()=> setSearched(false)}>Back</button>
                    )
                    :
                    (
                        <div className='navigation-button-container'>
                            <div className='button-container'>
                                 <button disabled={currentPage <= 1} type="button" className="btn btn-secondary btn-sm" onClick={()=> setCurrentpage(currentPage-1)}>Back</button>
                            </div>
                         <select className="form-select form-select-lg sm-3" aria-label=".form-select-sm example" onChange={(e) =>setCurrentpage(parseInt(e.target.value))}>
                            {Array.apply(1, Array(pages)).map(function (x, i) {
                                return <option key={i}>{i+1 }</option>;
                            })}
                         </select>
                         <div className='button-container'>
                             <button type="button" className="btn btn-secondary btn-sm" onClick={()=> setCurrentpage(currentPage+1)}>Next</button>
                        </div>
                        </div>
                    )
                }
                <div  className='artworks-container'>
                    { 
                         searchedItems ?
                         (
                            searchedResults.map((item:any) => (
                                <motion.div initial={{opacity:0}} animate={{ opacity:  1 }} transition={{duration:2}}  key={item} className='artworks-box'>
                                    <div onClick={() => goToDetails(item.id)}>
                                        <div className='art-title' key={item}>{item.title}</div>
                                        <img className='thumbnail-img' src={`https://www.artic.edu/iiif/2/${item.id}/full/843,/0/default.jpg`} alt='' />
                                    </div>
                                    <div className='fav-button-container'>
                                         <button type="button" onClick={()=> addToFavorite(item)} className="btn btn-secondary btn-sm">Add to favorite</button>
                                    </div>
                                </motion.div>
                            ))
                         )
                         :
                         (
                             artworks && !searchedItems &&
                             <>
                             <div className='page-nr'>Page  {currentPage}</div>
                             {
                                  Object.keys(artworks.allArtworks.artworks).map((i) =>(
                                    <div className='image-preview' key={i}>
                                        <div onClick={() => goToDetails(artworks.allArtworks.artworks[i].id)}>
                                            <div className='art-title'>{artworks.allArtworks.artworks[i].title}</div>
                                            <img className='thumbnail-img' src={`https://www.artic.edu/iiif/2/${artworks.allArtworks.artworks[i].image_id}/full/843,/0/default.jpg`} alt='' />
                                        </div>
                                        <div className='fav-button-container'>
                                            <button type="button" className="btn btn-secondary btn-sm" onClick={()=> addToFavorite(artworks.allArtworks.artworks[i])}>Add to favorites</button>
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
