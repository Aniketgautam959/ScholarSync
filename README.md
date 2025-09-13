ScholarSync

🚀 ScholarSync is a modern student advisory platform built with Next.js, MongoDB, Clerk Authentication, and NPTEL APIs.
It is designed to help students get personalized academic guidance, explore courses, and streamline their learning journey.

✨ Features

🔑 Authentication with Clerk
 (secure login & session management)

📚 NPTEL API integration for course recommendations & learning materials

🎯 Personalized student advisory system to guide learning paths

🗂️ MongoDB database for storing user profiles, preferences & progress

⚡ Built with Next.js for fast, scalable, and SEO-friendly performance

🎨 Modern UI with responsive design

🛠️ Tech Stack

Frontend: Next.js, React, JavaScript

Backend: Node.js (via Next.js API routes)

Database: MongoDB (Mongoose ORM)

Authentication: Clerk

APIs: NPTEL APIs

Styling: (Add here if you used Tailwind / CSS Modules / etc.)

📂 Project Structure
```bash

ScholarSync/
 ├── pages/          # Next.js pages (routes)
 ├── components/     # Reusable UI components
 ├── lib/            # Utility functions & API integrations
 ├── models/         # MongoDB models
 ├── public/         # Static assets
 ├── styles/         # Global styles
 └── ...
```
🚀 Getting Started
1️⃣ Clone the Repository
```bash
git clone https://github.com/Aniketgautam959/ScholarSync.git
cd ScholarSync
```
2️⃣ Install Dependencies
```bash
npm install
# or
yarn install
```
3️⃣ Set Up Environment Variables
```bash
Create a .env.local file in the root directory with:

MONGODB_URI=your_mongodb_connection_string
NEXT_PUBLIC_CLERK_FRONTEND_API=your_clerk_frontend_api
CLERK_API_KEY=your_clerk_api_key
NPTEL_API_KEY=your_nptel_api_key
```
4️⃣ Run the Development Server
```bash
npm run dev


App will be available at: http://localhost:3000
```
📖 Usage

Sign up / Login with Clerk authentication

Set up profile with academic preferences

Browse NPTEL courses & get recommendations

Receive advisory guidance based on your profile

Track progress & manage your learning

🤝 Contributing

Contributions are always welcome!

Fork the repository

Create your feature branch (git checkout -b feature-name)

Commit your changes (git commit -m 'Add some feature')

Push to the branch (git push origin feature-name)

Open a Pull Request

📜 License

This project is licensed under the MIT License.

👨‍💻 Author

Aniket Gautam

🌐 GitHub

💼 LinkedIn
