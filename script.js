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

    if (altitude <= 0 || base <= 0 || hypotenuse <= 0) {
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
        altitude = result; // Set the calculated value
    } else if (isNaN(base)) {
        missingSide = 'Base';
        result = Math.sqrt(Math.pow(hypotenuse, 2) - Math.pow(altitude, 2));
        base = result; // Set the calculated value
    } else if (isNaN(hypotenuse)) {
        missingSide = 'Hypotenuse';
        result = Math.sqrt(Math.pow(altitude, 2) + Math.pow(base, 2));
        hypotenuse = result; // Set the calculated value
    } else {
        // Check if it's a valid right triangle (all sides provided)
        if (Math.abs(Math.pow(altitude, 2) + Math.pow(base, 2) - Math.pow(hypotenuse, 2)) < 1e-9) {
            document.getElementById('result').innerHTML = "This is a valid right triangle.";
            drawTriangle(altitude, base); // Draw triangle if valid
        } else {
            document.getElementById('result').innerHTML = "This is not a valid right triangle.";
        }
        return;
    }

    // Display the calculated result
    document.getElementById('result').innerHTML = `The length of ${missingSide} is: ${result.toFixed(2)}`;
    drawTriangle(altitude, base); // Draw triangle with calculated values
}

// Function to draw the right triangle on the canvas
function drawTriangle(altitude, base) {
    const canvas = document.getElementById('triangleCanvas');
    const ctx = canvas.getContext('2d');

    // Clear the canvas before drawing
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Debugging logs for coordinate and scaling values
    console.log(`Altitude: ${altitude}, Base: ${base}`);

    // Calculate scale to fit triangle within canvas
    const padding = 40; // Padding to ensure the triangle is not cut off
    const scale = Math.min((canvas.width - 2 * padding) / base, (canvas.height - 2 * padding) / altitude);

    // Define coordinates for the triangle
    const x0 = padding; // Bottom-left corner (base starts here)
    const y0 = canvas.height - padding;
    const x1 = x0; // Top-left corner (altitude ends here)
    const y1 = y0 - altitude * scale;
    const x2 = x0 + base * scale; // Bottom-right corner
    const y2 = y0;

    // Debugging logs for triangle vertices
    console.log(`Vertices: (${x0}, ${y0}), (${x1}, ${y1}), (${x2}, ${y2})`);

    // Draw the triangle
    ctx.beginPath();
    ctx.moveTo(x0, y0); // Move to the first vertex
    ctx.lineTo(x1, y1); // Draw line to the second vertex
    ctx.lineTo(x2, y2); // Draw line to the third vertex
    ctx.closePath(); // Close the triangle
    ctx.strokeStyle = "blue"; // Set line color
    ctx.lineWidth = 2; // Set line width
    ctx.stroke();

    // Label the sides of the triangle
    ctx.font = "14px Arial";
    ctx.fillStyle = "black";
    ctx.fillText("A", (x0 + x1) / 2 - 10, (y0 + y1) / 2); // Altitude label
    ctx.fillText("B", (x0 + x2) / 2, y0 + 15); // Base label
    ctx.fillText("C", (x1 + x2) / 2, (y1 + y2) / 2 - 10); // Hypotenuse label
}
