import React, { useState } from 'react';

function Reports() {
    const [startDate, setStartDate] = useState("");
    const [endDate, setEndDate] = useState("");
    const [sales, setAllsales] = useState([]);

    const handleStartDateChange = (e) => {
        setStartDate(e.target.value);
    };

    const handleEndDateChange = (e) => {
        setEndDate(e.target.value);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!startDate || !endDate) {
            alert('Please select both start and end dates');
            return;
        }
        const fetchsales = async () => {
            try {
                const response = await fetch(`http://localhost:5510/api/reports/salesreport?startDate=${startDate}&endDate=${endDate}`);
                if (!response.ok) throw new Error('Failed to load sales');
                const data = await response.json();
                setAllsales(data);
                console.log(data);
            } catch (error) {
                console.error('Error fetching products:', error);
            }
        };
        fetchsales();
    };
    const totalSaleAmount = sales.reduce((total, sale) => total + sale.totalamount, 0);

    return (
        <>
            <div className='reports'>
                <h1>Sales Reports</h1>
                <h2>Select Date Range</h2>
            </div>
            <div>
                <div>
                    <form onSubmit={handleSubmit} className='salereportfrom'>
                        <div>
                            <label>Start Date: </label>
                            <input
                                type="date"
                                value={startDate}
                                onChange={handleStartDateChange}
                                required
                            />
                        </div>
                        <div>
                            <label>End Date: </label>
                            <input
                                type="date"
                                value={endDate}
                                onChange={handleEndDateChange}
                                required
                            />
                        </div>
                        <button type="submit" className='reportsubmit'>Submit</button>
                    </form>
                </div>
                <div className='title'>
                    <h1>Sales Report</h1>
                    <div className='salestable'>
                        {sales.length > 0 ? (
                            <table border={1}>
                                <thead>
                                    <tr>
                                        <th>Code</th>
                                        <th>Name</th>
                                        <th>customerName</th>
                                        <th>CustomerEmail</th>
                                        <th>Quantity</th>
                                        <th>Pricec</th>
                                        <th>TotalAmount</th>
                                        <th>Date</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {sales.map((sale) => {
                                        const date = new Date(sale.createdAt).toISOString().split('T')[0];
                                        return (
                                            <tr key={sale._id}>
                                                <td>{sale.code}</td>
                                                <td>{sale.name}</td>
                                                <td>{sale.customername}</td>
                                                <td>{sale.customeremail}</td>
                                                <td>{sale.quantity}</td>
                                                <td>₹{sale.unitprice}</td>
                                                <td>₹{sale.totalamount}</td>
                                                <td>{date}</td>
                                            </tr>
                                        )
                                    })}
                                </tbody>
                            </table>
                        ) : (
                            <p>No products available</p>
                        )}
                    </div>
                    <h2>Total Sale Amount:{totalSaleAmount}</h2>
                </div>
            </div>
        </>
    )
}

export default Reports;
