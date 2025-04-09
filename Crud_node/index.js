import http from 'http';
import dotenv from 'dotenv';
import fs from 'fs';

dotenv.config({ path: './.env' });

const port = process.env.PORT
const usersFilePath = "users.json"

const readFileData = () => {
    try {
        const data = fs.readFileSync(usersFilePath, "utf-8")
        return data ? JSON.parse(data) : []
    } catch (err) {
        return err.message || []
    }
}

const server = http.createServer((req, res) => { 
    const path = req.url;
    const getIdFromPath = req.url.split("/")[1]
    const placeholderPath = path.startsWith("/") 
    const method = req.method
    if(path == "/" && method == "GET"){
        console.log("21", typeof path);
        res.end(JSON.stringify(readFileData()))
    }else if(path == "/" && method == "POST"){
        let body = ""
        req.on("data", (chunk)=> body += chunk.toString())
        req.on("end", ()=>{
            const data = readFileData()
            const newUser = JSON.parse(body)
            const id = data.length ? data[data.length -1].id + 1 : 1
            const obj = {...newUser, id}
            data.push(obj)
            fs.writeFileSync(usersFilePath, JSON.stringify(data, null, 2), "utf-8")
            console.log("32", data);
            res.end(JSON.stringify(data))
            //{name : "ali", age : 22, email : "", password : "", }
        })
    }else if(placeholderPath && method == "PUT"){
        let body = "";
        req.on("data", (chunks)=> body += chunks.toString())
        req.on("end", ()=>{
            const data = readFileData();
            const parsedBody = JSON.parse(body)
            const id = getIdFromPath
            data[id - 1] = {...data[id - 1], ...parsedBody}
            fs.writeFileSync(usersFilePath, JSON.stringify(data, null, 2), "utf-8")
            res.end(JSON.stringify(data))
        })
    }else if(placeholderPath && method == "DELETE"){
        const data = readFileData()
        const deletedUsers = data.filter((value, index)=> value.id !== parseInt(getIdFromPath))
        console.log("deletedUsers", deletedUsers);
        fs.writeFileSync(usersFilePath, JSON.stringify(deletedUsers, null, 2), "utf-8")
        res.end(JSON.stringify(deletedUsers))
    }
})

server.listen(port, () => {
    console.log(`Server is running on port http://localhost:${port}`);
})