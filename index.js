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

app.listen(PORT, () => {
    console.log("Backend is running on port", PORT)
})