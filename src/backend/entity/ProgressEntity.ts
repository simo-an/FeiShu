import CustomerEntity from "./CustomerEntity";
import {STEP} from "./type";
import {Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn} from "typeorm";

@Entity('ProgressEntity')
class ProgressEntity {
  @PrimaryGeneratedColumn('increment')
  id: number

  @ManyToOne(
    () => CustomerEntity,
    (customer) => customer.progress,
    { onDelete: 'NO ACTION', eager: false }
  )
  @JoinColumn({ name: 'customer_id', referencedColumnName: 'id' })
  customer: CustomerEntity

  @Column({ type: 'integer', enum: STEP, default: STEP.NEGOTIATE })
  step: STEP

  @Column({ type: 'integer' })
  order: number

  @Column({ name: 'create_time', type: 'datetime', default: () => 'CURRENT_TIMESTAMP' })
  createTime: Date
}

export default ProgressEntity