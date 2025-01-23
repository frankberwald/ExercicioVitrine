import { AppDataSource } from "./data-source"
import express from "express"
import cors from "cors"

const app = express()

app.use(cors())
app.use(express.json())


AppDataSource.initialize().then(async () => {
    app.listen(3030, () => {
        console.log("Server running on port 3030 (http://localhost:3030)")
    })

}).catch(error => console.log(error))
