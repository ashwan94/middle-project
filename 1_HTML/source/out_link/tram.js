const priceForm = document.querySelector('#priceForm');
const maxPriceInput = document.querySelector('#maxPrice');
const maxOutput = document.querySelector('#maxOutput');

maxPriceInput.addEventListener('input', function() {
  maxOutput.textContent = '\\' + maxPriceInput.value;
});

priceForm.addEventListener('submit', function(e) {
  e.preventDefault();
  const maxPrice = maxPriceInput.value;
  alert(`최대 금액: ${maxPrice}원으로 검색합니다.`);
});


const decreaseBtn = document.getElementById('decreaseBtn');
const increaseBtn = document.getElementById('increaseBtn');
const personCount = document.getElementById('personCount');

let count = 1;

decreaseBtn.addEventListener('click', () => {
  if (count > 1) {
    count--;
    updateCount();
  }
});

increaseBtn.addEventListener('click', () => {
  count++;
  updateCount();
});

function updateCount() {
  personCount.textContent = count;
}