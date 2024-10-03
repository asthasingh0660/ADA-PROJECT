document.addEventListener('DOMContentLoaded', () => {
    const canvas = document.getElementById('canvas');
    const ctx = canvas.getContext('2d');
    const infoPanel = document.getElementById('info-panel');
    const addPointButton = document.getElementById('add-point');
    const startVisualizationButton = document.getElementById('start-visualization');
    const pointsInputDiv = document.getElementById('points-input');

    let points = [];

    // Function to add point input fields
    function addPointInputField() {
        const inputDiv = document.createElement('div');
        inputDiv.classList.add('point-input');
        inputDiv.innerHTML = `
            <label>
                x: <input type="number" class="x-value" required>
            </label>
            <label>
                y: <input type="number" class="y-value" required>
            </label>
        `;
        pointsInputDiv.appendChild(inputDiv);
    }

    // Add initial point input field
    addPointInputField();

    // Add new point input field on button click
    addPointButton.addEventListener('click', addPointInputField);

    // Start visualization on button click
    startVisualizationButton.addEventListener('click', () => {
        points = [];
        document.querySelectorAll('.point-input').forEach(inputDiv => {
            const xValue = inputDiv.querySelector('.x-value').value;
            const yValue = inputDiv.querySelector('.y-value').value;
            if (xValue !== '' && yValue !== '') {
                points.push({ x: parseFloat(xValue), y: parseFloat(yValue) });
            }
        });

        if (points.length < 2) {
            alert('Please enter at least two points.');
            return;
        }

        // Clear the canvas and start the visualization
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        drawAxes();
        drawPoints(points);
        points.sort((a, b) => a.x - b.x);
        animateClosestPair(points);
    });

    function drawAxes() {
        ctx.beginPath();
        ctx.strokeStyle = '#aaa';
        for (let i = 0; i < canvas.width; i += 40) {
            ctx.moveTo(i, 0);
            ctx.lineTo(i, canvas.height);
            ctx.moveTo(0, i);
            ctx.lineTo(canvas.width, i);
        }
        ctx.stroke();
        ctx.closePath();
        
        // Draw X and Y axis labels
        ctx.fillStyle = 'black';
        ctx.font = '14px Arial';
        ctx.fillText("X-axis", canvas.width - 50, canvas.height / 2 - 10);
        ctx.fillText("Y-axis", canvas.width / 2 + 10, 20);
    }

    function drawPoints(points) {
        points.forEach((point, index) => {
            ctx.beginPath();
            ctx.arc(point.x * 20, canvas.height - point.y * 20, 5, 0, 2 * Math.PI);
            ctx.fillStyle = 'blue';
            ctx.fill();
            ctx.closePath();
            // Label the point with its coordinates
            ctx.fillStyle = 'black';
            ctx.fillText(`(${point.x}, ${point.y})`, point.x * 20 + 5, canvas.height - point.y * 20 - 5);
        });
    }

    function drawDividerLine(x) {
        ctx.beginPath();
        ctx.moveTo(x * 20, 0);
        ctx.lineTo(x * 20, canvas.height);
        ctx.strokeStyle = 'red';
        ctx.stroke();
        ctx.closePath();
    }

    function drawDistanceLine(pointA, pointB, color = 'green') {
        ctx.beginPath();
        ctx.moveTo(pointA.x * 20, canvas.height - pointA.y * 20);
        ctx.lineTo(pointB.x * 20, canvas.height - pointB.y * 20);
        ctx.strokeStyle = color;
        ctx.lineWidth = 2;
        ctx.stroke();
        ctx.closePath();
    }

    async function animateClosestPair(points) {
        if (points.length <= 1) return Infinity;

        if (points.length === 2) {
            drawDistanceLine(points[0], points[1]);
            let dist = distance(points[0], points[1]);
            updateInfo(`Distance between ${pointStr(points[0])} and ${pointStr(points[1])}: ${dist.toFixed(2)}`);
            await sleep(1000);
            return dist;
        }

        let midIndex = Math.floor(points.length / 2);
        let midPoint = points[midIndex];

        drawDividerLine(midPoint.x);
        updateInfo(`Dividing at x = ${midPoint.x}`);
        await sleep(1000);

        let leftPoints = points.slice(0, midIndex);
        let rightPoints = points.slice(midIndex);

        let distLeft = await animateClosestPair(leftPoints);
        let distRight = await animateClosestPair(rightPoints);

        let minDist = Math.min(distLeft, distRight);
        updateInfo(`Minimum distance so far: ${minDist.toFixed(2)}`);
        await sleep(1000);

        let strip = points.filter(p => Math.abs(p.x - midPoint.x) < minDist);

        let stripMin = minDist;
        let closestPair = null;
        for (let i = 0; i < strip.length; i++) {
            for (let j = i + 1; j < strip.length && (strip[j].y - strip[i].y) < minDist; j++) {
                let d = distance(strip[i], strip[j]);
                if (d < stripMin) {
                    stripMin = d;
                    closestPair = [strip[i], strip[j]];
                    drawDistanceLine(strip[i], strip[j], 'purple');
                    updateInfo(`Updated strip minimum: ${stripMin.toFixed(2)} between ${pointStr(strip[i])} and ${pointStr(strip[j])}`);
                    await sleep(1000);
                }
            }
        }

        if (closestPair) {
            drawDistanceLine(closestPair[0], closestPair[1], 'purple');
        }

        return Math.min(minDist, stripMin);
    }

    function distance(pointA, pointB) {
        return Math.sqrt(Math.pow(pointA.x - pointB.x, 2) + Math.pow(pointA.y - pointB.y, 2));
    }

    function pointStr(point) {
        return `(${point.x}, ${point.y})`;
    }

    function updateInfo(text) {
        infoPanel.innerHTML += `<p>${text}</p>`;
    }

    function sleep(ms) {
        return new Promise(resolve => setTimeout(resolve, ms));
    }
});
