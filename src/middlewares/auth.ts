import express, { NextFunction, Request, Response } from "express"
import cors from "cors"

const app = express()

app.use(cors())
app.use(express.json())

//MIDDLEWARE GLOBAL
app.use((req: Request, res: Response, next:NextFunction)=>{
    res.status(401).json("Você não tem permissão para acessar.")
})


const authMiddle = (req: Request, res: Response, next: NextFunction) => {
  
}