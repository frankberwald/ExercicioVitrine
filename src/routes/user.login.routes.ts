import { AppDataSource } from "../data-source";
import { User } from "../entities/User";
import { Router, Request, Response } from "express";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const userRepository = AppDataSource.getRepository(User);
const userLoginRoutes = Router();

const JWT_SECRET = "naocontapraninguemrsrs";

userLoginRoutes.post("/login", async (req: Request, res: Response) => {
  const { email, password } = req.body;

  if (!email || !password) {
    res.status(400).send("Email e senha são obrigatórios!");
    return;
  }

  try {
    const user = await userRepository.findOne({ where: { email } });

    if (!user) {
      res.status(400).send("Credenciais inválidas!");
      return;
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
      res.status(400).send("Credenciais inválidas!");
      return;
    }

    const token = jwt.sign({ id: user.id, email: user.email }, JWT_SECRET, {
      expiresIn: "1h",
    });

    res.status(200).json({ token });
  } catch (ex) {
    console.error("Erro ao autenticar usuário:", ex);
    res.status(500).send("Erro ao executar solicitação");
  }
});

export default userLoginRoutes;