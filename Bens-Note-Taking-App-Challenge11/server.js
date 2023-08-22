const express = require("express");
const path = require("path");
const fs = require("fs");
const { v4: uuidv4 } = require("uuid");

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware to parse incoming request bodies
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Serve static files from the public directory
app.use(express.static("public"));

// Routes
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "public/index.html"));
});

app.get("/notes", (req, res) => {
  res.sendFile(path.join(__dirname, "public/notes.html"));
});

app.get("/api/notes", (req, res) => {
  fs.readFile(path.join(__dirname, "db", "db.json"), "utf8", (err, data) => {
    if (err) {
      console.error(err);
      return res.status(500).json({ error: "Internal Server Error" });
    }
    const notes = JSON.parse(data);
    return res.json(notes);
  });
});

app.post("/api/notes", (req, res) => {
  const newNote = {
    id: uuidv4(),
    title: req.body.title,
    text: req.body.text,
  };

  fs.readFile(path.join(__dirname, "db", "db.json"), "utf8", (err, data) => {
    if (err) {
      console.error(err);
      return res.status(500).json({ error: "Internal Server Error" });
    }

    const notes = JSON.parse(data);
    notes.push(newNote);

    fs.writeFile(
      path.join(__dirname, "db", "db.json"),
      JSON.stringify(notes),
      (err) => {
        if (err) {
          console.error(err);
          return res.status(500).json({ error: "Internal Server Error" });
        }
        return res.json(newNote);
      }
    );
  });
});

// TODO - add delete route
app.delete("/api/notes", (req, res) => {

})

// Start the server
app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
