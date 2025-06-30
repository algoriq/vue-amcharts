import type { Root } from '@amcharts/amcharts5'
import type { IMapChartSettings, IMapPolygonSeriesSettings } from '@amcharts/amcharts5/map'
import * as am5 from '@amcharts/amcharts5'
import am5geodata_worldLow from '@amcharts/amcharts5-geodata/worldLow'
import * as am5map from '@amcharts/amcharts5/map'

export function createMapChart(root: Root, settings?: IMapChartSettings): am5map.MapChart {
  return root.container.children.push(am5map.MapChart.new(root, {
    projection: am5map.geoMercator(),
    panX: 'none',
    panY: 'none',
    maxZoomLevel: 1,
    ...settings,
  }))
}

export function createMapPolygonSeries(root: Root, settings?: IMapPolygonSeriesSettings): am5map.MapPolygonSeries {
  return am5map.MapPolygonSeries.new(root, {
    geoJSON: am5geodata_worldLow,
    exclude: ['AQ'],
    fill: am5.color('#eeeeee'),
    ...settings,
  })
}

export function createMapPointSeries(root: Root, settings?: am5map.IMapPointSeriesSettings): am5map.MapPointSeries {
  return am5map.MapPointSeries.new(root, {
    latitudeField: 'latitude',
    longitudeField: 'longitude',
    ...settings,
  })
}
