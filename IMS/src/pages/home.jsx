import React, { useEffect, useState } from 'react';
import { Pie } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';

ChartJS.register(ArcElement, Tooltip, Legend);

function Home() {
    const [products, setAllProducts] = useState([]);

    useEffect(() => {
        fetchAllProducts();
    }, []);

    const fetchAllProducts = async () => {
        try {
            const response = await fetch('http://localhost:5510/api/product/getallproduct');
            if (!response.ok) throw new Error('Failed to load products');
            const data = await response.json();
            setAllProducts(data);
            console.log(data);
        } catch (error) {
            console.error('Error fetching products:', error);
        }
    };

    const totalStock = products.reduce((total, product) => total + product.stock, 0);
    const lowStockProducts = products.filter((product) => product.stock < 5);

    const pieChartData = {
        labels: products.map((product) => product.name),
        datasets: [
            {
                data: products.map((product) => product.stock),
                backgroundColor: products.map(() => `#${Math.floor(Math.random() * 16777215).toString(16)}`),
            },
        ],
    };

    return (
        <>
            <div className="home">
                <h1>Home</h1>
            </div>
            <div className="summary">
                <div>Total Products: {products.length}</div>
                <div>Total Stock: {totalStock}</div>
            </div>
            <div className="low-stock">
                <h2>Low Stock Product</h2>
                {lowStockProducts.length > 0 ? (
                    <table>
                        <thead>
                            <tr>
                                <th>Product Name</th>
                                <th>Quantity</th>
                            </tr>
                        </thead>
                        <tbody>
                            {lowStockProducts.map((product) => (
                                <tr key={product._id}>
                                    <td>{product.name}</td>
                                    <td>{product.stock}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                ) : (
                    <p>No products with quantity less than 5</p>
                )}
            </div>
            <div className="chart">
                <h2>Product Stock Distribution</h2>
                <Pie data={pieChartData} />
            </div>
        </>
    );
}

export default Home;
