import {
  BarChart,
  GaugeChart,
  LineChart,
  MapChart,
  PictorialBarChart,
  PieChart,
} from 'echarts/charts'

import {
  AriaComponent,
  GridComponent,
  LegendComponent,
  LegendPlainComponent,
  ParallelComponent,
  PolarComponent,
  TitleComponent,
  TooltipComponent,
} from 'echarts/components'

import * as echarts from 'echarts/core'

import { SVGRenderer } from 'echarts/renderers'

echarts.use([
  TitleComponent,
  TooltipComponent,
  GridComponent,
  PolarComponent,
  AriaComponent,
  ParallelComponent,
  LegendComponent,
  LegendPlainComponent,
  BarChart,
  LineChart,
  PieChart,
  MapChart,
  SVGRenderer,
  PictorialBarChart,
  GaugeChart,
])

export default echarts
