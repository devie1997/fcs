import { useEffect, useState } from "react";
import CartIcon from "../components/CartIcon";

const DisplayCart = () => {
  const [cartItems, setCartItems] = useState([]);
  const [showOrderOptions, setShowOrderOptions] = useState(false);
  const [orderMethod, setOrderMethod] = useState("");
  const [customerInfo, setCustomerInfo] = useState({ name: "", contact: "" });

  const loadCart = () => {
    const cart = JSON.parse(localStorage.getItem("cartItems")) || [];
    setCartItems(cart);
  };

  useEffect(() => {
    loadCart();
    window.addEventListener("storage", loadCart);
    window.addEventListener("cartUpdated", loadCart);
    return () => {
      window.removeEventListener("storage", loadCart);
      window.removeEventListener("cartUpdated", loadCart);
    };
  }, []);

  const updateQuantity = (id, quantity) => {
    if (quantity < 1) return;
    const updatedCart = cartItems.map((item) =>
      item.id === id ? { ...item, quantity } : item
    );
    setCartItems(updatedCart);
    localStorage.setItem("cartItems", JSON.stringify(updatedCart));
    window.dispatchEvent(new Event("cartUpdated"));
  };

  const removeItem = (id) => {
    const updatedCart = cartItems.filter((item) => item.id !== id);
    setCartItems(updatedCart);
    localStorage.setItem("cartItems", JSON.stringify(updatedCart));
    window.dispatchEvent(new Event("cartUpdated"));
  };

  const getTotal = () =>
    cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);

  const handleSendOrder = () => {
    if (!customerInfo.name || (orderMethod === "direct" && !customerInfo.contact)) {
      alert("Please enter your details.");
      return;
    }

    const itemsMessage = cartItems
      .map((item) => `${item.name} x${item.quantity} - R${item.price.toFixed(2)}`)
      .join("\n");

    const totalMessage = `Total: R${getTotal().toFixed(2)}`;

    if (orderMethod === "whatsapp") {
      const whatsappMessage = `Hello, my name is ${customerInfo.name}. I would like to place an order:\n${itemsMessage}\n${totalMessage}`;
      // Opens WhatsApp web with prefilled message
      window.open(
        `https://wa.me/<SUPPLIER_NUMBER>?text=${encodeURIComponent(
          whatsappMessage
        )}`,
        "_blank"
      );
    } else {
      const directMessage = `Order from ${customerInfo.name} (Contact: ${customerInfo.contact}):\n${itemsMessage}\n${totalMessage}`;
      alert("Send this via your direct messaging system:\n\n" + directMessage);
      // You can replace alert with API call to your backend for messages
    }

    setShowOrderOptions(false);
    setCustomerInfo({ name: "", contact: "" });
  };

  const styles = {
    container: {
      maxWidth: "900px",
      margin: "2rem auto",
      padding: "1.5rem",
      color: "#fff",
      backgroundColor: "#1e1e1e",
      borderRadius: "12px",
      boxShadow: "0 4px 12px rgba(0,0,0,0.5)",
    },
    header: { display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "1rem" },
    title: { fontSize: "2rem", color: "#ff8800", marginBottom: "1rem" },
    item: {
      display: "flex",
      alignItems: "center",
      justifyContent: "space-between",
      padding: "1rem",
      borderBottom: "1px solid #444",
      gap: "1rem",
    },
    image: { width: "80px", height: "80px", objectFit: "cover", borderRadius: "8px", border: "1px solid #333" },
    info: { flex: 1 },
    name: { fontSize: "1.2rem", marginBottom: "0.5rem" },
    price: { fontSize: "1rem", color: "#ffa733" },
    qtyInput: {
      width: "60px",
      padding: "0.3rem",
      borderRadius: "6px",
      border: "1px solid #444",
      textAlign: "center",
      backgroundColor: "#2e2b2b",
      color: "#fff",
    },
    removeBtn: {
      backgroundColor: "#ff6b6b",
      border: "none",
      padding: "0.5rem 1rem",
      borderRadius: "6px",
      color: "#fff",
      cursor: "pointer",
      fontWeight: "bold",
      transition: "0.2s",
    },
    totalContainer: {
      textAlign: "right",
      marginTop: "1.5rem",
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
    },
    total: { fontSize: "1.5rem", fontWeight: "bold" },
    orderBtn: {
      backgroundColor: "#ff8800",
      border: "none",
      padding: "0.8rem 1.5rem",
      borderRadius: "8px",
      fontWeight: "bold",
      cursor: "pointer",
      color: "#1c1c1c",
      transition: "0.2s",
    },
    modal: {
      position: "fixed",
      top: 0,
      left: 0,
      width: "100%",
      height: "100%",
      backgroundColor: "rgba(0,0,0,0.7)",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      zIndex: 1000,
    },
    modalContent: {
      backgroundColor: "#2a2a2a",
      padding: "2rem",
      borderRadius: "12px",
      textAlign: "center",
      width: "90%",
      maxWidth: "400px",
    },
    input: {
      width: "100%",
      padding: "0.8rem",
      borderRadius: "6px",
      border: "1px solid #444",
      marginBottom: "1rem",
      backgroundColor: "#1e1e1e",
      color: "#fff",
    },
    optionBtn: {
      padding: "0.8rem 1rem",
      margin: "0.5rem",
      borderRadius: "8px",
      border: "none",
      cursor: "pointer",
      fontWeight: "bold",
      color: "#1c1c1c",
      backgroundColor: "#ff8800",
    },
  };

  if (cartItems.length === 0)
    return (
      <div style={styles.container}>
        <h2 style={{ textAlign: "center", fontSize: "1.5rem", color: "#ccc", padding: "2rem" }}>
          Your Cart is Empty
        </h2>
      </div>
    );

  return (
    <div style={styles.container}>
      <div style={styles.header}>
        <h2 style={styles.title}>Shopping Cart</h2>
        <CartIcon />
      </div>

      {cartItems.map((item) => (
        <div key={item.id} style={styles.item}>
          <img src={item.mainImage} alt={item.name} style={styles.image} />
          <div style={styles.info}>
            <p style={styles.name}>{item.name}</p>
            <p style={styles.price}>R{item.price.toFixed(2)}</p>
          </div>
          <input
            type="number"
            min={1}
            value={item.quantity}
            onChange={(e) => updateQuantity(item.id, parseInt(e.target.value))}
            style={styles.qtyInput}
          />
          <button
            style={styles.removeBtn}
            onClick={() => removeItem(item.id)}
            onMouseOver={(e) => (e.currentTarget.style.backgroundColor = "#ff4c4c")}
            onMouseOut={(e) => (e.currentTarget.style.backgroundColor = "#ff6b6b")}
          >
            Remove
          </button>
        </div>
      ))}

      <div style={styles.totalContainer}>
        <p style={styles.total}>Total: R{getTotal().toFixed(2)}</p>
        <button
          style={styles.orderBtn}
          onClick={() => setShowOrderOptions(true)}
        >
          Place Order
        </button>
      </div>

      {showOrderOptions && (
        <div style={styles.modal}>
          <div style={styles.modalContent}>
            <h3>Select Order Method</h3>
            {!orderMethod ? (
              <>
                <button style={styles.optionBtn} onClick={() => setOrderMethod("whatsapp")}>WhatsApp</button>
                <button style={styles.optionBtn} onClick={() => setOrderMethod("direct")}>Direct Message</button>
                <button style={styles.optionBtn} onClick={() => setShowOrderOptions(false)}>Cancel</button>
              </>
            ) : (
              <>
                <input
                  style={styles.input}
                  type="text"
                  placeholder="Your Name"
                  value={customerInfo.name}
                  onChange={(e) => setCustomerInfo({ ...customerInfo, name: e.target.value })}
                />
                {orderMethod === "direct" && (
                  <input
                    style={styles.input}
                    type="text"
                    placeholder="Contact Info"
                    value={customerInfo.contact}
                    onChange={(e) => setCustomerInfo({ ...customerInfo, contact: e.target.value })}
                  />
                )}
                <button style={styles.optionBtn} onClick={handleSendOrder}>Send Order</button>
                <button style={styles.optionBtn} onClick={() => setOrderMethod("")}>Back</button>
              </>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default DisplayCart;
