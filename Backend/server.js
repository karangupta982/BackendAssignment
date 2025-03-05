const express = require('express')
const app = express()
const database = require('./Configuration/Database')
const userRoutes = require("./Routes/authRoute");
const cookieParser = require("cookie-parser");
const cors = require("cors");

require('dotenv').config()

const PORT = process.env.PORT || 5000

database.connect()


app.use(express.json());
app.use(cookieParser());

// app.use(cors())

app.use(
	cors({
	  origin: "https://backend-assignment-sage.vercel.app",
	  credentials: true,
	})
  );

app.use("/api/v1/auth", userRoutes);

app.listen(PORT,(req,res) =>{
    console.log(`Server is running at ${PORT}` )
})