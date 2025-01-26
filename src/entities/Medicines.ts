import { Entity, PrimaryGeneratedColumn, Column, OneToOne, JoinColumn } from "typeorm"
import { User } from "./User"

@Entity()
export class Medicines {

    @PrimaryGeneratedColumn()
    id: number

    @Column()
    name: string

    @Column()
    descricao: string

    @Column()
    quantidade: number

    @OneToOne(()=> User)
    @JoinColumn()
    user: User

}