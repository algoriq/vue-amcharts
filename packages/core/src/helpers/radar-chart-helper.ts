import { Root } from '@amcharts/amcharts5'
import type * as am5 from '@amcharts/amcharts5'
import type { IXYAxis } from '@amcharts/amcharts5/.internal/charts/xy/series/XYSeries'
import type {
  IRadarChartSettings,
  IRadarColumnSeriesSettings,
  IRadarCursorSettings,
  IRadarLineSeriesSettings,
} from '@amcharts/amcharts5/radar'
import * as am5radar from '@amcharts/amcharts5/radar'
import * as am5xy from '@amcharts/amcharts5/xy'
import { DEFAULT_CATEGORY_FIELD_NAME } from '../constants'

function baseChart(root: Root, settings?: IRadarChartSettings): am5radar.RadarChart {
  return root.container.children.push(am5radar.RadarChart.new(root, {
    ...settings,
  }))
}

function baseAxisRendererCircular(
  root: Root,
  settings: am5radar.IAxisRendererCircularSettings,
  template?: am5.Template<am5radar.AxisRendererCircular>,
): am5radar.AxisRendererCircular {
  return am5radar.AxisRendererCircular.new(root, settings, template)
}

function baseAxisRendererRadial(
  root: Root,
  settings: am5radar.IAxisRendererRadialSettings,
  template?: am5.Template<am5radar.AxisRendererRadial>,
): am5radar.AxisRendererRadial {
  return am5radar.AxisRendererRadial.new(root, settings, template)
}

function baseValueAxis(
  root: Root,
  settings: am5xy.IValueAxisSettings<any>,
  template?: am5.Template<am5xy.ValueAxis<am5xy.AxisRenderer>>,
): am5xy.ValueAxis<am5xy.AxisRenderer> {
  return am5xy.ValueAxis.new(root, settings, template)
}

function baseCategoryAxis(
  root: Root,
  settings: am5xy.ICategoryAxisSettings<any>,
  template?: am5.Template<am5xy.CategoryAxis<am5xy.AxisRenderer>>,
): am5xy.CategoryAxis<am5xy.AxisRenderer> {
  return am5xy.CategoryAxis.new(root, settings, template)
}

function baseCursor(root: Root, settings: IRadarCursorSettings): am5radar.RadarCursor {
  return am5radar.RadarCursor.new(root, settings)
}

// Create chart
// https://www.amcharts.com/docs/v5/charts/radar-chart/

export interface RadarDateChartReturn {
  chart: am5radar.RadarChart
  xAxis: am5xy.DateAxis<am5xy.AxisRenderer>
  yAxis: am5xy.ValueAxis<am5xy.AxisRenderer>
}

export function createRadarDateChart(root: Root, settings?: IRadarChartSettings): RadarDateChartReturn {
  const chart = baseChart(root, settings)

  const xRenderer = baseAxisRendererCircular(root, {})
  const xAxis = chart.xAxes.push(am5xy.DateAxis.new(root, {
    renderer: xRenderer,
    baseInterval: {
      timeUnit: 'month',
      count: 1,
    },
  }))

  const yRenderer = baseAxisRendererRadial(root, {})
  const yAxis = chart.yAxes.push(
    baseValueAxis(root, {
      renderer: yRenderer,
    }),
  )

  return { chart, xAxis, yAxis }
}

export interface RadarCategoryChartReturn {
  chart: am5radar.RadarChart
  xAxis: am5xy.CategoryAxis<am5xy.AxisRenderer>
  yAxis: am5xy.ValueAxis<am5xy.AxisRenderer>
}

export function createRadarCategoryChart(root: Root, settings?: IRadarChartSettings): RadarCategoryChartReturn {
  const chart = baseChart(root, settings)

  const xRenderer = baseAxisRendererCircular(root, {})
  const xAxis = chart.xAxes.push(
    baseCategoryAxis(root, {
      categoryField: DEFAULT_CATEGORY_FIELD_NAME,
      renderer: xRenderer,
    }),
  )

  const yRenderer = baseAxisRendererRadial(root, {})
  const yAxis = chart.yAxes.push(
    baseValueAxis(root, {
      renderer: yRenderer,
    }),
  )

  return { chart, xAxis, yAxis }
}

export interface RadarValueChartReturn {
  chart: am5radar.RadarChart
  xAxis: am5xy.ValueAxis<am5xy.AxisRenderer>
  yAxis: am5xy.ValueAxis<am5xy.AxisRenderer>
}

export function createRadarValueChart(root: Root, settings?: IRadarChartSettings): RadarValueChartReturn {
  const chart = baseChart(root, settings)

  const xRenderer = baseAxisRendererCircular(root, {})
  const xAxis = chart.xAxes.push(
    baseValueAxis(root, {
      renderer: xRenderer,
    }),
  )

  const yRenderer = baseAxisRendererRadial(root, {})
  const yAxis = chart.yAxes.push(
    baseValueAxis(root, {
      renderer: yRenderer,
    }),
  )

  return { chart, xAxis, yAxis }
}

// Create series
// https://www.amcharts.com/docs/v5/charts/radar-chart/#Adding_series
export function createRadarLineSeries(
  root: Root,
  chart: am5radar.RadarChart,
  settings?: Partial<IRadarLineSeriesSettings>,
): am5radar.RadarLineSeries {
  return am5radar.RadarLineSeries.new(root, {
    xAxis: chart.xAxes.getIndex(0) as IXYAxis,
    yAxis: chart.yAxes.getIndex(0) as IXYAxis,
    ...settings,
  })
}

export function createRadarColumnSeries(
  root: Root,
  chart: am5radar.RadarChart,
  settings?: Partial<IRadarColumnSeriesSettings>,
): am5radar.RadarColumnSeries {
  return am5radar.RadarColumnSeries.new(root, {
    xAxis: chart.xAxes.getIndex(0) as IXYAxis,
    yAxis: chart.yAxes.getIndex(0) as IXYAxis,
    ...settings,
  })
}

// Add cursor
// https://www.amcharts.com/docs/v5/charts/radar-chart/#Cursor
export function createRadarCursor(root: Root, settings: IRadarCursorSettings): am5radar.RadarCursor {
  return baseCursor(root, settings)
}
