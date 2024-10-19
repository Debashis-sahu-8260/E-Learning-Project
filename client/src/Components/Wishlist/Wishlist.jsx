import React, { useEffect, useState, useRef } from "react";
import "./wishlist.css";
import { ProdCard } from "../ProdCard/ProdCard";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import axios from "axios";
import CloseIcon from '@mui/icons-material/Close';
import SearchIcon from '@mui/icons-material/Search'; // Import Search Icon
import { IconButton } from "@mui/material";

const Wishlist = () => {
  const [wishlist, setWishlist] = useState([]);
  const [activeTab, setActiveTab] = useState("wishlist");
  const [searchQuery, setSearchQuery] = useState("");
  const loading = useRef(true);

  useEffect(() => {
    const token = JSON.parse(localStorage.getItem("token"));

    if (token && token.user && token.user._id) {
      const fetchWishlist = async () => {
        try {
          const response = await axios.get(`http://localhost:8080/wishlist/${token.user._id}`);
          setWishlist(response.data);
        } catch (error) {
          console.error("Error fetching wishlist:", error);
        } finally {
          loading.current = false; // Mark loading as complete
        }
      };

      fetchWishlist();
    } else {
      console.warn("User ID is not available");
      loading.current = false; // Mark loading as complete
    }
  }, []);

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };

  const filteredWishlist = wishlist.filter(item =>
    item.productId.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleDelete = async (productId) => {
    const token = JSON.parse(localStorage.getItem("token"));

    try {
      await axios.delete("http://localhost:8080/wishlist/", {
        headers: {
          "Content-Type": "application/json",
        },
        data: {
          userId: token.user._id,
          productId,
        },
      });
      // Remove the deleted item from the local state
      setWishlist(prev => prev.filter(item => item.productId._id !== productId));
    } catch (error) {
      console.error("Error deleting item:", error);
    }
  };

  return (
    <div>
      <div className="wishlistDiv">
        <div className="tab">
          <h1>My Wishlist</h1>
          <div className="tabs_header">
            {["allcourses", "mylists", "wishlist", "archived", "learningtools"].map(tab => (
              <button
                key={tab}
                className={`tablinks ${activeTab === tab ? "active" : ""}`}
                onClick={() => setActiveTab(tab)}
              >
                {tab.charAt(0).toUpperCase() + tab.slice(1)}
              </button>
            ))}
          </div>
        </div>

        <div className="tabcontent">
          {activeTab === "wishlist" && (
            <>
              <Box
                component="form"
                sx={{ display: 'flex', alignItems: 'center', m: 1, width: '100%' }}
                noValidate
                autoComplete="off"
              >
                <IconButton>
                  <SearchIcon />
                </IconButton>
                <TextField
                  id="outlined-basic"
                  label="Search my courses"
                  variant="outlined"
                  value={searchQuery}
                  onChange={handleSearchChange}
                  sx={{ flex: 1 }}
                />
              </Box>

              <Wishcard courses={filteredWishlist} onDelete={handleDelete} />
            </>
          )}
          {/* Add other tab contents here as needed */}
        </div>
      </div>
    </div>
  );
};

const Wishcard = ({ courses, onDelete }) => {
  return (
    <div style={{ marginTop: "1.5rem" }} className="tec-cont">
      <div className="prod-cont">
        {courses.length > 0 ? (
          courses.map(course => (
            <div className="prod-card" key={course.productId._id}>
              <ProdCard data={course.productId} />
              <button onClick={() => onDelete(course.productId._id)} className="removewish">
                <CloseIcon />
              </button>
            </div>
          ))
        ) : (
          <p>No courses in your wishlist.</p>
        )}
      </div>
    </div>
  );
};

export default Wishlist;
