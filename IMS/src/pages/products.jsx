import React, { useEffect, useState } from 'react';
import Addproduct from '../components/addproduct';
import { MdOutlineDeleteOutline } from "react-icons/md";
import { FaEdit } from "react-icons/fa";


function Products() {
    const [products, setAllProducts] = useState([]);
    const [showupdateproduct, setshowupdateproduct] = useState(false);
    const [updateproduct, setupdateproduct] = useState({
        code: "",
        name: "",
        pricr: ""
    });
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
    const handleupdateInput = (e) => {
        let name = e.target.name;
        let value = e.target.value;
        setupdateproduct({
            ...updateproduct,
            [name]: value
        });
    };
    const handleupdateSubmit = async (e) => {
        e.preventDefault();
        console.log(updateproduct);
        try {
            const response = await fetch(`http://localhost:5510/api/product/update/${updateproduct._id}`, {
                method: "PUT",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(updateproduct)
            });
            if (!response.ok) { throw new Error("Fail to update product") }
            fetchAllProducts();
            setshowupdateproduct(false);
        } catch (error) {
            console.log("Error updating product:", error)
        }
    };
    const editclick = (product) => {
        setupdateproduct(product);
        setshowupdateproduct(true);
    };

    const deleteproduct = async (id) => {
        try {
            console.log(id);
            const response = await fetch(`http://localhost:5510/api/product/delete/${id}`, {
                method: "GET",
            });
            fetchAllProducts();
            if (!response.ok) { throw new error('fail to delete product') }
        } catch (error) {
            console.log(error);
        }
    };



    return (
        <>
            <div className='products'>
                <h1>Products</h1>
                <Addproduct fetchAllProducts={fetchAllProducts} />
            </div>
            <div>{showupdateproduct && (<div>
                <form onSubmit={handleupdateSubmit} className='updateproduct'>
                    <div>
                        <label htmlFor="code">Enter Code</label>
                        <input
                            type="text"
                            name="code"
                            id="code"
                            value={updateproduct.code}
                            onChange={handleupdateInput}
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
                            value={updateproduct.name}
                            onChange={handleupdateInput}
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
                            value={updateproduct.price}
                            onChange={handleupdateInput}
                            autoComplete="off"
                            placeholder="Price"
                            required
                        />
                    </div>
                    <button type="submit" className='updatebtn'>Update</button>
                    <button onClick={() => setshowupdateproduct(false)} className='cancelupdateproductbtn'>Cancle</button>
                </form>
            </div>)}</div>
            <h1 className='products'>Product List</h1>
            <div className="product-list-container">
                <div>
                    {products.length > 0 ? (
                        <table border={1}>
                            <thead>
                                <tr>
                                    <th>Code</th>
                                    <th>Name</th>
                                    <th>Stock</th>
                                    <th>Price</th>
                                    <th>Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {products.map((product) => (
                                    <tr key={product._id}>
                                        <td>{product.code}</td>
                                        <td>{product.name}</td>
                                        <td>{product.stock}</td>
                                        <td>₹{product.price}</td>
                                        <td>
                                            <button onClick={() => { editclick(product) }} className='producteditbtn'><FaEdit /> Edit</button><span />
                                            <button onClick={() => { deleteproduct(product._id) }} className='productdeletebtn'><MdOutlineDeleteOutline /></button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    ) : (
                        <p>No products available</p>
                    )}
                </div>
            </div>
        </>
    );
}

export default Products;
