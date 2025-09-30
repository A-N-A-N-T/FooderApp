import React from "react";
import { useEffect,useState } from "react";
import reactImg from "../assets/images.jpeg";
import img2 from "../assets/down2.jpg";
import img3 from "../assets/down3.jpeg";
import img4 from "../assets/down4.jpeg";
import { useNavigate } from "react-router-dom";
import axios from "axios"
const LandingPage = () => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const navigate = useNavigate()
  const foodImages = [reactImg, img2, img3, img4];

  // Effect to automatically advance the carousel
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex((prevIndex) => (prevIndex + 1) % foodImages.length);
    }, 4000); // Change image every 4 seconds

    return () => clearInterval(interval); // Clean up the interval on component unmount
  }, [foodImages.length]);

  const handleUserLogin = () => {
      navigate("/user/login")
  }

  const handleUserRegister = () => {
      navigate("/user/register")
  }
   
  const handleFoodPartnerLogin = () => {
      navigate("/foodPartner/login")
  }

  const handleFoodPartnerRegister = () => {
      navigate("/foodPartner/register")
  }
   
  const handleLogout = async () => {
    try {
        const response = await axios.get("http://localhost:3030/auth/user/logout",{withCredentials:true})
        console.log(response.data.message)
        navigate("/");
    } catch (error) {
        console.error(
          "Logged Out Failed! ",error
        )
    }   
  }

  


  return (
    <div className="flex flex-col lg:flex-row items-center justify-center min-h-screen bg-slate-900 p-4 lg:p-8">
      {/* ... (Left side: The content box remains the same) ... */}
      <div className="bg-slate-800 p-8 rounded-lg shadow-xl w-full max-w-sm sm:max-w-md lg:w-1/2 lg:mr-8 mb-8 lg:mb-0">
        <h2 className="text-white text-3xl font-semibold text-center mb-8">
          Welcome to the Food App!
        </h2>
        {/* ... (Buttons remain the same) ... */}
        <div className="mb-6">
          <p className="text-gray-400 text-sm mb-2">User Actions</p>
          <button onClick={handleUserLogin} className="w-full bg-blue-600 text-white py-3 rounded-md font-medium hover:bg-blue-700 transition duration-300 mb-4">
            User Login
          </button>
          <button onClick={handleUserRegister} className="w-full bg-blue-600 text-white py-3 rounded-md font-medium hover:bg-blue-700 transition duration-300">
            User Register
          </button>
        </div>
        <hr className="border-gray-700 my-6" />
        <div className="mb-6">
          <p className="text-gray-400 text-sm mb-2">Food Partner Actions</p>
          <button onClick={handleFoodPartnerLogin} className="w-full bg-blue-600 text-white py-3 rounded-md font-medium hover:bg-blue-700 transition duration-300 mb-4">
            Food Partner Login
          </button>
          <button onClick={handleFoodPartnerRegister} className="w-full bg-blue-600 text-white py-3 rounded-md font-medium hover:bg-blue-700 transition duration-300">
            Food Partner Register
          </button>
        </div>
        <div className="text-center mt-6">
          <button onClick={handleLogout} className="text-blue-500 hover:underline">Logout</button>
        </div>
      </div>

      {/* Right side: The Carousel with the fix */}
      <div className="relative w-full max-w-sm sm:max-w-md lg:w-1/2 h-96 bg-slate-800 rounded-lg shadow-xl overflow-hidden">
        <h3 className="text-white text-xl font-semibold text-center mt-4 mb-4">
          Delicious Food Awaits!
        </h3>
        {/* Image container to ensure consistent sizing */}
        <div className="w-full h-full flex justify-center items-center">
          <img
            src={foodImages[currentImageIndex]}
            alt="Delicious Food"
            className="w-full h-full object-cover transition-opacity duration-500" // Added 'object-cover'
          />
        </div>

        {/* Carousel indicators */}
        <div className="absolute bottom-4 left-0 right-0 flex justify-center space-x-2">
          {foodImages.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentImageIndex(index)}
              className={`w-3 h-3 rounded-full ${
                currentImageIndex === index ? "bg-blue-600" : "bg-gray-400"
              }`}
            ></button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default LandingPage;
