import {Service} from "typedi";
import {useDataSource} from "../create-datasource";
import UserEntity from "@/backend/entity/UserEntity";

@Service()
class UserDao {

  public getUserViaUserName(username: string) {
    return useDataSource()
      .getRepository(UserEntity)
      .findOneBy({username})
  }

}

export default UserDao