import {SEX} from "./type";
import {Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn} from "typeorm";
import CustomerEntity from "./CustomerEntity";

@Entity('EmployeeEntity')
class EmployeeEntity {
  @PrimaryGeneratedColumn('increment')
  id!: number

  @Column({ type: 'varchar' })
  name!: string

  @Column({ type: 'integer', nullable: true })
  age?: number

  @Column({ type: 'integer', enum: SEX, default: SEX.UNKNOWN })
  sex: SEX

  @Column({ type: 'varchar', nullable: true })
  phone?: string // 逗号隔开

  @Column({ type: 'varchar', nullable: true })
  email?: string // 逗号隔开

  @Column({ type: 'varchar', nullable: true })
  position?: string // 职位

  @Column({ type: 'varchar', nullable: true })
  country?: string

  @Column({ type: 'varchar', nullable: true })
  remark?: string

  // ManyToOne entities
  @ManyToOne(() => CustomerEntity, (customer) => customer.contactor, { onDelete: 'NO ACTION' })
  @JoinColumn({ name: 'customer_id', referencedColumnName: 'id' })
  customer?: CustomerEntity

  @Column({ name: 'create_time', type: 'datetime', default: () => 'CURRENT_TIMESTAMP' })
  createTime: Date
}

export default EmployeeEntity