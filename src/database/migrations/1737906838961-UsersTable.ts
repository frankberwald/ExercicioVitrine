import { MigrationInterface, QueryRunner } from "typeorm";

export class CreateUserTable1623654893192 implements MigrationInterface {
    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            CREATE TABLE "user" (
                "id" SERIAL PRIMARY KEY,
                "name" varchar(100) NOT NULL,
                "email" varchar(100) UNIQUE NOT NULL,
                "password" varchar NOT NULL
            );
        `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "user"`);
    }
}