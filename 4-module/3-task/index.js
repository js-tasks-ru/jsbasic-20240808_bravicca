function highlight(table) {
  const rows = table.querySelectorAll ('tbody tr');
  rows.forEach(row => {
    const ageCell = row.cells[1];
    const genderCell = row.cells[2];
    const statusCell = row.cells[3];
    const available = statusCell.dataset.available;
    if (available === 'true') {
      row.classList.add ('available');
    } else if (available === 'false') {
      row.classList.add ('unavailable');
    } else {
      row.setAttribute ('hidden', true);
    }
    if (genderCell.textContent === 'm') {
      row.classList.add ('male');
    } else if (genderCell.textContent === 'f') {
      row.classList.add ('female');
    }
    if (parseInt (ageCell.textContent) < 18) {
      ageCell.style.textDecoration = 'line-through';
    }
  });// ваш код...
}
