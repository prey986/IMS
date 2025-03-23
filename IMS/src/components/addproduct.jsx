import React, { useState } from 'react';
import { IoMdAdd } from "react-icons/io";

function Addproduct({ fetchAllProducts }) {
    const [showAddProduct, setShowAddProduct] = useState(false);
    const Adding = () => {
        const [product, setProduct] = useState({
            code: "",
            name: "",
            price: ""
        });
        const handleInput = (e) => {
            let name = e.target.name;
            let value = e.target.value;
            setProduct({
                ...product,
                [name]: value
            });
        };
        const handleSubmit = async (e) => {
            e.preventDefault();
            console.log(product);
            try {
                const response = await fetch('http://localhost:5510/api/product/add', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(product)
                });
                if (!response.ok) throw new Error('Failed to add product');
                fetchAllProducts();
                setProduct({ code: "", name: "", price: "" });
                setShowAddProduct(false);
            } catch (error) {
                console.log(error);
            }
        };
        return (
            <div>
                <form onSubmit={handleSubmit} className='addproductfrom'>
                    <div>
                        <label htmlFor="code">Enter Code</label>
                        <input
                            type="text"
                            name="code"
                            id="code"
                            value={product.code}
                            onChange={handleInput}
                            autoComplete="off"
                            placeholder="Code"
                            required
                        />
                    </div>
                    <div>
                        <label htmlFor="name">Enter Name</label>
                        <input
                            type="text"
                            name="name"
                            id="name"
                            value={product.name}
                            onChange={handleInput}
                            autoComplete="off"
                            placeholder="Name"
                            required
                        />
                    </div>
                    <div>
                        <label htmlFor="price">Enter Price</label>
                        <input
                            type="number"
                            name="price"
                            id="price"
                            value={product.price}
                            onChange={handleInput}
                            autoComplete="off"
                            placeholder="Price"
                            required
                        />
                    </div>
                    <button type="submit" className='addproductsubmit'>Save</button>
                    <button onClick={() => setShowAddProduct(false)} className='addproductcancel'>Cancle</button>
                </form>
            </div>
        );
    };
    return (
        <>
            <button onClick={() => setShowAddProduct(true)} className='add-product-button'><IoMdAdd /> Add Product</button>
            {showAddProduct && <Adding />}
        </>
    );
}

export default Addproduct;
