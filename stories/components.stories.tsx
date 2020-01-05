import React from 'react'
import LoadingRing from '../components/LoadingRing'
import {
  playerData,
  leagueWinShares,
  winShareZScores,
  salaryZScores
} from '../data/playerData'
import { zTable, getCoordinates } from '../math/stats'
import { Scatter, Line } from 'react-chartjs-2'
import { ChartOptions, ChartData } from '../chartjstypes'
import BellCurve from '../components/BellCurve'
// import { Chart } from 'react-google-charts'

export default {
  title: 'Atoms'
}

export const loadingRing = () => <LoadingRing color="" />

type ScatterPlotProps = {
  data: ChartData
  options?: ChartOptions
}
function ScatterPlot({ data, options }: ScatterPlotProps) {
  return <Scatter data={data} options={options} />
}



export const standardNormalCurveLine = () => {
  const query = ''
  const filteredWinShares = winShareZScores.filter(
    player => player.name.toLowerCase() !== query
  )
  const filteredSalaries = salaryZScores.filter(
    player => player.name.toLowerCase() !== query
  )
  console.log({ filteredWinShares, filteredSalaries })
  const winShareColors = filteredWinShares.map(player => player.bgColor)
  const salaryColors = filteredSalaries.map(player => player.bgColor)
  const sortedWinSharesX = filteredWinShares
    .map(player => getCoordinates(player.zScore).x)
    .sort()
  const sortedWinSharesY = filteredWinShares
    .map(player => getCoordinates(player.zScore).y)
    .sort()
  const fullLine = [
    { x: -3, y: 0.00135 },
    { x: -2, y: 0.02275 },
    { x: -1, y: 0.15866 },
    { x: 0, y: 0.5 },
    { x: 1, y: 0.15866 },
    { x: 2, y: 0.02275 },
    { x: 3, y: 0.00135 }
  ]
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
      {
        data: filteredWinShares.map(player => {
          const { zScore } = player
          const coordinates = getCoordinates(zScore)
          const hasCoordinates = coordinates !== undefined
          if (!hasCoordinates) {
            return undefined
          }
          const { x, y } = coordinates
          return { x, y }
          // return y
        }),
        // data: [{ x: -3, y: 0.03 }, { x: -1, y: 0.5 }],
        fill: true,
        borderColor: 'black',
        // pointBackgroundColor: winShareColors,
        label: 'Win Shares Per 48'
      }
    ]
  }
  const options: ChartOptions = {
    legend: {
      display: false
    },
    scales: {
      yAxes: [{ display: false }]
    }
  }
  return <Scatter data={data} options={options} />
}

export const standardNormalCurveScatter = () => {
  const query = ''
  const filteredWinShares = winShareZScores.filter(
    player => player.name.toLowerCase() !== query
  )
  const filteredSalaries = salaryZScores.filter(
    player => player.name.toLowerCase() !== query
  )
  console.log({ filteredWinShares, filteredSalaries })
  const winShareColors = filteredWinShares.map(player => player.bgColor)
  const salaryColors = filteredSalaries.map(player => player.bgColor)
  const data: ChartData = {
    // labels: zTable.map(index => `${index.x}`),
    // labels: ['-3', '-2', '-1', '0', '1', '2', '3'],
    datasets: [
      {
        // type: 'scatter',
        data: filteredWinShares.map(player => {
          const coordinates = getCoordinates(player.zScore)
          const hasCoordinates = coordinates !== undefined
          if (!hasCoordinates) {
            return undefined
          }
          const { x, y } = coordinates
          return { x, y, fill: 1 }
        }),
        fill: true,
        borderColor: 'black',
        pointBackgroundColor: winShareColors,
        label: 'Win Shares Per 48'
      },
      // {
      //   data: filteredSalaries.map(player => {
      //     const coordinates = getCoordinates(player.zScore)
      //     const hasCoordinates = coordinates !== undefined
      //     if (!hasCoordinates) {
      //       return undefined
      //     }
      //     const { x, y } = coordinates
      //     return { x, y }
      //   }),
      //   fill: true,
      //   borderColor: 'green',
      //   pointBackgroundColor: salaryColors,
      //   label: 'Player Salary'
      // },
      {
        // type: 'line',
        // data: filteredWinShares.map(player => {
        //   const { zScore } = player
        //   const { y } = getCoordinates(zScore)
        //   return y
        // }),
        data: zTable.map(index => index.y),
        // fill: true,
        // borderColor: 'black',
        label: 'Win Shares Normal Curve'
      }
    ]
  }
  // const options: ChartOptions = {
  //   responsive: true,
  //   title: {
  //     display: true,
  //     text: 'Player Win Shares Per 48 Minutes'
  //   },
  //   tooltips: {
  //     callbacks: {
  //       label: tooltipItem => {
  //         const { index, datasetIndex } = tooltipItem
  //         const isWinshares = datasetIndex === 0
  //         const isSalaries = datasetIndex === 1
  //         if (isWinshares) {
  //           const player = filteredWinShares[index]
  //           const { name, team, winSharesPer48 } = player
  //           const roundedWS = winSharesPer48.toFixed(2)
  //           return `${name} - ${team}: ${roundedWS}`
  //         }

  //         if (isSalaries) {
  //           const player = filteredSalaries[index]
  //           const { name, team, playerSalary } = player
  //           const salary = `$${(playerSalary / 1000000).toFixed(0)} M`
  //           return `${name} - ${team}: ${salary}`
  //         }
  //       }
  //     }
  //   }
  // }
  const options = {}
  return <Scatter data={data} options={options} />
}

export const scatterPlot = () => {
  const colors = playerData.map(player => player.bgColor)
  const data: ChartData = {
    datasets: [
      {
        data: playerData.map(player => ({
          x: player.playerSalary,
          y: player.winSharesPer48
        })),
        borderColor: '#000',
        pointBackgroundColor: colors,
        fill: true,
        lineTension: 0,
        pointRadius: 8
      }
    ]
  }
  const options: ChartOptions = {
    responsive: true,
    title: {
      display: true,
      text: 'Player Salary x Win Shares Per 48 minutes'
    },
    legend: {
      display: false
    },
    scales: {
      yAxes: [
        {
          scaleLabel: {
            display: true,
            labelString: 'Win Shares Per 48 minutes'
          },
          ticks: {
            min: leagueWinShares.winSharesPer48.mean.toFixed(2),
            max: 0.3,
            callback: (value: number) => {
              if (value > 50000) {
                return `$${(value / 100000).toFixed(0)}M`
              } else {
                return value
              }
            }
          }
        }
      ],
      xAxes: [
        {
          scaleLabel: {
            display: true,
            labelString: 'Salary (Millions USD)'
          },
          ticks: {
            callback: (value: number) => {
              if (value > 50000) {
                return `$${(value / 1000000).toFixed(0)} M`
              } else {
                return value
              }
            }
          }
        }
      ]
    },
    tooltips: {
      callbacks: {
        label: function(tooltipItem) {
          const { index, xLabel, yLabel } = tooltipItem
          const xValue = Number(xLabel)
          const yValue = Number(yLabel)
          const player = playerData[index]
          const { name, team } = player
          const label = `${name} ${team.toUpperCase()}`
          const xValueIsSalary = xValue > 100000
          const yValueIsSalary = yValue > 100000

          if (xValueIsSalary) {
            const playerSalary = xValue
            const salaryLabel = `$${(playerSalary / 1000000).toFixed(0)} M`
            const yLabel = `${yValue.toFixed(2)}`
            const tooltipLabel = `${label}: (${salaryLabel}), ${yLabel}`
            return tooltipLabel
          }

          if (yValueIsSalary) {
            const playerSalary = yValue
            const salaryLabel = `$${(playerSalary / 1000000).toFixed(0)} M`
            const xLabel = `${xValue.toFixed(2)}`
            const tooltipLabel = `${label}: (${salaryLabel}), ${xLabel}`
            return tooltipLabel
          }

          return `${label}: (${xValue.toFixed(0)}), (${yValue.toFixed(2)})`
        }
      }
    }
  }
  console.log({ winShareZScores })
  return <ScatterPlot data={data} options={options} />
}
