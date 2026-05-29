# Animal Rescue Network 🐾

A comprehensive, full-stack web application for coordinating animal rescue efforts, connecting rescuers, volunteers, NGOs, and animal lovers.

**Live Demo Features:**
- 🚨 Report animals in emergency situations
- 🐕 Browse and adopt rescued animals
- 👥 Volunteer coordination and dashboard
- 🏥 Animal health tracking and history
- 🔐 Secure role-based authentication
- 📱 Fully responsive mobile-friendly design

## 🛠️ Tech Stack

### Frontend
- **React 19** - UI framework with hooks and latest features
- **Vite** - Modern build tool with fast HMR
- **Tailwind CSS** - Utility-first CSS framework
- **Framer Motion** - Smooth animations and transitions
- **React Router** - Client-side routing
- **Axios** - HTTP client for API calls
- **React Hot Toast** - Beautiful notifications
- **Lucide React** - Beautiful icon library

### Backend
- **Node.js & Express** - Lightweight web framework
- **MongoDB** - NoSQL database for flexibility
- **Mongoose** - ODM for MongoDB
- **JWT** - Secure token-based authentication
- **bcryptjs** - Password hashing and security
- **Multer** - File upload handling
- **Cloudinary** - Cloud image storage

## 📁 Project Structure

```
animal-rescue/
├── backend/
│   ├── controllers/
│   │   ├── authController.js       # Authentication logic
│   │   ├── animalController.js     # Animal CRUD operations
│   │   ├── rescueController.js     # Rescue request handling
│   │   ├── volunteerController.js  # Volunteer operations
│   │   └── ngoController.js        # NGO management
│   ├── models/
│   │   ├── User.js                 # User with roles
│   │   ├── Animal.js               # Rescued animals
│   │   └── RescueRequest.js        # Emergency reports
│   ├── routes/
│   │   ├── authRoutes.js
│   │   ├── animalRoutes.js
│   │   ├── rescueRoutes.js
│   │   ├── volunteerRoutes.js
│   │   └── ngoRoutes.js
│   ├── middleware/
│   │   └── auth.js                 # JWT & role verification
│   ├── .env.example
│   ├── server.js                   # Express app setup
│   └── package.json
│
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   │   └── layout/
│   │   │       ├── Navbar.jsx      # Navigation bar
│   │   │       └── Footer.jsx      # Footer component
│   │   ├── context/
│   │   │   └── AuthContext.jsx     # Auth state management
│   │   ├── pages/
│   │   │   ├── Home/               # Landing page
│   │   │   ├── Auth/               # Login & Register
│   │   │   ├── Adopt/              # Browse animals
│   │   │   ├── AnimalDetails/      # Animal profile
│   │   │   ├── ReportRescue/       # Emergency reporting
│   │   │   └── VolunteerDashboard/ # Volunteer HQ
│   │   ├── services/
│   │   │   └── api.js              # API client methods
│   │   ├── App.jsx                 # Main component
│   │   ├── main.jsx                # Entry point
│   │   └── index.css               # Global styles
│   ├── vite.config.js
│   ├── tailwind.config.js
│   ├── postcss.config.js
│   └── package.json
│
├── SETUP.md                        # Detailed setup guide
└── README.md                       # This file
```

## 🎯 Key Features

### 1. **Multi-Role System**
- **Regular Users**: Report rescues and adopt animals
- **Volunteers**: Respond to rescue calls with their skills
- **NGOs**: Manage animals and coordinate operations
- **Admins**: Platform oversight and management

### 2. **Animal Management**
- Browse all rescued animals
- Filter by species, search by name/breed
- Detailed animal profiles with health history
- Image galleries for each animal
- Adoption request functionality

### 3. **Emergency Rescue System**
- Report animals in distress with photos
- Set emergency level (critical/high/medium/low)
- Track rescue status in real-time
- Add updates and progress notes
- Volunteer assignment and tracking

### 4. **Volunteer Platform**
- Dashboard with assigned rescues
- View pending emergencies
- Accept rescue assignments
- Track personal rescue history
- Manage volunteer profile and skills

### 5. **NGO Dashboard**
- Manage rescued animals
- Upload animal data and photos
- Assign rescues to volunteers
- Track all operations

## 🚀 Quick Start

### Prerequisites
- Node.js (v14+)
- MongoDB (local or Atlas)
- npm or yarn

### Installation

1. **Clone & Setup Backend**
```bash
cd backend
npm install
cp .env.example .env
# Edit .env with your MongoDB URI and JWT secret
npm run dev
```

2. **Setup Frontend** (in new terminal)
```bash
cd frontend
npm install
npm run dev
```

3. **Access the App**
- Frontend: `http://localhost:5173`
- Backend API: `http://localhost:5000/api`

## 📝 API Overview

### Authentication
```
POST   /api/auth/register    - Create new account
POST   /api/auth/login       - Login with credentials
```

### Animals
```
GET    /api/animals          - Get all animals
GET    /api/animals/:id      - Get animal details
POST   /api/animals          - Add new animal (NGO)
PUT    /api/animals/:id      - Update animal (NGO)
PUT    /api/animals/:id/adopt - Request adoption
```

### Rescue Requests
```
GET    /api/rescues          - Get all rescues
GET    /api/rescues/:id      - Get rescue details
POST   /api/rescues          - Report new emergency
PUT    /api/rescues/:id      - Update status (NGO)
POST   /api/rescues/:id/updates - Add progress update
PUT    /api/rescues/:id/close - Mark as resolved
```

### Volunteers
```
GET    /api/volunteers       - Get volunteer list
GET    /api/volunteers/dashboard - My dashboard
PUT    /api/volunteers/profile - Update profile
```

### NGOs
```
GET    /api/ngos             - Get NGO list
GET    /api/ngos/:id         - Get NGO details
PUT    /api/ngos/profile     - Update NGO info
```

## 🔐 Authentication Flow

1. **Register** → Create account with role selection
2. **Login** → Receive JWT token
3. **Store Token** → Saved in localStorage
4. **API Requests** → Token sent in Authorization header
5. **Verify** → Server validates token and role
6. **Access** → Route/action allowed based on role

## 🎨 UI/UX Highlights

- **Modern Design**: Clean, professional interface
- **Dark/Light Support**: Tailwind CSS adaptive styling
- **Animations**: Smooth transitions with Framer Motion
- **Responsive**: Mobile-first design approach
- **Accessibility**: Semantic HTML and ARIA labels
- **Real-time Notifications**: Toast notifications for user feedback

## 📦 Dependencies Summary

**Frontend (Important)**
```json
{
  "react": "^19.2.6",
  "react-router-dom": "^7.15.0",
  "axios": "^1.16.1",
  "framer-motion": "^12.38.0",
  "react-hot-toast": "^2.6.0",
  "tailwindcss": "4.3.0"
}
```

**Backend (Important)**
```json
{
  "express": "^5.2.1",
  "mongoose": "^9.6.2",
  "jsonwebtoken": "^9.0.3",
  "bcryptjs": "^3.0.3",
  "multer": "^2.1.1",
  "cloudinary": "^2.10.0"
}
```

## 🧪 Testing the App

### Test User Accounts
You can create test accounts with different roles:

1. **Regular User Test**
   - Register as "Regular User"
   - Adopt animals and report rescues

2. **Volunteer Test**
   - Register as "Volunteer"
   - Add skills (first aid, tracking, etc.)
   - View volunteer dashboard

3. **NGO Test**
   - Register as "NGO"
   - Add registration number
   - Create and manage animals

## 🐛 Common Issues & Solutions

| Issue | Solution |
|-------|----------|
| Can't connect to MongoDB | Check connection string in `.env` |
| PORT 5000 already in use | Kill process or change PORT in `.env` |
| Frontend can't reach API | Ensure backend is running on port 5000 |
| Authentication fails | Clear localStorage and try logging in again |
| Images not loading | Verify Cloudinary credentials or use base64 |

## 🚀 Deployment

### Backend (Heroku/Railway)
```bash
# Set environment variables on platform
git push heroku main
```

### Frontend (Vercel/Netlify)
```bash
npm run build
# Deploy the dist/ folder
```

## 📚 Additional Resources

- **SETUP.md** - Detailed installation and configuration guide
- **MongoDB Atlas** - Free cloud MongoDB: https://www.mongodb.com/atlas
- **Cloudinary** - Free image hosting: https://cloudinary.com
- **Tailwind CSS** - Styling docs: https://tailwindcss.com
- **Express** - Backend framework: https://expressjs.com

## 👥 User Roles Overview

| Role | Can Do |
|------|--------|
| **User** | Report rescues, Browse & adopt animals, View NGOs |
| **Volunteer** | Accept rescues, Update rescue status, Manage profile |
| **NGO** | Upload animals, Assign rescues, Manage rescues |
| **Admin** | Full platform management and oversight |

## 📄 License

This project is open source and available under the MIT License.

## 🤝 Contributing

Contributions welcome! Feel free to:
- Report bugs as GitHub issues
- Submit pull requests for improvements
- Suggest new features

## ❓ Need Help?

1. Check [SETUP.md](./SETUP.md) for detailed configuration
2. Review API documentation in code
3. Check browser console for error messages
4. Verify all environment variables are set correctly

---

**Built with ❤️ to save animal lives** 🐾

JWT_SECRET=your_jwt_secret
CLOUDINARY_CLOUD_NAME=your_cloudinary_name
CLOUDINARY_API_KEY=your_cloudinary_api_key
CLOUDINARY_API_SECRET=your_cloudinary_api_secret
```
Start the backend:
```bash
npm run dev # or node server.js
```

### 2. Frontend Setup
```bash
cd frontend
npm install
```
Start the frontend dev server:
```bash
npm run dev
```

Visit `http://localhost:5173` to see your running frontend!