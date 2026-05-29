#!/bin/bash

# Animal Rescue Network - Setup & Run Script

echo "🐾 Animal Rescue Network - Setup & Run Script"
echo "=============================================="

# Check if MongoDB is running
echo "✓ Checking MongoDB..."
if brew services list | grep -q "mongodb-community.*started"; then
    echo "  ✅ MongoDB is running"
else
    echo "  ⚠️  Starting MongoDB..."
    brew services start mongodb-community
    sleep 2
fi

# Check backend .env
echo "✓ Checking backend configuration..."
if [ ! -f "backend/.env" ]; then
    echo "  ⚠️  Creating .env file..."
    cat > backend/.env << EOF
PORT=5000
MONGO_URI=mongodb://localhost:27017/animal-rescue
JWT_SECRET=animal-rescue-secret-key-2024-super-secure
CLOUDINARY_CLOUD_NAME=test
CLOUDINARY_API_KEY=test
CLOUDINARY_API_SECRET=test
EOF
    echo "  ✅ .env created"
else
    echo "  ✅ .env file exists"
fi

# Install dependencies if needed
echo "✓ Checking dependencies..."
if [ ! -d "backend/node_modules" ]; then
    echo "  Installing backend dependencies..."
    cd backend && npm install && cd ..
    echo "  ✅ Backend dependencies installed"
fi

if [ ! -d "frontend/node_modules" ]; then
    echo "  Installing frontend dependencies..."
    cd frontend && npm install && cd ..
    echo "  ✅ Frontend dependencies installed"
fi

echo ""
echo "=============================================="
echo "🚀 Ready to start!"
echo "=============================================="
echo ""
echo "Run these commands in separate terminals:"
echo ""
echo "Terminal 1 (Backend):"
echo "  cd backend"
echo "  npm run dev"
echo ""
echo "Terminal 2 (Frontend):"
echo "  cd frontend"
echo "  npm run dev"
echo ""
echo "Then open test.http with VS Code REST Client to test API"
echo "Install extension: humao.rest-client"
echo ""
