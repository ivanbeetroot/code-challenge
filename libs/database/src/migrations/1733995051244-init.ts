import { MigrationInterface, QueryRunner } from 'typeorm';

export class Init1733995051244 implements MigrationInterface {
  name = 'Init1733995051244';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "country_translation" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "official" text NOT NULL, "common" text NOT NULL, "language" character varying(5) NOT NULL, "countryId" uuid, CONSTRAINT "PK_92b67bfadf41fa06682168b233b" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "country" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "name" text NOT NULL, "flag" text NOT NULL, CONSTRAINT "PK_bf6e37c231c4f4ea56dcd887269" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_2c5aa339240c0c3ae97fcc9dc4" ON "country" ("name") `,
    );
    await queryRunner.query(
      `ALTER TABLE "country_translation" ADD CONSTRAINT "FK_0ec3eaa449020c069854451caaa" FOREIGN KEY ("countryId") REFERENCES "country"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );

    await queryRunner.query(`CREATE EXTENSION IF NOT EXISTS pg_trgm;`);
    await queryRunner.query(
      `CREATE INDEX idx_country_name_trgm ON country USING GIN (name gin_trgm_ops);`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "country_translation" DROP CONSTRAINT "FK_0ec3eaa449020c069854451caaa"`,
    );
    await queryRunner.query(
      `DROP INDEX "public"."IDX_2c5aa339240c0c3ae97fcc9dc4"`,
    );
    await queryRunner.query(`DROP TABLE "country"`);
    await queryRunner.query(`DROP TABLE "country_translation"`);
  }
}
