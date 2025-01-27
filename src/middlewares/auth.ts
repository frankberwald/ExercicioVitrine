import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";
import { AppDataSource } from "../data-source";
import { User } from "../entities/User";

const authMiddle = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    console.log(req.headers);

    const authHeader = req.headers.authorization;
    if (!authHeader) {
      res.status(401).json({ message: "Token de autenticação ausente" });
      return;
    }

    const token = authHeader.split(" ")[1];
    if (!token) {
      res.status(401).json({ message: "Token Inválido" });
      return;
    }

    const secret = process.env.JWT_SECRET || "default_jwt_secret";
    const decoded: any = jwt.verify(token, secret);

    const user = await AppDataSource.getRepository(User).findOne({
      where: { id: decoded.id },
    });

    if (!user) {
      res.status(401).json({ message: "Usuário não encontrado." });
      return;
    }

    req.user = user;
    next();
  } catch (error) {
    console.error("Erro de autenticação", error);
    res.status(401).json({ message: "Token Inválido ou expirado" });
  }
};

export default authMiddle;
