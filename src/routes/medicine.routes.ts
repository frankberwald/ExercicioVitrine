import { AppDataSource } from "../data-source"
import { Medicines } from "../entities/Medicines"
import { Router, Request, Response } from "express";

const medicinesRepository = AppDataSource.getRepository(Medicines);
const medicineRouter = Router();

medicineRouter.get ("/medicines", async (req: Request, res: Response) => {
  try {
    const listMedicine = await medicinesRepository.find()
    res.status(200).json(listMedicine)
  } catch (ex){
    res.status(500).send("Erro ao executar solicitação")
  }
})

medicineRouter.post ("/medicines", async (req: Request, res: Response) => {
  const {name, descricao, quantidade} = req.body;
  if (!name || !descricao || !quantidade) {
    res.status(400).send("Todos os campos são obrigatórios!");
    return
  }
    try{
      const medicine = await medicinesRepository.create({name, descricao, quantidade})
      await medicinesRepository.save(medicine);
      res.status(201).json({message: "Registro criado com sucesso!", medicine})
    } catch (ex){
      console.error("Erro ao criar registro:", ex);
      res.status(500).send("Erro ao executar solicitação")
    }
  })

  medicineRouter.put ("/:id", async (req:Request, res:Response) => {
    try{
      const medicine = await medicinesRepository.findOne({
        where: {
          id: +req.params.id
        }
      }) ?? new Medicines()
      if(medicine.id == null){
        res.status(400).json({message : "Usuário não encontrado"})
      }
      let medicineUpdate = req.body as Medicines
      Object.assign(medicine, medicineUpdate)
      await medicinesRepository.save(medicine)
      res.status(200).json(medicine)
    } catch (ex){
      res.status(500).send("Erro ao executar solicitação")
    }
  })

  medicineRouter.delete("/:id", async (req: Request, res: Response) => {
    try {
        let id = Number(req.params.id)
        const medicine = await medicinesRepository.findOne({
            where:{
                id: id
            }
        })
        if(!medicine){
            res.status(400).json("Registro não encontrado!")
        }
        await medicinesRepository.delete(id)
        res.status(200).json("Registro removido com sucesso!")
    } catch (ex) {
        res.status(500).send("Ocorreu um erro ao executar a solicitação")
    }
  })