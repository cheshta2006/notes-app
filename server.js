const express = require("express");
const fs = require("fs");

const app = express();
const PORT = 3000;

app.use(express.json());
app.use(express.static(__dirname));

// Get all notes
app.get("/notes", (req, res) => {
    if (!fs.existsSync("notes.json")) {
        return res.json([]);
    }

    const notes = JSON.parse(fs.readFileSync("notes.json"));
    res.json(notes);
});

// Add note
app.post("/notes", (req, res) => {
    const note = req.body;

    let notes = [];

    if (fs.existsSync("notes.json")) {
        notes = JSON.parse(fs.readFileSync("notes.json"));
    }

    notes.push(note);

    fs.writeFileSync("notes.json", JSON.stringify(notes, null, 2));

    res.json({ message: "Note added successfully" });
});

// Delete note
app.delete("/notes/:id", (req, res) => {
    const id = parseInt(req.params.id);

    let notes = JSON.parse(fs.readFileSync("notes.json"));

    notes = notes.filter((_, index) => index !== id);

    fs.writeFileSync("notes.json", JSON.stringify(notes, null, 2));

    res.json({ message: "Note deleted successfully" });
});

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});