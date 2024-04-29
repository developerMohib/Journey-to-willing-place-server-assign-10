const express = require('express');
const app = express();
const cors = require('cors')
require ('dotenv').config();
const port = process.env.PORT || 5000;

app.use(cors())
app.use(express.json())

// const touristSpot = [
//     {name: 'mohib'},
//     {name: 'mohihhhhh'},
//     {name: 'mohihhh'}
// ]

const { MongoClient, ServerApiVersion } = require('mongodb');
const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.ylmjbhk.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`;
console.log(process.env.DB_USER, uri)

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});

async function run() {
  try {
    // Connect the client to the server	(optional starting in v4.7)
    // await client.connect();

    const database = client.db("spotstDB");
    const allSpotsCollection = database.collection("allSpots");

    app.get('/touristSpot', async(req, res) => {
        const cursor = allSpotsCollection.find( );
        const result = await cursor.toArray();
        res.send(result)
      });

      app.get('/viewDetails/:id', async(req, res) => {
      const id = req.params.id ;
      const query = {_id : new ObjectId(id)};
      const result = await coffeeCollection.findOne(query);
      res.send(result)
    })

      app.get('/touristSpot/:email', async(req, res) => {
      const email = req.params.email ;
      console.log(email)
      const result = await coffeeCollection.findOne(email).toArray();
      res.send(result)
    })

    app.post('/touristSpot', async(req, res) => {
        const allSpot = req.body ;
        console.log(allSpot);
        const result = await allSpotsCollection.insertOne(allSpot);
        res.send(result)
    } )
    app.get('/health', (req, res) => {
      res.send('Travelling server has been coming health soon!')
    })

    // Send a ping to confirm a successful connection
    console.log("Pinged your deployment. You successfully connected to MongoDB!");
  } finally {
    // Ensures that the client will close when you finish/error
    // await client.close();
  }
}
run().catch(console.dir);



app.get('/', (req, res) => {
  res.send('Travelling server has been coming soon!')
})

app.listen(port, () => {
  console.log(`Travelling server is listening on port ${port}`)
})