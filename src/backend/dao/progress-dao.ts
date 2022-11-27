import {Service} from "typedi";
import {useDataSource} from "@/backend/create-datasource";
import ProgressEntity from "@/backend/entity/ProgressEntity";

@Service()
class ProgressDao {
  public getProgressList(): Promise<ProgressEntity[]> {
    return useDataSource().getRepository(ProgressEntity).find()
  }
}

export default ProgressDao