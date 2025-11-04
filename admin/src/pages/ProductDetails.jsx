import React, { useRef, useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import "./ProductDetails.css";

const ProductDetails = ({ products }) => {
  
  const { id } = useParams();
  console.log('id', products)
  const navigate = useNavigate();
  const [quantity, setQuantity] = useState(1);
  const [product, setProduct] = useState(null)
  const galleryRef = useRef(null);
  useEffect(() => {
    const fatchProduct = async () => {
      try{
        const res = await fetch(`/api/products/${id}`)
        const data = await res.json();
        setProduct(data);
      }catch(error){
        console.log('failed to fatch product:', error)
      }
    }
    fatchProduct()
  }, [])
  


  const addToCart = () => {
    let cart = JSON.parse(localStorage.getItem("cartItems")) || [];

    // Check if item already in cart
    const existingItem = cart.find((item) => item._id === product._id);
    if (existingItem) {
        existingItem.quantity += quantity;
        console.log('ex', existingItem)
    } else {
        cart.push({ ...product, quantity });
    }

    localStorage.setItem("cartItems", JSON.stringify(cart));

    // 🔥 Dispatch custom event so CartIcon updates immediately
    window.dispatchEvent(new Event("cartUpdated"));

    alert(`${product.name} added to cart!`);
    };


  if (!product) {
    return (
      <div className="product-details">
        <h2>Product not found</h2>
        <button className="back-btn" onClick={() => navigate(-1)}>
          Go Back
        </button>
      </div>
    );
  }

  return (
    <div className="product-details">
      <div className="image-gallery-container">
        <div className="image-gallery" ref={galleryRef}>
          {product.images && product.images.length > 0 ? (
            product.images.map((img, index) => (
              <img key={index} src={img} alt={`${product.name} ${index}`} />
            ))
          ) : (
            <img src={product.mainImage} alt={product.name} />
          )}
        </div>
      </div>

      <div className="details-info">
        <h2>{product.name}</h2>
        <p className="price">R{product.price.toFixed(2)}</p>
        <p className="description">{product.description}</p>

        <div className="quantity-cart">
          <button className="back-btn" onClick={() => navigate(-1)}>
            ← Back
          </button>
          <button className="back-btn" onClick={addToCart}>
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;
