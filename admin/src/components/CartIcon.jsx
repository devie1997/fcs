import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const CartIcon = () => {
  const [count, setCount] = useState(0);
  const navigate = useNavigate();

  // Fetch cart data from localStorage
  useEffect(() => {
    const loadCart = () => {
      const cart = JSON.parse(localStorage.getItem("cartItems")) || [];
      setCount(cart.length);
    };

    loadCart();

    // Update when storage or custom event changes
    window.addEventListener("storage", loadCart);
    window.addEventListener("cartUpdated", loadCart);

    return () => {
      window.removeEventListener("storage", loadCart);
      window.removeEventListener("cartUpdated", loadCart);
    };
  }, []);

  const styles = {
    container: {
      display: "flex",
      alignItems: "center",
      gap: "6px",
      cursor: "pointer",
      position: "relative",
    },
    count: {
      backgroundColor: "#ff6b6b",
      color: "#fff",
      fontWeight: "bold",
      borderRadius: "50%",
      fontSize: "0.9rem",
      lineHeight: "1",
      position: "absolute",
      top: "-6px",
      right: "-10px",
      minWidth: "20px",
      textAlign: "center",
    },
    icon: {
      fontSize: "28px",
      color: "#ff8800",
    },
  };

  return (
    <div
      style={styles.container}
      onClick={() => navigate("/cart")} // Navigate to Cart page
      title="View Cart"
    >
      <span style={styles.count}>{count}</span>
      <span className="material-symbols-outlined" style={styles.icon}>
        shopping_basket
      </span>
    </div>
  );
};

export default CartIcon;
