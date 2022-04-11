import axios from 'axios';
import {useEffect, useState} from 'react'
import { useDispatch , useSelector } from 'react-redux';
import { setProducts } from '../redux/actions/productActions';


function ArtworkDetails() {
    const dispatch = useDispatch()
    const products:any = useSelector((state) => state)
    const [loading, setLoading] = useState(false);
    const [curresntPage, setCurrentpage] = useState(1);



    useEffect(() => {
        setLoading(true);
        getArtist()
        
    },[curresntPage]);


    const getArtist = async() => {
        const response:any  = await axios 
        .get(`https://api.artic.edu/api/v1/artworks?page=${curresntPage}&limit=25`)
        .then((res:any)=>{
            dispatch(setProducts(res.data.data))
            console.log(products.allProducts.products[10].thumbnail,'products')
        })
        .catch((err:any) => {
            console.log(err,'error')
        })
    }
  return (
    <div>
        {Object.keys(products.allProducts.products).map((i) => (
            <div>
                 <div key={i}>{products.allProducts.products[i].title}</div>
                 <img src="" alt=""/>
            </div>
        ))}
        <button onClick={()=> setCurrentpage(curresntPage+1)}>Previus</button>
        <button onClick={()=> setCurrentpage(curresntPage+1)}>Next</button>
    </div>
  );
}

export default ArtworkDetails;
