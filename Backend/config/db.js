import { MongoClient, ServerApiVersion } from "mongodb";

const connectDB = async () => {
  try {
    // Create a MongoClient with a MongoClientOptions object to set the Stable API version
    const client = new MongoClient(process.env.MONGO_URI, {
      serverApi: {
        version: ServerApiVersion.v1,
        strict: true,
        deprecationErrors: true,
      },
    });
    async function run() {
      try {
        // Connect the client to the server	(optional starting in v4.7)
        await client.connect();
        // Send a ping to confirm a successful connection
        await client.db("TechTitans").command({ ping: 1 });
        console.log(
          "Pinged your deployment. You successfully connected to MongoDB!"
        );
      } finally {
        // Ensures that the client will close when you finish/error
        await client.close();
      }
    }
    run().catch(console.dir);
  } catch (error) {
    console.error("Error connecting to MongoDB:", error.message);
  }
};

export default connectDB;
