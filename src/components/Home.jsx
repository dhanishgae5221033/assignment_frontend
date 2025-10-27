import React, { useState, useEffect } from "react";
import axios from "axios";

const BASE = "https://assignment-backend-1-gbgg.onrender.com";

function Home() {
  const [foods, setFoods] = useState([]);
  const [msg, setMsg] = useState(null);
  const [cart, setCart] = useState([]);
  const [customerName, setCustomerName] = useState("");

  const fetchFoods = async () => {
    try {
      const resp = await axios.get(`${BASE}/foods`);
      setFoods(resp.data);
    } catch (e) {
      console.error(e);
      setMsg("Could not load menu.");
    }
  };

  useEffect(() => {
    fetchFoods();
  }, []);

  const addToCart = (food, qty) => {
    const q = Number(qty) || 1;
    setCart((prev) => {
      const existing = prev.find((p) => p.id === food.id);
      if (existing) {
        return prev.map((p) => (p.id === food.id ? { ...p, qty: p.qty + q } : p));
      } else {
        return [...prev, { ...food, qty: q }];
      }
    });
  };

  const removeFromCart = (id) => {
    setCart((prev) => prev.filter((p) => p.id !== id));
  };

  const placeOrder = async () => {
    if (!customerName.trim()) return setMsg("Please enter customer name before ordering.");
    if (cart.length === 0) return setMsg("Cart is empty.");
    try {
      const resp = await axios.post(`${BASE}/orders`, {
        customerName,
        items: cart,
      });
      setMsg(resp.data.msg || "Order placed");
      setCart([]);
      setCustomerName("");
    } catch (e) {
      console.error(e);
      setMsg(e.response?.data?.msg || e.message);
    }
  };

  return (
    <div>
      <h1>Menu</h1>
      {foods.length === 0 ? (
        <p>No menu items available</p>
      ) : (
        foods.map((f) => (
          <div key={f.id} style={{ border: "1px solid #ddd", padding: 8, marginBottom: 8 }}>
            <strong>{f.itemName}</strong> — ₹{f.price}
            <div style={{ marginTop: 6 }}>
              <input
                type="number"
                min="1"
                defaultValue={1}
                id={`qty-${f.id}`}
                style={{ width: 80, marginRight: 8 }}
              />
              <button
                onClick={() => {
                  const qtyEl = document.getElementById(`qty-${f.id}`);
                  addToCart(f, qtyEl ? qtyEl.value : 1);
                }}
              >
                Add to Cart
              </button>
            </div>
          </div>
        ))
      )}

      <h2>Cart</h2>
      {cart.length === 0 ? (
        <p>Cart is empty</p>
      ) : (
        cart.map((c) => (
          <div key={c.id}>
            {c.itemName} — ₹{c.price} × {c.qty} = ₹{c.price * c.qty}
            <button style={{ marginLeft: 8 }} onClick={() => removeFromCart(c.id)}>
              Remove
            </button>
          </div>
        ))
      )}

      <div style={{ marginTop: 12 }}>
        <input
          type="text"
          placeholder="Customer name"
          value={customerName}
          onChange={(e) => setCustomerName(e.target.value)}
        />
        <button onClick={placeOrder} style={{ marginLeft: 8 }}>
          Place Order
        </button>
      </div>

      {msg && (
        <p style={{ marginTop: 12 }}>
          <strong>{msg}</strong>
        </p>
      )}
    </div>
  );
}

export default Home;
