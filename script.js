const form = document.getElementById("noteForm");
const notesContainer = document.getElementById("notesContainer");

async function loadNotes(date = "") {

    let url = "/notes";

    if (date) {
        url += `?date=${date}`;
    }

    const response = await fetch(url);
    const notes = await response.json();

    notesContainer.innerHTML = "";

    if (notes.length === 0) {
        notesContainer.innerHTML =
            "<h3>No notes found for selected date.</h3>";
        return;
    }

    notes.forEach((note, index) => {
        const div = document.createElement("div");

        div.className = "note-card";

        div.innerHTML = `
            <h3>${note.date}</h3>
            <p>${note.note}</p>
            <button class="delete-btn"
                onclick="deleteNote(${index})">
                Delete
            </button>
        `;

        notesContainer.appendChild(div);
    });
}

form.addEventListener("submit", async (e) => {
    e.preventDefault();

    const date = document.getElementById("date").value;
    const note = document.getElementById("note").value;

    await fetch("/notes", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({ date, note })
    });

    form.reset();
    loadNotes();
});

async function deleteNote(id) {
    await fetch(`/notes/${id}`, {
        method: "DELETE"
    });

    loadNotes();
}

loadNotes();

document
    .getElementById("filterBtn")
    .addEventListener("click", () => {

        const date =
            document.getElementById("filterDate").value;

        loadNotes(date);
    });

document
    .getElementById("showAllBtn")
    .addEventListener("click", () => {

        document.getElementById("filterDate").value = "";
        loadNotes();
    });