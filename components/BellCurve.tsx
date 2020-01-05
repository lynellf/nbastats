import React from 'react'
import { Scatter } from 'react-chartjs-2'
import { ChartData, ChartOptions } from '../chartjstypes'

type BellCurveProps = {
  datasets: Chart.ChartDataSets[]
  options: ChartOptions
}

export default function BellCurve({
  datasets,
  options
}: BellCurveProps) {
  const belowAverageLine = [
    { x: -3, y: 0.00135 },
    { x: -2, y: 0.02275 },
    { x: -1, y: 0.15866 }
  ]
  const averageLine = [
    { x: -1, y: 0.15866 },
    { x: 0, y: 0.5 },
    { x: 1, y: 0.15866 }
  ]
  const aboveAverageLine = [
    { x: 1, y: 0.15866 },
    { x: 2, y: 0.02275 },
    { x: 3, y: 0.00135 }
  ]
  const data: ChartData = {
    datasets: [
      {
        type: 'line',
        data: belowAverageLine,
        fill: true,
        backgroundColor: 'rgba(246, 36, 89, 0.3)',
        borderColor: 'rgba(0, 0, 0, 0)',
        pointBackgroundColor: 'rgba(0, 0, 0, 0)',
        pointBorderColor: 'rgba(0, 0, 0, 0)',
        pointHoverRadius: 0
      },
      {
        type: 'line',
        data: averageLine,
        fill: true,
        backgroundColor: 'rgba(244, 208, 63, 0.3)',
        borderColor: 'rgba(0, 0, 0, 0)',
        pointBackgroundColor: 'rgba(0, 0, 0, 0)',
        pointBorderColor: 'rgba(0, 0, 0, 0)',
        pointHoverRadius: 0,
        showLine: true
      },
      {
        type: 'line',
        data: aboveAverageLine,
        fill: true,
        backgroundColor: 'rgba(35, 203, 167, 0.3)',
        borderColor: 'rgba(0, 0, 0, 0)',
        pointBackgroundColor: 'rgba(0, 0, 0, 0)',
        pointBorderColor: 'rgba(0, 0, 0, 0)',
        pointHoverRadius: 0
      },
      ...datasets
    ]
  }
  const chartOptions: ChartOptions = {
    ...options,
    legend: {
      display: false
    },
    scales: {
      yAxes: [{ display: false }]
    }
  }
  return <Scatter data={data} options={chartOptions} />
}