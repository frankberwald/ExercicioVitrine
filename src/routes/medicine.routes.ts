import { AppDataSource } from "../data-source"
import { Medicines } from "../entities/Medicines"
import { Router, Request, Response } from "express";
import authMiddle from "../middlewares/auth";

const medicinesRepository = AppDataSource.getRepository(Medicines);
const medicineRouter = Router();

medicineRouter.get("/all", async (req: Request, res: Response) => {
  try {
    const listMedicine = await medicinesRepository.find()
    res.status(200).json(listMedicine)
  } catch (ex) {
    res.status(500).send("Erro ao executar solicitação")
  }
})

medicineRouter.get("/", authMiddle, async (req: Request, res: Response) => {
  try {
    const listMedicine = await medicinesRepository.find({
      where: { user: {id :req.user.id} },
    });
    res.status(200).json(listMedicine);
  } catch (ex) {
    res.status(500).send("Erro ao executar solicitação");
  }
});

medicineRouter.post("/", authMiddle, async (req: Request, res: Response) => {
  const { name, descricao, quantidade } = req.body;
  if (!name || !descricao || !quantidade) {
    res.status(400).send("Todos os campos são obrigatórios!");
    return
  }
  try {
    const medicine = await medicinesRepository.create({ name, descricao, quantidade, user: {id :req.user.id} })
    await medicinesRepository.save(medicine);
    res.status(201).json({ message: "Registro criado com sucesso!", medicine })
  } catch (ex) {
    console.error("Erro ao criar registro:", ex);
    res.status(500).send("Erro ao executar solicitação")
  }
})

medicineRouter.put("/:id", authMiddle, async (req: Request, res: Response) => {
  try {
    const medicine = await medicinesRepository.findOne({
      where: { id: +req.params.id },
    });
    if (!medicine) {
      res.status(404).json({ message: "Medicamento não encontrado!" });
      return
    }
    if (medicine.user.id !== req.user.id) {
      res.status(403).json({ message: "Você não tem permissão para atualizar este medicamento!" });
      return
    }
    const { name, descricao, quantidade } = req.body;
    medicine.name = name ?? medicine.name;
    medicine.descricao = descricao ?? medicine.descricao;
    medicine.quantidade = quantidade ?? medicine.quantidade;

    await medicinesRepository.save(medicine);
    res.status(200).json(medicine);
  } catch (ex) {
    res.status(500).send("Erro ao executar solicitação");
  }
});

medicineRouter.delete("/:id", authMiddle, async (req: Request, res: Response) => {
  try {
    const medicine = await medicinesRepository.findOne({
      where: { id: +req.params.id },
      relations: ["user"],
    });
    if (!medicine) {
      res.status(404).json({ message: "Medicamento não encontrado!" });
      return
    }
    if (medicine.user.id !== req.user.id) {
      res.status(403).json({ message: "Você não tem permissão para remover este medicamento!" });
      return
    }

    await medicinesRepository.delete(medicine.id);
    res.status(200).json({ message: "Medicamento removido com sucesso!" });
  } catch (ex) {
    res.status(500).send("Erro ao executar solicitação");
  }
});

export default medicineRouter