
import React, { useState ,useEffect} from "react";
import axios from "axios";


function Add(){
 const [data, setData] = useState(null);
 const [msg, setMsg] = useState(null);

 const [book, setBook] = useState({
    id: 0,
    name: '',
    qty: 0
  });

  const handlePost = async () => {
    try {
      const resp = await axios.post("https://assignment-backend-1-gbgg.onrender.com/books", book);
      setMsg(resp.data.msg);
    } catch (e) {
         setMsg(e.message);
      console.log(e);
    }
  };


    return <>
    <h1>Add New Book</h1>


       <input
        type="text"
        value={book.id}
        onChange={(e) => setBook({ ...book, id: e.target.value })}
        placeholder="Book ID"
      />
      <input
        type="text"
        value={book.name}
        onChange={(e) => setBook({ ...book, name: e.target.value })}
        placeholder="Book Name"
      />
      <input
        type="text"
        value={book.qty}
        onChange={(e) => setBook({ ...book, qty: e.target.value })}
        placeholder="Quantity"
      />

      <button onClick={handlePost}>Add</button>
  {msg && <p>{msg}</p>}
        </>
};




export default Add;