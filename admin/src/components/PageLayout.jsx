import "./pageLayOut.css";
import { useNavigate } from "react-router-dom";

const PageLayout = ({ text, data }) => {
  const navigate = useNavigate();
  console.log('data', data)
  return (
    <div className="main">
      <h2 className="section-title">{text}</h2>

      {/* 👇 Show message if there are no products */}
      {(!data || data.length === 0) ? (
        <div className="coming-soon">
          <h3>Coming Soon 🚀</h3>
          <p>We’re preparing some amazing {text.toLowerCase()} for you.</p>
        </div>
      ) : (
        <div className="product-grid">
          {data.map((item) => (
            <div
              className="product-card"
              key={item._id}
              onClick={() => navigate(`/product/${item._id}`)}
            >
              <img
                src={item.mainImage}
                alt={item.name}
                className="product-image"
              />
              <h3 className="product-name">{item.name}</h3>
              <p className="product-price">R{item.price.toFixed(2)}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default PageLayout;
