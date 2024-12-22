var titleError = document.getElementById("title-error");
var descError = document.getElementById("description-error");

export function validateInput(title, desc) {
  var isValid = true;

  const titleRegex = /^[a-zA-Z0-9\s]+$/;

  // Validate title
  if (!title.trim() || title.trim().length === 0) {
    titleError.textContent = `Title is required!`;
    isValid = false;
  } else if (title.trim().length < 6) {
    titleError.textContent = `Title must be at least 6 characters!`;
    isValid = false;
  } else if (!titleRegex.test(title)) {
    titleError.textContent = `Title can only contain letters, numbers, and spaces`;
    isValid = false;
  }

  // Validate description
  if (desc.trim() === "" || desc.trim().length === 0) {
    descError.textContent = "Description is required!";
    isValid = false;
  } else if (desc.trim().length < 20) {
    descError.textContent = `Description must be at least 20 characters!`;
    isValid = false;
  }

  return isValid;
}
