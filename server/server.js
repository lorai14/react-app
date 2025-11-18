import express from "express";
import mysql from "mysql2";
import cors from "cors";
import bodyParser from "body-parser";

const app = express();

// Middleware
app.use(cors());
app.use(bodyParser.json());

// MySQL connection
const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "", // add your MySQL password if you set one
  database: "dessertify", // your database name
});

db.connect((err) => {
  if (err) {
    console.error("atabase connection failed:", err);
  } else {
    console.log("✅ Connected to MySQL database");
  }
});

// Get all desserts
app.get("/api/recipes", (_req, res) => {
  db.query("SELECT * FROM desserts", (err, results) => {
    if (err) return res.status(500).json({ error: err });
    res.json(results);
  });
});

// Add a new dessert
app.post("/api/recipes", (req, res) => {
  const {
    dessert_name,
    description,
    category,
    image,
    difficulty,
    preparation_time,
    cooking_time,
    serving_size,
    ingredients,
    steps,
  } = req.body;

  const sql = `
    INSERT INTO desserts
    (dessert_name, description, category, image, difficulty, preparation_time, cooking_time, serving_size, ingredients, steps)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
  `;

  db.query(
    sql,
    [
      dessert_name,
      description,
      category,
      image,
      difficulty,
      preparation_time,
      cooking_time,
      serving_size,
      ingredients,
      steps,
    ],
    (err, result) => {
      if (err) return res.status(500).json({ error: err });
      res.json({ id: result.insertId, ...req.body });
    }
  );
});

app.delete("/api/recipes/:id", (req, res) => {
  const { id } = req.params;
  const sql = "DELETE FROM desserts WHERE id = ?";

  db.query(sql, [id], (err, result) => {
    if (err) return res.status(500).json({ error: err });
    res.json({ success: true });
  });
});

app.get("/api/desserts/:category", (req, res) => {
  const category = req.params.category;
  const sql = "SELECT * FROM desserts WHERE category = ?";
  db.query(sql, [category], (err, result) => {
    if (err) return res.status(500).json({ error: "Database error" });
    res.json(result);
  });
});


// Start server
app.listen(5000, () => {
  console.log("Server running on http://localhost:5000");
});

