import ProgressEntity from "@/backend/entity/ProgressEntity";
import {STEP} from "@/backend/entity/type";

export function getProgress(progress: ProgressEntity[]): string {
  if (!progress.length) {
    return '暂无进度'
  }

  switch (Number(progress[0].step)) {
    case STEP.QUOTE: return '报价'
    case STEP.FOLLOW: return '跟进'
    case STEP.FEEDBACK: return '反馈'
    case STEP.ORDER: return '成交'
    case STEP.FINISHED: return '完成'
    case STEP.MAINTAIN: return '维护'
    case STEP.NEGOTIATE: return '协商'
  }
}