import React, { useState } from "react";

const AddProduct = () => {
  const [product, setProduct] = useState({
    name: "",
    mainImage: "",
    images: [],
    showOnMain: false,
    category: "",
    price: "",
    description: "",
  });

  const [previewJSON, setPreviewJSON] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { id, value, type, checked } = e.target;
    setProduct((prev) => ({
      ...prev,
      [id]: type === "checkbox" ? checked : value,
    }));
  };

  const uploadImage = async (file) => {
    const formData = new FormData();
    formData.append("image", file);
    const res = await fetch("/api/upload", {
      method: "POST",
      body: formData,
    });
    const data = await res.json();
    return data.imageUrl;
  };

  const handleMainImageUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;
    setLoading(true);
    try {
      const url = await uploadImage(file);
      setProduct((prev) => ({ ...prev, mainImage: url }));
    } catch (err) {
      alert("❌ Failed to upload main image: " + err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleExtraImagesUpload = async (e) => {
    const files = Array.from(e.target.files);
    setLoading(true);
    try {
      const urls = await Promise.all(files.map((file) => uploadImage(file)));
      setProduct((prev) => ({ ...prev, images: [...prev.images, ...urls] }));
    } catch (err) {
      alert("❌ Failed to upload extra images: " + err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const newProduct = {
      ...product,
      price: parseFloat(product.price),
    };

    try {
      const res = await fetch("/api/products", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newProduct),
      });
      const data = await res.json();
      if (res.ok) {
        alert("✅ Product added successfully");
        setProduct({
          name: "",
          mainImage: "",
          images: [],
          showOnMain: false,
          category: "",
          price: "",
          description: "",
        });
        setPreviewJSON(JSON.stringify(data.product, null, 2));
      } else {
        alert(data.message || "❌ Failed to add product");
      }
    } catch (err) {
      alert("❌ Network error: " + err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="add-product-page" style={styles.container}>
      <h2 style={styles.title}>Add New Product</h2>

      <form onSubmit={handleSubmit} style={styles.form}>
        <label>Name:</label>
        <input
          type="text"
          id="name"
          value={product.name}
          onChange={handleChange}
          required
        />

        <label>Main Image:</label>
        <input type="file" accept="image/*" onChange={handleMainImageUpload} />
        {product.mainImage && (
          <img
            src={product.mainImage}
            alt="Main Preview"
            style={{ width: "120px", marginTop: "10px", borderRadius: "8px" }}
          />
        )}

        <label>Extra Images:</label>
        <input
          type="file"
          accept="image/*"
          multiple
          onChange={handleExtraImagesUpload}
        />
        <div style={styles.imagePreviewContainer}>
          {product.images.map((img, i) => (
            <img key={i} src={img} alt={`extra-${i}`} style={styles.imagePreview} />
          ))}
        </div>

        <label>
          <input
            type="checkbox"
            id="showOnMain"
            checked={product.showOnMain}
            onChange={handleChange}
          />
          Show on Main Page
        </label>

        <label>Category:</label>
        <select
          id="category"
          value={product.category}
          onChange={handleChange}
          required
        >
          <option value="">Select category</option>
          <option value="spices">Spices</option>
          <option value="herbs">Herbs</option>
          <option value="seasonings">Seasonings</option>
        </select>

        <label>Price ($):</label>
        <input
          type="number"
          id="price"
          step="0.01"
          value={product.price}
          onChange={handleChange}
          required
        />

        <label>Description:</label>
        <textarea
          id="description"
          rows="4"
          placeholder="Enter product description..."
          value={product.description}
          onChange={handleChange}
        ></textarea>

        <button type="submit" style={styles.submitButton} disabled={loading}>
          {loading ? "Uploading..." : "Save Product"}
        </button>
      </form>

      {previewJSON && <pre style={styles.preview}>{previewJSON}</pre>}
    </div>
  );
};

const styles = {
  container: { color: "#fff", minHeight: "100vh", padding: "2rem", fontFamily: "Arial, sans-serif", marginTop: "75px" },
  title: { color: "#ff8800", textAlign: "center" },
  form: { maxWidth: "600px", margin: "0 auto", display: "flex", flexDirection: "column", gap: "1rem", backgroundColor: "#2e2b2b", padding: "1.5rem", borderRadius: "10px" },
  submitButton: { backgroundColor: "#ff8800", color: "#fff", border: "none", padding: "0.8rem", fontWeight: "bold", borderRadius: "6px", cursor: "pointer" },
  imagePreviewContainer: { display: "flex", flexWrap: "wrap", gap: "8px" },
  imagePreview: { width: "80px", borderRadius: "6px" },
  preview: { backgroundColor: "#2e2b2b", padding: "1rem", borderRadius: "8px", marginTop: "1.5rem", whiteSpace: "pre-wrap", fontFamily: "monospace" },
};

export default AddProduct;
