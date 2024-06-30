import { MigrationInterface, QueryRunner } from 'typeorm';

export class AddNewFieldsToUserTable1719668881477
  implements MigrationInterface
{
  name = 'AddNewFieldsToUserTable1719668881477';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE \`users\` ADD \`PASSWORD\` varchar(255) NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE \`users\` ADD \`REFRESH_TOKEN\` varchar(255) NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE \`users\` ADD \`CREATED_AT\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6)`,
    );
    await queryRunner.query(
      `ALTER TABLE \`users\` ADD \`UPDATE_AT\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6)`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE \`users\` DROP COLUMN \`UPDATE_AT\``);
    await queryRunner.query(`ALTER TABLE \`users\` DROP COLUMN \`CREATED_AT\``);
    await queryRunner.query(
      `ALTER TABLE \`users\` DROP COLUMN \`REFRESH_TOKEN\``,
    );
    await queryRunner.query(`ALTER TABLE \`users\` DROP COLUMN \`PASSWORD\``);
  }
}
