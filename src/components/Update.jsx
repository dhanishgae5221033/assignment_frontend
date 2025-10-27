
import React, { useState ,useEffect} from "react";
import axios from "axios";


function Update(){
 const [data, setData] = useState(null);
 const [msg, setMsg] = useState(null);

 const [book, setBook] = useState({
    id: 0,
    name: '',
    qty: 0
  });

  const handlePut = async () => {
    try {
      const resp = await axios.put(`https://assignment-backend-1-gbgg.onrender.com/books/${book.id}`, {
        name: book.name
      });
      setMsg(resp.data.msg);
    } catch (e) {
        setMsg(e.message);
      console.log(e);
    }
  };



    return <>
    <h1>Update a book</h1>


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

    <button onClick={handlePut}>Update</button>



      {msg && <p>{msg}</p>}
        </>
};




export default Update;