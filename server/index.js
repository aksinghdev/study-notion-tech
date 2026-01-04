const express = require("express");
const app = express();

const userRautes = require("./routes/User");
const profileRautes = require("./routes/Profile");
const courseRautes = require("./routes/Course");
const paymentRautes = require("./routes/Payments");

const connectwithDB = require("./config/databse");
const Cloudinary  = require("./config/Cloudinary");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const fileUpload = require("express-fileupload");
const dotenv = require("dotenv");

dotenv.config();
const PORT = process.env.PORT || 4000;

// connect to database
connectwithDB();
Cloudinary();

const allowedOrigins = [
  "http://localhost:3000",
  "http://localhost:3001"
];

// middlewares
app.use(express.json());
app.use(cookieParser());
app.use(
    cors({
    // origin : "http://localhost:3000",
    origin: function (origin, callback) {
    // Allow requests with no origin (like mobile apps or curl)
    if (!origin) return callback(null, true);
    if (allowedOrigins.includes(origin)) {
      return callback(null, true);
    } else {
      return callback(new Error("Not allowed by CORS"));
    }
  },
//   it use forauthorization headeres
    credentials: true,
    })
);
app.use(
    fileUpload({
        useTempFiles: true,
        tempFileDir :"/tmp",
    })
);

// routes
app.use("/api/v1/auth",userRautes);
app.use("/api/v1/profile",profileRautes);
app.use("/api/v1/payment",paymentRautes);
app.use("/api/v1/course",courseRautes);

// default routes 
app.get("/",(req , res) =>{
    return res.json({
        success: true,
        messge: "Your server is running and you are inside the default route........."
    });
});

// app start 
app.listen(PORT, () =>{
    console.log(`App is listen at port no ${PORT}` );
});