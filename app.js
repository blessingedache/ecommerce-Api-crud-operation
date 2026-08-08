import dotenv from "dotenv";
dotenv.config();

import express from "express";

import mongoose from "mongoose";

const app = express();

//connecting to database logic;

async function connectingDatabase() {
    try{
        await mongoose.connect(process.env.DATABASE_URL);
        console.log("database connected");
    } catch (error) {
        console.log(error.message);
    }
}
connectingDatabase();

//middlewares;
const port = process.env.PORT;
app.use(express.json());

//routing section;
import productRoutes from "./src/routers/productRouters.js";
import authRoutes from "./src/routers/authRouter.js";

app.get("/", (req, res) => {
    res.json({
        message: "Welcome to the E-commerce API 🛒",
        status: "Server is running",
        endpoints: {
            auth: "/api/v1/register, /api/v1/login",
            products: "/api/v1"
        }
    });
});

app.use("/api/v1", authRoutes);
app.use("/api/v1", productRoutes);

app.listen(4050, () => {
    console.log("4050 server is running");
});

// MVC Model- is a way to structure your backend code so everything is organised and scalable 
// Model- handles the database, schema and data logic of our application
// View-the content you want people to see
// Controller- where all the business logic of our application is written

//Environment variable is a file or module where we store sensitive or configurable data outside your code eg database URL, API keys and port number

// A Database is a system used to store, manage and retrieve data e.g student data, exam questions, scores, progress tracking etc
//there are 2 types of database 1. SQL-uses data and row like excel 2. No SQL- non relational eg mongoDB

//Mongoose: is a Node.js library that helps you work with MongoDB easily.
// A bridge between Nodejs and MongoDB 

//inquirer.js is a library that allows you to create interactive command-line interfaces (CLIs) in Node.js. It provides a set of prompts and tools to gather user input in a user-friendly way, making it easier to build command-line applications.
//it is used for code generator, you can get it from npm package
//and another package called qr-image is used to generate QR code images in Node.js applications. It allows you to create QR codes that can be scanned by mobile devices, making it useful for various applications such as sharing URLs, contact information, or any other data that can be encoded in a QR code.
