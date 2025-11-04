import React, { useEffect, useState } from "react";
import PageLayout from "../components/PageLayout";

const Herbs = () => {
  const [herbs, setHerbs] = useState([]);

  useEffect(() => {
    const fetchHerbs = async () => {
      try {
        const res = await fetch("/api/products/herbs");
        const data = await res.json();
        setHerbs(data);
      } catch (err) {
        console.error("❌ Failed to fetch herbs:", err);
      }
    };

    fetchHerbs();
  }, []);

  return (
    <>
      <PageLayout text="Herbs" data={herbs} />
    </>
  );
};

export default Herbs;
