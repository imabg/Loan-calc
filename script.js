document.querySelector('#loan-form').addEventListener('submit',function(e){
  e.preventDefault();

  // IDEA: Loader
  document.querySelector('#results').style.display = 'none';
  document.querySelector('#loading').style.display = 'block';

  // IDEA: Calculate Results
  setTimeout(calculateResults, 2000);

});

function calculateResults () {

    const principle = document.querySelector('#amount');
    const interest = document.querySelector('#interest');
    const time = document.querySelector('#time');

    let monthly = document.getElementById('monthly-payment');
    let totalPayment = document.getElementById('total-payment');
    let totalInterset = document.getElementById('total-interset');

    const principleValue = parseFloat(principle.value);
    const interestValue = parseFloat(interest.value) / 100 / 12;
    const timeValue = parseFloat(time.value) * 12;

    // IDEA: Montlhy
    const x = Math.pow(1 + interestValue , timeValue);
    const MontlhyPay = (principleValue * x * interestValue) / (x - 1);

      if (isFinite(MontlhyPay)) {
          monthly.value= MontlhyPay.toFixed(2);
          totalPayment.value = (MontlhyPay * timeValue).toFixed(2);
          totalInterset.value = ((MontlhyPay * timeValue) - principleValue).toFixed(2);
          document.querySelector('#results').style.display = 'block';
          document.querySelector('#loading').style.display = 'none';
      } else {
        document.querySelector('#loading').style.display = 'none';
        showError('please check your number');
      }

}

function showError(error){
  const errorDiv = document.createElement('div');
  const card = document.querySelector('.card');
  const heading = document.querySelector('.heading');
  errorDiv.className = 'alert alert-danger';
  errorDiv.appendChild(document.createTextNode(error));
  card.insertBefore(errorDiv, heading);
  setTimeout(clearError, 2000);
}


function clearError() {
  document.querySelector('.alert').remove();
}
