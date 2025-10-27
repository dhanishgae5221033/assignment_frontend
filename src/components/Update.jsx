import React, { useState } from "react";
import axios from "axios";

const BASE = "https://assignment-backend-1-gbgg.onrender.com";

function Update() {
  const [food, setFood] = useState({ id: "", itemName: "", price: "" });
  const [msg, setMsg] = useState(null);

  const handlePut = async () => {
    try {
      const id = Number(food.id);
      const body = {};
      if (food.itemName) body.itemName = food.itemName;
      if (food.price) body.price = Number(food.price);
      const resp = await axios.put(`${BASE}/foods/${id}`, body);
      setMsg(resp.data.msg || "Updated");
      setFood({ id: "", itemName: "", price: "" });
    } catch (e) {
      console.error(e);
      setMsg(e.response?.data?.msg || e.message);
    }
  };

  return (
    <div>
      <h1>Update Food Item</h1>
      <input type="number" placeholder="ID" value={food.id} onChange={(e) => setFood({ ...food, id: e.target.value })} />
      <input type="text" placeholder="New item name" value={food.itemName} onChange={(e) => setFood({ ...food, itemName: e.target.value })} />
      <input type="number" placeholder="New price" value={food.price} onChange={(e) => setFood({ ...food, price: e.target.value })} />
      <button onClick={handlePut}>Update</button>
      {msg && <p>{msg}</p>}
    </div>
  );
}

export default Update;
