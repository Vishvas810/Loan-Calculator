// Listen for submit
document.querySelector('#loan-form').addEventListener('submit', function(e){
  
  // Hide Results
  document.getElementById('results').style.display='none';
  // Show loader
  document.getElementById('loading').style.display='block';

  // Call calculate results after 1 second.
  setTimeout(calculateResults, 1000);
  e.preventDefault();
});

// Calculate Results
function calculateResults(){
  // UI variables
  const amount = document.getElementById('amount');
  const interest = document.getElementById('interest');
  const years = document.getElementById('years');
  const monthlyPayment = document.getElementById('monthly-payment');
  const totalPayment = document.getElementById('total-payment');
  const totalInterest = document.getElementById('total-interest');

  const principal = parseFloat(amount.value); 
  const calculatedInterest = parseFloat(interest.value)/100/12;
  const calculatedPayments = parseFloat(years.value)*12;
  
  // Computer monthly paymets
  const x = Math.pow(1 + calculatedInterest, calculatedPayments);
  const monthly = (principal*x*calculatedInterest)/(x-1);

  if(isFinite(monthly)) {
    monthlyPayment.value = monthly.toFixed(2);
    totalPayment.value = (monthly * calculatedPayments).toFixed(2);
    totalInterest.value = ((monthly * calculatedPayments)-principal).toFixed(2);

    // Show results and hide the loader
    document.getElementById('results').style.display='block';
    document.getElementById('loading').style.display='none';
  }
  else{
    showError('Please Check your numbers');
  }

}

// Show Error
function showError(error){

  // hide the results and the loader
  document.getElementById('results').style.display='none';
  document.getElementById('loading').style.display='none';

  // create a div
  const errorDiv = document.createElement('div');

  // Get Elemets
  const card = document.querySelector('.card');
  const heading = document.querySelector('.heading')

  // Add class
  errorDiv.className = 'alert alert-danger';

  // Create text node and append div
  errorDiv.appendChild(document.createTextNode(error));

  // Insert error above heading
  card.insertBefore(errorDiv, heading);

  // Clear error after 1 second
  setTimeout(clearError, 1000);
}

// Clear Error
function clearError(){
  document.querySelector('.alert').remove();
}