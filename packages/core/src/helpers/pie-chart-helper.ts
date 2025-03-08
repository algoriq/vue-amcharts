import type { Root } from '@amcharts/amcharts5'
import type { IPieChartSettings } from '@amcharts/amcharts5/.internal/charts/pie/PieChart'
import type { IFunnelSeriesSettings, IPieSeriesSettings, ISlicedChartSettings } from '@amcharts/amcharts5/percent'
import * as am5 from '@amcharts/amcharts5'
import * as am5percent from '@amcharts/amcharts5/percent'

function baseChart(root: Root, settings?: IPieChartSettings): am5percent.PieChart {
  return am5percent.PieChart.new(root, {
    ...settings,
  })
}

export function createPieChart(root: Root, settings?: IPieChartSettings): am5percent.PieChart {
  return root.container.children.push(baseChart(root, {
    layout: root.verticalLayout,
    ...settings,
  }))
}

export function createDonutChart(root: Root, settings?: IPieChartSettings): am5percent.PieChart {
  return root.container.children.push(baseChart(root, {
    layout: root.verticalLayout,
    innerRadius: am5.percent(85),
    ...settings,
  }))
}

export function createSliceChart(
  root: Root,
  settings?: ISlicedChartSettings,
): am5percent.SlicedChart {
  return root.container.children.push(am5percent.SlicedChart.new(root, {
    layout: root.horizontalLayout,
    ...settings,
  }))
}

export function createPieSeries(root: Root, settings?: IPieSeriesSettings): am5percent.PieSeries {
  return am5percent.PieSeries.new(root, {
    ...settings,
  })
}

export function createFunnelSeries(root: Root, settings?: IFunnelSeriesSettings): am5percent.FunnelSeries {
  return am5percent.FunnelSeries.new(root, {
    orientation: 'vertical',
    ...settings,
  })
}