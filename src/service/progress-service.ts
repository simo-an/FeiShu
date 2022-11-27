import {Service} from "typedi";
import useDao from "@/backend/dao/use-dao";
import ProgressEntity from "@/backend/entity/ProgressEntity";

@Service()
class ProgressService {
  public progressList: Array<ProgressEntity> = []

  public async getProgressList() {
    return this.progressList = await useDao().progressDao.getProgressList()
  }
}

export default ProgressService