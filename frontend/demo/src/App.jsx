
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import Home from "./pages/Home";
import EventPage from "./pages/Events";
import ProductPage from "./pages/Products";
import Checkout from "./pages/Checkout";
import { useCartStore } from "./store"; 
import Cart from "./pages/Cart";
import Payment from "./pages/Payment"
import 'bootstrap/dist/css/bootstrap.min.css';


export default function App() {
  const cartCount = useCartStore((s) => s.items.length);

  return (
   
    <BrowserRouter>
      <div
        className="min-h-screen bg-gray-50 d-flex flex-column"
        style={{ display: "flex", flexDirection: "column", height: "100vh" }}
      >
        <nav className="p-4 bg-white shadow-sm flex justify-between align-items-center">
          <Link to="/" className="font-bold">
            DemoApp
          </Link>
          <div className="d-flex gap-3">
            <Link to="/">Home</Link>
            <Link to="/products">Products</Link>
            <Link to="/checkout">Cart ({cartCount})</Link>
          </div>
        </nav>

        <main
          className="p-6 flex-grow-1 d-flex justify-content-center align-items-center"
          style={{ display: "flex", flexGrow: 1, justifyContent: "center", alignItems: "center" }}
        >
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/events/:id" element={<EventPage />} />
            <Route path="/products" element={<ProductPage />} />
            <Route path="/checkout" element={<Checkout />} />
            <Route path="/cart" element={<Cart />} />
            <Route path="/payment" element={<Payment />} />
          </Routes>
        </main>
      </div>
    </BrowserRouter>
  );
}