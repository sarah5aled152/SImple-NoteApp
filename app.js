import { validateInput } from "./validation.js";
import { addNote, getAllNotes, deleteNote, updateNote } from "./index.js";
var saveBtn = document.getElementById("save-note-btn");

var desc = document.getElementById("note-description");
var title = document.getElementById("note-title");

const notesContainer = document.getElementById("notes-container");
const form = document.getElementById("note-form");
////==============================================================================

//triger button

document.getElementById("add-note-btn").addEventListener("click", function () {
  form.style.display = form.style.display === "flex" ? "none" : "flex";
});

//handle sending data
/**
 * takes values 
 * send to validation
 * call api and pass data 
 
 */

saveBtn.addEventListener("click", (e) => {
  e.preventDefault();

  var titleVal = title.value;

  var descVal = desc.value;

  console.log(titleVal, descVal);
  var isValid = validateInput(titleVal, descVal);
  if (!isValid) {
    title.style.border = "2px solid red";
    desc.style.border = "2px solid red";
    return;
  } else {
    var note = { title: titleVal, desc: descVal };
    addNote(note, (error, response) => {
      if (error) {
        alert(`Failed to add note: ${error.message}`);
        return;
      } else {
        alert(`Note added successfully!${response}`);

        title.value = "";
        desc.value = "";
      }
    });
  }
});

//==========================================================

document.addEventListener("DOMContentLoaded", () => {
  function displayNotes(error, notes) {
    if (error) {
      console.log(error.message);
      return;
    }

    if (notes && notes.length > 0) {
      notesContainer.innerHTML = "";

      notes.forEach((note) => {
        const noteDiv = document.createElement("div");
        noteDiv.classList.add("note");

        // Add note content
        const titleElem = document.createElement("h3");
        titleElem.textContent = note.title;
        noteDiv.appendChild(titleElem);

        const descElem = document.createElement("p");
        descElem.textContent = note.desc;
        noteDiv.appendChild(descElem);

        const editBtn = document.createElement("button");
        editBtn.textContent = "Edit";
        editBtn.classList.add("edit-btn");
        editBtn.setAttribute("data-id", note.id);
        noteDiv.appendChild(editBtn);

        const deleteBtn = document.createElement("button");
        deleteBtn.textContent = "Delete";
        deleteBtn.setAttribute("data-id", note.id);
        deleteBtn.classList.add("delete-btn");
        noteDiv.appendChild(deleteBtn);

        notesContainer.appendChild(noteDiv);
      });
    } else {
      notesContainer.innerHTML = "<p>No notes available.</p>";
    }
  }

  getAllNotes(displayNotes);
});
//====================================

function removeNoteFromUI(noteId) {
  const noteElement = document.querySelector(
    `.note:has([data-id="${noteId}"])`
  );
  if (noteElement) {
    noteElement.remove();

    if (notesContainer.children.length === 0) {
      notesContainer.innerHTML = "<p>No notes available.</p>";
    }
  }
}

notesContainer.addEventListener("click", (e) => {
  if (e.target.classList.contains("delete-btn")) {
    const noteId = e.target.getAttribute("data-id");

    const confirmDelete = confirm("Are you sure you want to delete this note?");

    if (confirmDelete) {
      deleteNote(noteId, (error, response) => {
        if (error) {
          alert(`Failed to delete note: ${error.message}`);
          return;
        }

        removeNoteFromUI(noteId);
        alert("Note deleted successfully!");
      });
    }

    getAllNotes(displayNotes);
  }
});

//================update============================

//

function populateEditForm(noteId, titleInput, descInput) {
  form.style.display = "flex";

  title.value = titleInput;
  desc.value = descInput;

  form.setAttribute("data-edit-id", noteId);

  saveBtn.textContent = "Update Note";

  form.scrollIntoView({ behavior: "smooth" });
}

notesContainer.addEventListener("click", (e) => {
  if (e.target.classList.contains("edit-btn")) {
    const noteId = e.target.getAttribute("data-id");
    const noteDiv = e.target.closest(".note");
    const titleInput = noteDiv.querySelector("h3").textContent;
    const descInput = noteDiv.querySelector("p").textContent;

    populateEditForm(noteId, titleInput, descInput);
  }
});

saveBtn.addEventListener("click", (e) => {
  e.preventDefault();

  const titleVal = title.value;
  const descVal = desc.value;
  const form = document.getElementById("note-form");
  const editId = form.getAttribute("data-edit-id");

  // Validate input
  const isValid = validateInput(titleVal, descVal);
  if (!isValid) {
    title.style.border = "2px solid red";
    desc.style.border = "2px solid red";
    return;
  }

  const note = { title: titleVal, desc: descVal };

  if (editId) {
    // Update existing note
    updateNote(editId, note, (error, response) => {
      if (error) {
        alert(`Failed to update note: ${error.message}`);
        return;
      }

      alert("Note updated successfully!");

      // Reset form
      form.removeAttribute("data-edit-id");
      saveBtn.textContent = "Save Note";
      title.value = "";
      desc.value = "";
      form.style.display = "none";

      // Refresh notes display
      getAllNotes(displayNotes);
    });
  } else {
    // Create new note
    addNote(note, (error, response) => {
      if (error) {
        alert(`Failed to add note: ${error.message}`);
        return;
      }

      alert("Note added successfully!");
      title.value = "";
      desc.value = "";
      form.style.display = "none";

      getAllNotes(displayNotes);
    });
  }
});

const cancelBtn = document.createElement("button");
cancelBtn.textContent = "Cancel";
cancelBtn.classList.add("cancel-btn");
saveBtn.parentNode.insertBefore(cancelBtn, saveBtn.nextSibling);

cancelBtn.addEventListener("click", (e) => {
  e.preventDefault();

  const form = document.getElementById("note-form");
  form.removeAttribute("data-edit-id");
  saveBtn.textContent = "Save Note";
  title.value = "";
  desc.value = "";
  form.style.display = "none";
});

const style = document.createElement("style");
style.textContent = `
  .edit-btn {
      background-color: #4CAF50;
      color: white;
      border: none;
      padding: 5px 10px;
      cursor: pointer;
      border-radius: 4px;
      margin-right: 5px;
  }
  
  .edit-btn:hover {
      background-color: #45a049;
  }
  
  .cancel-btn {
      background-color: #808080;
      color: white;
      border: none;
      padding: 5px 10px;
      cursor: pointer;
      border-radius: 4px;
      margin-left: 5px;
  }
  
  .cancel-btn:hover {
      background-color: #666666;
  }
`;
document.head.appendChild(style);
