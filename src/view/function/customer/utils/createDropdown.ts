import {h} from 'vue'
import {DropdownOption} from "naive-ui";

export enum DropdownMenu {
  EDIT,
  DELETE
}

export function createDropdownMenu() {
  const options: DropdownOption[] = [
    {
      label: '编辑',
      key: DropdownMenu.EDIT
    },
    {
      label: () => h('span', { style: { color: 'red' } }, '删除'),
      key: DropdownMenu.DELETE
    }
  ]

  return options
}

