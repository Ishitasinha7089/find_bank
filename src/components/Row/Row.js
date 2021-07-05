import './Row.scss'
import {Heart} from 'react-feather'
import { useHistory } from 'react-router-dom'

const Row = ({keyNo, data }) => {
    const history = useHistory()
    
    const addToFavorites = (e)=>{
        e.stopPropagation()
        let item = localStorage.getItem(data.ifsc)
        let ele = document.getElementsByClassName('heart')[keyNo-1]
        if(item) {
            ele.classList.remove('fav')
            localStorage.removeItem(data.ifsc)
        }else{
            localStorage.setItem(data.ifsc, JSON.stringify(data))
            ele.classList.add('fav')
        }
    }

    const showBankDetails = () =>{
        history.push({
            pathname:`/bank_details/${data.ifsc}`,
            state: { data: data}
        })
    }
    return (
            <tr className="row" onClick={showBankDetails}>
                <td>{keyNo}</td>
                <td>{data.bank_name}</td>
                <td>{data.ifsc}</td>
                <td>{data.branch}</td>
                <td>{data.bank_id}</td>
                <td>{data.address}</td>
                <td>
                    <Heart className={`heart ${localStorage.getItem(data.ifsc) ? ' fav' : null}`} onClick={(e) => addToFavorites(e)}  />
                </td>
            </tr>
    );
}
 
export default Row;