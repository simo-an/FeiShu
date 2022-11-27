import FS from 'fs-extra'
import { join } from 'path'

import getAppDataPath from 'appdata-path'

import { DataSourceOptions } from 'typeorm'

import UserEntity from './entity/UserEntity'
import CustomerEntity from "./entity/CustomerEntity";
import EmployeeEntity from "./entity/EmployeeEntity";
import ProgressEntity from "./entity/ProgressEntity";
import RecordEntity from "@/backend/entity/RecordEntity";
import TodoEntity from "@/backend/entity/TodoEntity";

const DATABASE_PATH = getAppDataPath('easy-customer')

try {
  if (!FS.pathExistsSync(DATABASE_PATH)) {
    FS.mkdirpSync(DATABASE_PATH)
  }
} catch (err) {
  console.error(err)
}

const DataBaseConfig = {
  type: 'sqlite',
  synchronize: false,
  logging: true,
  database: join(DATABASE_PATH, 'easy-customer.db'),
  cache: true,
  timezone: 'Z',
  entities: [
    UserEntity,
    CustomerEntity,
    EmployeeEntity,
    ProgressEntity,
    RecordEntity,
    TodoEntity
  ]
} as DataSourceOptions

console.warn('DataBaseConfig', DataBaseConfig)

export default DataBaseConfig
