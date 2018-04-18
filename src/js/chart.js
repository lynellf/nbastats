!(newChart = state => {
  // Selectors
  const xAxis = document.getElementById('xSelect')
  const yAxis = document.getElementById('ySelect')
  const teamSel = document.getElementById('teamSelect')
  const posSelect = document.getElementById('posSelect')
  let canvas = document.querySelector('#stats');
  // Function to Render Chart
  const buildChart = state => {
    // Check for Existing Chart and Destroy/Replace
    if (document.querySelector('#stats')['$chartjs'] !== null) {
      let canvasArea = document.querySelector('.canvas-area');
      let newCanvas = document.createElement('canvas');
      newCanvas.id = 'stats';
      canvasArea.innerHTML = '';
      canvasArea.appendChild(newCanvas);
    }
    // Set Team Colors for Each Player
    const colors = state.players.map(player => {
      if (player.tm === 'ATL') {
        return '#E03A3E'
      } else if (player.tm === 'BOS') {
        return '#007A33'
      } else if (player.tm === 'BRK') {
        return '#000000'
      } else if (player.tm === 'CHO') {
        return '#00778B'
      } else if (player.tm === 'CHI') {
        return '#BA0C2F'
      } else if (player.tm === 'CLE') {
        return '#6F263D'
      } else if (player.tm === 'DAL') {
        return '#003DA5'
      } else if (player.tm === 'DEN') {
        return '#418FDE'
      } else if (player.tm === 'DET') {
        return '#B0B1B5'
      } else if (player.tm === 'GSW') {
        return '#FFC72C'
      } else if (player.tm === 'HOU') {
        return '#BA0C2F'
      } else if (player.tm === 'IND') {
        return '#041E42'
      } else if (player.tm === 'LAC') {
        return '#006BB6'
      } else if (player.tm === 'LAL') {
        return '#582C83'
      } else if (player.tm === 'MEM') {
        return '#CED9E5'
      } else if (player.tm === 'MIA') {
        return '#FFA300'
      } else if (player.tm === 'MIL') {
        return '#00471B'
      } else if (player.tm === 'MIN') {
        return '#7AC143'
      } else if (player.tm === 'NOP') {
        return '#85714D'
      } else if (player.tm === 'NYK') {
        return '#FF671F'
      } else if (player.tm === 'OKC') {
        return '#0072CE'
      } else if (player.tm === 'ORL') {
        return '#0057B8'
      } else if (player.tm === 'PHI') {
        return '#003DA5'
      } else if (player.tm === 'PHI') {
        return '#003DA5'
      } else if (player.tm === 'PHO') {
        return '#201747'
      } else if (player.tm === 'POR') {
        return '#C4CED4'
      } else if (player.tm === 'SAC') {
        return '#582C83'
      } else if (player.tm === 'SAS') {
        return '#000000'
      } else if (player.tm === 'TOR') {
        return '#BA0C2F'
      } else if (player.tm === 'UTA') {
        return '#0C2340'
      } else if (player.tm === 'WAS') {
        return '#0C2340'
      } else {
        return 'white'
      }
    })
    // Set Chart
    chart = new Chart(stats, {
      type: 'scatter',
      data: {
        datasets: [
          {
            data: state.players.map(player => ({
              x: player[state.xAxis],
              y: player[state.yAxis]
            })),
            borderColor: 'black',
            pointBackgroundColor: colors,
            fill: true,
            lineTension: 0,
            pointRadius: 8,
            pointBackgroundColor: colors
          }
        ]
      },
      options: {
        responsive: true,
        title: {
          display: true,
          text: `${state.xLabel} x ${state.yLabel}`
        },
        legend: {
          display: false
        },
        scales: {
          yAxes: [
            {
              scaleLabel: {
                display: true,
                labelString: `${state.yLabel}`
              },
              ticks: {
                callback: function (value, index, values) {
                  if (value > 50000) {
                    return `$${(value / 1000000).toFixed(0)} M`
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
                labelString: `${state.xLabel}`
              },
              ticks: {
                callback: function (value, index, values) {
                  if (value > 1000) {
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
            label: function (tooltipItem, data) {
              var label = `${state.players.map(player => player.name)[tooltipItem.index]} ${state.players.map(player => player.tm)[tooltipItem.index]}`
              if (state.yAbvr === 'AGE') {
                state.yAbvr = 'Years'
              }
              if (state.xAbvr === 'AGE') {
                state.xAbvr = 'Years'
              }
              if (tooltipItem.xLabel > 1000000) {
                return (
                  label +
                  ': (' +
                  `$${(tooltipItem.xLabel / 1000000).toFixed(0)} M` +
                  ', ' +
                  `${tooltipItem.yLabel.toFixed(2)} ${state.yAbvr}` +
                  ')'
                )
              } else if (tooltipItem.yLabel > 1000000) {
                return (
                  label +
                  ': (' +
                  `${(tooltipItem.yLabel / 1000000).toFixed(0)} M` +
                  ', ' +
                  `${tooltipItem.xLabel.toFixed(2)} ${state.xAbvr}` +
                  ')'
                )
              } else {
                return (
                  label +
                  ': (' +
                  `${tooltipItem.xLabel.toFixed(0)} ${state.xAbvr}` +
                  ', ' +
                  `${tooltipItem.yLabel.toFixed(2)} ${state.yAbvr}` +
                  ')'
                )
              }
            }
          }
        }
      }
    })
  }
  buildChart(state);
}
);

newChart({
  players: players(),
  xAxis: 'salary',
  yAxis: 'rpm',
  xLabel: 'Salary',
  yLabel: 'Real Plus Minus',
  xAbvr: 'M',
  yAbvr: 'RPM'
})