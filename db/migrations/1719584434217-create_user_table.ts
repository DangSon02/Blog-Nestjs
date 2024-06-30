import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateUserTable1719584434217 implements MigrationInterface {
  name = 'CreateUserTable1719584434217';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE \`users\` (\`id\` int NOT NULL AUTO_INCREMENT, \`FIRST_NAME\` varchar(255) NOT NULL, \`LAST_NAME\` varchar(255) NOT NULL, \`EMAIL_NAME\` varchar(255) NOT NULL, \`STATUS\` int NOT NULL DEFAULT '1', PRIMARY KEY (\`id\`)) ENGINE=InnoDB`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TABLE \`users\``);
  }
}
