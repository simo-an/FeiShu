<template>
  <div id="todo-navigator">
    <n-input
      class="todo-input"
      type="textarea"
      size="medium"
      rows="6"
      placeholder="请输入待办内容"
      autofocus
      :resizable="false"
      v-model:value="todo.subject"
    />

    <div class="time-content">
      <n-time-picker
        :default-value="todo.startTime.getTime()"
        format="HH:mm"
      />
      <n-button class="recognize-button"
                @click="recognizeTodo"
      >识别时间</n-button>
    </div>

    <div class="remark-content">

    </div>

    <n-button class="recognize-button"
              @click="recognizeTodo"
    >识别</n-button>

    <div class="recognize-result">
      <div>时间：
        {{todo.startTime}}
        {{todo.endTime}}
      </div>
      <div>地点：
        {{todo.remark}}
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">

import {onMounted, reactive, ref} from "vue";
import useRecognize from "./recognize/useRecognize";
import TodoEntity from "@/backend/entity/TodoEntity";

// const todoContent = ref('例如：1月1日下午5点至7点')

const todo = reactive(new TodoEntity())

const subject = ref('')
const startTime = ref(Date.now())
const remark = ref('')

todo.startTime = new Date()

function recognizeTodo() {
  if (!todo.subject) {
    return
  }
  console.warn('识别语句:', todo.subject)

  const result = useRecognize(todo.subject)

  if (result.timeList.length === 1) {
    todo.startTime = result.timeList[0]
  }
  if (result.timeList.length === 2) {
    todo.startTime = result.timeList[0]
    todo.endTime = result.timeList[1]
  }

  if (result.locationList) {
    todo.remark = result.locationList.join(';')

  }

  console.warn('识别时间:', result.timeList)
  console.warn('识别地点:', result.locationList)
}

onMounted(() => {
  recognizeTodo()
  window['recognizeTodo'] = recognizeTodo
})

</script>

<style lang="less">
#todo-navigator {
  width: 240px;
  display: flex;
  flex-direction: column;

  align-items: center;

  .todo-input {

  }
  .time-content {
    margin-top: 16px;
  }

  .recognize-button {
    margin-top: 16px;
    width: 100%;
  }

  .recognize-result {
    margin-top: 16px;
    width: 100%;
    white-space: pre-line;
  }
}
</style>