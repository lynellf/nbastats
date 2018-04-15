// Select modifiers
xAxis.addEventListener('change', event => {
  applyFilters();
});
yAxis.addEventListener('change', event => {
  applyFilters();
});

// Team Filter
teamSel.addEventListener('change', event => {
  applyFilters();
});

posSelect.addEventListener('change', event => {
  applyFilters();
})