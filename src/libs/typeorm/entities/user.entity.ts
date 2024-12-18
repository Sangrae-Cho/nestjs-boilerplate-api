import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';

// Enum 선언
export enum UserStatus {
  ACTIVE = 'active', // 활동
  DORMANT = 'dormant', // 휴면
  WITHDRAW = 'withdraw', // 탈퇴
  SUSPENDED = 'suspended', // 정지
}

@Entity('user')
export class User {
  // Primary Key: 회원 번호
  @PrimaryGeneratedColumn({ name: 'no' })
  no: number;

  // 회원 이름
  @Column({ type: 'varchar', length: 30, nullable: false })
  name: string;

  // 생년월일
  @Column({ type: 'date', nullable: true })
  birthDate: Date;

  // 이메일 (유니크)
  @Column({ type: 'varchar', length: 150, unique: true, nullable: false })
  email: string;

  // 비밀번호
  @Column({
    type: 'char',
    length: 60, // bcrypt 길이는 항상 60자
    nullable: false,
  })
  password: string;

  // 가입 일시
  @CreateDateColumn({ type: 'timestamp' })
  createdAt: Date;

  // 마지막 수정 일시
  @UpdateDateColumn({ type: 'timestamp' })
  updatedAt: Date;

  // 회원 상태 (예: 활성, 비활성)
  @Column({
    type: 'enum',
    enum: UserStatus,
    default: UserStatus.ACTIVE,
  })
  status: UserStatus;

  // 마지막 로그인 일시
  @Column({ type: 'timestamp', nullable: true })
  lastLogin: Date | null;
}
