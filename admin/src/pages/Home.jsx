import React from "react";
import PageLayOut from "../components/PageLayout";
import { useState, useEffect } from "react";
const Home = () => {
  const [topSelling, setHome] = useState([]);
  useEffect(() => {
      const fetchSpices = async () => {
        try {
          const res = await fetch("/api/products/home");
          const data = await res.json();
          setHome(data);
          console.log('home',data)
        } catch (err) {
          console.error("❌ Failed to fetch home:", err);
        }
      };
  
      fetchSpices();
    }, []);

  return (
    <>
      <PageLayOut text={"Best Sellers"} data={topSelling} />
    </>
  );
};

export default Home;
