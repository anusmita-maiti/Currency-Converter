const amountInput = document.getElementById('amount');
const fromSelect = document.getElementById('fromCurrency');
const toSelect = document.getElementById('toCurrency');
const convertBtn = document.getElementById('convertBtn');
const resultDiv = document.getElementById('result');

const currencies = ['USD', 'EUR', 'INR', 'GBP', 'JPY', 'AUD', 'CAD', 'CNY'];

currencies.forEach(cur => {
  const opt1 = document.createElement('option');
  opt1.value = cur; opt1.textContent = cur;
  const opt2 = document.createElement('option');
  opt2.value = cur; opt2.textContent = cur;
  fromSelect.appendChild(opt1);
  toSelect.appendChild(opt2);
});

fromSelect.value = 'USD';
toSelect.value = 'INR';

convertBtn.addEventListener('click', () => {
  const amount = parseFloat(amountInput.value);
  const from = fromSelect.value;
  const to = toSelect.value;

  if (!amount || amount <= 0) {
    resultDiv.textContent = '❗ Enter a valid amount';
    return;
  }

  fetch(`https://api.exchangerate-api.com/v4/latest/${from}`)
    .then(res => res.json())
    .then(data => {
      const rate = data.rates[to];
      if (rate) {
        const converted = (amount * rate).toFixed(2);
        resultDiv.textContent = `✅ ${amount} ${from} = ${converted} ${to}`;
      } else {
        resultDiv.textContent = '⚠️ Rate unavailable';
      }
    })
    .catch(err => {
      console.error(err);
      resultDiv.textContent = '❌ Failed to fetch rates';
    });
});