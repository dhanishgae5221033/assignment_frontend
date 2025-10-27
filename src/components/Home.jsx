
import React, { useState ,useEffect} from "react";
import axios from "axios";
function Home(){
 const [data, setData] = useState(null);
 const [msg, setMsg] = useState(null);



  const handleGet = async () => {
    try {
      const resp = await axios.get("https://assignment-backend-s21i.onrender.com/books");
      console.log(resp.data);
      setData(resp.data);
      setMsg(resp.data.msg);
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(()=>{
    handleGet();
  },[]);


    return <>
    <h1>Books List</h1>
    {data ? (
        data.map((d) => (
          <h2 key={d.id}>
            Book ID: {d.id} — {d.name} with {d.qty} quantity
          </h2>
        ))
      ) : (
        <h2>No data loaded</h2>
      )}

      {msg && <p>{msg}</p>}
        </>
};




export default Home;