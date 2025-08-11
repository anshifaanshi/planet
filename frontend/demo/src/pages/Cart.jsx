import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';


const Cart = () => {
  const [cart, setCart] = useState({ items: [] });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchCart = async () => {
      try {
        const res = await axios.get('http://localhost:5000/api/getall');
        setCart(res.data);
      } catch (err) {
        setError(err.message || 'Error fetching cart');
      } finally {
        setLoading(false);
      }
    };
    fetchCart();
  }, []);

  if (loading) return <p style={{ textAlign: 'center', marginTop: 40 }}>Loading cart...</p>;
  if (error) return <p style={{ color: 'red', textAlign: 'center', marginTop: 40 }}>{error}</p>;

  return (
    <div
      style={{
        maxWidth: 650,
        margin: '40px auto',
        padding: 30,
        textAlign: 'center',
        fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
        backgroundColor: '#fff',
        borderRadius: 10,
        boxShadow: '0 6px 18px rgba(0,0,0,0.1)',
      }}
    >
      <h1 style={{ color: '#007bff', marginBottom: 30 }}>Your Cart</h1>

      {cart.items.length === 0 ? (
        <p style={{ fontSize: 18, color: '#555' }}>Your cart is empty.</p>
      ) : (
        cart.items.map(({ product, quantity }) => (
          <div
            key={product._id}
            style={{
              border: '1px solid #ddd',
              borderRadius: 8,
              marginBottom: 20,
              padding: 20,
              textAlign: 'left',
              boxShadow: '0 2px 8px rgba(0,0,0,0.05)',
              backgroundColor: '#fafafa',
            }}
          >
            <h3 style={{ color: '#222', marginBottom: 8 }}>{product.name}</h3>
            <p style={{ color: '#555', marginBottom: 6 }}>{product.description}</p>
            <p style={{ fontWeight: 'bold', marginBottom: 4 }}>Price: ₹{product.price}</p>
            <p style={{ fontWeight: 'bold' }}>Quantity: {quantity}</p>
          </div>
        ))
      )}

      {cart.items.length > 0 && (
      <Link to='/payment'>  <button
          onClick={() => navigate('/checkout')}
          style={{
            marginTop: 30,
            padding: '14px 40px',
            fontSize: 18,
            backgroundColor: '#007bff',
            color: 'white',
            border: 'none',
            borderRadius: 8,
            cursor: 'pointer',
            boxShadow: '0 4px 12px rgba(0, 123, 255, 0.6)',
            transition: 'background-color 0.3s ease, box-shadow 0.3s ease',
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.backgroundColor = '#0056b3';
            e.currentTarget.style.boxShadow = '0 6px 20px rgba(0, 86, 179, 0.7)';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.backgroundColor = '#007bff';
            e.currentTarget.style.boxShadow = '0 4px 12px rgba(0, 123, 255, 0.6)';
          }}
        >
          Proceed to Checkout
        </button></Link>
      )}
    </div>
  );
};

export default Cart;
