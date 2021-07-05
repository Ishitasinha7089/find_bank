import Pagination from "../Pagination/Pagination"
import { ChevronDown, Search } from 'react-feather';
import './AllBanks.scss'
import { useEffect, useState } from "react";
import axios from 'axios';

const AllBanks = () => {
    const [allBanks, setAllBanks] = useState()
    const [banks, setBanks] = useState()
    const [city, setCity] = useState('mumbai')
    const [category, setCategory] = useState('')
    const [error, setError] = useState('')

    const getBanks = (city) =>{
        return axios.get(`https://vast-shore-74260.herokuapp.com/banks?city=`+ city.toUpperCase())
        
    }

    useEffect(() =>{
        getBanks(city)
        .then(res =>{
            setBanks(res.data)
            setAllBanks(res.data)
        })
        .catch(error =>{
            setError(error)
            alert(error)
        })
    },[city])
    
    const showDropDown = (e) =>{
         document.getElementsByClassName(e.target.id)[0].classList.toggle('hideshow')
    }
    const showSearchData = (e) =>{
        if(category!=='' && category!=='none'){
            let items = allBanks.filter(ele =>{
                return String(ele[category]).toLowerCase().includes(e.target.value.toLowerCase())
            })
            setBanks(items)
        } else{
            alert('Please select a category')
            return
        }
        
    }
    const changeActive = (e, key) =>{
        if(key==='category'){
            setCategory(e.target.id)
        } else{
            setCity(e.target.textContent)
        }
        let items = document.querySelectorAll("."+key+" ul li")
        items.forEach(ele =>{
            ele.classList.remove('activeItem')
        })
        e.target.classList.add('activeItem')
         document.getElementById(key).childNodes[0].textContent = e.target.textContent
        document.getElementsByClassName(key)[0].classList.toggle('hideshow')
    }
    return (
        <div className="all-banks">
             <div className="header">
           {/* <select name="city" id="city">
               <option value="bhopal">Bhopal</option>
               <option value="bhopal">Bangalore</option>
               <option value="bhopal">Hyderabad</option>
               <option value="bhopal">Chennai</option>
               <option value="bhopal">Mumbai</option>
           </select> */}
           <div className="input-wrapper">
                <Search className="search" size={22} />
                <input type="text" placeholder="Search" onChange={(e) => showSearchData(e)} />
           </div>
           <div className="dropdowns">
           <div className="cities">
                <div className="select" id="city" onClick={(e) => showDropDown(e)}>
                    Mumbai
                    {/* <ChevronUp className="up" size={20} /> */}
                    <ChevronDown className="down" size={18} />
                </div>
                <div className="options city">
                    <ul>
                        <li className="activeItem" onClick={(e) =>changeActive(e, 'city')}>Mumbai</li>
                        <li onClick={(e) =>changeActive(e, 'city')}>Bhopal</li>
                        <li onClick={(e) =>changeActive(e, 'city')}>Bangalore</li>
                        <li onClick={(e) =>changeActive(e, 'city')}>Chennai</li>
                        <li onClick={(e) =>changeActive(e, 'city')}>Hyderabad</li>
                    </ul>
                </div>
           </div>
           <div className="categories">
                <div className="select" id="category" onClick={(e) => showDropDown(e)}>
                    Select Category
                    <ChevronDown className="down" size={18} />
                </div>
                <div className="options category">
                    <ul>
                        <li className="activeItem" id='none' onClick={(e) =>changeActive(e, 'category')}>Select Category</li>
                        <li id='bank_name' onClick={(e) =>changeActive(e, 'category')}>Bank name</li>
                        <li id="ifsc" onClick={(e) =>changeActive(e, 'category')}>IFSC</li>
                        <li id="branch" onClick={(e) =>changeActive(e, 'category')}>Branch</li>
                        <li id="bank_id" onClick={(e) =>changeActive(e, 'category')}>Bank ID</li>
                        <li id="address" onClick={(e) =>changeActive(e, 'category')}>Address</li>
                    </ul>
                </div>
           </div>
           </div>
        </div>
          <h2>All banks</h2>
          {!banks && error &&  <div className="loading">
                        <h4>{error}</h4>
                        </div>}
            {!banks && !error &&  <div className="loading">
                        <h4>LOADING...</h4>
                        </div>}
            { banks && !error && <Pagination data={banks} rowLimit={10} pageLimit={5} />}
        </div>
    );
}
 
export default AllBanks;