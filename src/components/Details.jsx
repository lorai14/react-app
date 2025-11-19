import { useLocation, useParams, Link } from "react-router-dom";

export default function Details() {
  const { state } = useLocation();
  const { id } = useParams();
  const recipe = state?.recipe;

  if (!recipe) {
    return (
      <div
        className="page"
        style={{ padding: 24, maxWidth: 900, margin: "0 auto" }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            marginBottom: 16,
          }}
        >
          <h1 style={{ margin: 0 }}>Recipe</h1>
          <Link to="/" className="chip">
            Back
          </Link>
        </div>
        <p>
          Recipe data was not found. Please navigate from the home page again.
        </p>
      </div>
    );
  }

  return (
    <div
      className="page"
      style={{ padding: 24, maxWidth: 1000, margin: "0 auto" }}
    >
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          marginBottom: 16,
        }}
      >
        <h1 style={{ margin: 0 }}>{recipe.title}</h1>
        <Link to="/home" className="chip">
          Back
        </Link>
      </div>

      <div
        style={{
          background: "#fff",
          borderRadius: 16,
          padding: 16,
          boxShadow: "0 10px 30px rgba(160,55,62,0.08)",
        }}
      >
        <div
          style={{ display: "grid", gridTemplateColumns: "360px 1fr", gap: 20 }}
        >
          <div className="thumbWrap">
            <img
              src={
                recipe.image?.startsWith("http")
                  ? recipe.image
                  : recipe.image?.startsWith("/")
                  ? recipe.image
                  : "/" + recipe.image
              }
              alt={recipe.title}
              className="thumb"
              style={{ height: 240 }}
            />
          </div>
          <div>
            <div style={{ marginBottom: 6 }}>
              <strong>Difficulty:</strong> {recipe.difficulty}
            </div>
            {recipe.serving && (
              <div style={{ marginBottom: 6 }}>
                <strong>Serving Size:</strong> {recipe.serving}
              </div>
            )}
            {recipe.prepTime && (
              <div style={{ marginBottom: 6 }}>
                <strong>Preparation Time:</strong> {recipe.prepTime}
              </div>
            )}
            {recipe.cookTime && (
              <div style={{ marginBottom: 6 }}>
                <strong>Cooking Time:</strong> {recipe.cookTime}
              </div>
            )}
          </div>
        </div>

        {recipe.ingredients?.length > 0 && (
          <div style={{ marginTop: 16 }}>
            <h3 style={{ margin: "0 0 8px" }}>Ingredients</h3>
            <ul>
              {recipe.ingredients.map((ing, i) => (
                <li key={i}>{ing}</li>
              ))}
            </ul>
          </div>
        )}

        {recipe.steps?.length > 0 && (
          <div style={{ marginTop: 16 }}>
            <h3 style={{ margin: "0 0 8px" }}>Steps</h3>
            <ol>
              {recipe.steps.map((s, i) => (
                <li key={i} style={{ marginBottom: 6 }}>
                  {s}
                </li>
              ))}
            </ol>
          </div>
        )}
      </div>
    </div>
  );
}
