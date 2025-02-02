import { AppDataSource } from "../data-source";
import { User } from "../entities/User";
import { Router, Request, Response } from "express";
import bcrypt from "bcrypt";
import authMiddle from "../middlewares/auth";

const userRepository = AppDataSource.getRepository(User);
const userRouter = Router();

userRouter.get ("/", authMiddle, async (req, res)=> {
  try{
    const listUser = await userRepository.find()
    res.status(200).json(listUser)
  } catch (ex){
    res.status(500).send("Erro ao executar solicitação")
  }
})

userRouter.post ("/", async (req:Request, res:Response) => {
  const { name, email, password } = req.body;

  if(!name || !email || !password){
    res.status(400).send("Todos os campos são obrigatórios!");
    return
  }
  try{
    const hasedPassword = await bcrypt.hash(password, 10);
    const user = await userRepository.create({name, email, password: hasedPassword})
    await userRepository.save(user);
    res.status(201).json({message: "Usuário criado com sucesso!", user})
  } catch (ex){
    console.error("Erro ao criar usuário:", ex);
    res.status(500).send("Erro ao executar solicitação")
  }
})

userRouter.put ("/:id", async (req:Request, res:Response) => {
  try{
    const user = await userRepository.findOne({
      where: {
        id: +req.params.id
      }
    }) ?? new User()
    if(user.id == null){
      res.status(400).json({message : "Usuário não encontrado"})
    }
    let userUpdate = req.body as User
    Object.assign(user, userUpdate)
    await userRepository.save(user)
    res.status(200).json(user)
  } catch (ex){
    res.status(500).send("Erro ao executar solicitação")
  }
})

userRouter.delete("/:id", async (req: Request, res: Response) => {
  try {
      let id = Number(req.params.id)

      const user = await userRepository.findOne({
          where:{
              id: id
          }
      })

      if(!user){
          res.status(400).json("Usuário não encontrado!")
      }

      await userRepository.delete(id)

      res.status(200).json("Usuário removido com sucesso!")
  } catch (ex) {
      res.status(500).send("Ocorreu um erro ao executar a solicitação")
  }
})
export default userRouter