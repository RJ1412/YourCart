import express, { urlencoded } from 'express';
import cors from "cors";
import cookieParser from 'cookie-parser';
import userRoutes from "./src/routes/auth_routes.js"

const app = express()
const PORT = process.env.PORT || 3000

app.use(express.json());
app.use(urlencoded({extended:true}));
app.use(cookieParser());

app.use(cors({
  origin: 'http://localhost:5173',
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  credentials: true
}));


app.get('/', (req, res) => {
  res.send('RJ is here')
})



app.use("/api/v1/users" , userRoutes)

app.listen(PORT, () => {
  console.log(`Example app listening on port ${PORT}`)
})