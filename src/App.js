import React, { useState } from "react";
import axios from "axios";
import {Route,Routes,Link} from "react-router-dom";
import Home from "./components/Home";
import Add from "./components/Add";
import Update from "./components/Update";
import Delete from "./components/Delete";
import Order from "./components/Order";


function App() {
 
  return (
    <>
      <h1>food ordering System</h1>

      <nav style={{"display":"flex","gap":"25px"}}>
        <Link to="/">Load</Link>
        <Link to="/add">Add</Link>
        <Link to="/update">Update</Link>
        <Link to="/delete">Delete</Link>
        <Link to="/orders">Orders</Link>
      </nav>

      

      <Routes>
        <Route path="/" element={<Home/>} />
        <Route path="/add" element={<Add/>} />
        <Route path="/update" element={<Update/>} />
        <Route path="/delete" element={<Delete/>} />
        <Route path="/orders" element={<Order />} />
      </Routes>
    </>
  );
}

export default App;
