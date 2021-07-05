import './Pagination.scss'
import {Heart, ChevronLeft, ChevronRight} from 'react-feather'
import { useEffect, useState } from 'react';
import Row from '../Row/Row';

const Pagination = ({data, pageLimit}) => {
    const [rowLimit, setRowLimit] = useState(10)
    const [totalPages, setTotalPages] = useState(Math.round(data.length / rowLimit))
    const [currPage, setCurrPage] = useState(1)
    
    useEffect(() =>{
        setTotalPages(Math.round(data.length / rowLimit))
    },[data, rowLimit])

    const nextPage = () =>{
        if(currPage === totalPages){
            return
        }
        setCurrPage(currPage+1)
    }
    const prevPage = () =>{
        if(currPage ===1){
            return
        }
        setCurrPage(currPage-1)
    }
    const changePage = (e) =>{
        const pageNo = Number(e.target.textContent)
        setCurrPage(pageNo)
    }
    const pageData = () =>{
        const start = currPage * rowLimit - rowLimit
        const end = start + rowLimit
        return data.slice(start, end)
    }
    const pageGroup = () =>{
        let start = Math.floor((currPage -1) / pageLimit) * pageLimit;
        if(data.length<pageLimit*rowLimit){
            if(data.length<=rowLimit){
                return new Array(1).fill().map((_, idx) => start + idx + 1);
            } else{
                return new Array(parseInt(data.length/rowLimit)+1).fill().map((_, idx) => start + idx + 1);
            }
            
        } else{
            return new Array(pageLimit).fill().map((_, idx) => start + idx + 1);
        }
    }
    const jumpToLast = () =>{
        setCurrPage(totalPages - pageLimit)
    }
    const jumpToPageNo = (e) =>{
        if(e.target.value===""){
            setCurrPage(1)
        } else{
            if(e.target.value>totalPages){
                alert('Invalid page number')
            } else{
                const pageNo = Number(e.target.value)
                setCurrPage(pageNo)
            }
        }
    }
    const changeRowLimit =(e) =>{
        setRowLimit(Number(e.target.value))
        setTotalPages(Math.round(data.length / Number(e.target.value)))
    }

    return (
        
         <div className="page">
           <div className="table-wrapper">
           <table className="pageTable" cellSpacing="0" cellPadding="0">
                <thead>
                    <tr>
                        <th>#</th>
                        <th>Bank</th>
                        <th>IFSC</th>
                        <th>Branch</th>
                        <th>Bank ID</th>
                        <th>Address</th>
                        <th><Heart size={20} /></th>
                    </tr>
                </thead>
                <tbody>
                    { pageData().map((res,indx) =>(
                        <Row keyNo={indx + (currPage-1)*rowLimit + 1} data={res} key={indx} />
                    ))}
                   
                </tbody>
                
                

            </table>
           </div>
            {data.length===0 && <div className="nodata">
                        <h4>No banks found...</h4>
                    </div>}
            <div className="pagination">
               <div className="inputs">
                    <div className="rowlimit">
                        <h4>Rows per page:</h4>
                        <input value={rowLimit} onChange={(e) => changeRowLimit(e)} type="text" />
                    </div>
                    <div className="jumpto">
                        <h4>Jump to page number:</h4>
                        <input onChange={(e) => jumpToPageNo(e)} type="text" />
                    </div>
                </div>
                
                 <div className="btn-group">
                 <ChevronLeft size={40} className={`pageNav ${currPage ===1 ? 'disable' : ''}`} 
                 onClick={prevPage}
                 />
                 { pageGroup().map((item, indx) =>{
                     return <button key={indx} onClick={changePage} className={`pageNavBtn ${currPage === item ? 'activePage' : null}`}>
                        {item}
                     </button>
                 })}
                  { (totalPages - currPage) >= pageLimit && <span>...</span>}
                  {(totalPages - currPage) >= pageLimit && <button onClick={jumpToLast} className="pageNavBtn">{totalPages}</button>}
                 <ChevronRight size={40} className={`pageNav ${currPage === totalPages ? 'disable' : ''}`} 
                 onClick={nextPage}
                 />
                 </div>
                 
            </div>
        </div>
    );
}
 
export default Pagination;