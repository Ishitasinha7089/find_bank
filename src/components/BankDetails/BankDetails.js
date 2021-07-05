import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import './BankDetails.scss'

const BankDetails = () => {
    const location = useLocation()
    const [bankData, setBankData] = useState()
    useEffect(() =>{
        setBankData(location.state.data)
    },[location.state.data])
    return (
        bankData ? <div className="bank-details">
            <h2>bank details</h2>
            <h3>{bankData.bank_name},{bankData.city}</h3>
            <table cellSpacing="0" cellPadding="0">
                <tbody>
                    <tr>
                        <td>Bank ID</td>
                        <td>{bankData.bank_id}</td>
                    </tr>
                    <tr>
                        <td>IFSC</td>
                        <td>{bankData.ifsc}</td>
                    </tr>
                    <tr>
                        <td>Address</td>
                        <td>{bankData.address}</td>
                    </tr>
                    <tr>
                        <td>City</td>
                        <td>{bankData.city}</td>
                    </tr>
                    <tr>
                        <td>District</td>
                        <td>{bankData.district}</td>
                    </tr>
                    <tr>
                        <td>State</td>
                        <td>{bankData.state}</td>
                    </tr>
                </tbody>
            </table>
            {/* <p><b>Bank ID: </b>{bankData.bank_id}</p>
            <p><b>IFSC: </b>{bankData.ifsc}</p>
            <p><b>Branch: </b>{bankData.branch}</p>
            <p><b>City: </b>{bankData.city}</p>
            <p><b>District: </b>{bankData.district}</p>
            <p><b>State: </b>{bankData.state}</p>
            <p><b>Address: </b>{bankData.address}</p> */}
       </div> :
       <div className="loading">

       </div>
    );
}
 
export default BankDetails;