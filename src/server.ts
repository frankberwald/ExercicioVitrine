import { AppDataSource } from "./data-source"
import express from "express"
import cors from "cors"
import userRouter from "./routes/user.routes"
import userLoginRoutes from "./routes/user.login.routes"
import medicineRouter from "./routes/medicine.routes"

const app = express()

app.use(cors())
app.use(express.json())
app.use("/users", userRouter)
app.use("/login", userLoginRoutes)
app.use("/medicine", medicineRouter)


AppDataSource.initialize().then(async () => {
    app.listen(3030, () => {
        console.log("Server running on port 3030 (http://localhost:3030)")
    })

}).catch(error => console.log(error))
