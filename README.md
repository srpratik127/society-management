# Society Management App

A comprehensive Society Management System built with React and Node.js. The app includes dedicated panels for Admins, Residents, and Security personnel, offering a wide range of features to efficiently manage society operations.

## View

![Dashboard page](./frontend/public/assets/dashboard.png)

## Live URLs

**Frontend:** [Society Management Frontend](https://society-management-ebon.vercel.app)
**Backend:** [Society Management Backend](https://society-management-ttb5.onrender.com)

## Features

### Admin Panel
- **Create Resident**
- **Maintenance Management**
- **Other Income Tracking**
- **Society Expenses Management**
- **Facility Management**
- **Complaint Tracking**
- **Request Tracking**
- **Emergency Management**
- **Announcements**
- **Payment Portal Integration**

### Resident Panel
- **Create Notes**
- **Polls and Communities Discussions**
- **Video Call Functionality**
- **Access Forums (One-to-One Chat)**
- **Events Participation**
- **Request Tracking**
- **Complaint Tracking**
- **Payment Portal**

### Security Panel
- **Security Visitor Logs**
- **Security Protocols Management**
- **Security Guard Management**

## Use Case
- **Frontend Technologies**: React, Redux, Axios, Socket.io  
- **Backend Technologies**: Node.js, Express, MongoDB  
- **Authentication**: JSON Web Token (JWT)  
- **Payment Gateway**: Razorpay  
- **File Storage**: Cloudinary 


## .ENV file (Backend)
```
# MONGODB_URI= mongodb+srv://pratikdesai:YFWGH8faHgUKdPpb@cluster0.tr0d7.mongodb.net/society-management?retryWrites=true&w=majority&appName=Cluster0
MONGODB_URI= mongodb://localhost:27017/society-management-system
JWT_SECRET=1246dadsk
PORT=5000
CLOUDINARY_CLOUD_NAME=dwvfquvxy
CLOUDINARY_API_KEY=599942543851369
CLOUDINARY_API_SECRET=2JfcvUoTVVrGF7Vu27YWuWBkFI0
RAZORPAY_KEY_ID=rzp_test_PgVT4Gj6UOqxFK
RAZORPAY_SECRET_KEY=Z6An9bvwVFkLiHPSfHxM1InP
NODE_ENV=production
```

## .ENV file (Frontend)
```
REACT_APP_BASE_URL=http://localhost:5000
REACT_APP_RAZORPAY_KEY_ID=rzp_test_PgVT4Gj6UOqxFK
```

## Default Login Credentials

### Admin
- **Email**: 
```
admin@gmail.com
```  
- **Password**:
```
admin123
```

### Resident
- **Email**: 
```
resident@gmail.com
```
- **Password**:
```
resident123
```  


### Security
- **Email**: 
```
security@gmail.com
```
- **Password**: 
```
security123
```



## Getting Started
#### Clone the Repository
```
git clone https://github.com/srpratik127/society-management.git
```

#### main directory
```
cd society-management
```

#### Install Dependencies for Backend:
```
npm install
```

#### Run Backend Application:
```
npm run Start
```

#### Install Dependencies for Frontend:
```
cd frontend
npm install
```

#### Run Frontend Application:
```
npm run start
```
