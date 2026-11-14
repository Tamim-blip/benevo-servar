import 'dotenv/config' 
import express from "express"
import cors from "cors"
import { MongoClient, ObjectId } from 'mongodb';

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
  const joinEvents = db.collection("joined-events")

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


app.delete("/manage-events/:id", async(req, res) => {
  const id = req.params.id
  const result = await createEvents.deleteOne({_id : new ObjectId(id)})
  res.send(result)
})



app.patch("/manage-events/:id", async(req, res) => {
  const id = req.params.id
   const updatedData = req.body;

  const result = await createEvents.updateOne(
    { _id: new ObjectId(id) },
    { $set: updatedData }
  );

  res.send(result)
})



app.get("/events/:id", async(req, res) => {

  const id = req.params.id

  const result = await createEvents.findOne({_id : new ObjectId(id)})
  res.send(result)
})


app.post("/joined-events", async (req, res) => {
  try {
    const allData = req.body;

    // The frontend strips _id before posting, so there is no "id" field in the
    // body. Identify the event by its own fields (title, type, location, date,
    // organizer email) instead — same user + same event = duplicate join.
    const existingUser = await joinEvents.findOne({
      title: allData.title,
      eventType: allData.eventType,
      location: allData.location,
      eventDate: allData.eventDate,
      email: allData.email,
      join_user_email: allData.join_user_email,
    });

    if (existingUser) {
      return res.status(409).send({
        message: "You have already joined this event!",
      });
    }

    // If not joined, insert the data
    const result = await joinEvents.insertOne(allData);

    res.status(201).send(result);

  } catch (error) {
    console.error(error);

    res.status(500).send({
      message: "Internal server error",
    });
  }
});


app.get("/joined-events/:email", async(req, res) => {
  const email = req.params.email
  const result = await joinEvents.find({join_user_email : email}).toArray()
  res.send(result)
})


app.get("/events-detail/:id", async(req, res) => {
  const id= req.params.id
  const result = await joinEvents.findOne({_id : new ObjectId(id)})
  res.send(result)
})


app.delete('/joined-events/:id', async(req, res) =>{

  const id = req.params.id
  const result = await joinEvents.deleteOne({_id : new ObjectId(id)})
  res.send(result)
})

// app.get("/joined-events/:eventType", async(req, res) => {

//   const eventType = req.params.eventType
  
//   const result = await joinEvents.find({eventType : eventType}).toArray()
//   res.send(result)
// })

app.listen(PORT, () => {
    console.log("Backend is running on port", PORT)
})