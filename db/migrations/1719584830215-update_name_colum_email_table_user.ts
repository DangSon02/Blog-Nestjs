import { MigrationInterface, QueryRunner } from 'typeorm';

export class UpdateNameColumEmailTableUser1719584830215
  implements MigrationInterface
{
  name = 'UpdateNameColumEmailTableUser1719584830215';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE \`users\` CHANGE \`EMAIL_NAME\` \`EMAIL\` varchar(255) NOT NULL`,
    );
    await queryRunner.query(`ALTER TABLE \`users\` DROP COLUMN \`EMAIL\``);
    await queryRunner.query(
      `ALTER TABLE \`users\` ADD \`EMAIL\` varchar(255) NOT NULL`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE \`users\` DROP COLUMN \`EMAIL\``);
    await queryRunner.query(
      `ALTER TABLE \`users\` ADD \`EMAIL\` varchar(255) NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE \`users\` CHANGE \`EMAIL\` \`EMAIL_NAME\` varchar(255) NOT NULL`,
    );
  }
}
