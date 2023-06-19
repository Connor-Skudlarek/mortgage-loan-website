function submitForm(event) {
  event.preventDefault();
  let parent = document.querySelector(".form-container");
  let element = createChildElement("div");
  let mortgage = calculateMortgageCosts(
    loanLength.value,
    loanAmount.value,
    interestRate.value
  );
  element = attachMortgageInformation(element, mortgage);
  parent.appendChild(element);
}

function createChildElement(elementType) {
  let element = document.createElement(elementType);
  return element;
}

function calculateMortgageCosts(
  lengthOfLoan,
  initialLoanAmount,
  percentInterestRate
) {
  let months = parseInt(lengthOfLoan) * 12;
  let amount = parseFloat(initialLoanAmount);
  let monthlyRate = parseFloat(percentInterestRate) / 100 / 12;
  let monthlyPayment =
    (amount * (monthlyRate * (1 + monthlyRate) ** months)) /
    ((1 + monthlyRate) ** months - 1);
  let totalCost = monthlyPayment * months;
  return [
    parseInt(initialLoanAmount),
    parseFloat(percentInterestRate),
    Math.floor(totalCost),
    Math.floor(monthlyPayment),
  ];
}

function attachMortgageInformation(element, mortgageInfo) {
  let info = mortgageInfo;
  element.innerHTML = `<p>On a loan of <strong>${info[0].toLocaleString(
    "en-US",
    { style: "currency", currency: "USD" }
  )}</strong>, and interest rate of <strong>${info[1].toLocaleString()}%</strong> the total cost is: <strong>${info[2].toLocaleString(
    "en-US",
    { style: "currency", currency: "USD" }
  )}</strong>. And the monthly cost is: <strong>${info[3].toLocaleString(
    "en-US",
    { style: "currency", currency: "USD" }
  )}</strong>. Please note that rounding may alter this slightly.</p>`;
  return element;
}
