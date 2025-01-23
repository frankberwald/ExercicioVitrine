import { AppDataSource } from "../data-source"
import { Medicines } from "../entities/Medicines"
import { Router } from "express"

const medicinesRepository = AppDataSource.getRepository(Medicines);