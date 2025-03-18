import React, { useState, useEffect } from 'react'
import "./addsale.css"
function Addsale({ fetchfivesale }) {
    const [showaddsale, setshowaddsale] = useState(false);

    const Addingsale = () => {
        const [products, setAllProducts] = useState([]);
        const [selectedProduct, setSelectedProduct] = useState({
            productid: "",
            code: "",
            name: "",
            customername: "",
            customeremail: "",
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
            if (showaddsale) {
                fetchAllProducts();
            }
        }, [showaddsale]);
        const handleInput = (e) => {
            let name = e.target.name;
            let value = e.target.value;
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
                customername: "",
                customeremail: "",
                unitprice: product.price,
                quantity: 0,
                totalamount: 0,
                stock: product.stock,
            });
        };
        const calculateTotalAmount = () => {
            selectedProduct.totalamount = selectedProduct.quantity * selectedProduct.unitprice;
            return selectedProduct.totalamount
        };
        const handleSubmit = async (e) => {
            e.preventDefault();
            if (selectedProduct.quantity <= 0 || selectedProduct.quantity > selectedProduct.stock) {
                alert("Invalid quantity or insufficient stock.");
                return;
            }
            console.log(selectedProduct);
            try {
                const response = await fetch('http://localhost:5510/api/addsales/add', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(selectedProduct)
                });
                if (!response.ok) throw new Error('Failed to add stock');
                fetchfivesale();
                setShowAddStock(false);
            } catch (error) {
                console.log(error);
            }
        }

        return (
            <>
                <div className="addsale-form">
                    <h2>Choose a Product</h2>
                    <select
                        value={selectedProduct.productid}
                        onChange={handleProductChange}
                    >
                        <option value="" disabled>Select a Product</option>
                        {products.length > 0 ? (
                            products.map((product) => (
                                <option key={product._id} value={product._id}>
                                    {product.name} ({product.code})
                                </option>
                            ))
                        ) : (
                            <option disabled>No Products Available</option>
                        )}
                    </select><div>
                        <label htmlFor='customername'>Enter CustomerName</label>
                        <input
                            type='text'
                            name='customername'
                            id='CustomerName'
                            value={selectedProduct.customername}
                            onChange={handleInput}
                            placeholder='CustomerName'
                            required
                        />
                    </div>
                    <div>
                        <label htmlFor='customeremail'>Enter CustomerEmail</label>
                        <input
                            type='email'
                            name='customeremail'
                            id='CustomerEmail'
                            value={selectedProduct.customeremail}
                            onChange={handleInput}
                            placeholder='CustomerEmail'
                            required
                        />
                    </div>
                    <div>
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
                    </div>
                    <p>Total Amount: {calculateTotalAmount()}</p>
                    <div>
                        <button onClick={handleSubmit}>submit</button>
                        <button onClick={() => setshowaddsale(false)}>Cancel</button>
                    </div>
                </div>
            </>
        )
    };
    return (
        <>
            <button onClick={() => setshowaddsale(true)}>Addsale</button>
            {showaddsale && <Addingsale />}
        </>
    )
}

export default Addsale
