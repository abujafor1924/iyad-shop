const express = require("express");
const app = express();
const cors = require("cors");
require("dotenv").config();
const port = process.env.PORT || 5000;
const { MongoClient, ServerApiVersion, ObjectId } = require("mongodb");

app.use(cors());
app.use(express.json());

// Middel ware Uses
// const verifyJWT = (req, res, next) => {
//   const authorization = req.headers.authorization;
//   if (!authorization) {
//     return res.status(401).send({ error: true, messege: "unAuthorized acces" });
//   }

// middelware
//   const token = authorization.split(" ")[1];
//   jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (error, decode) => {
//     if (error) {
//       return res
//         .status(401)
//         .send({ error: true, messege: "unAuthorized acces" });
//     }
//     req.decode = decode;
//     next();
//   });
// };

app.get("/", (req, res) => {
  res.send("Hello iyad Shop project ");
});

const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.frl4ype.mongodb.net/?retryWrites=true&w=majority`;

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
});

async function run() {
  try {
    await client.connect();

    const userCollection = client.db("userDataStorege").collection("user");
    const categoryCollection = client
      .db("userDataStorege")
      .collection("category");
    const productCollection = client
      .db("userDataStorege")
      .collection("product");

    // Admin secure JWT
    // app.post("/jwt", (req, res) => {
    //   const user = req.body;
    //   const token = jwt.sign(user, process.env.ACCESS_TOKEN_SECRET, {
    //     expiresIn: "5h",
    //   });
    //   res.send({ token });
    // });

    //     verify admin
    const verifyAdmin = async (req, res, next) => {
      const email = req.decode.email;
      const query = { email: email };
      const user = await userCollection.findOne(query);
      if (user?.role !== "admin") {
        return res.status(403).send({ error: true, messege: "forbiden acces" });
      }
      next();
    };

    // admin Get
    app.get("/users", async (req, res) => {
      const result = await userCollection.find().toArray();
      res.send(result);
    });

    // user add
    app.post("/users", async (req, res) => {
      const user = req.body;
      const query = { email: user.email };
      const existingUser = await userCollection.findOne(query);
      if (existingUser) {
        return res.send({ message: "already singUp" });
      }
      const result = await userCollection.insertOne(user);
      res.send(result);
    });

    //     Make admin a User
    app.patch("/users/admin/:id", async (req, res) => {
      const id = req.params.id;
      //  console.log(id);
      const filter = { _id: new ObjectId(id) };
      const updateDoc = {
        $set: {
          role: "admin",
        },
      };
      const result = await userCollection.updateOne(filter, updateDoc);
      res.send(result);
    });

    //     delete admin user
    app.delete("/users/:id", async (req, res) => {
      const id = req.params.id;
      // console.log(id);
      const query = { _id: new ObjectId(id) };
      //  console.log(query);
      const result = await userCollection.deleteOne(query);
      res.send(result);
    });

    // Category section

    app.get("/allCategory", async (req, res) => {
      const result = await categoryCollection.find().toArray();
      res.send(result);
    });

    app.post("/addCategory", async (req, res) => {
      const newItem = req.body;
      const result = await categoryCollection.insertOne(newItem);
      res.send(result);
    });

    app.delete("/allCategory/:id", async (req, res) => {
      const id = req.params.id;
      const query = { _id: new ObjectId(id) };
      const result = await categoryCollection.deleteOne(query);
      res.send(result);
    });

    // Product section

    app.get("/allProduct", async (req, res) => {
      const result = await productCollection.find().toArray();
      res.send(result);
    });

    app.get("/allProduct/:id", async (req, res) => {
      const id = req.params.id;
      const query = { _id: new ObjectId(id) };
      const result = await productCollection.findOne(query);
      res.send(result);
    });

    app.post("/addProduct", async (req, res) => {
      const newItem = req.body;
      const result = await productCollection.insertOne(newItem);
      res.send(result);
    });

    app.patch("/allProductUpdate/:id", async (req, res) => {
      const id = req.params.id;
      const body = req.body;
      const filter = { _id: new ObjectId(id) };
      const updatedDoc = {
        $set: {
          ...body,
        },
      };
      const result = await productCollection.updateOne(filter, updatedDoc);
      res.send(result);
    });

    app.delete("/allProduct/:id", async (req, res) => {
      const id = req.params.id;
      const query = { _id: new ObjectId(id) };
      const result = await productCollection.deleteOne(query);
      res.send(result);
    });

    await client.db("admin").command({ ping: 1 });
    console.log(
      "Pinged your deployment. You successfully connected to MongoDB!"
    );
  } finally {
    // Ensures that the client will close when you finish/error
    // await client.close();
  }
}
run().catch(console.dir);

app.listen(port, () => {
  console.log(`server is running port: ${port}`);
});
