function calculate() {
    // Get input values from the HTML elements
    let altitude = parseFloat(document.getElementById('sideA').value);
    let base = parseFloat(document.getElementById('sideB').value);
    let hypotenuse = parseFloat(document.getElementById('sideC').value);

    // Validate input values
    if (isNaN(altitude) && isNaN(base) && isNaN(hypotenuse)) {
        document.getElementById('result').innerHTML = "Please enter at least two sides.";
        return;
    }

    if (altitude < 0 || base < 0 || hypotenuse < 0) {
        document.getElementById('result').innerHTML = "Please enter valid positive numbers for sides.";
        return;
    }

    if (altitude >= hypotenuse || base >= hypotenuse) {
        document.getElementById('result').innerHTML = "Hypotenuse must be greater than both Altitude and Base.";
        return;
    }

    // Determine which side to calculate
    let missingSide = '';
    let result = 0;

    if (isNaN(altitude)) {
        missingSide = 'Altitude';
        result = Math.sqrt(Math.pow(hypotenuse, 2) - Math.pow(base, 2));
    } else if (isNaN(base)) {
        missingSide = 'Base';
        result = Math.sqrt(Math.pow(hypotenuse, 2) - Math.pow(altitude, 2));
    } else if (isNaN(hypotenuse)) {
        missingSide = 'Hypotenuse';
        result = Math.sqrt(Math.pow(altitude, 2) + Math.pow(base, 2));
    } else {
        // Check if it's a valid right triangle (all sides provided)
        if (Math.pow(altitude, 2) + Math.pow(base, 2) === Math.pow(hypotenuse, 2)) {
            document.getElementById('result').innerHTML = "This is a valid right triangle.";
            drawTriangle(altitude, base, hypotenuse); // Draw triangle if valid
        } else {
            document.getElementById('result').innerHTML = "This is not a valid right triangle.";
        }
        return;
    }

    // Display the calculated result
    document.getElementById('result').innerHTML = `The length of ${missingSide} is: ${result.toFixed(2)}`;
}

function drawTriangle(altitude, base, hypotenuse) {
    const canvas = document.getElementById('triangleCanvas');
    const ctx = canvas.getContext('2d');
    ctx.clearRect(0, 0, canvas.width, canvas.height); 

    // Calculate scale to fit triangle within canvas
    const scale = Math.min(canvas.width / base, canvas.height / altitude);

    // Calculate coordinates of triangle vertices
    const x1 = canvas.width / 2; // Apex (right angle)
    const y1 = canvas.height - (altitude * scale);
    const x2 = x1 - (base * scale); // Base left
    const y2 = canvas.height;
    const x3 = x1; // Base right
    const y3 = canvas.height;

    // Draw triangle
    ctx.beginPath();
    ctx.moveTo(x1, y1);
    ctx.lineTo(x2, y2);
    ctx.lineTo(x3, y3);
    ctx.closePath();
    ctx.stroke();
}
