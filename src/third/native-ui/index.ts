import {
  // create naive ui
  create,
  // component
  NConfigProvider,
  NMessageProvider,
  NDialogProvider,
  NNotificationProvider,
  NButton,
  NInput,
  NSelect, NPopselect,
  NAutoComplete,
  NCheckbox,
  NSwitch, NRadio,
  NDropdown, NTabs,
  NAvatar, NCard,
  NTag, NDynamicTags, NRate,
  NDataTable, NTable, NTree,
  NImage, NTime, NTimeline, NStep,
  NTimePicker,
  NBreadcrumb, NPagination,
  NMenu,
  NAlert, NBadge,
  NDrawer, NModal,
  NPopconfirm,
  NProgress, NSpin,
  NSkeleton,
  NTooltip,
  NSpace,
  NScrollbar,
  NEl
} from 'naive-ui'

export * from './theme'

const naive = create({
  components: [
    NConfigProvider,
    NMessageProvider,
    NDialogProvider,
    NNotificationProvider,
    NButton, NInput, NAutoComplete, NSelect, NPopselect,
    NSwitch, NCheckbox, NRadio,
    NDropdown, NTabs,
    NTag, NDynamicTags,NAvatar, NRate,
    NDataTable, NTable, NTree,
    NImage, NTime, NTimeline, NStep,
    NTimePicker,
    NBreadcrumb, NPagination,
    NMenu,
    NAlert, NBadge,
    NDrawer, NModal,
    NPopconfirm,
    NProgress, NSpin,
    NSkeleton,
    NTooltip,
    NSpace,
    NScrollbar,
    NCard,
    NEl
  ]
})

export default naive