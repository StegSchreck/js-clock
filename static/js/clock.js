function updateTime() {
	date = new Date();
	clock = document.getElementById("Clock");
    var formatted_date_short = ("0" + date.getDate()).slice(-2) + "." + ("0" + (date.getMonth() + 1)).slice(-2) + ".";
    var formatted_date_with_year = formatted_date_short + date.getFullYear();
    var formatted_time_short = ("0" + date.getHours()).slice(-2) + ":" + ("0" + date.getMinutes()).slice(-2);
    var formatted_time_with_seconds = formatted_time_short + ":" + ("0" + date.getSeconds()).slice(-2);
	clock.innerHTML = formatted_date_with_year + "<br>" + formatted_time_with_seconds;
	document.title = formatted_date_short + " " + formatted_time_short;
 }

function drawRectangle(x, y, width, height, color) {
	context.beginPath();
    context.rect(x, y, width, height);
    context.fillStyle = color;
    context.fill();
}

function drawCircle(centerX, centerY, radius, color) {
	context.beginPath();
    context.arc(centerX, centerY, radius, 0, 2 * Math.PI, false);
    context.fillStyle = color;
    context.fill();
}

function drawMarker(strokeWidth, strokeHeight, hour, color) {
	var angle = ((2 * Math.PI / 12) * hour);
	context.rotate(angle);
	drawRectangle(-strokeWidth/2, -Math.min(canvas.width, canvas.height)/2, strokeWidth, strokeHeight, color);
	context.rotate(-angle);
}

function drawMainMarkers(strokeWidth, strokeHeight) {
	var a = [3, 6, 9, 12];
	for (i = 0; i < a.length; i++) {
		drawMarker(strokeWidth, strokeHeight, a[i], 'white');
	}
}

function drawMinorMarkers(strokeWidth) {
	var a = [1, 2, 4, 5, 7, 8, 10, 11];
	for (i = 0; i < a.length; i++) {
		drawMarker(strokeWidth, strokeWidth, a[i], 'white');
	}
}

function drawClockBackground(strokeWidth, strokeHeight) {
	drawCircle(0, 0, Math.min(canvas.width, canvas.height)/2, '#111');
	drawMainMarkers(strokeWidth*1.25, strokeHeight);
	drawMinorMarkers(strokeWidth/1.25);
	drawCircle(0, 0, strokeWidth*1.5, '#6A7A89');
}

function drawClockArm(strokeWidth, lengthFactor, angle, color) {
    context.rotate(angle);
    drawRectangle(-(strokeWidth/2), 0, strokeWidth, -Math.min(canvas.width, canvas.height)/2*lengthFactor, color);
    context.rotate(-angle);
}

function drawClockHour(strokeWidth) {
	var widthFactor = 1.5;
	var lengthFactor = 2/3;
	var angle = ((2 * Math.PI / 12) * date.getHours());
	angle += ((2 * Math.PI / (12 * 60)) * date.getMinutes());
	drawClockArm(strokeWidth*widthFactor, lengthFactor, angle, '#6A7A89');
}

function drawClockMinute(strokeWidth) {
	var widthFactor = 1;
	var lengthFactor = 1;
	var angle = (2 * Math.PI / 60) * date.getMinutes();
	//angle += ((2 * Math.PI / (60 * 60)) * date.getSeconds()); // smooth minute arm
	drawClockArm(strokeWidth*widthFactor, lengthFactor, angle, '#6A7A89');
}

function drawClockSecond(strokeWidth) {
	var widthFactor = 0.5;
	var lengthFactor = 1;
	var angle = (2 * Math.PI / 60) * date.getSeconds();
	drawClockArm(strokeWidth*widthFactor, lengthFactor, angle, '#C50025');
}

function drawClock() {
	var strokeWidth = Math.min(canvas.width, canvas.height)/50;
	var strokeHeight = strokeWidth*3;
	
    canvas = document.getElementById('canvas');
    context = canvas.getContext('2d');
	context.clearRect(0, 0, canvas.width, canvas.height);
    context.translate(canvas.width/2, canvas.height/2);

	drawClockBackground(strokeWidth, strokeHeight);
	drawClockHour(strokeWidth);
	drawClockMinute(strokeWidth);
	drawClockSecond(strokeWidth);
	
	drawCircle(0, 0, strokeWidth, 'black');
	
    context.translate(-canvas.width/2, -canvas.height/2);
}

 
window.setInterval(function() {
	updateTime(),
	drawClock()
}, 1000);
