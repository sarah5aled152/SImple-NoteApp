# Simple Note App

## Overview
The Simple Note App is a single-page application (SPA) that allows users to manage notes. Users can add, edit, and delete notes.
This app uses vanilla JavaScript for functionality and demonstrates basic HTML, CSS, and JavaScript integration.

## Folder Structure
```
project-folder/
|-- index.html
|-- app.js
|-- style.css
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
Serves as the mock database for storing notes. This file is used by JSON Server.


