import { MigrationInterface, QueryRunner } from "typeorm";

export class CreateMedicinesTable1642258583584 implements MigrationInterface {
    name = 'CreateMedicinesTable1642258583584'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "medicines" (
            "id" SERIAL NOT NULL,
            "name" character varying NOT NULL,
            "descricao" character varying NOT NULL,
            "quantidade" integer NOT NULL,
            "userId" integer,
            CONSTRAINT "PK_4db75eab372d2bcb1cb4f8796e4" PRIMARY KEY ("id")
        )`);
        await queryRunner.query(`ALTER TABLE "medicines"
            ADD CONSTRAINT "FK_07fdd0e8f91d97d6d11e8c9a732" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "medicines" DROP CONSTRAINT "FK_07fdd0e8f91d97d6d11e8c9a732"`);
        await queryRunner.query(`DROP TABLE "medicines"`);
    }
}
