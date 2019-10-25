// Team Filter Function
const applyFilters = state => {
  if (
    state.xAxis !== 'Select a Stat' &&
    state.yAxis !== 'Select a Stat' &&
    state.teamSel !== 'All Teams' &&
    state.posSelect !== 'All Positions'
  ) {
    const teamFilter = state.players.filter(
      player => player.tm === state.teamSel
    )
    const posFilter = teamFilter.filter(
      player => player.pos === state.posSelect
    )
    state.players = posFilter
    newChart(state)
  } else if (
    state.xAxis !== 'Select a Stat' &&
    state.yAxis !== 'Select a Stat' &&
    state.posSelect !== 'All Positions'
  ) {
    const posFilter = state.players.filter(
      player => player.pos === state.posSelect
    )
    state.players = posFilter
    newChart(state)
  } else if (
    state.xAxis !== 'Select a Stat' &&
    state.yAxis !== 'Select a Stat' &&
    state.teamSel !== 'All Teams'
  ) {
    const teamFilter = state.players.filter(
      player => player.tm === state.teamSel
    )
    state.players = teamFilter
    newChart(state)
  } else if (
    state.xAxis !== 'Select a Stat' &&
    state.yAxis !== 'Select a Stat'
  ) {
    newChart(state)
  }
}
const controls = (x, y, team, position) => {
  const state = {
    players: [],
    xAxis: '',
    yAxis: '',
    xLabel: x.options[x.selectedIndex].textContent,
    yLabel: y.options[y.selectedIndex].textContent,
    xAbvr: x.value.toUpperCase(),
    yAbvr: y.value.toUpperCase(),
    teamSel: team.value,
    posSelect: position.value
  }
  x.addEventListener('change', event => {
    state.players = players()
    state.xAxis = document.getElementById('xSelect').value
    state.yAxis = document.getElementById('ySelect').value
    state.xLabel = document.getElementById('xSelect').options[
      document.getElementById('xSelect').selectedIndex
    ].textContent
    state.yLabel = document.getElementById('ySelect').options[
      document.getElementById('ySelect').selectedIndex
    ].textContent
    state.xAbvr = document.getElementById('xSelect').value.toUpperCase()
    state.yAbvr = document.getElementById('ySelect').value.toUpperCase()
    state.teamSel = document.getElementById('teamSelect').value
    state.posSelect = document.getElementById('posSelect').value
    applyFilters(state)
  })
  y.addEventListener('change', event => {
    state.players = players()
    state.xAxis = document.getElementById('xSelect').value
    state.yAxis = document.getElementById('ySelect').value
    state.xLabel = document.getElementById('xSelect').options[
      document.getElementById('xSelect').selectedIndex
    ].textContent
    state.yLabel = document.getElementById('ySelect').options[
      document.getElementById('ySelect').selectedIndex
    ].textContent
    state.xAbvr = document.getElementById('xSelect').value.toUpperCase()
    state.yAbvr = document.getElementById('ySelect').value.toUpperCase()
    state.teamSel = document.getElementById('teamSelect').value
    state.posSelect = document.getElementById('posSelect').value
    applyFilters(state)
  })
  // Team Filter
  team.addEventListener('change', event => {
    state.players = players()
    state.xAxis = document.getElementById('xSelect').value
    state.yAxis = document.getElementById('ySelect').value
    state.xLabel = document.getElementById('xSelect').options[
      document.getElementById('xSelect').selectedIndex
    ].textContent
    state.yLabel = document.getElementById('ySelect').options[
      document.getElementById('ySelect').selectedIndex
    ].textContent
    state.xAbvr = document.getElementById('xSelect').value.toUpperCase()
    state.yAbvr = document.getElementById('ySelect').value.toUpperCase()
    state.teamSel = document.getElementById('teamSelect').value
    state.posSelect = document.getElementById('posSelect').value
    applyFilters(state)
  })
  position.addEventListener('change', event => {
    state.players = players()
    state.xAxis = document.getElementById('xSelect').value
    state.yAxis = document.getElementById('ySelect').value
    state.xLabel = document.getElementById('xSelect').options[
      document.getElementById('xSelect').selectedIndex
    ].textContent
    state.yLabel = document.getElementById('ySelect').options[
      document.getElementById('ySelect').selectedIndex
    ].textContent
    state.xAbvr = document.getElementById('xSelect').value.toUpperCase()
    state.yAbvr = document.getElementById('ySelect').value.toUpperCase()
    state.teamSel = document.getElementById('teamSelect').value
    state.posSelect = document.getElementById('posSelect').value
    applyFilters(state)
  })
}

controls(
  document.getElementById('xSelect'),
  document.getElementById('ySelect'),
  document.getElementById('teamSelect'),
  document.getElementById('posSelect')
)
