import { Entity, PrimaryGeneratedColumn, Column, OneToOne, JoinColumn } from "typeorm"
import { User } from "./User"

@Entity()
export class Medicines {

    @PrimaryGeneratedColumn()
    id: number

    @Column({ type: "varchar", length: 100 })
    name: string

    @Column({ type: "text", nullable: true })
    descricao: string

    @Column({ type: "int" })
    quantidade: number

    @OneToOne(()=> User)
    @JoinColumn({ name: "userId" })
    user: User

}