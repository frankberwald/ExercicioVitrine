import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";
import { AppDataSource } from "../data-source";
import { User } from "../entities/User";


const authMiddle = async (req: Request, res: Response, next: NextFunction) => {
  console.log(req.headers)
  const authHeader = req.headers.authorization
  if (!authHeader) {
    return res.status(401).json({message: "Token de autenticação ausente"})
  }
  const token = authHeader?.split(" ")[1];
  if (!token) {
    return res.status(401).json({message: "Token Inválido"})
  } try {
    const secret = process.env.JWT_SECRET || "default_jwt_secret";
    const decoded: any = jwt.verify(token, secret);
    const user = await AppDataSource.getRepository(User).findOne({where: {id: decoded.id}})
    if (!user) {
      return res.status(401).json({message: "Usuário não encontrado."});
    }
    req.user = user;
    next();
  } catch (error) {
    console.error("Erro de autenticação", error);
    return res.status(401).json({message: "Token Inválido ou expirado"})
  }
}

export default authMiddle