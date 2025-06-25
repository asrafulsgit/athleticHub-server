# ⚙️ AthleticHub Server Documentation
## ✅ Project Overview

This is the **backend** of the [AthleticHub](#) web application — a sports event management platform. It provides RESTful APIs for user authentication, event management, participant event and reviews.

--- 

## 🧪 Tech Stack
- **Node.js**
- **Express.js**
- **MongoDB** with Mongoose
- **JWT** for authentication
- **Firebase Admin SDK** for Google Auth


## Key Features
- **Create user, Login user and Profile**
- **Manage event** => create, update, delete, read
- **Bookings event** => create bookings , cencel bookings
- **Book event** => book event , delete book event
- **Review event** => post review , delete review


## 📦 Installation & Setup

```bash
# Clone the repo
git clone
cd server
npm install
npm start
```


## 🔐 Environment Variables

```env
MONGO_DB_URL =''
PORT ='8000'
JWT_ACCESS_TOEKN = ''
FIREBASE_PROJECT_ID = ""
FIREBASE_PRIVATE_KEY = ""
FIREBASE_CLIENT_EMAIL = ""
FRONTEND_URL =''
```

---
## 📡 API Documentation

## 📅 Event APIs

| Method | Endpoint                                        | Description                     | Auth Required |
|--------|--------------------------------------------------|----------------------------------|----------------|
| POST   | `/api/v1/create-event`                          | Create a new event              | ✅             |
| GET    | `/api/v1/my-events`                             | Get events created by the user  | ✅             |
| GET    | `/api/v1/event-details/:id`                     | Get details of a specific event | ✅             |
| PUT    | `/api/v1/update-event/:id`                      | Update an event by ID           | ✅             |
| DELETE | `/api/v1/delete-event/:id`                      | Delete an event by ID           | ✅             |
| GET    | `/api/v1/browse-events`                         | Publicly browse all events      | ❌             |
| GET    | `/api/v1/featured-events`                       | Get featured events             | ❌             |
| GET    | `/api/v1/filter-events`                         | Filter events by type/date/etc. | ❌             |
| GET    | `/api/v1/search-events`                         | Search events by keyword        | ❌             |

---

## 📝 Book Event APIs

| Method | Endpoint                                        | Description                        | Auth Required |
|--------|--------------------------------------------------|------------------------------------|----------------|
| POST   | `/api/v1/create/book-event/:id`                | Book an event                      | ✅             |
| GET    | `/api/v1/book-events`                          | Get events booked by the user      | ✅             |
| DELETE | `/api/v1/book-event/:id`                       | Cancel a booked event by ID        | ✅             |
| GET    | `/api/v1/book-event-ids`                       | Get IDs of booked events           | ✅             |

---

## 🎟️ My Bookings APIs

| Method | Endpoint                                        | Description                        | Auth Required |
|--------|--------------------------------------------------|------------------------------------|----------------|
| POST   | `/api/v1/create/booking/:id`                   | Book an event officially           | ✅             |
| GET    | `/api/v1/my-bookings`                          | Get user's full booking list       | ✅             |
| DELETE | `/api/v1/my-booking/:id`                       | Cancel a specific booking          | ✅             |
| GET    | `/api/v1/my-booking-ids`                       | Get IDs of all booked events       | ✅             |

---

## 👤 Profile APIs

| Method | Endpoint                                        | Description                 | Auth Required |
|--------|--------------------------------------------------|-----------------------------|----------------|
| GET    | `/api/v1/profile`                               | Get user profile data       | ✅             |
| POST   | `/api/v1/update-profile`                        | Update user profile         | ✅             |

---

## 🌟 Review APIs

| Method | Endpoint                                        | Description                        | Auth Required |
|--------|--------------------------------------------------|------------------------------------|----------------|
| POST   | `/api/v1/create-review`                         | Submit a review for an event       | ✅             |
| GET    | `/api/v1/browse-reviews/:eventId`              | View reviews of a specific event   | ✅             |
| PUT    | `/api/v1/update-review/:reviewId`              | Update a submitted review          | ✅             |
| DELETE | `/api/v1/delete-review/:reviewId`              | Delete a review                    | ✅             |

---

## 🧑‍💻 User Authentication APIs

| Method | Endpoint                                        | Description                     | Auth Required |
|--------|--------------------------------------------------|----------------------------------|----------------|
| POST   | `/api/v1/user/register`                         | Register a new user             | ❌             |
| POST   | `/api/v1/user/login`                            | Login with email & password     | ❌             |
| POST   | `/api/v1/google/login`                          | Login using Google              | ❌             |
| GET    | `/api/v1/user/logout`                           | Logout the authenticated user   | ✅             |
| GET    | `/api/v1/user/observer`                         | Observe current user session    | ✅             |

---

## 🔒 Authentication

- JWT used for secure sessions  
- Firebase used for Google OAuth  
- Protected routes for user using middleware

---

## 🚀 Deployment
- **Backend**: Vercel  
- **Database**: MongoDB Atlas

---

## 🧩 Event Model (Mongoose Schema)

```js
const eventSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    type: {
      type: String,
      required: true,
      trim: true,
    },
    date: {
      type: String,
      required: true,
    },
    time: {
      type: String,
      required: true,
    },
    location: {
      type: String,
      required: true,
      trim: true,
    },
    fee: {
      type: Number,
      required: true,
      min: 0,
    },
    description: {
      type: String,
      required: true,
    },
    image: {
      type: String,
      default: "https://i.ibb.co/hRGTZWdX/download.jpg",
    },
    participants: {
      type: Number,
      default : 1,
      min : 1
    },
    requirements: {
      type: String,
    },
    organizer: {
      image: {
        type: String,
        default: "https://i.ibb.co/hRGTZWdX/download.jpg",
        immutable: true,
      },
      email: {
        type: String,
        required: true,
        lowercase: true,
        trim: true,
        immutable: true,
      },
      name: {
        type: String,
        required: true,
        trim: true,
        immutable: true,
      },
    },
  },
  {
    timestamps: true,
  }
);

const Event = mongoose.model("Event", eventSchema);
```




