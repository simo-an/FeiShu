import {Column, Entity, PrimaryGeneratedColumn} from "typeorm";

@Entity('RecordEntity')
class RecordEntity {
  @PrimaryGeneratedColumn('increment')
  id: number

  @Column({ type: 'varchar' })
  content: string

  @Column({ name: 'create_time', type: 'datetime', default: () => 'CURRENT_TIMESTAMP' })
  createTime: string
}

export default RecordEntity