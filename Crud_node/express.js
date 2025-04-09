import express from "express";
import fs, { readFile } from "fs";

const app = express()
app.use(express.json()) //{name : {}}
app.use(express.urlencoded({extended : true}))
const usersFilePath = "users.json"

const readFileData = () => {
    try{
        const data = fs.readFileSync(usersFilePath, "utf-8")
        return JSON.parse(data) || []
    }catch(err){
        return err.message || []
    }
}

app.get("/", (req, res)=>{
    res.json(readFileData())
})

app.get("/:id", (req, res)=>{
    const id = req.params.id
    const getUserById = readFileData().find(user => user.id == id)
    res.json(getUserById ? getUserById : "user not found")
})

app.post("/", (req, res)=>{
    const data = readFileData()
    const id  = data.length ? data[data.length -1].id + 1 : 1
    data.push({...req.body, id})
    fs.writeFileSync(usersFilePath, JSON.stringify(data))
    res.send(data)
})
app.put("/:id", (req, res)=>{ //id = 2
    const data = readFileData() //[{},{},{}]
    const id  = req.params.id //2
    data[id - 1] = {...req.body, id} //data[2-1] = {name, age, email, password, id}
    fs.writeFileSync(usersFilePath, JSON.stringify(data))
    res.send(data)
})
app.delete("/:id", (req, res) => {
    const id = req.params.id
    const data = readFileData().filter(user => user.id != id)
    fs.writeFileSync(usersFilePath, JSON.stringify(data))
    res.send(data)
})

app.listen(3000, ()=>{
    console.log("server is running")
})