import {Service} from "typedi";
import {useDataSource} from "@/backend/create-datasource";
import CustomerEntity from "@/backend/entity/CustomerEntity";

@Service()
class CustomerDao {
  private customerRepository = useDataSource().getRepository(CustomerEntity)

  public getCustomerList(): Promise<CustomerEntity[]> {
    return this.customerRepository.find()
  }

  public saveCustomer(customer: CustomerEntity) {
    return this.customerRepository.save(customer)
  }

  public deleteCustomer(id: number | number[]) {
    return this.customerRepository.delete(id)
  }

  public getCustomer(id: number) {
    return this.customerRepository.findOneBy({id})
  }
}

export default CustomerDao