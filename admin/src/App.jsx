import { useState, useEffect } from 'react';
import { Routes, Route, useNavigate } from 'react-router-dom';
import Login from './pages/Login';
import Home from './pages/Home';
import Footer from './components/Footer';
import Navbar from './components/Navbar';
import AddProduct from './pages/AddProduct';
import Seasonings from './pages/Seasonings';
import Herbs from './pages/Herbs';
import Spices from './pages/Spices';
import About from './pages/About';
import Contact from './pages/Contact';
import ProductDetails from './pages/ProductDetails';
import DisplayCart from './pages/DisplayCart'

const data = [
  {
    id: 1,
    name: "Cinnamon",
    mainImage: "https://images.immediate.co.uk/production/volatile/sites/30/2016/08/Cinnamon-sticks-and-ground-cinnamon-2a732e4.jpg?quality=45&resize=960,872",
    images: [
      "https://images.unsplash.com/photo-1601004890684-d8cbf643f5f2?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1615485291479-64c18846cf92?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1605475128023-248c8cf4d3f3?auto=format&fit=crop&w=800&q=80"
    ],
    showOnMain: true,
    category: "spices",
    price: 12.99,
    description: "Warm and sweet, perfect for baking and desserts."
  },
  {
    id: 2,
    name: "Black Pepper",
    mainImage: "https://tse1.mm.bing.net/th/id/OIP.eD1lUFAwmL9vi2kD0VT1PwHaFt?cb=12&rs=1&pid=ImgDetMain&o=7&rm=3",
    images: [
      "https://images.unsplash.com/photo-1626126277777-9cf51bc9fcb0?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1611560306936-2c6e8b2f8fbb?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1590080875833-7371f93b89f2?auto=format&fit=crop&w=800&q=80"
    ],
    showOnMain: true,
    category: "seasonings",
    price: 8.5,
    description: "A staple seasoning for meats, vegetables, and sauces."
  },
  {
    id: 3,
    name: "Turmeric",
    mainImage: "https://tse4.mm.bing.net/th/id/OIP.LFjCkt3MbgdRBfBYuhHNAQHaE8?cb=12&rs=1&pid=ImgDetMain&o=7&rm=3",
    images: [
      "https://images.unsplash.com/photo-1617196031270-1f0a5c7b2f0d?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1613473453541-8d1b8db0f4e1?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1617674069005-9d430e3c8dc0?auto=format&fit=crop&w=800&q=80"
    ],
    showOnMain: true,
    category: "spices",
    price: 10.0,
    description: "Bright yellow spice with earthy flavor and health benefits."
  },
  {
    id: 4,
    name: "Paprika",
    mainImage: "https://tse4.mm.bing.net/th/id/OIP.5RTCrc0AtJRzInC-8QFJRAHaHa?cb=12&rs=1&pid=ImgDetMain&o=7&rm=3",
    images: [
      "https://images.unsplash.com/photo-1600697395545-42c24c5b416f?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1622106318498-2c0b22d9f6d3?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1608585224231-1e0e8a3f0f62?auto=format&fit=crop&w=800&q=80"
    ],
    showOnMain: true,
    category: "seasonings",
    price: 9.5,
    description: "Mildly sweet and colorful seasoning perfect for garnish and flavor."
  },
  {
    id: 5,
    name: "Rosemary",
    mainImage: "https://tse2.mm.bing.net/th/id/OIP.2G0z9R8luLH3MA4DYFQPFQHaE8?cb=12&rs=1&pid=ImgDetMain&o=7&rm=3",
    images: [
      "https://images.unsplash.com/photo-1600093463591-8cbf9a3f43f4?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1608748184711-3f2b8f8e6ed0?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1610974323451-b7b8b3a6c411?auto=format&fit=crop&w=800&q=80"
    ],
    showOnMain: true,
    category: "herbs",
    price: 6.5,
    description: "Fragrant herb ideal for roasted meats and vegetables."
  },
  {
    id: 6,
    name: "Thyme",
    mainImage: "https://th.bing.com/th/id/R.2fbe426d35089ac5eb24cfff2313dfea?rik=ETPqspWrEn6UpQ&riu=http%3a%2f%2fwww.foodofy.com%2fwp-content%2fuploads%2f2015%2f06%2fthyme-2.jpg&ehk=1g3aNzcClJDU3qDTmdCK%2b8BLqiZb64rHQHv%2bTXWb7AI%3d&risl=&pid=ImgRaw&r=0",
    images: [
      "https://images.unsplash.com/photo-1612198026637-2d7e23dbe2a0?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1608571424139-7198b12d0cbf?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1608748184702-8b2f0c3f1b4d?auto=format&fit=crop&w=800&q=80"
    ],
    showOnMain: true,
    category: "herbs",
    price: 7.0,
    description: "Earthy and subtle, perfect for soups, meats, and stews."
  },
  {
    id: 7,
    name: "Basil",
    mainImage: "https://tse3.mm.bing.net/th/id/OIP.vdkGvqfcybRNAbQFHgXa9gHaE9?cb=12&rs=1&pid=ImgDetMain&o=7&rm=3",
    images: [
      "https://images.unsplash.com/photo-1628191012722-cbfb9ac2a68b?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1611328033665-6f52f77a90b3?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1612198026627-2d7e23dbe2a1?auto=format&fit=crop&w=800&q=80"
    ],
    showOnMain: true,
    category: "herbs",
    price: 6.0,
    description: "Sweet and aromatic herb, perfect for pesto, salads, and pasta."
  }
];
function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false)

    useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      setIsLoggedIn(true);
    }
  }, []);

  return (
    <>
      
        <Routes>
      <Route path="/" element={<Login setIsLoggedIn={setIsLoggedIn} />} />
      <Route
        path="/home"
        element={
          isLoggedIn ? (
            <>
            <Navbar />
            <Home />
            </>         
          ) : (
            <Login setIsLoggedIn={setIsLoggedIn} />
          )
        }
      />
      <Route
        path="/herbs"
        element={
          isLoggedIn ? (
            <>
            <Navbar />
            <Herbs />
            </>         
          ) : (
            <Login setIsLoggedIn={setIsLoggedIn} />
          )
        }
      />
      <Route
        path="/seasonings"
        element={
          isLoggedIn ? (
            <>
            <Navbar />
            <Seasonings />
            </>         
          ) : (
            <Login setIsLoggedIn={setIsLoggedIn} />
          )
        }
      />
      <Route
        path="/addProduct"
        element={
          isLoggedIn ? (
            <>
            <Navbar />
            <AddProduct />
            </>          
          ) : (
            <Login setIsLoggedIn={setIsLoggedIn} />
          )
        }
      />
      <Route
        path="/spices"
        element={
          isLoggedIn ? (
            <>
            <Navbar />
            <Spices />
            </>
          ) : (
            <Login setIsLoggedIn={setIsLoggedIn} />
          )
        }
      />
      <Route
        path="/about"
        element={
          isLoggedIn ? (
            <>
            <Navbar />
            <About />
            </>
          ) : (
            <Login setIsLoggedIn={setIsLoggedIn} />
          )
        }
      />
      <Route
        path="/contact-us"
        element={
          isLoggedIn ? (
            <>
            <Navbar />
            <Contact />
            </>
          ) : (
            <Login setIsLoggedIn={setIsLoggedIn} />
          )
        }
      />
      <Route
        path="/product/:id"
        element={
          isLoggedIn ? (
          <>
          <Navbar />
          <ProductDetails products={data} />
          </>) : (
            <Login setIsLoggedIn={setIsLoggedIn} />
          )
        }
      />
      <Route
        path="/cart"
        element={
          isLoggedIn ? (
          <>
          <Navbar />
          <DisplayCart />
          </> 
          ) :(
            <Login setIsLoggedIn={setIsLoggedIn} />
          )
        }
      />
    </Routes>
    {isLoggedIn && <Footer />}
    
    </>

  )
}

export default App
