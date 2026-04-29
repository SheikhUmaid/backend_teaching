import express from "express"
import { user_db } from "./db.js";
import userRouter from "./users/routes.js"
const app = express();

app.use(express.json())




// app.get("/showdb",(req,res)=>{
//     return res.json(user_db)
// })




app.use("/user",userRouter)

app.listen(3000,()=>{
    "server started at 3000"
})