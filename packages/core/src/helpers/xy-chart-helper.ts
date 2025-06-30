import { Root } from '@amcharts/amcharts5'
import type { IXYAxis } from '@amcharts/amcharts5/.internal/charts/xy/series/XYSeries'
import type {
  IDateAxisSettings,
  IXYChartSettings,
  IXYCursorSettings,
  IXYSeriesSettings,
} from '@amcharts/amcharts5/xy'
import * as am5 from '@amcharts/amcharts5'
import * as am5xy from '@amcharts/amcharts5/xy'
import { DEFAULT_CATEGORY_FIELD_NAME, DEFAULT_DATE_FIELD_NAME } from '../constants';

function baseChart(root: Root, settings?: IXYChartSettings): am5xy.XYChart {
  const cursor = am5xy.XYCursor.new(root, {})

  cursor.lineX.setAll({
    visible: false,
    strokeDasharray: undefined,
    stroke: am5.color('#9e9e9e'),
  })

  cursor.lineY.setAll({
    visible: false,
  })

  return root.container.children.push(am5xy.XYChart.new(root, {
    panX: false,
    panY: false,
    layout: root.verticalLayout,
    maxTooltipDistance: -1,
    cursor,
    pinchZoomX: false,
    paddingLeft: 0,
    paddingRight: 20,
    paddingBottom: 0,
    ...settings,
  }))
}

function baseAxisRendererX(
  root: Root,
  settings: am5xy.IAxisRendererXSettings,
  template?: am5.Template<am5xy.AxisRendererX>,
): am5xy.AxisRendererX {
  return am5xy.AxisRendererX.new(root, settings, template)
}

function baseAxisRendererY(
  root: Root,
  settings: am5xy.IAxisRendererYSettings,
  template?: am5.Template<am5xy.AxisRendererY>,
): am5xy.AxisRendererY {
  return am5xy.AxisRendererY.new(root, settings, template)
}

function baseValueAxis(
  root: Root,
  settings: am5xy.IValueAxisSettings<am5xy.AxisRenderer>,
  template?: am5.Template<am5xy.ValueAxis<am5xy.AxisRenderer>>,
): am5xy.ValueAxis<am5xy.AxisRenderer> {
  return am5xy.ValueAxis.new(root, settings, template)
}

function baseCategoryAxis(
  root: Root,
  settings: am5xy.ICategoryAxisSettings<am5xy.AxisRenderer>,
  template?: am5.Template<am5xy.CategoryAxis<am5xy.AxisRenderer>>,
): am5xy.CategoryAxis<am5xy.AxisRenderer> {
  return am5xy.CategoryAxis.new(root, settings, template)
}

// Charts

export function createXYDateChart(
  root: Root,
  settings?: IXYChartSettings,
  dateAxisSettings?: Partial<IDateAxisSettings<am5xy.AxisRenderer>>,
): {
  chart: am5xy.XYChart
  xAxis: am5xy.DateAxis<am5xy.AxisRenderer>
  yAxis: am5xy.ValueAxis<am5xy.AxisRenderer>
} {
  const chart = baseChart(root, settings)

  const xRenderer = baseAxisRendererX(root, {
    strokeOpacity: 1,
    strokeWidth: 1,
    stroke: am5.color('#eeeeee'),
    minGridDistance: 15,
  })

  xRenderer.grid.template.setAll({
    strokeOpacity: 0,
    stroke: am5.color('#eeeeee'),
  })

  xRenderer.labels.template.setAll({
    fontSize: 12,
    fill: am5.color('#757575'),
    paddingTop: 6,
  })

  const xAxis = chart.xAxes.push(am5xy.DateAxis.new(root, {
    extraMin: 0.01,
    extraMax: 0.01,
    baseInterval: {
      timeUnit: 'month',
      count: 1,
    },
    renderer: xRenderer,
    dateFormats: {
      day: 'd',
      month: 'MMM',
      year: 'yyyy',
    },
    periodChangeDateFormats: {
      day: 'MMM d',
      month: 'MMM',
    },
    ...dateAxisSettings,
  }))

  const yRenderer = baseAxisRendererY(root, {
    strokeOpacity: 0,
    minGridDistance: 20,
  })

  yRenderer.grid.template.setAll({
    strokeOpacity: 1,
    strokeWidth: 1,
    stroke: am5.color('#eeeeee'),
  })

  yRenderer.labels.template.setAll({
    fontSize: 12,
    fill: am5.color('#757575'),
    paddingRight: 8,
  })

  yRenderer.labels.template.adapters.add('text', (text) => {
    if (text) {
      const convertedText = text.replace(/,/g, '')
      const num = Number(convertedText)
      if (Number.isNaN(num))
        return text

      // eslint-disable-next-line no-constant-binary-expression
      return String(num) ?? ''
    }

    return text ?? ''
  })

  const yAxis = chart.yAxes.push(
    baseValueAxis(root, {
      renderer: yRenderer,
      min: 0,
    }),
  )

  return { chart, xAxis, yAxis }
}

export function createXYCategoryChart(
  root: Root,
  settings?: IXYChartSettings,
): {
  chart: am5xy.XYChart
  xAxis: am5xy.CategoryAxis<am5xy.AxisRenderer>
  yAxis: am5xy.ValueAxis<am5xy.AxisRenderer>
} {
  const chart = baseChart(root, settings)

  const xRenderer = baseAxisRendererX(root, {
    strokeOpacity: 1,
    strokeWidth: 1,
    stroke: am5.color('#e0e0e0'),
  })
  xRenderer.grid.template.setAll({
    strokeOpacity: 0,
  })
  const xAxis = chart.xAxes.push(
    baseCategoryAxis(root, {
      categoryField: DEFAULT_CATEGORY_FIELD_NAME,
      renderer: xRenderer,
    }),
  )

  const yRenderer = baseAxisRendererY(root, {
    strokeOpacity: 0,
  })
  yRenderer.grid.template.setAll({
    strokeOpacity: 1,
    strokeWidth: 1,
    stroke: am5.color('#eeeeee'),
  })
  const yAxis = chart.yAxes.push(
    baseValueAxis(root, {
      renderer: yRenderer,
    }),
  )
  return { chart, xAxis, yAxis }
}

export function createXYHorizontalChart(root: Root, settings?: IXYChartSettings): {
  chart: am5xy.XYChart
  xAxis: am5xy.ValueAxis<am5xy.AxisRenderer>
  yAxis: am5xy.CategoryAxis<am5xy.AxisRenderer>
} {
  const chart = baseChart(root, settings)

  const xRenderer = baseAxisRendererX(root, {})

  xRenderer.grid.template.setAll({
    strokeOpacity: 1,
    strokeWidth: 1,
    stroke: am5.color('#eeeeee'),
  })
  xRenderer.labels.template.setAll({
    fontSize: 12,
    fill: am5.color('#757575'),
    paddingTop: 6,
  })
  const xAxis = chart.xAxes.push(
    baseValueAxis(root, {
      min: 0,
      renderer: xRenderer,
    }),
  )

  const yRenderer = baseAxisRendererY(root, {
    strokeOpacity: 1,
    strokeWidth: 1,
    stroke: am5.color('#e0e0e0'),
    minGridDistance: 0,
  })
  yRenderer.grid.template.setAll({
    strokeOpacity: 1,
    strokeWidth: 1,
    stroke: am5.color('#eeeeee'),
  })
  yRenderer.labels.template.setAll({
    fontSize: 12,
    fill: am5.color('#757575'),
  })
  const yAxis = chart.yAxes.push(
    baseCategoryAxis(root, {
      categoryField: DEFAULT_CATEGORY_FIELD_NAME,
      renderer: yRenderer,
    }),
  )
  return { chart, xAxis, yAxis }
}

// Series
export function createXYLineSeries(
  root: Root,
  chart: am5xy.XYChart,
  settings?: Partial<IXYSeriesSettings>,
): am5xy.LineSeries {
  const series = am5xy.LineSeries.new(root, {
    xAxis: chart.xAxes.getIndex(0) as IXYAxis,
    yAxis: chart.yAxes.getIndex(0) as IXYAxis,
    valueXField: DEFAULT_DATE_FIELD_NAME,
    maskBullets: false,
    ...settings,
  })
  series.strokes.template.setAll({
    strokeWidth: 2,
  })
  series.bullets.push(() => am5.Bullet.new(root, {
    sprite: am5.Circle.new(root, {
      radius: 3,
      fill: series.get('fill'),
    }),
  }))
  return series
}

export function createXYColumnSeries(
  root: Root,
  chart: am5xy.XYChart,
  settings?: Partial<IXYSeriesSettings>,
): am5xy.ColumnSeries {
  const series = am5xy.ColumnSeries.new(root, {
    xAxis: chart.xAxes.getIndex(0) as IXYAxis,
    yAxis: chart.yAxes.getIndex(0) as IXYAxis,
    valueXField: DEFAULT_DATE_FIELD_NAME,
    maskBullets: false,
    ...settings,
  })
  series.columns.template.setAll({
    width: am5.percent(45),
    height: am5.percent(45),
  })
  return series
}

export function createXYCursor(root: Root, settings?: Partial<IXYCursorSettings>): am5xy.XYCursor {
  return am5xy.XYCursor.new(root, {
    ...settings,
  })
}
