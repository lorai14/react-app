import { useState } from "react";
import { Link } from "react-router-dom";
import "./Category.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";

export default function Category() {
  const [search, setSearch] = useState("");

  const categories = [
    {
      name: "Cakes",
      description: "Sweet and delightful cake recipes for every occasion.",
      image: "/images/cakes.png",
      color: "#FAD4D4",
    },
    {
      name: "Cookies",
      description: "Crispy or chewy—bake the perfect batch of cookies!",
      image: "/images/cookies.png",
      color: "#FFE9C2",
    },
    {
      name: "Cupcakes",
      description: "Small but mighty desserts with tons of flavor.",
      image: "/images/cupcake.png",
      color: "#E1E3FF",
    },
    {
      name: "Pastries",
      description: "Flaky and buttery pastries to impress everyone.",
      image: "/images/pastries.png",
      color: "#DFF6FF",
    },
    {
      name: "Pancakes",
      description: "Soft, fluffy stacks perfect for breakfast or dessert.",
      image: "/images/pancake.jpg",
      color: "#FFF3E4",
    },
    {
      name: "Other",
      description: "Explore more sweet treats beyond the classics.",
      image: "/images/Treats.jpg",
      color: "#E8EAF6",
    },
  ];

  return (
    <div className="bg">
      <header className="navbar-full d-flex flex-wrap align-items-center justify-content-between py-3 border-bottom sticky-top">
        <div className="col-md-4 mb-2 mb-md-0 px-3">
          <input
            type="text"
            className="form-control search-bar"
            placeholder="Search recipes..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>

        <ul className="nav col-12 col-md-auto mb-2 justify-content-center mb-md-0 px-3">
          <li>
            <Link to="/home" className="nav-link">
              <i className="fa-solid fa-house"></i> Home
            </Link>
          </li>
          <li>
            <Link
              to="/category"
              className="nav-link"
              style={{
                color: "#c72c48",
                backgroundColor: "#feeef2",
                borderRadius: "20px",
              }}
            >
              <i className="fa-solid fas fa-bread-slice"></i> Category
            </Link>
          </li>
        </ul>
      </header>

      <div className="desc">
        <h2>SELECT CATEGORY</h2>
      </div>

      <div className="row justify-content-center mt-5 m-3">
        {categories.map((cat, index) => (
          <div
            key={index}
            className="col-md-8 col-lg-6 mb-4 d-flex justify-content-center"
          >
            <Link
              to={`/category/${cat.name}`}
              className="text-decoration-none w-100" // keep styling intact
              style={{ color: "inherit" }}
            >
              <div
                className="category-card d-flex align-items-center"
                style={{
                  backgroundColor: cat.color,
                  borderRadius: "20px",
                  padding: "15px",
                  boxShadow: "0 4px 8px rgba(0,0,0,0.1)",
                  transition: "transform 0.2s ease-in-out",
                  cursor: "pointer",
                }}
                onMouseEnter={(e) =>
                  (e.currentTarget.style.transform = "scale(1.03)")
                }
                onMouseLeave={(e) =>
                  (e.currentTarget.style.transform = "scale(1)")
                }
              >
                <img
                  src={cat.image}
                  alt={cat.name}
                  className="category-img"
                  style={{
                    width: "100px",
                    height: "100px",
                    borderRadius: "15px",
                    objectFit: "cover",
                  }}
                />
                <div className="category-info ms-3">
                  <h4 style={{ marginBottom: "5px", color: "#644117" }}>
                    {cat.name}
                  </h4>
                  <p style={{ marginBottom: 0, color: "#82705bff" }}>
                    {cat.description}
                  </p>
                </div>
              </div>
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
}
