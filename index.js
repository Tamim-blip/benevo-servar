import 'dotenv/config' 
import express from "express"
import cors from "cors"
import { MongoClient } from 'mongodb';

const app = express()
const PORT = process.env.PORT || 3001

app.use(cors())
app.use(express.json())


const client = new MongoClient(process.env.MONGO_DB_CONNECTION_URI);


export async function connectToMongoDB() {
  try {
    await client.connect();
    console.log("You successfully connected to MongoDB!");
    return client;
  } catch (err) {
    console.dir(err);
  }
}

  const connectedDB = await connectToMongoDB()
  const db = connectedDB.db('assignment-8-benevo')
  const createEvents = db.collection("created-events")

app.get("/", (req, res) => {
    res.send("Hello world")
})



app.post("/create-events", async(req, res) => {

    const allData = req.body
    const result = await createEvents.insertOne(allData)
    res.send(result)
})


app.get("/recent-events", async (req, res) => {
  try {
    const today = new Date().toISOString().split("T")[0];

    const events = await createEvents
      .find({
        eventDate: { $gte: today },
      })
      .sort({ eventDate: 1 })
      .toArray();

    res.status(200).send(events);
  } catch (error) {
    res.status(500).send({
      message: "Failed to fetch recent events",
    });
  }
});


app.get("/recent-upcoming-events", async (req, res) => {
  try {
    const today = new Date().toISOString().split("T")[0];

    const events = await createEvents
      .find({
        eventDate: { $gte: today },
      })
      .sort({ eventDate: 1 })
      .limit(6)
      .toArray();

    res.status(200).send(events);
  } catch (error) {
    res.status(500).send({
      message: "Failed to fetch recent events",
    });
  }
});



app.get("/manage-events/:email", async(req, res) => {

  const email = req.params.email
  const result = await createEvents.find({email : email}).toArray()
  res.send(result)
})

app.listen(PORT, () => {
    console.log("Backend is running on port", PORT)
})