import {Service} from "typedi";
import UserEntity from "@/backend/entity/UserEntity";
import {getUserInfo} from "@/utils/local-storage";

@Service()
class UserService {
  public userInfo: UserEntity = getUserInfo()
}

export default UserService