import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

export enum GrowType {
  INDOOR = 'indoor',
  OUTDOOR = 'outdoor',
}

const nullable = true;

@Entity()
export class UserProfile {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({
    length: 120,
    nullable,
  })
  bio: string;

  @Column({ nullable })
  yearsGrowing: number;

  @Column({ nullable })
  location: string;

  @Column({ nullable, type: 'enum', enum: GrowType, default: null })
  growType: GrowType;

  @CreateDateColumn({ nullable })
  createDate: Date;

  @UpdateDateColumn({ nullable })
  updateDate: Date;
}
