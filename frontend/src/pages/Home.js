import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { handleError, handleSuccess } from "../utils";
import { ToastContainer } from "react-toastify";

const Home = () => {
  const [loogedInUser, setLoggedInUser] = useState("");
  const [products, setProduct] = useState("");
  const navigate = useNavigate();
  useEffect(() => {
    setLoggedInUser(localStorage.getItem("loggedInUser"));
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("loggedInUser");
    localStorage.removeItem("token");
    handleSuccess("User logged out Successfully");
    setTimeout(() => {
      navigate("/login");
    }, 1000);
  };

  const fetchProducts = async () => {
    try {
      const url = "http://localhost:8080/products";
      const headers = {
        headers: {
          Authorization: localStorage.getItem("token"),
        },
      };
      const response = await fetch(url, headers);
      const result = await response.json();
      console.log(result);
      setProduct(result);
    } catch (err) {
      handleError(err);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  return (
    <div>
      <h1>Home Pages</h1>
      <h3>Welcome To {loogedInUser}</h3>
      <div>
        {products &&
          products?.map((item, index) => (
            <ul key={index}>
              <span>
                {item.name} :{item.price}
              </span>
            </ul>
          ))}
      </div>
      <button onClick={handleLogout}>Logout</button>
      <ToastContainer />
    </div>
  );
};

export default Home;
