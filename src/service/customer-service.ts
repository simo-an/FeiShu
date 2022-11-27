import {Service} from "typedi";
import CustomerEntity from "@/backend/entity/CustomerEntity";
import useDao from "@/backend/dao/use-dao";
import {ref} from "vue";

@Service()
class CustomerService {
  public customerList = ref<Array<CustomerEntity>>([])
  public customerDao = useDao().customerDao

  public async getCustomerList() {
    return this.customerList.value = await this.customerDao.getCustomerList()
  }

  public async getCustomer(id: number) {
    const customer = await this.customerDao.getCustomer(id)

    return customer
  }

  public async deleteCustomer(idList: number[]) {
    await this.customerDao.deleteCustomer(idList)

    idList.forEach(id => {
      const idx = this.customerList.value.findIndex(customer => customer.id === id)

      return idx >= 0 && this.customerList.value.splice(idx, 1)
    })

  }

  public async saveCustomer(customer: CustomerEntity) {
    const idx = this.customerList.value.findIndex(cus => cus.id === customer.id)

    customer = await this.customerDao.saveCustomer(customer)

    if (idx >= 0) {
      this.customerList.value.splice(idx, 1, customer)
    } else {
      this.customerList.value.push(customer)
    }
  }


}

export default CustomerService