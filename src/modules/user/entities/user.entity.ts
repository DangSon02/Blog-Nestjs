import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity({ name: 'users' })
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ name: 'FIRST_NAME' })
  firstName: string;

  @Column({ name: 'LAST_NAME' })
  lastName: string;

  @Column({ name: 'EMAIL' })
  email: string;

  @Column({ name: 'PASSWORD' })
  password: string;

  @Column({ name: 'REFRESH_TOKEN', default: null })
  refreshToken: string;

  @Column({ name: 'STATUS', default: 1 })
  status: number;

  @CreateDateColumn({ name: 'CREATED_AT' })
  createdAt: Date;

  @CreateDateColumn({ name: 'UPDATE_AT' })
  updateAt: Date;
}
