import React, { useState, useEffect } from 'react';
import { IoMdAdd } from "react-icons/io";


function AddStock({ fetchfivestock }) {
    const [showAddStock, setShowAddStock] = useState(false);

    const AddingStock = () => {
        const [products, setAllProducts] = useState([]);
        const [selectedProduct, setSelectedProduct] = useState({
            productid: "",
            code: "",
            name: "",
            unitprice: "",
            quantity: 0,
            totalamount: 0,
        });

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

        useEffect(() => {
            if (showAddStock) {
                fetchAllProducts();
            }
        }, [showAddStock]);

        const handleInput = (e) => {
            const { name, value } = e.target;
            setSelectedProduct({
                ...selectedProduct,
                [name]: value,
            });
        };

        const handleProductChange = (e) => {
            const selectedProductId = e.target.value;
            const product = products.find(product => product._id === selectedProductId);

            setSelectedProduct({
                productid: product._id,
                code: product.code,
                name: product.name,
                unitprice: product.price,
                quantity: 0,
                totalamount: 0,
            });
        };

        const calculateTotalAmount = () => {
            selectedProduct.totalamount = selectedProduct.quantity * selectedProduct.unitprice;
            return selectedProduct.totalamount
        };
        const handleSubmit = async (e) => {
            e.preventDefault();
            console.log(selectedProduct);
            try {
                const response = await fetch('http://localhost:5510/api/addstock/add', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(selectedProduct)
                });
                if (!response.ok) throw new Error('Failed to add stock');
                fetchfivestock();
                setShowAddStock(false);
            } catch (error) {
                console.log(error);
            }
        }

        return (
            <>
                <form className='addstockform'>
                    <h2>Choose a product</h2>
                    <select
                        value={selectedProduct.productid}
                        onChange={handleProductChange}
                    >
                        <option value="" disabled>Select a product</option>
                        {products.length > 0 ? (
                            products.map((product) => (
                                <option key={product._id} value={product._id}>
                                    {product.name} ({product.code})
                                </option>
                            ))
                        ) : (
                            <option disabled>No products available.</option>
                        )}
                    </select>
                    <label htmlFor='quantity'>Enter Quantity</label>
                    <input
                        type='number'
                        name='quantity'
                        id='quantity'
                        value={selectedProduct.quantity}
                        onChange={handleInput}
                        placeholder='Quantity'
                        required
                    />
                    <p>Total Amount: {calculateTotalAmount()}</p>
                    <div>
                        <button onClick={handleSubmit} className='addstocksubmitbtn'>submit</button>
                        <button onClick={() => setShowAddStock(false)} className='addstockcancelbtn'>Cancel</button>
                    </div>
                </form>
            </>
        );
    };

    return (
        <>
            <button onClick={() => setShowAddStock(true)} className='addstockbtn'><IoMdAdd /> Add Stock</button>
            {showAddStock && <AddingStock />}
        </>
    );
}

export default AddStock;
