<template>
  <div @click.stop="onEventSelected" class="date-event-item">
    <div :class="[dateEventClass]"
         class="event-item"
    >
      <icon-flag v-if="eventItem.isUrgent" class="urgent" />
      <span :title="eventItem.subject" class="subject">{{ eventItem.subject }}</span>
      <span v-if="!eventItem.isFinished" class="time">{{ eventTime }}</span>
    </div>
  </div>
</template>

<script setup lang="ts">
/**
 * 事件样式说明
 * 已完成 灰色背景 删除线
 * 逾期   红色背景 红色字体
 * 加急   名称前加Flag
 * 未接受 蓝色边框 蓝色字体
 * 其他   蓝色背景 蓝色字体
 */
import {computed} from 'vue'
import {IEventInfo} from '../type'
import IconFlag from '../icon/icon-flag.vue'
import {useCalendarService} from "@/view/function/calendar/component/calendar";

const {eventService} = useCalendarService()

const {eventItem} = defineProps<{
  eventItem: IEventInfo
}>()


const eventTime = computed(() => {
  if (eventItem.isFullDay) {
    return '全天'
  }
  const hour = String(eventItem.startTime.getHours()).padStart(2, '0')
  const minute = String(eventItem.startTime.getMinutes()).padStart(2, '0')

  return `${hour}:${minute}`
})

const dateEventClass = computed(() => {
  if (eventItem.isFinished) return 'event-item__finished'
  if (eventItem.isNotReceived) return 'event-item__not-received'
  if (eventItem.isOvertime) return 'event-item__overtime'
  if (eventItem.isUrgent) return 'event-item__urgent'

  return 'event-item__normal'
})

function onEventSelected() {
  eventService.next('onEventSelected', eventItem)
}

</script>

<style lang="less">
@import "../stylus/shared";

.date-event-item {
  margin-top: 2px;
  cursor: pointer;
  font-size: 12px;

  transition: all 300ms ease-in-out;

  .event-item {
    display: flex;
    align-items: center;
    line-height: 16px;
    padding: 1px 4px;
    border-radius: 4px;

    .urgent {
      margin-right: 2px;
    }
    .subject {
      flex-grow: 1;

      .text-ellipsis();
    }
    .time {
      color: #999999;
      flex-shrink: 0;
      margin-left: 2px;
    }

    .icon-flag {
      display: flex;
      align-items: center;
    }


    &__urgent {
      background-color: #EDF4FC;
      color: #015478;
    }
    &__overtime {
      background-color: #FEEAEE;
      color: #FA4064;
      .time { color: #FA4064 !important; }
    }
    &__finished {
      background-color: #EFEFEF;
      color: #999999;
      .subject { text-decoration: line-through; }
    }
    &__not-received {
      border: 1px solid #3F86DE;
      color: #015478;
      box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.2);
    }
    &__normal {
      background-color: #EDF4FC;
      color: #015478;
    }
  }
}
</style>
