import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import "./HomePage.css";
import {
  ViewRecipeModal,
  AddEditRecipeModal,
  ConfirmModal,
  SuccessModal,
} from "./Modals";

export default function HomePage() {
  const [recipes, setRecipes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [search, setSearch] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [showConfirm, setShowConfirm] = useState(false);
  const [confirmId, setConfirmId] = useState(null);
  const [showSuccess, setShowSuccess] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");
  const [expandedIds, setExpandedIds] = useState([]);

  // State for View Recipe Modal
  const [showViewModal, setShowViewModal] = useState(false);
  const [selectedRecipe, setSelectedRecipe] = useState(null);

  const [form, setForm] = useState({
    title: "",
    difficulty: "Easy",
    category: "",
    image: "",
    description: "",
    ingredients: "",
    steps: "",
    serving: "",
    prepTime: "",
    cookTime: "",
  });

  const categoryColors = {
    Cakes: "#FAD4D4",
    Cookies: "#FFE9C2",
    Cupcakes: "#E1E3FF",
    Pastries: "#DFF6FF",
    Pancakes: "#FFF3E4",
    Other: "#E8EAF6",
  };

  const getId = (recipe) =>
    recipe?.id != null
      ? String(recipe.id)
      : recipe?._id != null
      ? String(recipe._id)
      : undefined;

  useEffect(() => {
    setLoading(true);
    fetch("http://localhost:5000/api/recipes")
      .then((res) => {
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        return res.json();
      })
      .then((data) => {
        setRecipes(Array.isArray(data) ? data : []);
        setError(null);
      })
      .catch((err) => {
        console.error("Error fetching recipes:", err);
        setError("Failed to load recipes. Please try again later.");
        setRecipes([]);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  const openAddModal = () => {
    setEditingId(null);
    setForm({
      title: "",
      difficulty: "Easy",
      category: "",
      image: "",
      ingredients: "",
      steps: "",
      serving: "",
      prepTime: "",
      cookTime: "",
      description: "",
    });
    setShowModal(true);
    document.body.classList.add("modal-open");
  };

  const openEditModal = (recipe) => {
    setEditingId(getId(recipe));
    setForm({
      title: recipe.dessert_name || "",
      difficulty: recipe.difficulty || "Easy",
      category: recipe.category || "",
      image: recipe.image || "",
      ingredients: recipe.ingredients || "",
      steps: recipe.steps || "",
      serving: recipe.serving_size || "",
      prepTime: recipe.preparation_time || "",
      cookTime: recipe.cooking_time || "",
      description: recipe.description || "",
    });
    setShowModal(true);
    document.body.classList.add("modal-open");
  };

  const closeModal = () => {
    setShowModal(false);
    document.body.classList.remove("modal-open");
  };

  // Function to open View Recipe Modal
  const openViewModal = (recipe) => {
    setSelectedRecipe(recipe);
    setShowViewModal(true);
    document.body.classList.add("modal-open");
  };

  // Function to close View Recipe Modal
  const closeViewModal = () => {
    setShowViewModal(false);
    setSelectedRecipe(null);
    document.body.classList.remove("modal-open");
  };

  const openConfirm = (id) => {
    setConfirmId(String(id));
    setShowConfirm(true);
    document.body.classList.add("modal-open");
  };

  const closeConfirm = () => {
    setShowConfirm(false);
    setConfirmId(null);
    document.body.classList.remove("modal-open");
  };

  const openSuccess = (message) => {
    setSuccessMessage(message);
    setShowSuccess(true);
    document.body.classList.add("modal-open");
  };

  const closeSuccess = () => {
    setShowSuccess(false);
    setSuccessMessage("");
    document.body.classList.remove("modal-open");
  };

  const handleDelete = async (id) => {
    try {
      const normalizedId = String(id);
      const response = await fetch(
        `http://localhost:5000/api/recipes/${normalizedId}`,
        {
          method: "DELETE",
        }
      );

      if (!response.ok) throw new Error("Failed to delete recipe");

      setRecipes((prev) =>
        prev.filter((r) => String(getId(r)) !== normalizedId)
      );
      closeConfirm();
      openSuccess("Recipe deleted successfully!");
    } catch (error) {
      console.error("Error deleting recipe:", error);
      alert("Failed to delete recipe");
    }
  };

  const handleChange = (e) => {
    const { name, type, value, files } = e.target;
    if (type === "file") {
      const file = files[0];
      setForm((prev) => ({
        ...prev,
        [name]: file ? file.name : "",
        fileObject: file || null,
      }));
    } else {
      setForm((prev) => ({ ...prev, [name]: value }));
    }
  };

  const toggleDescription = (id) => {
    setExpandedIds((prev) =>
      prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]
    );
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const payload = {
      dessert_name: form.title,
      description: form.description,
      category: form.category,
      image: form.image || "placeholder.jpg",
      difficulty: form.difficulty,
      preparation_time: form.prepTime,
      cooking_time: form.cookTime,
      serving_size: form.serving,
      ingredients: form.ingredients,
      steps: form.steps,
    };

    try {
      if (editingId) {
        const normalizedId = String(editingId);
        let response = await fetch(
          `http://localhost:5000/api/recipes/${normalizedId}`,
          {
            method: "PUT",
            headers: {
              "Content-Type": "application/json",
              Accept: "application/json",
            },
            body: JSON.stringify(payload),
          }
        );

        if (
          !response.ok &&
          (response.status === 404 || response.status === 405)
        ) {
          response = await fetch(
            `http://localhost:5000/api/recipes/${normalizedId}`,
            {
              method: "PATCH",
              headers: {
                "Content-Type": "application/json",
                Accept: "application/json",
              },
              body: JSON.stringify(payload),
            }
          );
        }

        if (!response.ok && response.status === 404) {
          const createRes = await fetch("http://localhost:5000/api/recipes", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              Accept: "application/json",
            },
            body: JSON.stringify(payload),
          });
          if (!createRes.ok) throw new Error("Failed to update recipe");
          const created = await createRes.json();
          try {
            await fetch(`http://localhost:5000/api/recipes/${normalizedId}`, {
              method: "DELETE",
            });
          } catch (_) {}
          setRecipes((prev) =>
            prev.map((r) => (String(getId(r)) === normalizedId ? created : r))
          );
          setEditingId(null);
          closeModal();
          openSuccess("Recipe updated successfully!");
          return;
        }

        if (!response.ok) throw new Error("Failed to update recipe");

        const updatedRecipe = await response.json();
        setRecipes((prev) =>
          prev.map((r) =>
            String(getId(r)) === normalizedId ? updatedRecipe : r
          )
        );
        setEditingId(null);
        closeModal();
        openSuccess("Recipe updated successfully!");
      } else {
        const response = await fetch("http://localhost:5000/api/recipes", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        });

        if (!response.ok) throw new Error("Failed to save recipe");

        const savedRecipe = await response.json();
        setRecipes((prev) => [savedRecipe, ...prev]);
        closeModal();
        openSuccess("Recipe added successfully!");
      }
    } catch (error) {
      console.error("Error saving recipe:", error);
      alert(editingId ? "Failed to update recipe" : "Failed to save recipe");
    }
  };

  const filteredRecipes = recipes.filter((r) =>
    r.dessert_name?.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="homepage-bg">
      <header className="navbar-full d-flex flex-wrap align-items-center justify-content-between py-3 sticky-top">
        <div className="col-md-4 mb-2 mb-md-0 px-3 rounded">
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
            <Link
              to="/home"
              className="nav-link"
              style={{
                borderRadius: "50px",
                color: "#c72c48",
                backgroundColor: "#feeef2",
              }}
            >
              <i className="fa-solid fa-house"></i>
              <span className="nav-text">Home</span>
            </Link>
          </li>

          <li>
            <Link to="/category" className="nav-link">
              <i className="fa-solid fa-bread-slice"></i>
              <span className="nav-text">Category</span>
            </Link>
          </li>
        </ul>
      </header>

      <div className="desc">
        <h2>DESSERT RECIPES</h2>
      </div>

      <button className="btn btn-add-recipe" onClick={openAddModal}>
        <i className="fa fa-plus" alt="Add Recipe"></i>
      </button>

      <div className="container my-4">
        <div className="row g-4">
          {loading ? (
            <div className="text-center text-muted w-100 py-5">
              <p>Loading recipes...</p>
            </div>
          ) : error ? (
            <div className="text-center text-danger w-100 py-5">
              <p>{error}</p>
            </div>
          ) : filteredRecipes.length > 0 ? (
            filteredRecipes.map((r) => (
              <div className="col-md-4" key={getId(r)}>
                <div className="card h-100">
                  <img
                    src={
                      r.image?.startsWith("blob:")
                        ? r.image
                        : r.image?.startsWith("http")
                        ? r.image
                        : `/images/${r.image || "placeholder.jpg"}`
                    }
                    className="card-img-top"
                    alt={r.dessert_name || "Recipe image"}
                    style={{ objectFit: "cover", height: "255px" }}
                  />

                  <div className="card-body position-relative">
                    <h5 className="cakeName card-title">{r.dessert_name}</h5>

                    <div
                      className="d-flex align-items-center mb-2"
                      style={{ gap: "0.5rem" }}
                    >
                      <span
                        className="badge bg-light"
                        style={{ color: "#644117" }}
                      >
                        {r.difficulty}
                      </span>
                      <span
                        className="category-badge"
                        style={{
                          backgroundColor:
                            categoryColors[r.category] || "#f0f0f0",
                          color: "#333",
                          borderRadius: "20px",
                          padding: "4px 10px",
                          fontSize: "0.85rem",
                          fontWeight: "500",
                        }}
                      >
                        {r.category}
                      </span>
                    </div>

                    <p className="card-text mt-2">
                      {expandedIds.includes(getId(r))
                        ? r.description
                        : r.description.length > 100
                        ? r.description.substring(0, 100) + "..."
                        : r.description}

                      {r.description.length > 100 && (
                        <span
                          className="see-more"
                          onClick={() => toggleDescription(getId(r))}
                          style={{
                            color: "#c72c48",
                            cursor: "pointer",
                            fontWeight: "500",
                          }}
                        >
                          {expandedIds.includes(getId(r))
                            ? " See less"
                            : " See more"}
                        </span>
                      )}
                    </p>

                    <div className="d-flex align-items-center mt-auto">
                      <button
                        className="btn btn-outline w-100 flex-grow-1 me-2"
                        onClick={() => openViewModal(r)}
                      >
                        <i className="fa fa-clipboard-list me-1"></i> View
                        Recipe
                      </button>

                      <div className="d-flex">
                        <button
                          className="btn btn-outline me-2"
                          style={{ borderRadius: "50%", width: "40px" }}
                          onClick={() => openEditModal(r)}
                        >
                          <i className="fa fa-pen"></i>
                        </button>
                        <button
                          className="btn btn-del"
                          onClick={() => openConfirm(getId(r))}
                        >
                          <i className="fa fa-trash"></i>
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))
          ) : search ? (
            <div className="text-center text-muted w-100 py-5">
              <p>No recipes found for "{search}".</p>
            </div>
          ) : (
            <div className="text-center text-muted w-100 py-5">
              <p>No recipes yet. Add your first recipe!</p>
            </div>
          )}
        </div>
      </div>

      <ViewRecipeModal
        showViewModal={showViewModal}
        selectedRecipe={selectedRecipe}
        categoryColors={categoryColors}
        closeViewModal={closeViewModal}
      />

      <AddEditRecipeModal
        showModal={showModal}
        editingId={editingId}
        form={form}
        handleSubmit={handleSubmit}
        handleChange={handleChange}
        setForm={setForm}
        closeModal={closeModal}
      />

      <ConfirmModal
        showConfirm={showConfirm}
        closeConfirm={closeConfirm}
        handleDelete={handleDelete}
        confirmId={confirmId}
      />

      <SuccessModal
        showSuccess={showSuccess}
        closeSuccess={closeSuccess}
        successMessage={successMessage}
      />
    </div>
  );
}
