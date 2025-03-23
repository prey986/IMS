import React, { useState, useEffect } from 'react'
import Addsale from '../components/addsale';
function addsale() {
    const [fivesale, setfivesale] = useState([]);
    const fetchfivesale = async () => {
        try {
            const response = await fetch('http://localhost:5510/api/addsales/getfivesale');
            if (!response.ok) throw new Error('Failed to load products');
            const data = await response.json();
            setfivesale(data);
            console.log(data);
        } catch (error) {
            console.error('Error fetching stock', error);
        }
    };
    useEffect(() => {
        fetchfivesale();
    }, []);
    return (
        <>
            <div className='addsale'>
                <h1>Add Sale</h1>
                <Addsale fetchfivesale={fetchfivesale} />
            </div>
            <div className="page-container">
                <h1>Last 5 Added sale Details</h1>
                {fivesale.length > 0 ? (
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
                            {fivesale.map((fivesales) => {
                                const date = new Date(fivesales.createdAt).toISOString().split('T')[0];
                                return (
                                    <tr key={fivesales._id}>
                                        <td>{fivesales.name}</td>
                                        <td>{fivesales.code}</td>
                                        <td>{fivesales.quantity}</td>
                                        <td>{fivesales.totalamount}</td>
                                        <td>{date}</td>
                                    </tr>
                                );
                            })}
                        </tbody>
                    </table>
                ) : (
                    <p>No Added stock Yet</p>
                )}
            </div>
        </>
    )
}

export default addsale
