import type { ChartContext } from "../types";
import {onUnmounted, Ref, shallowRef, watch} from "vue";
import { Root } from "@amcharts/amcharts5";
import * as am5 from '@amcharts/amcharts5'
import * as am5hierarchy from '@amcharts/amcharts5/hierarchy'
import * as am5percent from '@amcharts/amcharts5/percent'
import am5themes_Animated from '@amcharts/amcharts5/themes/Animated'
import am5themes_Responsive from '@amcharts/amcharts5/themes/Responsive'

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
    setChartColors,
    percent: am5.percent,
    color: am5.color,
  }
}