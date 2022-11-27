import createDataSource from "./create-datasource";

async function createBackend() {
  console.time('createBackend')
  await createDataSource()
  console.timeEnd('createBackend')
}

export default createBackend