import React, { useState } from "react";
import axios from "axios";

const BASE = "https://assignment-backend-1-gbgg.onrender.com";

function Add() {
  const [food, setFood] = useState({ id: "", itemName: "", price: "" });
  const [msg, setMsg] = useState(null);

  const handlePost = async () => {
    try {
      const payload = { id: Number(food.id), itemName: food.itemName, price: Number(food.price) };
      const resp = await axios.post(`${BASE}/foods`, payload);
      setMsg(resp.data.msg || "Added");
      setFood({ id: "", itemName: "", price: "" });
    } catch (e) {
      console.error(e);
      setMsg(e.response?.data?.msg || e.message);
    }
  };

  return (
    <div>
      <h1>Add Food Item</h1>
      <input
        type="number"
        placeholder="ID"
        value={food.id}
        onChange={(e) => setFood({ ...food, id: e.target.value })}
      />
      <input
        type="text"
        placeholder="Item name"
        value={food.itemName}
        onChange={(e) => setFood({ ...food, itemName: e.target.value })}
      />
      <input
        type="number"
        placeholder="Price"
        value={food.price}
        onChange={(e) => setFood({ ...food, price: e.target.value })}
      />
      <button onClick={handlePost}>Add</button>
      {msg && <p>{msg}</p>}
    </div>
  );
}

export default Add;
