import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm'
import {SEX} from "./type";

@Entity('UserEntity')
class UserEntity {
  @PrimaryGeneratedColumn('increment')
  id: string

  @Column({ type: 'varchar' })
  username: string

  @Column({ type: 'varchar' })
  password: string

  @Column({ type: 'varchar' })
  nickname: string

  @Column({ type: 'varchar' })
  email: string

  @Column({ type: 'integer', enum: SEX, default: SEX.UNKNOWN })
  sex: SEX

  @Column({ type: 'varchar', nullable: true })
  avatar?: string

  @Column({ type: 'varchar' })
  address: string

  @Column({ name: 'create_time', type: 'datetime', default: () => 'CURRENT_TIMESTAMP' })
  createTime: Date
}

export default UserEntity