import React, {useState} from "react";
import Product from "./Product";

import "bootstrap/dist/css/bootstrap.min.css";

function ProductList() {
   const products = [
    {
      id: 1,
      name: "Product 1",
      price: 100,
      image: "https://via.placeholder.com/150",
    },
    {
      id: 2,
      name: "Product 2",
      price: 150,
      image: "https://via.placeholder.com/150",
    },
    {
      id: 3,
      name: "Product 3",
      price: 200,
      image: "https://via.placeholder.com/150",
    },
    // Add more products as needed
  ];

  const [keyword, setKeyword] = useState("");

  const [filteredProducts, setFilteredProducts] = useState(products);

  const handleSearch = () => {
    const result =   products.filter((product) => {
      if(product.name.toLocaleLowerCase().includes(keyword.toLocaleLowerCase())){
        return product;
      };
    })
    // Use state to store the filtered products
    setFilteredProducts(result);  
  };


  return (
    <div className="container-fluid">
      <h2>Product List</h2>

      <div className="input-group mb-3">
        <input className="form-control me-2" type="search" placeholder="Search" aria-label="Search" onChange={(e)=>setKeyword(e.target.value)} />
        <button className="btn btn-outline-success" type="button" onClick={()=>handleSearch()}>Search</button>
      </div>

      <div className="row">
        {filteredProducts.map((product) => (
          <div className="col-md-3">
            <Product product={product} />
          </div>
        ))}
      </div>
      {/* Product list content goes here */}
    </div>
  );
};

export default ProductList;