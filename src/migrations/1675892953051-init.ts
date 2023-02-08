import { MigrationInterface, QueryRunner } from "typeorm";

export class init1675892953051 implements MigrationInterface {
    name = 'init1675892953051'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "users" ADD "country" character varying NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "country"`);
    }

}
