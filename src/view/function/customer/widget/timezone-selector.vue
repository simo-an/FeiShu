<template>
  <n-select v-model:value="selectedTimezone"
            :options="timezoneOptions"
            @update:value="onTimezoneChanged"/>
</template>

<script setup lang="ts">
import {ref} from "vue";
import {TimeZoneItem, timeZoneList} from "@/utils/timezone/timezone-date";
import {getLocalTimeZone, inDST, TimeZoneItemInfo} from "@/utils/timezone";

const {zoneId} = defineProps<{
  zoneId: string
}>()
const emitEvent = defineEmits<{
  (event: 'selected', payload: TimeZoneItem): void
}>()


const selectedTimezone = ref<string>(zoneId)
const timezoneOptions = ref([])
// const localTimezone = getLocalTimeZone()

const timezoneList: TimeZoneItemInfo[] = timeZoneList

initTimezone()

function initTimezone() {
  timezoneList.forEach(tz => {
    if (!tz.inCurrentTimeZone) {
      tz.inDST = inDST(tz)
    }

    const offsetName = tz.inDST ? tz.dstOffsetName : tz.gmtOffsetName
    const zoneName = tz.cnZoneName

    tz.displayText = `GMT${offsetName} ${zoneName}`
    tz.offsetTime = tz.inDST ? tz.dstOffset : tz.gmtOffset

  })

  timezoneList.sort((tz1, tz2) => tz1.offsetTime - tz2.offsetTime)

  timezoneOptions.value = timezoneList.map(timezone => ({label: timezone.displayText, value: timezone.zoneId}))

  if (!selectedTimezone.value) {
    selectedTimezone.value = getLocalTimeZone().zoneId
    onTimezoneChanged(selectedTimezone.value)
  }
}

function onTimezoneChanged(zoneId: string) {
  emitEvent('selected', timezoneList.find(timezone => timezone.zoneId === zoneId))
}

</script>

<style lang="less">
#timezone-selector {

}
</style>