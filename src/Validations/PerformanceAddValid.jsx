export function validateScore(value, spanId, fieldName) {
  let span = document.getElementById(spanId);
  let num = parseInt(value, 10);

  if (!isNaN(num) && num >= 0 && num <= 10) {
    span.innerHTML = "";
    span.style.color = "white";
    span.style.padding = "5px";
  } else {
    span.innerHTML = `Invalid ${fieldName}: must be between 0 to 10`;
    span.style.color = "red";
    span.style.padding = "5px";
  }
}
