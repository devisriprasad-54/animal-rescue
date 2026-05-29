# 🚀 Quick Start Guide

Get the Animal Rescue Network up and running in minutes!

## Prerequisites Checklist
- ✅ Node.js installed (v14+)
- ✅ MongoDB running locally or Atlas account
- ✅ Git (optional)

## 5-Minute Setup

### Step 1: Backend (3 minutes)

```bash
# Navigate to backend
cd backend

# Install dependencies
npm install

# Create environment file
cp .env.example .env

# Edit .env and add:
# - MONGO_URI: MongoDB connection string
# - JWT_SECRET: Any random string for JWT signing
```

**Start the backend:**
```bash
npm run dev
```
✅ Backend running at `http://localhost:5000`

### Step 2: Frontend (2 minutes)

Open a new terminal:
```bash
# Navigate to frontend
cd frontend

# Install dependencies
npm install

# Start development server
npm run dev
```

✅ Frontend running at `http://localhost:5173`

## Start Using the App

### 🔐 Step 1: Create Account
1. Go to `http://localhost:5173`
2. Click "Join Us" button
3. Choose your role:
   - **User**: Report rescues & adopt pets
   - **Volunteer**: Accept rescue assignments
   - **NGO**: Manage animals & rescues
4. Fill in the form and register

### 👤 Step 2: Login
1. Click "Log in"
2. Use your registered email and password
3. You're now authenticated!

### 🎮 Try These Features

#### If you're a Regular User:
- Go to `/adopt` and browse animals
- Click on an animal to see details
- Click "Adopt Me!" to request adoption
- Go to `/report` to report a rescue emergency

#### If you're a Volunteer:
- Go to `/volunteer` to see your dashboard
- View pending rescue requests
- Accept rescues to get assigned
- Track your active rescues

#### If you're an NGO:
- Upload animals via the API (or admin panel)
- Manage rescue requests
- Assign volunteers to emergencies

## Common First Steps

### Create Test Data
```bash
# Using curl or Postman, create an animal test case:
POST http://localhost:5000/api/animals
Header: Authorization: Bearer YOUR_JWT_TOKEN
Body: {
  "name": "Buddy",
  "species": "Dog",
  "breed": "Golden Retriever",
  "age": "3",
  "healthStatus": "Healthy",
  "rescueStory": "Found on the streets, now healthy and ready for adoption"
}
```

### Test Rescue Reporting
1. Make sure you're logged in as any user
2. Navigate to `/report`
3. Fill in the emergency form
4. Submit to create a rescue request
5. All users can see pending rescues

## Troubleshooting

### Backend won't start
```bash
# Check if port 5000 is in use
lsof -i :5000

# Kill the process if needed
kill -9 <PID>

# Or change PORT in .env
PORT=3001 npm run dev
```

### Frontend won't connect to backend
```bash
# Ensure backend is running
curl http://localhost:5000

# If it fails, start backend with:
cd backend && npm run dev
```

### MongoDB connection error
```bash
# Check if MongoDB is running
# macOS:
brew services list | grep mongodb

# Start MongoDB:
brew services start mongodb-community

# Or use MongoDB Atlas (cloud):
# Update MONGO_URI in .env
```

### Authentication issues
```bash
# Clear browser storage and refresh
# Open DevTools > Application > localStorage > clear
# Then refresh the page and login again
```

## File Structure Reference

```
animal-rescue/
├── backend/
│   ├── .env              (⚠️ CREATE THIS)
│   ├── .env.example      (template)
│   ├── server.js         (main entry)
│   └── controllers/      (your API logic)
├── frontend/
│   ├── src/
│   │   ├── App.jsx       (main component)
│   │   └── pages/        (all pages)
│   └── package.json
├── SETUP.md              (detailed guide)
└── README.md             (full documentation)
```

## Essential Commands

```bash
# Backend
cd backend && npm install        # Install dependencies
npm run dev                      # Start with auto-reload
npm start                        # Start production

# Frontend
cd frontend && npm install       # Install dependencies
npm run dev                      # Start dev server
npm run build                    # Build for production

# Database
mongosh                          # MongoDB shell (if installed)
```

## Next Steps

1. ✅ Explore all pages (Home, Adopt, Report, Dashboard)
2. ✅ Try different user roles
3. ✅ Create animals and rescue requests
4. ✅ Test volunteer assignment flow
5. ✅ Read [SETUP.md](./SETUP.md) for advanced configuration

## API Testing Tools

**Recommended for API testing:**
- [Postman](https://www.postman.com/) - Desktop app for API testing
- [Insomnia](https://insomnia.rest/) - Lightweight alternative
- [VS Code REST Client Extension](https://marketplace.visualstudio.com/items?itemName=humao.rest-client)

**Example Postman request:**
```
POST http://localhost:5000/api/auth/login
Content-Type: application/json

{
  "email": "user@example.com",
  "password": "password123"
}
```

## Need Help?

1. **Check logs** - Look at terminal output for errors
2. **Read SETUP.md** - Detailed configuration guide
3. **Review README.md** - Full feature documentation
4. **Check .env.example** - Required environment variables
5. **Inspect DevTools** - Check browser console for frontend errors

## Environment Variables Quick Reference

**Backend (.env)**
```
PORT=5000
MONGO_URI=mongodb://localhost:27017/animal-rescue
JWT_SECRET=your-super-secret-key-change-this
CLOUDINARY_CLOUD_NAME=optional-for-production
CLOUDINARY_API_KEY=optional-for-production
CLOUDINARY_API_SECRET=optional-for-production
```

## Production Checklist

Before deploying to production:
- [ ] Change JWT_SECRET to a strong random string
- [ ] Set up MongoDB Atlas for database
- [ ] Configure Cloudinary for image hosting
- [ ] Update CORS settings in backend
- [ ] Set NODE_ENV=production
- [ ] Build frontend with `npm run build`
- [ ] Test all features in production mode

---

**You're all set! Happy rescuing! 🐾**

For more detailed information, see [SETUP.md](./SETUP.md)
