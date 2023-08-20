const express = require("express");
const app = express();
const cors = require("cors");
const jwt = require("jsonwebtoken");
require("dotenv").config();
const stripe = require("stripe")(process.env.PAYMENT_SECRET_KEY);
const port = process.env.PORT || 5000;
const { MongoClient, ServerApiVersion, ObjectId } = require("mongodb");
const { default: Stripe } = require("stripe");

app.use(cors());
app.use(express.json());

// Middel ware Uses
const verifyJWT = (req, res, next) => {
  const authorization = req.headers.authorization;
  if (!authorization) {
    return res.status(401).send({ error: true, messege: "unAuthorized acces" });
  }
  // middelware
  const token = authorization.split(" ")[1];
  jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (error, decode) => {
    if (error) {
      return res
        .status(401)
        .send({ error: true, messege: "unAuthorized acces" });
    }
    req.decode = decode;
    next();
  });
};

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
    // await client.connect();

    const userCollection = client.db("userDataStorege").collection("user");
    const categoryCollection = client
      .db("userDataStorege")
      .collection("category");
    const productCollection = client
      .db("userDataStorege")
      .collection("product");
    const favoritCollection = client
      .db("userDataStorege")
      .collection("favorite");
    const cartsCollection = client.db("userDataStorege").collection("cart");
    const paymentCollection = client
      .db("userDataStorege")
      .collection("payment");

    // Admin secure JWT
    app.post("/jwt", (req, res) => {
      const user = req.body;
      const token = jwt.sign(user, process.env.ACCESS_TOKEN_SECRET, {
        expiresIn: "2h",
      });
      res.send({ token });
    });

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

    app.get("/users/admin/:email", async (req, res) => {
      const email = req.params.email;
      //  if (req.decode.email !== email) {
      //    res.send({ admin: false });
      //  }
      const query = { email: email };
      const user = await userCollection.findOne(query);
      const result = { admin: user?.role === "admin" };
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

    app.get("/getparoduct", async (req, res) => {
      let query = {};
      if (req?.query?.cat) {
        const category = req.query.cat;
        query = { category };
      }
      const result = await productCollection.find(query).toArray();
      res.send(result);
    });

    app.get("/allProduct/category/:category", async (req, res) => {
      const category = req.params.category;
      console.log(category);
      const products = await productCollection.find({ category }).toArray();
      res.json(products);
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

    // favorite section

    app.get("/favorite", async (req, res) => {
      const email = req.query.email;
      // console.log(email);
      if (!email) {
        res.send("Email parameter is missing");
      }
      const query = { "favorite.email": email };
      // console.log(query);
      const result = await favoritCollection.find(query).toArray();
      res.send(result);
    });

    app.post("/favorite", async (req, res) => {
      const newItem = req.body;
      const result = await favoritCollection.insertOne(newItem);
      res.send(result);
    });

    app.delete("/favorite/:id", async (req, res) => {
      const id = req.params.id;
      const query = { _id: new ObjectId(id) };
      const result = await favoritCollection.deleteOne(query);
      res.send(result);
    });

    // cart collection

    app.get("/carts", async (req, res) => {
      const email = req.query.email;
      if (!email) {
        res.send("Email parameter is missing");
      }
      const query = { "categoryitemId.email": email };
      const result = await cartsCollection.find(query).toArray();
      res.send(result);
    });

    app.post("/carts", async (req, res) => {
      const item = req.body;
      const result = await cartsCollection.insertOne(item);
      res.send(result);
    });

    app.delete("/carts/:id", async (req, res) => {
      const id = req.params.id;
      const query = { _id: new ObjectId(id) };
      const result = await cartsCollection.deleteOne(query);
      res.send(result);
    });

    // payment section

    // app.post("/create-payment-intent", async (req, res) => {
    //   const { price } = req.body;
    //   if (!price) {
    //     return res.send({ message: "Price not valid" });
    //   }
    //   const amount = price * 100;
    //   console.log(price, amount);
    //   const paymentIntent = await stripe.paymentIntents.create({
    //     amount: amount,
    //     currency: "usd",
    //     automatic_payment_methods: ["card"],
    //   });
    //   res.send({
    //     clientSecret: paymentIntent.client_secret,
    //   });
    // });
    app.post("/create-payment-intent", async (req, res) => {
      const { price } = req.body;

      if (!price) {
        return res.send({ message: "Price not valid" });
      }

      const amount = price * 100;

      try {
        const paymentIntent = await stripe.paymentIntents.create({
          amount: amount,
          currency: "usd",
        });

        res.send({
          clientSecret: paymentIntent.client_secret,
        });
      } catch (error) {
        console.error("Error creating payment intent:", error.message);
        res.status(500).send({ message: "Error creating payment intent" });
      }
    });

    // payment releted Api

    app.get("/payments", async (req, res) => {
      const email = req.query.email;
      // console.log(email);
      if (!email) {
        res.send("Email parameter is missing");
      }
      const query = { email: email };
      const result = await paymentCollection.find(query).toArray();
      res.send(result);
    });

    app.post("/payments", async (req, res) => {
      const payment = req.body;
      const insutResult = await paymentCollection.insertOne(payment);

      const query = {
        _id: { $in: payment.itemes.map((id) => new ObjectId(id)) },
      };
      const deleteResult = await cartsCollection.deleteMany(query);

      res.send({ insutResult, deleteResult });
    });

    // admin dashboard

    app.get("/admin-status", async (req, res) => {
      const users = await userCollection.estimatedDocumentCount();
      const producs = await productCollection.estimatedDocumentCount();
      const order = await paymentCollection.estimatedDocumentCount();
      const payments = await paymentCollection.find().toArray();
      const revenue = payments.reduce((sum, payment) => sum + payment.price, 0);

      res.send({ users, producs, order, revenue });
    });

    app.get("/orderstats", async (req, res) => {
      const pipeline = [
        {
          $lookup: {
            from: "allCategory",
            localField: " itemeOrderId ",
            foreignField: "_id",
            as: "menuItemsData",
          },
        },
        {
          $unwind: "$menuItemsData",
        },
        {
          $group: {
            _id: "$menuItemsData.category",
            count: { $sum: 1 },
            total: { $sum: "$menuItemsData.price" },
          },
        },
        {
          $project: {
            category: "$_id",
            count: 1,
            total: { $round: ["$total", 2] },
            _id: 0,
          },
        },
      ];

      const result = await paymentCollection.aggregate(pipeline).toArray();
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
