<!------------------------------------    ------------------------------------------------->
<script lang="ts" setup>
import type { StateType } from './utils'

const state = defineModel<StateType>({
  required: true,
})
</script>

<template>
  <!-- 右边 -->

  <ElCard
    class="h-full card-wrapper"
    body-class="h-full max-h-full flex items-start flex-col "
  >

    <div
      class="w-full flex flex-col items-center justify-center"
    >
      <div
        class="m-x-auto h-20 w-20 flex items-center justify-center rounded-3 bg-primary text-12 color-white"
      >
        {{ state.selectedDay.day }}
      </div>

      <div
        class=""
      >
        <span>
          {{ state.selectedDay.ymd }}
        </span>

        <span
          class=""
        >
          周{{ state.selectedDay.dayOfWeek }}
        </span>
      </div>

      <div>
        <span>
          {{ state.selectedDay.lunarMonth }}月
        </span>

        <span>
          {{ state.selectedDay.lunarDay }}
        </span>
      </div>
    </div>

    <!-- 生肖 -->
    <div>
      <span>
        {{ state.selectedDay.yearGanZhi }}年
      </span>

      <span>
        {{ state.selectedDay.shengXiao }}
      </span>
    </div>

    <div>
      <span>
        {{ state.selectedDay.monthGanZhi }}月
      </span>

      <span>
        {{ state.selectedDay.dayGanZhi }}日
      </span>
    </div>

    <div>
      <span>
        本年第{{ state.selectedDay.weekOfYear }}周
      </span>

      <span
        class="m-l-3"
      >
        第{{ state.selectedDay.dayOfYear }}天
      </span>
    </div>

    <template
      v-if="!state.selectedDay.isToday"
    >
      <el-divider />

      <div
        class="flex"
      >
        距离
        {{
          state.selectedDay.festivalArray[0] ? state.selectedDay.festivalArray[0] : `${state.selectedDay.year}年${state.selectedDay.month}月${state.selectedDay.day}日`
        }}

        <span>
          {{ state.selectedDay.dayFromToday > 0 ? '还有' : '已经过去' }}
        </span>

        <!-- 如果为负数则取反 -->
        <span>
          {{ Math.abs(state.selectedDay.dayFromToday) }}
        </span>

        天
      </div>
    </template>

    <el-divider
      :margin="5"
    />

    <div
      class="flex items-center"
    >
      <div
        class="m-r-3 min-w-10 rounded-1 bg-red text-white"
      >
        生肖
      </div>

      <div>
        {{ state.selectedDay.shengXiao }}
      </div>
    </div>

    <el-divider
      :margin="5"
    />

    <div
      class="flex items-center"
    >
      <div
        class="m-r-3 min-w-10 rounded-1 bg-[#EB7DAC] text-white"
      >
        星座
      </div>

      <div>
        {{ state.selectedDay.xingZuo }}座
      </div>
    </div>

    <el-divider
      :margin="5"
    />

    <template
      v-if="state.selectedDay.festivalArray.length"
    >
      <div
        class="flex items-center"
      >
        <div
          class="m-r-3 min-w-10 rounded-1 bg-primary text-white"
        >
          节日
        </div>

        <div
          class="flex items-center"
        >
          <span
            v-for="festival in state.selectedDay.festivalArray"
            :key="festival"
            class="m-r-1"
          >
            {{ festival }}
          </span>
        </div>
      </div>

      <el-divider />
    </template>

    <div
      class="flex items-center"
    >
      <div
        class="m-r-3 w-10 rounded-1 bg-green text-white"
      >
        宜
      </div>

      <div
        class="grid grid-cols-5 max-h-40 w-full overflow-y-auto text-left"
      >
        <span
          v-for="(item, index) in state.selectedDay.yiArray"
          :key="index"
        >
          {{ item }}
        </span>
      </div>
    </div>

    <el-divider
      :margin="5"
    />

    <div
      class="flex items-center"
    >
      <div
        class="m-r-3 w-10 rounded-1 bg-red text-white"
      >
        忌
      </div>

      <div
        class="grid grid-cols-5 w-full text-left"
      >
        <span
          v-for="(item, index) in state.selectedDay.jiArray"
          :key="index"
        >
          {{ item }}
        </span>
      </div>
    </div>

    <el-divider
      :margin="5"
    />

    <div
      class="grid grid-cols-2 w-full gap-3"
    >
      <div
        class="m-r-10 flex"
      >
        <div
          class="bg-grey m-r-3 w-10 rounded-1 bg-gray text-white"
        >
          月相
        </div>

        <div>
          {{ state.selectedDay.yueXiang }}
        </div>
      </div>

      <div
        class="flex"
      >
        <div
          class="bg-grey m-r-3 w-10 rounded-1 bg-gray text-white"
        >
          物候
        </div>

        <div>
          {{ state.selectedDay.wuHou }}
        </div>
      </div>

      <div
        class="m-r-10 flex"
      >
        <div
          class="bg-grey m-r-3 w-10 rounded-1 bg-gray text-white"
        >
          福神
        </div>

        <div>
          {{ state.selectedDay.fuShen }}
        </div>
      </div>

      <div
        class="m-r-10 flex"
      >
        <div
          class="bg-grey m-r-3 w-10 rounded-1 bg-gray text-white"
        >
          财神
        </div>

        <div>
          {{ state.selectedDay.caiShen }}
        </div>
      </div>
    </div>
  </ElCard>
</template>
