import React, { useEffect, useState } from 'react'
import AddStock from "../components/addstock";
import "./addstock.css"
function addstock() {
    const [fivestock, setfivestock] = useState([]);
    const fetchfivestock = async () => {
        try {
            const response = await fetch('http://localhost:5510/api/addstock/getfiveaddstock');
            if (!response.ok) throw new Error('Failed to load products');
            const data = await response.json();
            setfivestock(data);
            console.log(data);
        } catch (error) {
            console.error('Error fetching stock', error);
        }
    };
    useEffect(() => {
        fetchfivestock();
    }, []);
    return (
        <>
            <div className='addstock'>
                <h1>Addstock</h1>
                <AddStock fetchfivestock={fetchfivestock} />
            </div>
            <div className="stock-details">
                <h1>Last 5 Added Stock Details</h1>
                {fivestock.length > 0 ? (
                    <table border={1}>
                        <thead>
                            <tr>
                                <th>Name</th>
                                <th>Code</th>
                                <th>Quantity</th>
                                <th>TotalAmount</th>
                                <th>Date</th>
                            </tr>
                        </thead>
                        <tbody>
                            {fivestock.map((fivestocks) => {
                                const date = new Date(fivestocks.createdAt).toISOString().split('T')[0];
                                return (
                                    <tr key={fivestocks._id}>
                                        <td>{fivestocks.name}</td>
                                        <td>{fivestocks.code}</td>
                                        <td>{fivestocks.quantity}</td>
                                        <td>{fivestocks.totalamount}</td>
                                        <td>{date}</td>
                                    </tr>);
                            })}
                        </tbody>
                    </table>
                ) : (
                    <p>No Added stock Yet</p>
                )};
            </div>

        </>
    )
}

export default addstock

