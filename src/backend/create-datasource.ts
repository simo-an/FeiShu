import {DataSource} from "typeorm";
import DataBaseConfig from "./database.config";

let datasource: DataSource = null

function createDataSource() {
  datasource = new DataSource(DataBaseConfig)


  return datasource.initialize().catch(console.warn)
}

function useDataSource() {
  if (!datasource) {
    throw new Error('datasource not initialized.')
  }

  return datasource
}

export default createDataSource

export {
  useDataSource
}