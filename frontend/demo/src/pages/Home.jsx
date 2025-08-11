import React, { useEffect, useState } from "react";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Link } from "react-router-dom";

const Home = () => {
  const [events, setEvents] = useState([]);
  const [products, setProducts] = useState([]);
  const [loadingEvents, setLoadingEvents] = useState(true);
  const [loadingProducts, setLoadingProducts] = useState(true);
  const [errorEvents, setErrorEvents] = useState(null);
  const [errorProducts, setErrorProducts] = useState(null);

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const res = await axios.get("http://localhost:5000/api/events");
        setEvents(res.data);
      } catch (err) {
        setErrorEvents(err.message || "Error fetching events");
      } finally {
        setLoadingEvents(false);
      }
    };

    const fetchProducts = async () => {
      try {
        const res = await axios.get("http://localhost:5000/api/products");
        setProducts(res.data);
      } catch (err) {
        setErrorProducts(err.message || "Error fetching products");
      } finally {
        setLoadingProducts(false);
      }
    };

    fetchEvents();
    fetchProducts();
  }, []);

  const handleAddToCart = async (item) => {
    try {
      const response = await axios.post("http://localhost:5000/api/cart", {
        productId: item._id,
        quantity: 1,
      });
      toast.success(response.data.message);
    } catch (error) {
      toast.error(
        error.response?.data?.message || "Failed to add item to cart"
      );
      console.log(error);
    }
  };

  return (
  <div
    className="container my-5"
    style={{ fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif" }}
  >
    {/* Header with title and cart button */}
    <div className="d-flex justify-content-between align-items-center mb-4">
      <h1 className="fw-bold text-danger mb-0">Upcoming Events</h1>
      <Link to="/cart" className="btn btn-danger">
        View Cart
      </Link>
    </div>

    {/* Events Section */}
    {loadingEvents ? (
      <p className="text-muted text-center">Loading events...</p>
    ) : errorEvents ? (
      <p className="text-danger text-center">{errorEvents}</p>
    ) : events.length > 0 ? (
      <div className="row">
        {events.map((event) => (
          <div key={event._id} className="col-md-6 mb-4">
            <div
              className="card h-100 shadow-sm"
              style={{
                borderColor: "#dc3545",
                transition: "transform 0.3s ease, box-shadow 0.3s ease",
                cursor: "pointer",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = "scale(1.05)";
                e.currentTarget.style.boxShadow = "0 8px 20px rgba(0, 0, 0, 0.6)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = "scale(1)";
                e.currentTarget.style.boxShadow = "0 4px 12px rgba(0,0,0,0.1)";
              }}
            >
              <div className="card-body d-flex flex-column">
                <h2 className="card-title text-danger">{event.title}</h2>
                <p className="card-text text-dark flex-grow-1">{event.description}</p>
                <button
                  className="btn btn-danger mt-auto"
                  onClick={() => toast.success("Booking confirmed")}
                  onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = "#a71d2a")}
                  onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = "")}
                >
                  Book The Event
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    ) : (
      <p className="text-secondary text-center">No events available</p>
    )}

    {/* Products Header */}
    <h1 className="fw-bold text-danger mt-5 mb-4 text-center">Our Products</h1>

    {/* Products Section */}
    {loadingProducts ? (
      <p className="text-muted text-center">Loading products...</p>
    ) : errorProducts ? (
      <p className="text-danger text-center">{errorProducts}</p>
    ) : products.length > 0 ? (
      <div className="row">
        {products.map((product) => (
          <div key={product._id} className="col-md-4 mb-4">
            <div
              className="card h-100 shadow-sm"
              style={{
                borderColor: "#dc3545",
                transition: "transform 0.3s ease, box-shadow 0.3s ease",
                cursor: "pointer",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = "scale(1.05)";
                e.currentTarget.style.boxShadow = "0 8px 20px rgba(0, 0, 0, 0.6)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = "scale(1)";
                e.currentTarget.style.boxShadow = "0 4px 12px rgba(0,0,0,0.1)";
              }}
            >
              <div className="card-body d-flex flex-column">
                <h3 className="card-title text-dark">{product.name}</h3>
                <p className="card-text text-secondary flex-grow-1">{product.description}</p>
                <p className="text-danger fw-semibold fs-5">₹{product.price}</p>
                <button
                  className="btn btn-danger mt-auto"
                  onClick={() => handleAddToCart(product)}
                  onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = "#a71d2a")}
                  onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = "")}
                >
                  Add to Cart
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    ) : (
      <p className="text-secondary text-center">No products available</p>
    )}

    <ToastContainer position="top-right" autoClose={3000} />
  </div>
);
}
export default Home