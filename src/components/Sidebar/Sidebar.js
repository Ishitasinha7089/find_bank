import './Sidebar.scss'
import { Home, Heart} from 'react-feather'
import {Link, useHistory } from 'react-router-dom'
import { useEffect } from 'react'

const Sidebar = () => {
    const history = useHistory()
    useEffect(() =>{
        document.getElementById('all_banks').classList.remove('active')
        if(localStorage.getItem('key')){
            document.querySelector('nav ul a li#'+String(localStorage.getItem('key'))).classList.add('active')
        } else{
            document.querySelector('nav ul a li#all_banks').classList.add('active')
        }
    },[])
    const changeActive = (e) => {
        localStorage.setItem('key',String(e.target.id))
        var items = document.querySelectorAll('nav ul a li')
        items.forEach(x =>{
            x.classList.remove('active')
        })
        e.target.classList.add('active')
       console.log(e);
    }
    const goToMainPage = () =>{
        history.push('/')
    }
    return (
        <div className="sidebar">
            <h2 onClick={goToMainPage}>find bank</h2>
            <nav>
                <ul>
                    <Link to="/"><li id="all_banks" onClick={(e) => changeActive(e)} className="active"><Home size={20} className="icon" />All Banks</li></Link>
                    <Link to="/favorites"><li id="favorites" onClick={(e) => changeActive(e)}><Heart size={20} className="icon" />Favorites</li></Link>
                </ul>
            </nav>
        </div>
    );
}
 
export default Sidebar;