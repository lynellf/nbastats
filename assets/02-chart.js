// State
let state = {
  players: [],
  xAxis: '',
  yAxis: '',
  xLabel: '',
  yLabel: '',
  xAbvr: '',
  yAbvr: '',
};

// Selectors
const xAxis = document.getElementById('xSelect');
const yAxis = document.getElementById('ySelect');
const teamSel = document.getElementById('teamSelect');
const posSelect = document.getElementById('posSelect');

let chart;

// Function to Render Chart
const returnData = (players, xAxis, yAxis, xLabel, yLabel, xAbvr, yAbvr) => {
  // Check for Existing Chart and Destroy
  if (chart !== undefined) {
    chart.destroy();
  }
  // Set Team Colors for Each Player
  const colors = players.map(player => {
    if (player.tm === 'ATL') {
      return '#E03A3E';
    } else if (player.tm === 'BOS') {
      return '#007A33';
    } else if (player.tm === 'BRK') {
      return '#000000';
    } else if (player.tm === 'CHO') {
      return '#00778B';
    } else if (player.tm === 'CHI') {
      return '#BA0C2F';
    } else if (player.tm === 'CLE') {
      return '#6F263D';
    } else if (player.tm === 'DAL') {
      return '#003DA5';
    } else if (player.tm === 'DEN') {
      return '#418FDE';
    } else if (player.tm === 'DET') {
      return '#B0B1B5';
    } else if (player.tm === 'GSW') {
      return '#FFC72C';
    } else if (player.tm === 'HOU') {
      return '#BA0C2F';
    } else if (player.tm === 'IND') {
      return '#041E42';
    } else if (player.tm === 'LAC') {
      return '#006BB6';
    } else if (player.tm === 'LAL') {
      return '#582C83';
    } else if (player.tm === 'MEM') {
      return '#CED9E5';
    } else if (player.tm === 'MIA') {
      return '#FFA300';
    } else if (player.tm === 'MIL') {
      return '#00471B';
    } else if (player.tm === 'MIN') {
      return '#7AC143';
    } else if (player.tm === 'NOP') {
      return '#85714D';
    } else if (player.tm === 'NYK') {
      return '#FF671F';
    } else if (player.tm === 'OKC') {
      return '#0072CE';
    } else if (player.tm === 'ORL') {
      return '#0057B8';
    } else if (player.tm === 'PHI') {
      return '#003DA5';
    } else if (player.tm === 'PHI') {
      return '#003DA5';
    } else if (player.tm === 'PHO') {
      return '#201747';
    } else if (player.tm === 'POR') {
      return '#C4CED4';
    } else if (player.tm === 'SAC') {
      return '#582C83';
    } else if (player.tm === 'SAS') {
      return '#000000';
    } else if (player.tm === 'TOR') {
      return '#BA0C2F';
    } else if (player.tm === 'UTA') {
      return '#0C2340';
    } else if (player.tm === 'WAS') {
      return '#0C2340';
    } else {
      return 'white';
    }
  })
  // Set Chart
  chart = new Chart(stats, {
    type: 'scatter',
    data: {
      datasets: [{
        data: players.map(player => ({
          x: player[xAxis],
          y: player[yAxis],
        })),
        borderColor: 'black',
        pointBackgroundColor: colors,
        fill: true,
        lineTension: 0,
        pointRadius: 8,
        pointBackgroundColor: colors,
      }, ],
    },
    options: {
      responsive: true,
      title: {
        display: true,
        text: `${xLabel} x ${yLabel}`,
      },
      legend: {
        display: false
      },
      scales: {
        yAxes: [{
          scaleLabel: {
            display: true,
            labelString: `${yLabel}`
          },
          ticks: {
            callback: function (value, index, values) {
              if (value > 1000) {
                return `$${(value/1000000).toFixed(0)} M`
              } else {
                return value;
              }
            }
          },
        }],
        xAxes: [{
          scaleLabel: {
            display: true,
            labelString: `${xLabel}`
          },
          ticks: {
            callback: function (value, index, values) {
              if (value > 1000) {
                return `$${(value/1000000).toFixed(0)} M`
              } else {
                return value;
              }
            }
          }
        }]
      },
      tooltips: {
        callbacks: {
          label: function (tooltipItem, data) {
            var label = players.map(player => player.name)[tooltipItem.index];
            if (tooltipItem.xLabel > 1000000) {
              return (
                label +
                ': (' +
                `$${(tooltipItem.xLabel / 1000000).toFixed(0)} M` +
                ', ' +
                `${tooltipItem.yLabel.toFixed(2)} ${yAbvr}` +
                ')'
              );
            } else if (tooltipItem.yLabel > 1000000) {
              return (
                label +
                ': (' +
                `${(tooltipItem.yLabel / 1000000).toFixed(0)} M` +
                ', ' +
                `${tooltipItem.xLabel.toFixed(2)} ${xAbvr}` +
                ')'
              );
            } else {
              return (
                label +
                ': (' +
                `${tooltipItem.xLabel.toFixed(0)} ${xAbvr}` +
                ', ' +
                `${tooltipItem.yLabel.toFixed(2)} ${yAbvr}` +
                ')'
              );
            }
          },
        },
      },
    },
  });
  return chart;
};

// Create Toggleable Options
const generateOptions = id => {
  Object.keys(playerData[0]).forEach(key => {
    if (key !== 'tm' && key !== 'name' && key !== 'pos') {
      const option = document.createElement('option');
      if (key === 'g') {
        option.textContent = 'Games Played';
        option.value = key;
      } else if (key === 'mp') {
        option.textContent = 'Minutes Played';
        option.value = key;
      } else if (key === 'mpg') {
        option.textContent = 'Minutes Played Per Game';
        option.value = key;
      } else if (key === 'per') {
        option.textContent = 'Player Efficiency Rating';
        option.value = key;
      } else if (key === 'ws') {
        option.textContent = 'Win Shares';
        option.value = key;
      } else if (key === 'ws48') {
        option.textContent = 'Win Shares Per 48 Minutes';
        option.value = key;
      } else if (key === 'obpm') {
        option.textContent = 'Offensive Box Score Plus/Minus';
        option.value = key;
      } else if (key === 'dbpm') {
        option.textContent = 'Defensive Box Score Plus/Minus';
        option.value = key;
      } else if (key === 'bpm') {
        option.textContent = 'Box Score Plus/Minus';
        option.value = key;
      } else if (key === 'vorp') {
        option.textContent = 'Value Over Replacement Player';
        option.value = key;
      } else if (key === 'rpm') {
        option.textContent = 'Real Box Score Plus/Minus';
        option.value = key;
      } else if (key === 'rpmw') {
        option.textContent = 'Real Box Score Plus/Minus Wins';
        option.value = key;
      } else if (key === 'salary') {
        option.textContent = 'Player Salary';
        option.value = key;
      } else if (key === 'age') {
        option.textContent = 'Player Age';
        option.value = key;
      }
      document.getElementById(id).appendChild(option);
    }
  });
};

// Create Filter Option Elements
const setOptions = (item, parentId) => {
  const option = document.createElement('option');
  option.value = item;
  option.textContent = item;
  document.getElementById(parentId).appendChild(option);
};

// Set Filters
teams.forEach(team => {
  setOptions(team, 'teamSelect');
});
positions.forEach(position => {
  setOptions(position, 'posSelect');
});

// Team Filter Function
const applyFilters = () => {
  if (
    xAxis.value !== 'Select a Stat' &&
    yAxis.value !== 'Select a Stat' &&
    teamSelect.value !== 'All Teams' &&
    posSelect.value !== 'All Positions'
  ) {
    const teamFilter = playerData.filter(player => player.tm === teamSel.value);
    const posFilter = teamFilter.filter(
      player => player.pos === posSelect.value
    );
    state = {
      players: posFilter,
      xAxis: xAxis.value,
      yAxis: yAxis.value,
      xLabel: xAxis.options[xAxis.selectedIndex].textContent,
      yLabel: yAxis.options[yAxis.selectedIndex].textContent,
      xAbvr: xAxis.value.toUpperCase(),
      yAbvr: yAxis.value.toUpperCase(),
    };
    returnData(
      state.players,
      state.xAxis,
      state.yAxis,
      state.xLabel,
      state.yLabel,
      state.xAbvr,
      state.yAbvr
    );
  } else if (
    xAxis.value !== 'Select a Stat' &&
    yAxis.value !== 'Select a Stat' && posSelect.value !== 'All Positions'
  ) {
    const posFilter = playerData.filter(player => player.pos === posSelect.value);
    state = {
      players: posFilter,
      xAxis: xAxis.value,
      yAxis: yAxis.value,
      xLabel: xAxis.options[xAxis.selectedIndex].textContent,
      yLabel: yAxis.options[yAxis.selectedIndex].textContent,
      xAbvr: xAxis.value.toUpperCase(),
      yAbvr: yAxis.value.toUpperCase(),
    };
    returnData(
      state.players,
      state.xAxis,
      state.yAxis,
      state.xLabel,
      state.yLabel,
      state.xAbvr,
      state.yAbvr
    );
  } else if (
    xAxis.value !== 'Select a Stat' &&
    yAxis.value !== 'Select a Stat' && teamSelect.value !== 'All Teams'
  ) {
    const teamFilter = playerData.filter(player => player.tm === teamSel.value);
    state = {
      players: teamFilter,
      xAxis: xAxis.value,
      yAxis: yAxis.value,
      xLabel: xAxis.options[xAxis.selectedIndex].textContent,
      yLabel: yAxis.options[yAxis.selectedIndex].textContent,
      xAbvr: xAxis.value.toUpperCase(),
      yAbvr: yAxis.value.toUpperCase(),
    };
    returnData(
      state.players,
      state.xAxis,
      state.yAxis,
      state.xLabel,
      state.yLabel,
      state.xAbvr,
      state.yAbvr
    );
  } else if (
    xAxis.value !== 'Select a Stat' &&
    yAxis.value !== 'Select a Stat'
  ) {
    state = {
      players: playerData,
      xAxis: xAxis.value,
      yAxis: yAxis.value,
      xLabel: xAxis.options[xAxis.selectedIndex].textContent,
      yLabel: yAxis.options[yAxis.selectedIndex].textContent,
      xAbvr: xAxis.value.toUpperCase(),
      yAbvr: yAxis.value.toUpperCase(),
    };
    returnData(
      state.players,
      state.xAxis,
      state.yAxis,
      state.xLabel,
      state.yLabel,
      state.xAbvr,
      state.yAbvr
    );
  }
};

// Set Initial Chart
returnData(
  playerData,
  'salary',
  'rpm',
  'Salary',
  'Real Plus Minus',
  'M',
  'RPM'
);

// Generate Selectable Options
generateOptions('xSelect');
generateOptions('ySelect');