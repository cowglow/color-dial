const dial = document.querySelector(".dial");
const label = document.querySelector(".label");
const container = document.querySelector("body");

let angle = 0;
let isDragging = false;
let startAngle;
let centerX;
let centerY;

dial.addEventListener("mousedown", startDrag);
dial.addEventListener("touchstart", startDrag);

function startDrag(event) {
  event.preventDefault();
  isDragging = true;
  const dialRect = dial.getBoundingClientRect();
  centerX = dialRect.left + dialRect.width / 2;
  centerY = dialRect.top + dialRect.height / 2;
  startAngle = getAngle(event);

  document.addEventListener("mousemove", dragDial);
  document.addEventListener("mouseup", stopDrag);

  document.addEventListener("touchmove", dragDial, { passive: false });
  document.addEventListener("touchend", stopDrag);
}

function dragDial(event) {
  if (isDragging) {
    event.preventDefault();
    const currentAngle = getAngle(event);
    const rotateAngle = ((currentAngle - startAngle) * 180) / Math.PI;
    angle += rotateAngle;
    angle = (angle + 360) % 360;
    startAngle = currentAngle;
    updateView(angle);
  }
}

function stopDrag() {
  isDragging = false;
  document.removeEventListener("mousemove", dragDial);
  document.removeEventListener("mouseup", stopDrag);
  document.removeEventListener("touchmove", dragDial);
  document.removeEventListener("touchend", stopDrag);
}

function getAngle(event) {
  if (event.type.startsWith("touch")) {
    const touch = event.touches[0];
    return Math.atan2(touch.clientY - centerY, touch.clientX - centerX);
  } else {
    return Math.atan2(event.clientY - centerY, event.clientX - centerX);
  }
}

function updateView(angle) {
  container.style.filter = `hue-rotate(${angle}deg)`;
  dial.style.transform = `rotate(${angle}deg)`;
  label.innerHTML = Math.trunc(angle).toString();
}
