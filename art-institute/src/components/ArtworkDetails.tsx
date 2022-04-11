import axios from 'axios';
import {useEffect, useState} from 'react'
import { useDispatch , useSelector } from 'react-redux';
import { setProducts } from '../redux/actions/productActions';
import { useNavigate } from "react-router-dom";


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
        .get(`https://api.artic.edu/api/v1/artworks/search?q=${keyword}`)
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


  return (
      <>
      {
          loading ? 
          (
              <div>Loading...</div>
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
                                <div onClick={() => goToDetails(products.allProducts.products[i].id)}>
                                     <div key={i}>{products.allProducts.products[i].title}</div>
                                     <img src="" alt=""/>
                                </div>
                            ))
                         )
                         :
                         (
                            Object.keys(products.allProducts.products).map((i) => (
                                <div onClick={() => goToDetails(products.allProducts.products[i].id)}>
                                     <div key={i}>{products.allProducts.products[i].title}</div>
                                     <img src="" alt=""/>
                                </div>
                            ))
                         )
                    }
                </div>
                <button onClick={()=> setCurrentpage(currentPage+1)}>Previus</button>
                <button onClick={()=> setCurrentpage(currentPage+1)}>Next</button>
            </div>
          )
      }
      </>
   
  );
}

export default ArtworkDetails;
