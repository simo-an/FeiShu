<template>
  <div ref="dateEventModal" class="date-event-modal">
    <div class="date-text">
      <span class="week">{{ dateText.week }}</span>
      <span class="day">{{ dateText.day }}</span>
    </div>
    <div class="event-list-scroll">
      <div class="event-list">
        <date-event-item
          v-for="({style,event}) in eventList"
          :style="{style, width: 'auto'}"
          :key="event.id"
          :event-item="event"
        ></date-event-item>
      </div>
    </div>
    <icon-close @click="$emit('close')" size="20"></icon-close>
  </div>
</template>
<script setup lang="ts">
import DateEventItem from './date-event-item.vue'
import IconClose from '../icon/icon-close.vue'
import {FullWeekMap} from '../utils/const'
import {IViewDateEvent} from "../type";
import {computed, onBeforeUnmount, onMounted, ref} from "vue";

const { eventList } = defineProps<{
  eventList: IViewDateEvent[]
}>()

const dateEventModal = ref<HTMLDivElement>(null)

const dateText = computed(() => {
  const date = eventList[0].event.startTime

  return {
    week: FullWeekMap[date.getDay()],
    day: String(date.getDate()).padStart(2, '0')
  }
})

onMounted(() => {
  document.body.appendChild(dateEventModal.value)
})

onBeforeUnmount(() => {
  dateEventModal.value.remove()
})

</script>
<style lang="less">
@import "../stylus/shared.less";

.date-event-modal {
  position: fixed;
  padding: 10px 0;
  border-radius: 4px;
  background-color: white;
  box-shadow: 0 2px 12px 0 rgba(0, 0, 0, .1);
  z-index: 999;

  .date-text {
    display: flex;
    flex-direction: column;
    padding: 0 18px;
    >.week {
      font-size: 12px;
    }
    >.day {
      margin-top: 1px;
      font-size: 26px;
      line-height: 26px;
      font-weight: bold;
    }
  }
  .event-list-scroll {
    margin-top: 8px;
    max-height: 280px;
    width: 300px;

    .hidden-scroll();
    >.event-list >.date-event-item {
      margin-top: 4px;
      > .event-item {
        height: 40px;
        align-items: flex-start;
        padding: 6px;

        > .subject {
          //.text-max-line-2();
        }
        > .time {
          margin-left: 4px;
        }
      }
    }
  }
  .event-list {
    padding: 0 18px;
    margin-bottom: 12px;
  }

  .icon-close {
    position: absolute;
    top: 12px;
    right: 12px;
    cursor: pointer;

    &:hover {
      >svg { fill: #FA4064; }
    }
  }
}
</style>
