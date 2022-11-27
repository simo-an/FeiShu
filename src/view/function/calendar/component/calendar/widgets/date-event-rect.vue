<template>
  <div @click="onEventSelected" class="date-event-rect">
    <div :class="[dateEventClass]"
         class="event-content"
    >
      <div class="event-title">
        <icon-flag v-if="eventItem.isUrgent" class="urgent"/>
        <span :title="eventItem.subject" class="subject">{{ eventItem.subject }}</span>
      </div>
      <span v-if="!eventItem.isFinished"
            :title="eventTime"
            class="event-time"
      >{{ eventTime }}</span>
    </div>
  </div>
</template>

<script setup lang="ts">/**
 * 事件样式说明
 * 已完成 灰色背景 删除线
 * 逾期   红色背景 红色字体
 * 加急   名称前加Flag
 * 未接受 蓝色边框 蓝色字体
 * 其他   蓝色背景 蓝色字体
 */
import {IEventInfo} from '../type'
import IconFlag from '../icon/icon-flag.vue'
import {getTimeText} from "../utils/date";
import {computed} from "vue";
import {useCalendarService} from "@/view/function/calendar/component/calendar";

const {eventService} = useCalendarService()

const {eventItem} = defineProps<{
  eventItem: IEventInfo
}>()

const eventTime = computed(() => {
  if (eventItem.isFullDay) {
    return '全天'
  }

  const {startTime, endTime} = eventItem

  if (!endTime) {
    return getTimeText(startTime)
  }

  return `${getTimeText(startTime)}-${getTimeText(endTime)}`
})

const dateEventClass = computed(() => {
  if (eventItem.isFinished) return 'event-content__finished'
  if (eventItem.isNotReceived) return 'event-content__not-received'
  if (eventItem.isOvertime) return 'event-content__overtime'
  if (eventItem.isUrgent) return 'event-content__urgent'

  return 'event-content__normal'
})

function onEventSelected() {
  eventService.next('onEventSelected', eventItem)
}
</script>

<style lang="less">
@import "../stylus/shared";

.date-event-rect {
  cursor: pointer;
  font-size: 12px;

  transition: all 500ms ease-in-out;

  .event-content {
    display: flex;
    flex-direction: column;
    height: 100%;
    border-radius: 4px;

    overflow: hidden;

    &__urgent {
      background-color: #EDF4FC;
      color: #015478;
    }

    &__overtime {
      background-color: #FEEAEE;
      color: #FA4064;

      .time {
        color: #FA4064 !important;
      }
    }

    &__finished {
      background-color: #EFEFEF;
      color: #999999;

      .subject {
        text-decoration: line-through;
      }
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

    .event-title {
      display: flex;
      line-height: 14px;
      padding: 1px 4px;

      .urgent {
        margin-right: 2px;
      }

      .subject {
        flex-grow: 1;
        .text-ellipsis();
      }

      .icon-flag {
        display: flex;
        align-items: center;
      }
    }

    .event-time {
      color: #999999;
      padding: 1px 4px;
      .text-ellipsis();
    }
  }
}
</style>
