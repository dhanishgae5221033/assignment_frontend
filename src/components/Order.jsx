import React, { useEffect, useState } from "react";
import axios from "axios";

const BASE = "https://assignment-backend-1-gbgg.onrender.com";

function Orders() {
  const [orders, setOrders] = useState([]);
  const [msg, setMsg] = useState(null);

  const fetchOrders = async () => {
    try {
      const resp = await axios.get(`${BASE}/orders`);
      setOrders(resp.data);
    } catch (e) {
      console.error(e);
      setMsg("Could not fetch orders");
    }
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  return (
    <div>
      <h1>Orders</h1>
      {orders.length === 0 ? (
        <p>No orders yet</p>
      ) : (
        orders.map((o) => (
          <div key={o.orderId} style={{ border: "1px solid #ddd", padding: 8, marginBottom: 8 }}>
            <div>
              <strong>Order #{o.orderId}</strong> — {o.customerName} — ₹{o.total} — {new Date(o.createdAt).toLocaleString()}
            </div>
            <ul>
              {o.items.map((it, idx) => (
                <li key={idx}>
                  {it.itemName} — ₹{it.price} × {it.qty} = ₹{it.price * it.qty}
                </li>
              ))}
            </ul>
          </div>
        ))
      )}

      {msg && <p>{msg}</p>}
    </div>
  );
}

export default Orders;
