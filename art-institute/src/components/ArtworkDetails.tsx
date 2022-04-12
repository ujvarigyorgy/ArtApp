import axios from 'axios';
import {useEffect, useState} from 'react'
import { useDispatch , useSelector } from 'react-redux';
import {setProducts,setFavorite} from '../redux/actions/productActions';
import { useNavigate} from "react-router-dom";
import Loader from './Loader'


function ArtworkDetails() {
    const dispatch = useDispatch()
    const products:any = useSelector((state) => state)
    const [loading, setLoading] = useState<boolean>(false);
    const [searchedItems, setSearched] = useState<boolean>(false);
    const [searchedResults, setSearchedResult] = useState<any>();
    const [favoriteItems, setFavoriteItems] = useState<[]>([]);
    const [textToSearch, setText] = useState<string>('');
    const [currentPage, setCurrentpage] = useState<number>(1);
    const navigate = useNavigate()


    useEffect(() => {
        getArtist()

    },[currentPage]);

    useEffect(() => {
        // console.log(favoriteItems,'fav items')
        dispatch(setFavorite(favoriteItems))

    },[favoriteItems]);




    const getArtist = async() => {
        setLoading(true);
        const response:any  = await axios
        .get(`https://api.artic.edu/api/v1/artworks?page=${currentPage}&limit=25`)
        .then((res:any)=>{
            dispatch(setProducts(res.data.data))
             console.log(products,'products')
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
        newArray.push(item)
        setFavoriteItems(newArray)
    }
    const removeFromFavorite = (item:any) => {
        let newArray : any = [...favoriteItems]
        newArray.push(item)
        setFavoriteItems(newArray)
    }


  return (
      <div className='artwork-list-container'>
      {
          loading ?
          (
              <Loader/>
          )
          :
          (
            <div>
                <div>
                    <input onChange={(e)=>setText(e.target.value)} type="text" />
                    <button onClick={()=> search(textToSearch)} >Search</button>
                </div>
                {
                    searchedItems ?
                    (
                        <button onClick={()=> setSearched(false)}>Back</button>
                    )
                    :
                    (
                        <>
                         <button onClick={()=> setCurrentpage(currentPage+1)}>Previus</button>
                         <button onClick={()=> setCurrentpage(currentPage+1)}>Next</button>
                        </>
                    )
                }
                <div className='artworks-container'>
                    {
                         searchedItems ?
                         (
                            Object.keys(searchedResults).map((i) => (
                                <div key={i} className='artworks-box'>
                                    <div onClick={() => goToDetails(products.allArtworks.products[i].id)}>
                                        <div key={i}>{products.allArtworks.products[i].title}</div>
                                        <img className='thumbnail-img' src={products.allArtworks.products[i].thumbnail.lqip} alt=""/>
                                    </div>
                                    <div>
                                         <button>Add to favorit</button>
                                         <button onClick={()=> console.log(products,'products')}>Remove from favorit</button>
                                    </div>
                                </div>
                            ))
                         )
                         :
                         (
                           
                            Object.keys(products.allArtworks.products).map((i) =>(
                                <div key={i}>
                                    <div onClick={() => goToDetails(products.allArtworks.products[i].id)}>
                                         <div key={i}>{products.allArtworks.products[i].title}</div>
                                         {
                                             products.allArtworks.products[i].thumbnail.lqip &&
                                            <img className='thumbnail-img' src={products.allArtworks.products[i].thumbnail.lqip ? products.allArtworks.products[i].thumbnail.lqip : ''} alt=""/>
                                         }
                                    </div>
                                    <div>
                                        <button onClick={()=> addToFavorite(products.allArtworks.products[i])}>Add to favorit</button>
                                        <button onClick={()=> console.log(products,'products')}>Remove from favorit</button>
                                    </div>
                                </div>
                            ))
                         )
                    }
                </div>
               
            </div>
          )
      }
      </div>

  );
}

export default ArtworkDetails;
