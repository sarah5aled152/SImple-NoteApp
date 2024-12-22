/** * callBack takes: * null - This is the first parameter: It represents the
error parameter When null, it means "no error occurred" If there was an error,
we'd pass an Error object instead of null JSON.parse(xhr.responseText) - This is
the second parameter: It contains the actual data/result xhr.responseText
contains the raw response from the server (as a string) */ /** * open * set
header * trace status * send */

var API_URL = "http://localhost:3000/notes";

export function addNote(note, callback) {
  const xhr = new XMLHttpRequest();
  xhr.open("POST", API_URL, true);
  xhr.setRequestHeader("Content-Type", "application/json");

  xhr.onreadystatechange = function () {
    if (xhr.readyState === 4) {
      if (xhr.status === 201) {
        console.log("Note added successfully:", xhr.responseText);
        callback(null, JSON.parse(xhr.responseText));
      } else {
        console.error("Error adding note:", xhr.status);
        callback(new Error(`Failed to add note: ${xhr.status}`));
      }
    }
  };

  xhr.send(JSON.stringify(note));
}

export function getAllNotes(callback) {
  const xhr = new XMLHttpRequest();
  xhr.open("GET", API_URL, true);

  xhr.onreadystatechange = function () {
    if (xhr.readyState === 4) {
      if (xhr.status === 200) {
        console.log("Retrieved all notes:", xhr.responseText);
        callback(null, JSON.parse(xhr.responseText));
      } else {
        console.error("Error getting notes:", xhr.status);
        callback(new Error(`Failed to get notes: ${xhr.status}`));
      }
    }
  };

  xhr.send();
}

export function updateNote(id, updatedNote, callback) {
  const xhr = new XMLHttpRequest();
  xhr.open("PUT", `${API_URL}/${id}`, true);
  xhr.setRequestHeader("Content-Type", "application/json");

  xhr.onreadystatechange = function () {
    if (xhr.readyState === 4) {
      if (xhr.status === 200) {
        console.log("Note updated successfully:", xhr.responseText);
        callback(null, JSON.parse(xhr.responseText));
      } else {
        console.error("Error updating note:", xhr.status);
        callback(new Error(`Failed to update note: ${xhr.status}`));
      }
    }
  };

  xhr.send(JSON.stringify(updatedNote));
}


export function deleteNote(id, callback) {
  const xhr = new XMLHttpRequest();
  xhr.open('DELETE', `${API_URL}/${id}`, true);

  xhr.onreadystatechange = function() {
      if (xhr.readyState === 4) {
          if (xhr.status === 200 || xhr.status === 204) {
              console.log('Note deleted successfully');
              callback(null, true);
          } else {
              console.error('Error deleting note:', xhr.status);
              callback(new Error(`Failed to delete note: ${xhr.status}`));
          }
      }
  };

  xhr.send();
}
