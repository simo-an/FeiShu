import {Column, Entity, PrimaryGeneratedColumn} from "typeorm";

@Entity('TodoEntity')
class TodoEntity {
  @PrimaryGeneratedColumn('increment')
  id: number

  @Column({ type: 'varchar' })
  subject: string

  @Column({ name: 'start_time', type: 'datetime', default: () => 'CURRENT_TIMESTAMP' })
  startTime: Date

  @Column({ name: 'end_time', type: 'datetime', nullable: true })
  endTime?: Date

  @Column({ name: 'is_full_day', type: 'boolean', default: false })
  isFullDay: boolean

  @Column({ name: 'is_urgent', type: 'boolean', default: false })
  isUrgent: boolean

  @Column({ name: 'is_repeat', type: 'boolean', default: false })
  isRepeat: boolean

  @Column({ name: 'is_finished', type: 'boolean', default: false })
  isFinished: boolean

  @Column({ type: 'varchar', nullable: true })
  remark?: string

  @Column({ name: 'tag_list', type: 'varchar', nullable: true })
  tagList?: string[]

  @Column({ name: 'create_time', type: 'datetime', default: () => 'CURRENT_TIMESTAMP' })
  createTime: string
}

export default TodoEntity