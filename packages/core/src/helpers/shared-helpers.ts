import type {
  IBulletSettings,
  ICircleSettings,
  IContainerSettings,
} from '@amcharts/amcharts5'
import { Circle, Container, Label, Root } from '@amcharts/amcharts5'
import * as am5 from '@amcharts/amcharts5'
import * as am5percent from '@amcharts/amcharts5/percent'
import { DEFAULT_DATE_FIELD_NAME, DEFAULT_DATE_FORMAT } from '../constants'

export function createDataProcessor(
  root: Root,
  settings?: am5.IDataProcessorSettings,
): am5.DataProcessor {
  return am5.DataProcessor.new(root, {
    dateFormat: DEFAULT_DATE_FORMAT,
    dateFields: [DEFAULT_DATE_FIELD_NAME],
    ...settings,
  })
}

export function createBullet(
  root: Root,
  settings: IBulletSettings,
  template?: am5.Template<am5.Bullet>,
): am5.Bullet {
  return am5.Bullet.new(root, {
    ...settings,
  }, template)
}

export function createButton(
  root: Root,
  settings?: am5.IButtonSettings,
  template?: am5.Template<am5.Button>,
): am5.Button {
  return am5.Button.new(root, {
    ...settings,
  }, template)
}

export function createCircle(
  root: Root,
  settings?: ICircleSettings,
  template?: am5.Template<Circle>,
): am5.Circle {
  return am5.Circle.new(root, {
    ...settings,
  }, template)
}

export function createContainer(
  root: Root,
  settings?: IContainerSettings,
  template?: am5.Template<Container>,
): am5.Container {
  return am5.Container.new(root, {
    ...settings,
  }, template)
}

export function createLabel(
  root: Root,
  settings?: am5.ILabelSettings,
  template?: am5.Template<Label>,
): am5.Label {
  return am5.Label.new(root, {
    ...settings,
  }, template)
}

export function createLegend(
  root: Root,
  settings?: am5.ILegendSettings,
  template?: am5.Template<am5.Legend>,
): am5.Legend {
  const legend = am5.Legend.new(root, {
    layout: root.horizontalLayout,
    paddingTop: 4,
    useDefaultMarker: true,
    x: am5.percent(0),
    ...settings,
  }, template)
  legend.labels.template.setAll({
    fontSize: 12,
    fill: am5.color('#616161'),
  })
  legend.valueLabels.template.setAll({
    width: 0,
  })
  legend.markers.template.setAll({
    width: 10,
    height: 10,
  })
  legend.markerRectangles.template.setAll({
    cornerRadiusTL: 10,
    cornerRadiusTR: 10,
    cornerRadiusBL: 10,
    cornerRadiusBR: 10,
  })
  return legend
}

export function createTooltip(
  root: Root,
  settings?: am5.ITooltipSettings,
  template?: am5.Template<am5.Tooltip>,
): am5.Tooltip {
  return am5.Tooltip.new(root, {
    ...settings,
  }, template)
}

export function createGraphics(
  root: Root,
  settings?: am5.IGraphicsSettings,
  template?: am5.Template<am5.Graphics>,
): am5.Graphics {
  return am5.Graphics.new(root, {
    ...settings,
  }, template)
}

export function createPicture(
  root: Root,
  settings?: am5.IPictureSettings,
  template?: am5.Template<am5.Picture>,
): am5.Picture {
  return am5.Picture.new(root, {
    ...settings,
  }, template)
}

export function toggleSeries(chart: am5.SerialChart, index: number) {
  if (chart instanceof am5percent.PieChart) {
    const series = chart.series?.getIndex(0)
    if (!series)
      return

    const slice = series.slices.values[index]
    if (!slice || !slice.dataItem)
      return

    if (slice.isHiding() || slice.isHidden()) {
      slice.dataItem.show()
    }
    else {
      slice.dataItem.hide()
    }
  }
  else {
    const series = chart.series?.getIndex(index)
    if (!series)
      return
    if (series.isHiding() || series.isHidden()) {
      series.show()
    }
    else {
      series.hide()
    }
  }
}

export function hideAllSeries(chart: am5.SerialChart) {
  if (chart instanceof am5percent.PieChart) {
    const series = chart.series.getIndex(0)
    if (!series)
      return
    const slices = series.slices.values
    slices.forEach((slice) => {
      if (slice.dataItem)
        slice.dataItem.hide()
    })
  }
  else {
    const series = chart.series.values
    series.forEach((d) => {
      d.hide()
    })
  }
}

export function showAllSeries(chart: am5.SerialChart) {
  if (chart instanceof am5percent.PieChart) {
    const series = chart.series.getIndex(0)
    if (!series)
      return
    const slices = series.slices.values
    slices.forEach((slice) => {
      if (slice.dataItem)
        slice.dataItem.show()
    })
  }
  else {
    const series = chart.series.values
    series.forEach((d) => {
      d.show()
    })
  }
}
