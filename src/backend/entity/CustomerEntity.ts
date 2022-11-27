import {Column, Entity, JoinColumn, OneToMany, PrimaryGeneratedColumn} from "typeorm";
import EmployeeEntity from "./EmployeeEntity";
import ProgressEntity from "./ProgressEntity";

// 以公司为单位
@Entity('CustomerEntity')
class CustomerEntity {
  @PrimaryGeneratedColumn('increment')
  id: number

  @Column({ type: 'varchar' })
  name: string

  @Column({ type: 'varchar' })
  country: string

  @Column({ type: 'varchar', nullable: true })
  zoneId?: string

  @Column({ type: 'varchar' })
  website: string // 网站地址

  @Column({ type: 'varchar' })
  address: string // 公司实际地址

  @Column({ type: 'varchar' })
  type: string // 公司类型

  @OneToMany(() => EmployeeEntity, (employee) => employee.customer)
  contactor: Array<EmployeeEntity>

  @OneToMany(() => ProgressEntity, (progress) => progress.customer, {eager: true})
  progress: Array<ProgressEntity>

  @Column({ type: 'varchar', nullable: true })
  remark?: string  // 公司备注

  @Column({ name: 'create_time', type: 'datetime', default: () => 'CURRENT_TIMESTAMP' })
  createTime: Date
}

export default CustomerEntity