function calculate() {
  // Get input values from the HTML elements
  let sideA = parseFloat(document.getElementById('sideA').value);
  let sideB = parseFloat(document.getElementById('sideB').value);
  let sideC = parseFloat(document.getElementById('sideC').value);

  // Validate input values (check for NaNs and non-negative values)
  if (isNaN(sideA) && isNaN(sideB) && isNaN(sideC)) { 
    document.getElementById('result').innerHTML = "Please enter at least two sides.";
    return;
  }

  if ((sideA < 0 || sideB < 0 || sideC < 0)) {
    document.getElementById('result').innerHTML = "Please enter valid positive numbers for sides.";
    return;
  }

  // Determine which side to calculate
  let missingSide = '';
  let result = 0;

  // Calculate missing side based on which input is empty
  if (isNaN(sideA)) {
    missingSide = 'A';
    result = Math.sqrt(Math.pow(sideC, 2) - Math.pow(sideB, 2));
  } else if (isNaN(sideB)) {
    missingSide = 'B';
    result = Math.sqrt(Math.pow(sideC, 2) - Math.pow(sideA, 2));
  } else if (isNaN(sideC)) {
    missingSide = 'C';
    result = Math.sqrt(Math.pow(sideA, 2) + Math.pow(sideB, 2));
  } else {
    // Check if it's a valid right triangle (all sides provided)
    if (Math.pow(sideA, 2) + Math.pow(sideB, 2) === Math.pow(sideC, 2)) {
      document.getElementById('result').innerHTML = "This is a valid right triangle.";
    } else {
      document.getElementById('result').innerHTML = "This is not a valid right triangle.";
    }
    return;
  }

  // Display the calculated result
  document.getElementById('result').innerHTML = `The length of side ${missingSide} is: ${result.toFixed(2)}`;
}
