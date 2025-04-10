import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import fs from "fs";

const app = express()
dotenv.config()

app.use(cors())
app.use(express.json())
app.use(express.urlencoded({extended : true}))
const port = process.env.PORT || 5000
const usersData = "./Models/UserModel.json"

const readFileData = () => {
    try{
        const data = fs.readFileSync(usersData, "utf-8")
        return JSON.parse(data) || []
    }catch(err){
        return err.message || []
    }
}

app.post("/users", (req, res)=>{
    const data = readFileData()
    data.push(req.body)
    fs.writeFileSync(usersData, JSON.stringify(data), "utf-8")
    res.json("end")
})


app.listen(port, ()=>{
    console.log(`server is running on http://localhost:${port}`)
})