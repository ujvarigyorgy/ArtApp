import axios from 'axios';
import {useEffect, useState} from 'react'
import { useDispatch , useSelector } from 'react-redux';
import { setFavorite, setProducts } from '../redux/actions/productActions';
import { useNavigate } from "react-router-dom";
import Loader from './Loader'


function ArtworkDetails() {
    const dispatch = useDispatch()
    const products:any = useSelector((state) => state)
    const [loading, setLoading] = useState<boolean>(false);
    const [searchedItems, setSearched] = useState<boolean>(false);
    const [searchedResults, setSearchedResult] = useState<any>();
    const [textToSearch, setText] = useState<string>('');

    const [currentPage, setCurrentpage] = useState<number>(1);
    const navigate = useNavigate()


    useEffect(() => {
        console.log(products)
        getArtist()
        
    },[currentPage]);




    const getArtist = async() => {
        setLoading(true);
        const response:any  = await axios 
        .get(`https://api.artic.edu/api/v1/artworks?page=${currentPage}&limit=25`)
        .then((res:any)=>{
            dispatch(setProducts(res.data.data))
            console.log(products.allProducts,'products')
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
        let itemsToAdd = []
        itemsToAdd.push(item)
        dispatch(setFavorite(itemsToAdd))
        console.log(item,'asd')
        // let itemsToAdd = []
        // itemsToAdd.push(item)
        // console.log(itemsToAdd,'item to add')
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
                <div>
                    {
                         searchedItems ?
                         (
                            Object.keys(searchedResults).map((i) => (
                                <div>
                                    <div onClick={() => goToDetails(products.allArtworks.products[i].id)}>
                                        <div key={i}>{products.allArtworks.products[i].title}</div>
                                        <img src="" alt=""/>
                                    </div>
                                     <button >Add to favorit</button>
                                     <button>Remove from favorit</button>
                                </div>
                            ))
                         )
                         :
                         (
                            Object.keys(products.allArtworks.products).map((i) => (
                                <div>
                                    <div onClick={() => goToDetails(products.allArtworks.products[i].id)}>
                                         <div key={i}>{products.allArtworks.products[i].title}</div>
                                         <img src="" alt=""/>
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
