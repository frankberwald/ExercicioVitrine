import { Entity, PrimaryGeneratedColumn, Column } from "typeorm"

@Entity()
export class User {

    @PrimaryGeneratedColumn()
    id: number

    @Column({ type: "varchar", length: 100 })
    name: string

    @Column({ type: "varchar", unique: true, length: 100 })
    email: string

    @Column({ type: "varchar" })
    password: string

}
