import React from "react";
import PageLayOut from "../components/PageLayout";
import { useState, useEffect } from "react";
const Spices = () => {
  const [spices, setSpices] = useState([]);
  useEffect(() => {
      const fetchSpices = async () => {
        try {
          const res = await fetch("/api/products/spices");
          const data = await res.json();
          console.log('datas', data)
          setSpices(data);
        } catch (err) {
          console.error("❌ Failed to fetch spices:", err);
        }
      };
  
      fetchSpices();
    }, []);

  return (
    <>
      <PageLayOut text={"Spices"} data={spices} />
    </>
  );
};

export default Spices