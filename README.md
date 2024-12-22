# Simple Note App

## Overview
The Simple Note App is a single-page application (SPA) that allows users to manage notes. Users can add, edit, and delete notes through a clean and user-friendly interface. This app uses vanilla JavaScript for functionality and demonstrates basic HTML, CSS, and JavaScript integration.

## Features
1. **Add Notes**: Users can click the "Add Note" button to open a form where they can input a note title and description.
2. **Edit Notes**: Each note has an edit button, allowing users to modify the content.
3. **Delete Notes**: Each note also includes a delete button for easy removal.
4. **SPA Approach**: The app dynamically updates the DOM without page reloads.

## Folder Structure
```
project-folder/
|-- index.html
|-- app.js
|-- styles.css
|-- db.json
```

## Installation
1. Clone or download the repository.
2. Install **JSON Server** globally if you haven’t already:
   ```bash
   npm install -g json-server
   ```
3. Create a `db.json` file in your project folder with the following structure:
   ```json
   {
     "notes": [
       {
         "id": 1,
         "title": "Sample Note",
         "description": "This is a sample note."
       }
     ]
   }
   ```
4. Start the JSON Server:
   ```bash
   json-server --watch db.json
   ```
5. Open `index.html` in your browser.

## Files
### **1. index.html**
Contains the structure of the app, including the Add Note button, the note form, and placeholders for notes.

### **2. styles.css**
Defines the app's visual appearance, including styles for the note form, buttons, and layout transitions.

### **3. app.js**
Implements the core functionality of the app, including:
- Adding notes.
- Editing notes.
- Deleting notes.

### **4. db.json**
Serves as the mock database for storing notes. This file is used by JSON Server to simulate a REST API.

## How to Contribute
1. Fork the repository.
2. Create a new branch: `git checkout -b feature-name`.
3. Commit your changes: `git commit -m 'Add new feature'`.
4. Push to the branch: `git push origin feature-name`.
5. Submit a pull request.

## Future Enhancements
1. Implement local storage to save notes between sessions.
2. Add categories or tags for notes.
3. Include search functionality to find notes quickly.
4. Enhance the UI with animations and themes.

