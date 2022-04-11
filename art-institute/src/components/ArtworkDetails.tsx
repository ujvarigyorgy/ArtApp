import axios from 'axios';
import {useEffect, useState} from 'react'
import { useDispatch , useSelector } from 'react-redux';
import {setProducts} from '../redux/actions/productActions';
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
        console.log(favoriteItems,'fav items')
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


  return (
      <>
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
                <div className='artworks-container'>
                    {
                         searchedItems ?
                         (
                            Object.keys(searchedResults).map((i) => (
                                <div className='artworks-box'>
                                    <div onClick={() => goToDetails(products.allArtworks.products[i].id)}>
                                        <div key={i}>{products.allArtworks.products[i].title}</div>
                                        <img className='thumbnail-img' src={products.allArtworks.products[i].thumbnail.lqip} alt=""/>
                                    </div>
                                    <div>
                                         <button>Add to favorit</button>
                                         <button>Remove from favorit</button>
                                    </div>
                                </div>
                            ))
                         )
                         :
                         (
                            Object.keys(products.allArtworks.products).map((i) => (
                                <div>
                                    <div onClick={() => goToDetails(products.allArtworks.products[i].id)}>
                                         <div key={i}>{products.allArtworks.products[i].title}</div>
                                         <img className='thumbnail-img' src="" alt=""/>
                                    </div>
                                    <button onClick={()=> addToFavorite(products.allArtworks.products[i])}>Add to favorit</button>
                                    <button>Remove from favorit</button>
                                </div>
                            ))
                         )
                    }
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
            </div>
          )
      }
      </>

  );
}

export default ArtworkDetails;
