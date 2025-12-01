# Bar Review — Full-Stack Node.js Web Application

Bar Review is a full-stack web application for creating, managing, and reviewing personal bar lists. It demonstrates full-stack development using Node.js, Express, Passport, MongoDB, and EJS, with support for OAuth login, cloud image uploads, and geolocation via Google Maps.

Users can:

  - Register or log in using local authentication, Google OAuth, or Facebook OAuth
  
  - Add bars with names, addresses, descriptions, ratings, and images
  
  - Upload multiple images using Cloudinary
	
  - Automatically retrieve bar coordinates via Google Maps Autocomplete
  
  - View bar details on an interactive Google Map
	
  - Edit or delete their bars
  
  - Leave reviews

## ✨ Features

### 🔐 Authentication & Authorization
	•	Local login (username + password)
	•	Google OAuth2 login
	•	Facebook OAuth2 login
	•	Session-based authentication with Passport.js
	•	Access-control middleware to protect routes

### 🗺️ Maps & Geolocation
	•	Google Maps JavaScript API
	•	Google Places Autocomplete for searching addresses
	•	Automatically capturing latitude & longitude
	•	Interactive map on bar detail pages

### ☁️ Image Upload & Storage
	•	Upload multiple images via Multer
	•	Cloud storage powered by Cloudinary
	•	Ability to delete selected images during edit

### 🍸 Bars Management
	•	Create bar entries
	•	Edit bar info & coordinates
	•	View bar listings (filtered per logged-in user)
	•	Delete bars (including Cloudinary cleanup)
	•	Display ratings with star UI

### 📝 Review System
	•	Users can leave reviews with:
	•	Name
	•	Rating (1–5)
	•	Comment

### 🎨 Frontend (UI/UX)
	•	EJS templating with layout inheritance
	•	Bootstrap 5 styling
	•	Smooth hover effects & star rating visuals
	•	Responsive design


## 🛠️ Tech Stack

### Backend
	•	Node.js
	•	Express.js
	•	MongoDB + Mongoose
	•	Passport.js (Local, Google, Facebook Strategies)
	•	Multer
	•	Cloudinary Storage

### Frontend
	•	EJS
	•	Bootstrap 5
	•	Google Maps JavaScript API
	•	Client-side JavaScript

## 📂 Project Structure
```text
bar-review/
│
├── app.js                   # Main application entry point
├── package.json             # Project dependencies and scripts
├── .gitignore               # Git ignore rules
│
├── config/
│   └── passport.js          # Passport configuration (Local, Google, Facebook strategies)
│
├── models/
│   ├── bar.js               # Bar schema and model
│   ├── review.js            # Review schema and model
│   └── user.js              # User schema, password hashing, reset token
│
├── routes/
│   ├── auth.js              # Authentication routes (login, register, OAuth)
│   ├── bars.js              # CRUD routes for bars
│   └── reviews.js           # Review submission routes
│
├── utils/
│   ├── cloudinary.js        # Cloudinary storage configuration
│   └── sendEmail.js         # Password reset email utility (Nodemailer)
│
├── public/
│   ├── css/
│   │   └── style.css        # Styling
│   └── js/
│       └── main.js          # Client-side scripts
│
└── views/
    ├── layout.ejs           # Main page layout
    ├── home.ejs             # Home page
    │
    ├── auth/                # Authentication pages
    │   ├── login.ejs
    │   ├── register.ejs
    │   ├── forgot.ejs
    │   └── reset.ejs
    │
    ├── bars/                # Bar CRUD pages
    │   ├── index.ejs
    │   ├── new.ejs
    │   ├── edit.ejs
    │   └── show.ejs
    │
    └── reviews/
        └── new.ejs          # New review form
```

## ▶️ Running Locally
1. Clone the repository
   ```text
   git clone https://github.com/yourusername/bar-review.git
   cd bar-review
   ```
3. Install dependencies
   ```text
   npm install
   ```
5. Set up your .env file
   ```text
   MONGO_URL=your_mongodb_connection_string
   CLOUD_NAME=your_cloudinary_cloud_name
   CLOUD_KEY=your_cloudinary_api_key
   CLOUD_SECRET=your_cloudinary_api_secret
   GOOGLE_MAPS_API_KEY=your_google_maps_api_key
   GOOGLE_CLIENT_ID=your_google_oauth_client_id
   GOOGLE_CLIENT_SECRET=your_google_oauth_client_secret
   FB_CLIENT_ID=your_facebook_app_client_id
   FB_CLIENT_SECRET=your_facebook_app_client_secret
   EMAIL_USER=your_email_for_password_reset
   EMAIL_PASS=your_email_password_or_app_token
   ```
7. Run the application
   ```text
   node app.js
   ```
9. Then visit:
   ```text
   http://localhost:3000
   ```
## 👩‍💻 Author
Joanne Hsieh
Full-Stack Developer
Passionate about building practical, user-centered web applications.
Experience in Node.js, Python, cloud deployment, and modern JavaScript development.
