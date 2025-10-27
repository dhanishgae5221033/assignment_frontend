import React, { useState } from "react";
import axios from "axios";

const BASE = "https://assignment-backend-1-gbgg.onrender.com";

function Delete() {
  const [id, setId] = useState("");
  const [msg, setMsg] = useState(null);

  const handleDelete = async () => {
    try {
      const resp = await axios.delete(`${BASE}/foods/${Number(id)}`);
      setMsg(resp.data.msg || "Deleted");
      setId("");
    } catch (e) {
      console.error(e);
      setMsg(e.response?.data?.msg || e.message);
    }
  };

  return (
    <div>
      <h1>Delete Food Item</h1>
      <input type="number" placeholder="Food ID" value={id} onChange={(e) => setId(e.target.value)} />
      <button onClick={handleDelete}>Delete</button>
      {msg && <p>{msg}</p>}
    </div>
  );
}

export default Delete;
