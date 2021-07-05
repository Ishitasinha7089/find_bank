import { useEffect, useState } from "react";
import './Favorites.scss'
import Pagination from "../Pagination/Pagination";

const Favorites = () => {
    const [banks, setBanks] = useState()
    useEffect(() =>{
        let items =[]
        for ( var i = 0; i < localStorage.length; i++ ) {
            if(localStorage.key( i )!=='key'){
                items.push(JSON.parse(localStorage.getItem( localStorage.key( i ) )))
            }
          }
          setBanks(items)
    },[])
    return (
        <div className="favs">
            <h2>Favorites</h2>
            {!banks && <div className="loading">
                        <h4>LOADING...</h4>
                </div>}
            { banks && <Pagination data={banks} rowLimit={10} pageLimit={5} />}
        </div>
    );
}
 
export default Favorites;