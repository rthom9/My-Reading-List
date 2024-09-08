
---

# My Reading List

My Reading List is a full-stack application built using the MERN stack (MongoDB, Express, React, Node.js) that allows users to keep track of the books they have read. It offers a user-friendly interface to manage and view book entries, and leverages the Open Library API for additional book data.

## Features

- **Book Tracking**: Users can add books they've read, specifying required fields like the book title, author, and completed date.
- **Additional Details**: Optionally, users can rate the book, provide a brief summary, and attach a book cover image.
- **Book Cover and ISBN Validation**: Book cover images are fetched from the Open Library API. The same API is used to validate ISBNs during book submissions. If a valid ISBN is not found, users can still add the book manually.
- **Display Options**: My Reading List entries can be viewed in either table or card format.
- **Sorting and Filtering**: In the table format, users can sort their reading list by title, author, rating, and date read. Users can also filter entries by date range.
- **CRUD Operations**: Users can add new books, edit existing entries, or delete entries. A modal interface enhances the user experience during book entry and deletion.
- **Detailed View**: Clicking on the information icon allows users to view the full details of a book entry in an expanded view.
- **Responsive Design**: The application is styled using Tailwind CSS, ensuring a sleek and responsive UI.

## Installation and Setup

To run the application locally, follow the steps below:

1. **Clone the repository:**
   ```bash
   git clone <repository-url>
   cd my-reading-list
   ```

2. **Backend Setup:**
   - Navigate to the backend directory:
     ```bash
     cd backend
     ```
   - Install the required dependencies:
     ```bash
     npm install
     ```
   - Start the backend server:
     ```bash
     npm start
     ```

3. **Frontend Setup:**
   - Navigate to the frontend directory:
     ```bash
     cd frontend
     ```
   - Install the required dependencies:
     ```bash
     npm install
     ```
   - Start the frontend server:
     ```bash
     npm start
     ```

4. **Access the Application:**
   - Once both the backend and frontend servers are running,My Reading List can be viewed in browser at `http://localhost:3000`.

## Technologies Used

- **Frontend**: React, Tailwind CSS
- **Backend**: Node.js, Express
- **Database**: MongoDB
- **APIs**: Open Library API

## Features in Detail

- **Open Library API Integration**: Book covers are fetched using the Open Library API, and ISBNs are validated through the API. Users may still opt to add books without a valid ISBN.
- **CRUD Functionality**: Easily manage your reading list with full Create, Read, Update, and Delete functionality.
- **Sorting & Filtering**: Sort by title, author, rating, and date read in table format. Filter by a date range for a more focused view of your reading history.
- **Responsive Design**: Built with Tailwind CSS for a modern and responsive user experience.

## Future Enhancements

- Add user authentication for personal reading lists.
- Enable book recommendations based on user entries and ratings.
- Expand filtering options by genre or tags.

