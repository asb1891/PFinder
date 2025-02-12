![react-native](https://img.shields.io/badge/React_Native-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)
![javascript](https://img.shields.io/badge/JavaScript-323330?style=for-the-badge&logo=javascript&logoColor=F7DF1E)
![nodejs](https://img.shields.io/badge/Node.js-43853D?style=for-the-badge&logo=node.js&logoColor=white)


![PetSwipe Logo](assets/PetSwipeLogo.png "PetSwipe Logo")

# PetSwipe

[🔗 Live Demo](https://andrewblumenthal.me/petswipe)

PetSwipe is a mobile application that helps users find their ideal pet by swiping through available pets in their area. The app fetches pets from the **Petfinder API**, allows users to express interest by swiping right, and stores their selections in a PostgreSQL database. Additionally, it incorporates a **machine learning recommendation system** that suggests pets based on user preferences collected during sign-up.

## Features
- 🔍 **Browse Pets** – Swipe through pets available for adoption in your area.
- ❤️ **Save Favorites** – Right-swiped pets are stored for future reference.
- 🏡 **Suggested Pets** – Machine learning-based pet recommendations based on user preferences.
- 📍 **Location-Based Search** – Filters results based on user-defined distance.
- 📩 **Contact Shelters** – Email pet shelters directly through the app.
- 🔐 **User Authentication** – Secure login using Firebase Authentication.
- 🔄 **Persistent Data** – Saved pets remain available even after restarting the app.

## Tech Stack
### Frontend
- **React Native** (with Expo Go for testing)
- **NativeWind** (for styling)

### Backend
- **Node.js** (Express.js for API management)
- **PostgreSQL** (for storing user data and saved pets)
- **Firebase Authentication** (for secure user login)

### APIs
- **Petfinder API** (fetches pet listings)

## Installation
### Prerequisites
Ensure you have the following installed:
- Node.js & npm
- Expo CLI
- PostgreSQL

### Setup Instructions
1. **Clone the repository:**
   ```sh
   git clone https://github.com/your-username/petswipe.git
   cd petswipe
   ```
2. **Install dependencies:**
   ```sh
   npm install
   ```
3. **Set up environment variables:**
   Create a `.env` file in the root directory and add the following:
   ```env
   PETFINDER_API_KEY=your_petfinder_api_key
   PETFINDER_API_SECRET=your_petfinder_api_secret
   DATABASE_URL=your_postgresql_connection_string
   FIREBASE_CONFIG=your_firebase_config
   ```
4. **Run the backend server:**
   ```sh
   npm run server
   ```
5. **Start the Expo app:**
   ```sh
   npm start
   ```

## Usage
- **Sign up** and complete the onboarding questionnaire.
- **Swipe right** on pets you like; they will be saved to your favorites.
- **Email shelters** directly from pet listings.

## Future Enhancements
- 📊 Improve ML model accuracy with more user feedback.
- 🌎 Expand location-based search to support broader regions.
- 🔄 Sync preferences dynamically with user interactions.

This project is intended for educational purposes and aims to help increase the rate of pet adoptions through an easy-to-use mobile interface.

