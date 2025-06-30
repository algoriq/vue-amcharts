import type { ChartContext } from '../types';
import type { Ref } from 'vue';
import { onUnmounted, shallowRef, watch } from 'vue';
import { Root } from '@amcharts/amcharts5';
import * as am5 from '@amcharts/amcharts5'
import * as am5map from '@amcharts/amcharts5/map'
import * as am5hierarchy from '@amcharts/amcharts5/hierarchy'
import * as am5percent from '@amcharts/amcharts5/percent'
import * as am5radar from '@amcharts/amcharts5/radar'
import * as am5xy from '@amcharts/amcharts5/xy'
import am5themes_Animated from '@amcharts/amcharts5/themes/Animated'
import am5themes_Responsive from '@amcharts/amcharts5/themes/Responsive'
import {
  createDonutChart,
  createFunnelSeries,
  createPieChart,
  createPieSeries,
  createSliceChart,
  setPieLabelText,
} from '../helpers/pie-chart-helper'
import {
  createXYCategoryChart,
  createXYColumnSeries,
  createXYCursor,
  createXYDateChart,
  createXYHorizontalChart,
  createXYLineSeries,
} from '../helpers/xy-chart-helper';
import {
  createMapChart,
  createMapPointSeries,
  createMapPolygonSeries
} from "../helpers/map-chart-helper";
import {
  createRadarCategoryChart,
  createRadarCursor,
  createRadarDateChart,
  createRadarValueChart
} from "../helpers/radar-chart-helper";
import {
  createBullet,
  createButton,
  createCircle,
  createContainer,
  createDataProcessor,
  createGraphics,
  createLabel,
  createLegend,
  createPicture,
  createTooltip,
  hideAllSeries,
  showAllSeries,
  toggleSeries
} from "../helpers/shared-helpers";

export function useAmCharts5(context: Ref<ChartContext>) {
  const rootRef = shallowRef<Root>()
  const contextRef = context

  const initRoot = (root: Root) => {
    root.setThemes([
      am5themes_Animated.new(root),
      am5themes_Responsive.new(root),
    ])
    root.utc = true
    root.dateFormatter.setAll({
      dateFormat: 'MMMM, yyyy',
      dateFields: ['valueX'],
    })
  }

  const disposeRoot = () => {
    if (!rootRef.value)
      return

    rootRef.value.dispose()
    rootRef.value = undefined
  }

  const refreshRoot = () => {
    disposeRoot()
    if (contextRef.value) {
      rootRef.value = am5.Root.new(contextRef.value as HTMLElement)
      initRoot(rootRef.value)
    }
  }

  const clearChildrenOfRoot = () => {
    if (!rootRef.value)
      return

    rootRef.value.container.children.clear()
  }

  const setChartColors = (chart: am5.SerialChart | am5hierarchy.Treemap, colors: string[]) => {
    if (colors.length === 0)
      return
    const am5ColorSet = colors.map(color => am5.color(color))
    if (chart instanceof am5percent.PieChart) {
      chart.series.getIndex(0)?.get('colors')?.set('colors', am5ColorSet)
    }
    else {
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-expect-error
      chart.get('colors')?.set('colors', am5ColorSet)
    }
  }

  const getRoot = (): Root => {
    if (!rootRef.value) {
      throw new Error('Root chart element is not initialized')
    }
    return rootRef.value
  }

  watch(contextRef, (newVal, oldVal) => {
    if (newVal !== oldVal) {
      refreshRoot()
    }
  }, { immediate: true })

  onUnmounted(() => {
    disposeRoot()
  })

  return {
    root: rootRef,
    refreshRoot,
    disposeRoot,
    clearChildrenOfRoot,
    // Charts
    createXYDateChart: (
      settings?: am5xy.IXYChartSettings,
      dateAxisSettings?: Partial<am5xy.IDateAxisSettings<am5xy.AxisRenderer>>
    ) => {
      return createXYDateChart(getRoot(), settings, dateAxisSettings)
    },
    createXYCategoryChart: (settings?: am5xy.IXYChartSettings) => {
      return createXYCategoryChart(getRoot(), settings)
    },
    createXYHorizontalChart: (settings?: am5xy.IXYChartSettings) => {
      return createXYHorizontalChart(getRoot(), settings)
    },
    createPieChart: (settings?: am5percent.IPieChartSettings): am5percent.PieChart => {
      return createPieChart(getRoot(), settings)
    },
    createDonutChart: (settings?: am5percent.IPieChartSettings): am5percent.PieChart => {
      return createDonutChart(getRoot(), settings)
    },
    createSliceChart: (settings?: am5percent.ISlicedChartSettings): am5percent.SlicedChart => {
      return createSliceChart(getRoot(), settings)
    },
    createMapChart: (settings?: am5map.IMapChartSettings): am5map.MapChart => {
      return createMapChart(getRoot() as Root, settings)
    },
    createRadarDateChart: (settings?: am5radar.IRadarChartSettings) => {
      return createRadarDateChart(getRoot() as Root, settings)
    },
    createRadarCategoryChart: (settings?: am5radar.IRadarChartSettings) => {
      return createRadarCategoryChart(getRoot() as Root, settings)
    },
    createRadarValueChart: (settings?: am5radar.IRadarChartSettings) => {
      return createRadarValueChart(getRoot() as Root, settings)
    },
    // Series
    createXYLineSeries: (
      chart: am5xy.XYChart,
      settings?: Partial<am5xy.IXYSeriesSettings>
    ): am5xy.LineSeries => {
      return createXYLineSeries(getRoot(), chart, settings)
    },
    createXYColumnSeries: (
      chart: am5xy.XYChart,
      settings?: Partial<am5xy.IXYSeriesSettings>
    ): am5xy.ColumnSeries => {
      return createXYColumnSeries(getRoot(), chart, settings)
    },
    createPieSeries: (settings?: am5percent.IPieSeriesSettings): am5percent.PieSeries => {
      return createPieSeries(getRoot(), settings)
    },
    createFunnelSeries: (settings?: am5percent.IFunnelSeriesSettings): am5percent.FunnelSeries => {
      return createFunnelSeries(getRoot(), settings)
    },
    createMapPolygonSeries: (settings?: am5map.IMapPolygonSeriesSettings): am5map.MapPolygonSeries => {
      return createMapPolygonSeries(getRoot() as Root, settings)
    },
    createMapPointSeries: (settings?: am5map.IMapPointSeriesSettings): am5map.MapPointSeries => {
      return createMapPointSeries(getRoot() as Root, settings)
    },
    // Cursors
    createXYCursor: (settings?: am5xy.IXYCursorSettings): am5xy.XYCursor => {
      return createXYCursor(getRoot() as Root, settings)
    },
    createRadarCursor: (settings: am5radar.IRadarCursorSettings): am5radar.RadarCursor => {
      return createRadarCursor(getRoot(), settings)
    },
    // Elements
    createBullet: (settings: am5.IBulletSettings, template?: am5.Template<am5.Bullet>): am5.Bullet => {
      return createBullet(getRoot(), settings, template)
    },
    createButton: (settings: am5.IButtonSettings, template?: am5.Template<am5.Button>): am5.Button => {
      return createButton(getRoot(), settings, template)
    },
    createCircle: (settings: am5.ICircleSettings, template?: am5.Template<am5.Circle>): am5.Circle => {
      return createCircle(getRoot(), settings, template)
    },
    createContainer: (settings: am5.IContainerSettings, template?: am5.Template<am5.Container>): am5.Container => {
      return createContainer(getRoot(), settings, template)
    },
    createLabel: (settings: am5.ILabelSettings, template?: am5.Template<am5.Label>): am5.Label => {
      return createLabel(getRoot(), settings, template)
    },
    createLegend: (settings?: am5.ILegendSettings, template?: am5.Template<am5.Legend>): am5.Legend => {
      return createLegend(getRoot(), settings, template)
    },
    createTooltip: (settings?: am5.ITooltipSettings, template?: am5.Template<am5.Tooltip>): am5.Tooltip => {
      return createTooltip(getRoot(), settings, template)
    },
    createGraphics: (settings?: am5.IGraphicsSettings, template?: am5.Template<am5.Graphics>): am5.Graphics => {
      return createGraphics(getRoot(), settings, template)
    },
    createPicture: (settings?: am5.IPictureSettings, template?: am5.Template<am5.Picture>): am5.Picture => {
      return createPicture(getRoot(), settings, template)
    },
    createDataProcessor: (settings: am5.IDataProcessorSettings): am5.DataProcessor => {
      return createDataProcessor(getRoot(), settings)
    },
    createLinearGradient: (settings: am5.ILinearGradientSettings): am5.LinearGradient => {
      return am5.LinearGradient.new(getRoot(), settings)
    },
    //
    verticalScrollbarSetting: (settings: am5.IScrollbarSettings): am5.Scrollbar => am5.Scrollbar.new(getRoot(), settings),
    setPieLabelText,
    setChartColors,
    toggleSeries,
    hideAllSeries,
    showAllSeries,
    // Utils
    percent: am5.percent,
    color: am5.color,
  }
}