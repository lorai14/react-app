export function ViewRecipeModal({
  showViewModal,
  selectedRecipe,
  categoryColors,
  closeViewModal,
}) {
  if (!showViewModal || !selectedRecipe) return null;
  const imageSrc =
    selectedRecipe.preview && selectedRecipe.preview.startsWith("blob:")
      ? selectedRecipe.preview
      : selectedRecipe.image?.startsWith("http")
      ? selectedRecipe.image
      : `/images/${selectedRecipe.image || "placeholder.jpg"}`;

  return (
    <div
      className="customBackdrop"
      role="presentation"
      onClick={closeViewModal}
    >
      <div
        className="customModal view-recipe-modal"
        role="dialog"
        aria-modal="true"
        onClick={(e) => e.stopPropagation()}
        style={{ padding: "0" }}
      >
        <div className="p-4">
          <h2
            className="modalTitle"
            style={{
              fontSize: "2rem",
              marginBottom: "5px",
              color: "#c72c48",
            }}
          >
            {selectedRecipe.dessert_name}
          </h2>

          <div className="row g-3 align-items-start mb-4">
            <div className="col-12 col-md-4 text-center">
              <img
                src={imageSrc}
                alt={selectedRecipe.dessert_name}
                style={{
                  width: "100%",
                  maxHeight: "250px",
                  objectFit: "cover",
                  borderRadius: "10px",
                }}
              />
            </div>

            <div className="col-12 col-md-8">
              <div
                className="d-flex align-items-center mb-2"
                style={{ gap: "0.5rem" }}
              >
                <span
                  className="badge"
                  style={{
                    color: "#644117",
                    padding: "4px 10px",
                    borderRadius: "5px",
                    fontWeight: "600",
                  }}
                >
                  {selectedRecipe.difficulty}
                </span>
                <span
                  className="category-badge"
                  style={{
                    backgroundColor:
                      categoryColors[selectedRecipe.category] || "#f0f0f0",
                    color: "#c72c48",
                    borderRadius: "5px",
                    padding: "4px 10px",
                    fontSize: "0.85rem",
                    fontWeight: "600",
                  }}
                >
                  {selectedRecipe.category}
                </span>
              </div>

              <div className="mb-0">
                <p style={{ margin: 0, whiteSpace: "pre-wrap" }}>
                  {selectedRecipe.description || "No description provided."}
                </p>
              </div>
            </div>
          </div>

          <hr className="my-2" />

          <div className="row mb-4 g-3">
            <div className="col-4">
              <h5 className="section-title">Prep Time</h5>
              <p className="data-point">
                {selectedRecipe.preparation_time || "N/A"}
              </p>
            </div>

            <div className="col-4">
              <h5 className="section-title">Cook Time</h5>
              <p className="data-point">
                {selectedRecipe.cooking_time || "N/A"}
              </p>
            </div>

            <div className="col-4">
              <h5 className="section-title">Serving Size</h5>
              <p className="data-point">
                {selectedRecipe.serving_size || "N/A"}
              </p>
            </div>
          </div>
          <hr className="my-2" />

          <div className="mb-4">
            <h5 className="section-title">Ingredients</h5>
            <pre className="data-list-pre">
              {selectedRecipe.ingredients || "No ingredients listed."}
            </pre>
          </div>

          <div className="mb-4">
            <h5 className="section-title">Instructions</h5>
            <pre className="data-list-pre">
              {selectedRecipe.steps || "No instructions provided."}
            </pre>
          </div>

          <div className="modalActions justify-content-end mt-3">
            <button
              type="button"
              className="chip"
              onClick={closeViewModal}
              style={{ backgroundColor: "#c72c48", color: "white" }}
            >
              Close
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export function AddEditRecipeModal({
  showModal,
  editingId,
  form,
  handleSubmit,
  handleChange,
  setForm,
  closeModal,
}) {
  if (!showModal) return null;

  return (
    <div className="customBackdrop" role="presentation" onClick={closeModal}>
      <div
        className="customModal"
        role="dialog"
        aria-modal="true"
        onClick={(e) => e.stopPropagation()}
      >
        <h2 className="modalTitle">
          {editingId ? "Edit Recipe" : "Add Recipe"}
        </h2>

        <form onSubmit={handleSubmit} className="modalForm">
          <label className="field">
            <span>Dessert Name</span>
            <input
              name="title"
              value={form.title}
              onChange={handleChange}
              placeholder="Enter recipe name..."
              required
            />
          </label>
          <label className="field">
            <span>Description</span>
            <textarea
              name="description"
              value={form.description}
              onChange={handleChange}
              rows={3}
              placeholder="Brief description..."
            />
          </label>
          <div
            className="row g-3"
            style={{
              display: "grid",
              gridTemplateColumns: "1fr 1fr",
              gap: "16px",
            }}
          >
            <label className="field col-left row2">
              <span>Category</span>
              <select
                name="category"
                value={form.category}
                onChange={handleChange}
                required
              >
                <option value="">Select Category</option>
                <option value="Cakes">Cakes</option>
                <option value="Cookies">Cookies</option>
                <option value="Cupcakes">Cupcakes</option>
                <option value="Pastries">Pastries</option>
                <option value="Pancakes">Pancakes</option>
                <option value="Other">Other</option>
              </select>
            </label>

            <label className="field">
              <span>Image</span>
              <input
                type="file"
                name="image"
                accept="image/*"
                onChange={(e) => {
                  const file = e.target.files[0];
                  if (file) {
                    setForm((prev) => ({
                      ...prev,
                      image: file.name, // save only filename to DB
                      imageFile: file, // real file for uploading
                      preview: URL.createObjectURL(file), // used ONLY for preview
                    }));
                  }
                }}
              />
            </label>

            <label className="field">
              <span>Difficulty</span>
              <select
                name="difficulty"
                value={form.difficulty}
                onChange={handleChange}
              >
                <option>Easy</option>
                <option>Medium</option>
                <option>Hard</option>
              </select>
            </label>

            <label className="field">
              <span>Preparation Time</span>
              <input
                name="prepTime"
                value={form.prepTime}
                onChange={handleChange}
                placeholder="e.g. 20 mins"
              />
            </label>

            <label className="field">
              <span>Cooking Time</span>
              <input
                name="cookTime"
                value={form.cookTime}
                onChange={handleChange}
                placeholder="e.g. 40 mins"
              />
            </label>

            <label className="field">
              <span>Serving Size</span>
              <input
                name="serving"
                value={form.serving}
                onChange={handleChange}
                placeholder="e.g. 4 servings"
              />
            </label>
          </div>

          <label className="field mt-3 w-100">
            <span>Ingredients</span>
            <textarea
              name="ingredients"
              value={form.ingredients}
              placeholder="List ingredients..."
              rows={4}
              style={{ whiteSpace: "pre-wrap" }}
              onFocus={(e) => {
                if (!form.ingredients.trim()) {
                  setForm((prev) => ({ ...prev, ingredients: "• " }));
                }
              }}
              onChange={(e) => {
                const value = e.target.value;
                if (!value.startsWith("• ")) {
                  setForm((prev) => ({ ...prev, ingredients: "• " }));
                } else {
                  setForm((prev) => ({ ...prev, ingredients: value }));
                }
              }}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  e.preventDefault();
                  const { selectionStart, selectionEnd, value } = e.target;
                  const before = value.substring(0, selectionStart);
                  const after = value.substring(selectionEnd);

                  const newValue = `${before}\n• ${after}`;
                  setForm((prev) => ({ ...prev, ingredients: newValue }));

                  setTimeout(() => {
                    e.target.selectionStart = e.target.selectionEnd =
                      selectionStart + 3;
                  }, 0);
                }

                if (
                  e.key === "Backspace" &&
                  e.target.selectionStart <= 2 &&
                  e.target.selectionEnd <= 2
                ) {
                  e.preventDefault();
                }
              }}
            />
          </label>

          <label className="field mt-3 w-100">
            <span>Steps</span>
            <textarea
              name="steps"
              value={form.steps}
              placeholder="Write steps..."
              rows={5}
              style={{ whiteSpace: "pre-wrap" }}
              onFocus={(e) => {
                if (!form.steps.trim()) {
                  setForm((prev) => ({ ...prev, steps: "1. " }));
                }
              }}
              onChange={(e) => {
                const value = e.target.value;
                if (!value.startsWith("1. ")) {
                  setForm((prev) => ({ ...prev, steps: "1. " }));
                } else {
                  setForm((prev) => ({ ...prev, steps: value }));
                }
              }}
              onKeyDown={(e) => {
                const { selectionStart, selectionEnd, value } = e.target;
                if (e.key === "Enter") {
                  e.preventDefault();
                  const lines = value.split("\n");
                  const nextNumber = lines.length + 1;

                  const before = value.substring(0, selectionStart);
                  const after = value.substring(selectionEnd);

                  const newValue = `${before}\n${nextNumber}. ${after}`;
                  setForm((prev) => ({ ...prev, steps: newValue }));

                  setTimeout(() => {
                    e.target.selectionStart = e.target.selectionEnd =
                      selectionStart + `${nextNumber}. `.length + 1;
                  }, 0);
                }

                if (
                  e.key === "Backspace" &&
                  e.target.selectionStart <= 3 &&
                  e.target.selectionEnd <= 3
                ) {
                  e.preventDefault();
                }
              }}
            />
          </label>

          <div className="modalActions mt-4">
            <button type="button" className="chip light" onClick={closeModal}>
              Cancel
            </button>
            <button type="submit" className="chip">
              {editingId ? "Update" : "Save"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export function ConfirmModal({
  showConfirm,
  closeConfirm,
  handleDelete,
  confirmId,
}) {
  if (!showConfirm) return null;

  return (
    <div className="customBackdrop" role="presentation" onClick={closeConfirm}>
      <div
        className="customModal"
        role="dialog"
        aria-modal="true"
        onClick={(e) => e.stopPropagation()}
      >
        <h2 className="modalTitle">Delete Recipe</h2>
        <p>Are you sure you want to delete this recipe?</p>
        <div className="modalActions">
          <button type="button" className="chip light" onClick={closeConfirm}>
            Cancel
          </button>
          <button
            type="button"
            className="chip"
            onClick={() => handleDelete(confirmId)}
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
}

export function SuccessModal({ showSuccess, closeSuccess, successMessage }) {
  if (!showSuccess) return null;

  return (
    <div className="customBackdrop" role="presentation" onClick={closeSuccess}>
      <div
        className="customModal"
        role="dialog"
        aria-modal="true"
        onClick={(e) => e.stopPropagation()}
      >
        <h2 className="modalTitle">Success!</h2>
        <p>{successMessage}</p>
        <div className="modalActions">
          <button type="button" className="chip" onClick={closeSuccess}>
            OK
          </button>
        </div>
      </div>
    </div>
  );
}
