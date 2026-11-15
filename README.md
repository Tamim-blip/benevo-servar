# ⚙️ Benevo Backend API

**Benevo — Small Actions. Big Impact.**

The backend service for **Benevo**, a community-driven volunteering platform that connects volunteers with social-service events across Bangladesh.

Built with Express.js and MongoDB, this RESTful API handles event management, volunteer participation, and application data.

<p align="center">
  <a href="https://benevo-servar.vercel.app/">🌐 Live API</a> •
  <a href="https://github.com/Tamim-blip/assignment-8-benevo">📂 GitHub Repository</a> •
  <a href="https://assignment-8-benevo.vercel.app/">🚀 Frontend</a>
</p>

---

## 🚀 Features

- **Event Management:** Create, retrieve, update, and delete volunteering events.
- **Event Filtering:** Retrieve events based on event categories.
- **Recent Events:** Fetch recently created events.
- **Volunteer Participation:** Allow users to join community events.
- **Duplicate Prevention:** Prevent users from joining the same event multiple times.
- **Joined Events:** Retrieve events joined by a specific volunteer.
- **Event Validation:** Handle event dates and validate incoming data.
- **MongoDB Integration:** Store and manage application data.
- **RESTful API:** Structured HTTP endpoints for frontend communication.
- **Serverless Deployment:** Deployed on Vercel.

## 🧰 Technology Stack

| Technology | Purpose |
|---|---|
| Node.js | JavaScript runtime |
| Express.js | Backend framework |
| MongoDB | NoSQL database |
| MongoDB Native Driver | Database operations |
| CORS | Cross-origin resource sharing |
| dotenv | Environment variable management |
| Vercel | Backend deployment |

## 🌍 Live Deployment

| Service | URL |
|---|---|
| Backend API | https://benevo-servar.vercel.app |
| Frontend | https://assignment-8-benevo.vercel.app |

## 📂 Project Structure

```text
server/
│
├── index.js
├── package.json
├── package-lock.json
├── vercel.json
└── .env
```


## 📡 API Endpoints

The following is a feature-oriented overview of the API. Refer to the actual backend routes for exact HTTP methods and parameters.

| Feature | Description |
|---|---|
| Events | Retrieve volunteering events |
| Recent Events | Retrieve recently created events |
| Create Event | Add a new community event |
| Update Event | Modify existing event information |
| Delete Event | Remove an event |
| Join Event | Register a volunteer for an event |
| Joined Events | Retrieve a volunteer's joined events |
| Event Categories | Filter events by category |




## ☁️ Deployment

This backend is deployed using Vercel.

- Runtime: Node.js
- Framework: Express.js
- Database: MongoDB
- Hosting: Vercel

Production API:

**https://benevo-servar.vercel.app**

## 🔮 Future Improvements

- Advanced API validation.
- Centralized error handling.
- API rate limiting.
- Improved authentication and authorization.
- Event pagination and search.
- API documentation with Swagger.
- Automated API testing.

## 👨‍💻 Developer

**MD Tamim Islam**

Aspiring Full-Stack Web Developer passionate about backend development, REST APIs, and building practical web applications.

- GitHub: [@Tamim-blip](https://github.com/Tamim-blip)
- Frontend: [Benevo](https://assignment-8-benevo.vercel.app)

---

<p align="center">
  <strong>Built with ❤️ for a better community.</strong>
  <br/>
  Benevo — Small Actions. Big Impact. 🌱
</p>
