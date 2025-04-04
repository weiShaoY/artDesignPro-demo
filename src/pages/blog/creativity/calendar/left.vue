<!------------------------------------    ------------------------------------------------->
<script lang="ts" setup>
import type { DayType, StateType } from './utils'

import { useSettingStore } from '@/store'

import CalendarUtils from './utils'

const settingStore = useSettingStore()

const elementRef = ref<HTMLElement | null>(null)

const state = defineModel<StateType>({
  required: true,
})

/**
 *  当前月份,用来给月份选择器绑定
 */
const monthPicker = ref(new Date())

/**
 *  选择日期
 */
function handleSelectDay(day: DayType): void {
  state.value.selectedDay = day

  CalendarUtils.render(state.value)
}

/**
 *  重置为当前日期
 */
function handleToday(): void {
  state.value = CalendarUtils.init()
  CalendarUtils.render(state.value)
}

// 设置监听器，当年份、月份、选中的日期或关注的节日月份变化时调用渲染函数
watchEffect(() => {
  monthPicker.value = new Date(state.value.year, state.value.month - 1, 1)
  CalendarUtils.render(state.value)
})

watch(() => state.value.holidayMonth, (newVal) => {
  const month = Number.parseInt(`${newVal}`, 10)

  if (month > 0) {
    state.value.month = month
    CalendarUtils.render(state.value)
  }
})

/**
 *  月份选择器变化
 */
function handleMonthPickerChange(value: Date): void {
  state.value.year = value.getFullYear()
  state.value.month = value.getMonth() + 1
}

/**
 *  跳转到上一个月
 */
function handlePreviousMonth(): void {
  CalendarUtils.toPrevMonth(state.value)
}

/**
 *  跳转到下一个月
 */
function handleNextMonth(): void {
  CalendarUtils.toNextMonth(state.value)
}

/**
 *  监听鼠标滚动
 */
onMounted(() => {
  if (elementRef.value && !settingStore.isMobile) {
    useEventListener(elementRef.value, 'wheel', (event: WheelEvent) => {
      if (event.deltaY < 0) {
        CalendarUtils.toPrevMonth(state.value)
      }
      else {
        CalendarUtils.toNextMonth(state.value)
      }
    })
  }
})

</script>

<template>
  <!-- 左边 -->
  <ElCard
    class="h-full card-wrapper"
    body-class="h-full flex  flex-col flex-grow"
  >

    <!-- 日期选择和按钮行  -->
    <div
      class="h-10 flex items-center"
    >
      <el-date-picker
        v-model="monthPicker"
        type="month"
        placeholder="请选择月份"
        class="!w-30"
        @change="handleMonthPickerChange"
      />

      <el-button
        class="m-l-3"
        @click="handlePreviousMonth"
      >
        <template
          #icon
        >
          <SvgIcon
            icon="arrow-left"
          />
        </template>
      </el-button>

      <el-button
        class="m-l-3"
        @click="handleNextMonth"
      >
        <template
          #icon
        >
          <SvgIcon
            icon="arrow-right"
          />
        </template>
      </el-button>

      <el-button
        v-if="state.isShowBackToday"
        class="m-l-3 !bg-primary !color-white"
        @click="handleToday"
      >
        <template
          #icon
        >
          <SvgIcon
            icon="blog-creativity-position"
          />
        </template>
      </el-button>
    </div>

    <!-- 日历的星期数组 (日、一、二、三、四、五、六) -->
    <div
      class="m-l-10 flex items-center justify-around"
    >
      <div
        v-for="weekTitle in state.monthData.weekTitleArray"
        :key="weekTitle"
        :class="[
          {
            'text-red': weekTitle === '六' || weekTitle === '日',
          },
        ]"
        class="m-x-1 text-center text-6"
      >
        {{ weekTitle }}
      </div>
    </div>

    <div
      ref="elementRef"
      class="relative flex flex-col flex-1"
    >
      <!-- 背景 -->
      <div
        class="absolute left-0 top-0 h-full w-full flex items-center justify-center text-80 text-[#999] opacity-10"
      >
        {{ state.month }}
      </div>

      <div
        v-for="(week) in state.monthData.weeks"
        :key="week.weekIndex"
        class="m-y-1 h-full w-full flex items-center justify-around"
      >
        <div
          v-if="!settingStore.isMobile"
          class="w-15 flex items-center justify-start text-5"
          :class="{
            'text-primary': week.isTodayWeek,
          }"
        >
          <span
            class="font-bold"
          >

            {{ week.weekIndex }}

          </span>

          <span>周</span>
        </div>

        <div
          v-for="(day, dayIndex) in week.dayArray"
          :key="dayIndex"
          :class="[
            day.isSelected ? 'border-4 border-primary' : '',
            day.isRestDay ? 'bg-[#FBDFDF]' : '',
            dayIndex >= 5 ? 'bg-[#FBDFDF]' : '',
            day.isToday ? '!bg-primary' : '',
          ]"
          class="relative m-x-1 h-full flex flex-col flex-1 cursor-pointer items-center justify-center border-4 border-[#D1D3D7] rounded-4 hover:border-primary"
          @click="handleSelectDay(day)"
        >
          <!-- 日期 -->
          <div
            class="date text-6 font-bold"
            :class="[
              day.isRestDay ? 'text-red' : '',
              dayIndex >= 5 ? 'text-red' : '',
              day.isToday ? '!text-white' : '',
            ]"
          >
            {{ day.day }}
          </div>

          <!-- 文字 -->
          <div
            class="desc text-center text-4 font-bold leading-4"
            :class="[
              day.isFestival ? 'text-violet' : '',
              day.isToday ? '!text-white' : '',
            ]"
          >
            {{ day.desc }}
          </div>

          <!-- 标记 -->
          <div
            v-if="day.isHoliday"
            :class="day.isRestDay ? 'bg-red' : 'bg-[#333]'"
            class="sign red absolute right-1 top-1 h-4 w-4 flex items-center justify-center rounded-1 text-3 text-white"
          >
            {{ day.isRestDay ? '休' : '班' }}
          </div>
        </div>
      </div>
    </div>
  </ElCard>
</template>

<style lang="less" scoped>

</style>
