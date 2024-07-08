
  fetch('./Location.json')
  .then(response => response.json())
  .then(data => {
      
      initForm(data);
  })
  .catch(error => {
      console.error('Error loading updated_location.json:', error);
  });

function initForm(Data) {

  const provinceSelect = document.getElementById('province');
  const districtSelect = document.getElementById('district');
  const sectorSelect = document.getElementById('sector');
  const cellSelect = document.getElementById('cell');
  const villageSelect = document.getElementById('village');


  populateDropdown(provinceSelect, Object.keys(Data));
  
  provinceSelect.addEventListener('change', () => {
      const selectedProvince = provinceSelect.value;
      populateDropdown(districtSelect, Object.keys(Data[selectedProvince]));
      clearDropdowns(sectorSelect, cellSelect, villageSelect);
  });

  
  districtSelect.addEventListener('change', () => {
      const selectedProvince = provinceSelect.value;
      const selectedDistrict = districtSelect.value;
      populateDropdown(sectorSelect, Object.keys(Data[selectedProvince][selectedDistrict]));
      clearDropdowns(cellSelect, villageSelect);
  });

  sectorSelect.addEventListener('change', () => {
      const selectedProvince = provinceSelect.value;
      const selectedDistrict = districtSelect.value;
      const selectedSector = sectorSelect.value;
      populateDropdown(cellSelect, Object.keys(Data[selectedProvince][selectedDistrict][selectedSector]));
      clearDropdowns(villageSelect);
  });

  cellSelect.addEventListener('change', () => {
      const selectedProvince = provinceSelect.value;
      const selectedDistrict = districtSelect.value;
      const selectedSector = sectorSelect.value;
      const selectedCell = cellSelect.value;
      populateDropdown(villageSelect, Data[selectedProvince][selectedDistrict][selectedSector][selectedCell]);
  });
}




function populateDropdown(dropdown, options) {
  dropdown.innerHTML = '';
  options.forEach(option => {
      const optionElement = document.createElement('option');
      optionElement.value = option;
      optionElement.textContent = option;
      dropdown.add(optionElement);
  });
}

function clearDropdowns(...dropdowns) {
  dropdowns.forEach(dropdown => {
      dropdown.innerHTML = '';
      dropdown.add(new Option('', ''));
  });
}