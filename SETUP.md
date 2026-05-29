# Animal Rescue Network - Setup & Installation Guide

A complete MERN stack application for coordinating animal rescue efforts, connecting rescuers, volunteers, NGOs, and adopters.

## 🎯 Features

### User Roles
- **Regular Users**: Report animals in distress and adopt rescued animals
- **Volunteers**: Respond to rescue requests and help in the field
- **NGOs**: Manage rescued animals and coordinate rescue operations
- **Admin**: Manage the entire platform

### Core Features
- 🐾 **Animal Management**: Browse and adopt rescued animals
- 🚨 **Emergency Reporting**: Report animals needing rescue with location and description
- 👥 **Volunteer Coordination**: Volunteers can view and accept rescue assignments
- 🏥 **Health Tracking**: Track animal health status and rescue stories
- 📱 **Responsive Design**: Works on all devices with Tailwind CSS
- 🔐 **Secure Authentication**: JWT-based authentication with role-based access control

## 📋 Prerequisites

- Node.js (v14 or higher)
- MongoDB (local or cloud instance)
- npm or yarn
- Git

## 🚀 Installation

### 1. Clone the Repository

```bash
cd animal-rescue
```

### 2. Backend Setup

**Navigate to the backend directory:**
```bash
cd backend
```

**Install dependencies:**
```bash
npm install
```

**Create `.env` file:**
```bash
cp .env.example .env
```

**Configure environment variables:**
```env
PORT=5000
MONGO_URI=mongodb://localhost:27017/animal-rescue
JWT_SECRET=your_secure_secret_key_here_change_this
CLOUDINARY_CLOUD_NAME=your_cloudinary_cloud_name
CLOUDINARY_API_KEY=your_cloudinary_api_key
CLOUDINARY_API_SECRET=your_cloudinary_api_secret
```

**Start MongoDB** (if running locally):
```bash
# macOS with Homebrew
brew services start mongodb-community

# Or manually
mongod
```

**Run the backend server:**
```bash
# Development mode (with auto-reload)
npm run dev

# Production mode
npm start
```

The backend will start on `http://localhost:5000`

### 3. Frontend Setup

**In a new terminal, navigate to the frontend directory:**
```bash
cd frontend
```

**Install dependencies:**
```bash
npm install
```

**Start the development server:**
```bash
npm run dev
```

The frontend will start on `http://localhost:5173`

## 📚 API Endpoints

### Authentication
- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - Login user

### Animals
- `GET /api/animals` - Get all animals (with filters)
- `GET /api/animals/:id` - Get animal details
- `POST /api/animals` - Create new animal (NGO only)
- `PUT /api/animals/:id` - Update animal (NGO only)
- `DELETE /api/animals/:id` - Delete animal (NGO only)
- `PUT /api/animals/:id/adopt` - Adopt an animal

### Rescue Requests
- `GET /api/rescues` - Get all rescue requests
- `GET /api/rescues/:id` - Get rescue request details
- `POST /api/rescues` - Report new rescue request
- `PUT /api/rescues/:id` - Update rescue request (NGO/Admin)
- `POST /api/rescues/:id/updates` - Add update to rescue
- `PUT /api/rescues/:id/close` - Close rescue request

### Volunteers
- `GET /api/volunteers` - Get all volunteers
- `GET /api/volunteers/:id` - Get volunteer details
- `GET /api/volunteers/dashboard` - Get volunteer dashboard (Protected)
- `PUT /api/volunteers/profile` - Update volunteer profile
- `POST /api/volunteers/:rescueId/assign` - Assign rescue to volunteer (Admin)

### NGOs
- `GET /api/ngos` - Get all NGOs
- `GET /api/ngos/:id` - Get NGO details
- `PUT /api/ngos/profile` - Update NGO profile

## 🔐 Authentication

The app uses JWT (JSON Web Tokens) for authentication. 

**Getting Started:**
1. Register a new account at `/register`
2. Choose your role: User, Volunteer, or NGO
3. Fill in role-specific information
4. Login at `/login` with your credentials
5. Token is automatically stored and used for API requests

## 📖 User Workflows

### For a Regular User:
1. Sign up as a regular user
2. Browse available animals for adoption at `/adopt`
3. Click on an animal to see details
4. Click "Adopt Me!" to request adoption
5. Report a rescue emergency at `/report` with location and description

### For a Volunteer:
1. Sign up as a volunteer with your skills
2. Access your dashboard at `/volunteer`
3. View pending rescue requests
4. Accept rescues to be notified of assignments
5. Track assigned rescues in real-time

### For an NGO:
1. Sign up as an NGO with registration details
2. Upload rescued animals with photos and health info
3. Manage rescue requests and assign to volunteers
4. Track rescue status and updates

## 🏗️ Project Structure

```
animal-rescue/
├── backend/
│   ├── controllers/          # Request handlers
│   ├── models/              # MongoDB schemas
│   ├── routes/              # API endpoints
│   ├── middleware/          # Authentication & authorization
│   ├── server.js            # Express server
│   └── package.json
├── frontend/
│   ├── src/
│   │   ├── components/      # Reusable components
│   │   ├── pages/           # Page components
│   │   ├── context/         # React context (Auth)
│   │   ├── services/        # API client
│   │   ├── App.jsx          # Main app component
│   │   └── main.jsx
│   ├── package.json
│   └── vite.config.js
└── README.md
```

## 🎨 Technology Stack

### Backend
- **Express.js** - Web framework
- **MongoDB** - Database
- **Mongoose** - ODM
- **JWT** - Authentication
- **bcryptjs** - Password hashing

### Frontend
- **React 19** - UI library
- **Vite** - Build tool
- **Tailwind CSS** - Styling
- **React Router** - Navigation
- **Axios** - HTTP client
- **Framer Motion** - Animations
- **React Hot Toast** - Notifications
- **Lucide React** - Icons

## 🐛 Troubleshooting

### Backend Connection Issues
- Ensure MongoDB is running
- Check `MONGO_URI` in `.env`
- Verify port 5000 is not in use

### Frontend Can't Connect to Backend
- Ensure backend (port 5000) is running
- Check CORS settings in `server.js`
- Verify fetch URLs use correct base URL

### Authentication Not Working
- Clear localStorage and try again
- Check JWT_SECRET matches between login and subsequent requests
- Verify token is being sent in Authorization header

## 📝 Environment Variables Reference

**Backend (.env)**
```
PORT=5000                               # Server port
MONGO_URI=mongodb://...                 # MongoDB connection string
JWT_SECRET=your_very_secure_secret      # JWT signing key
CLOUDINARY_CLOUD_NAME=...               # Cloudinary cloud name
CLOUDINARY_API_KEY=...                  # Cloudinary API key
CLOUDINARY_API_SECRET=...               # Cloudinary API secret
```

## 🔄 Development Tips

**Hot Reload:**
- Frontend: Automatic with Vite
- Backend: Use `npm run dev` with nodemon

**Testing Roles:**
- Create test users with different roles during registration
- Each role has different permissions and features
- Use browser DevTools to inspect stored JWT token

**Data Persistence:**
- All data stored in MongoDB
- Images stored as base64 or URLs
- Consider Cloudinary for production image storage

## 📤 Deployment

### Backend (Heroku Example)
```bash
heroku create your-app-name
heroku config:set MONGODB_URI=your_mongo_uri
heroku config:set JWT_SECRET=your_secret
git push heroku main
```

### Frontend (Vercel Example)
```bash
npm run build
# Deploy the `dist` folder to Vercel
```

## 🤝 Contributing

Feel free to submit issues and enhancement requests!

## 📄 License

This project is open source and available under the MIT License.

## ❓ Support

For issues or questions:
1. Check this documentation first
2. Review the GitHub issues
3. Create a new issue with detailed information

---

**Happy Rescuing! 🐾**
