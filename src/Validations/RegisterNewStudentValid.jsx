export function FullNameValid(str) {
  const span = document.getElementById("s");
  
  const flag = /^[a-zA-Z ]+$/.test(str);
  span.innerHTML = flag ? "" : "Invalid Name: Only letters and spaces allowed";
  span.style.color = flag ? "white" : "red";
  return flag;
}

export function validateEmailValue(str) {
  str = str.trim(); 
  const span = document.getElementById("s");

  if (str.length === 0) {
    span.innerHTML = "Email is required";
    span.style.color = "red";
    return false;
  }

  if (!/^[a-z0-9]/i.test(str[0])) {
    span.innerHTML = "Invalid Email: first character must be a letter or digit";
    span.style.color = "red";
    return false;
  }

  if (/\s/.test(str)) {
    span.innerHTML = "Invalid Email: spaces not allowed";
    span.style.color = "red";
    return false;
  }

  if (!/^[a-z0-9._@-]+$/i.test(str)) {
    span.innerHTML = "Invalid Email: invalid characters";
    span.style.color = "red";
    return false;
  }

  if (str.includes("..")) {
    span.innerHTML = "Invalid Email: consecutive dots not allowed";
    span.style.color = "red";
    return false;
  }

  const atIndex = str.indexOf("@");
  if (atIndex <= 0 || atIndex !== str.lastIndexOf("@")) {
    span.innerHTML = "Invalid Email: must contain exactly one @";
    span.style.color = "red";
    return false;
  }

  const domainFull = str.slice(atIndex + 1);

  if (domainFull.startsWith(".")) {
    span.innerHTML = "Invalid Email: dot not allowed after @";
    span.style.color = "red";
    return false;
  }

  const domainParts = domainFull.split(".");
  if (domainParts.some(part => part.length === 0)) {
    span.innerHTML = "Invalid Email: empty domain section";
    span.style.color = "red";
    return false;
  }

  const extension = domainParts[domainParts.length - 1];
  if (!/^[a-z]{2,4}$/i.test(extension)) {
    span.innerHTML = "Invalid Email: wrong domain extension";
    span.style.color = "red";
    return false;
  }

  span.innerHTML = "";
  span.style.color = "white";
  return true;
}

export function PhoneValid(phone) {
  const span = document.getElementById("p");

  if (!/^\d*$/.test(phone)) {
    span.innerHTML = "Only digits allowed";
    span.style.color = "red";
    return false;
  }

  if (phone.length !== 10) {
    span.innerHTML = "Phone number must be exactly 10 digits";
    span.style.color = "red";
    return false;
  }

  span.innerHTML = "";
  span.style.color = "white";
  return true;
}

export function Passwordvalid(str) {
  const allowSymbol = ["@", "#", "$", "&", "_"];
  const span = document.getElementById("passwordMessage");

  if (str.length < 8) {
    span.innerHTML = "Password must be at least 8 characters";
    span.style.color = "red";
    return false;
  }

  const digit = /[0-9]/.test(str);
  const upper = /[A-Z]/.test(str);
  const lower = /[a-z]/.test(str);
  const symbol = new RegExp("[" + allowSymbol.join("") + "]").test(str);
  const invalidChar = /[^a-zA-Z0-9@#$&_]/.test(str);

  if (invalidChar) {
    span.innerHTML = "Password contains invalid characters";
    span.style.color = "red";
    return false;
  }

  if (digit && upper && lower && symbol) {
    span.innerHTML = "";
    span.style.color = "white";
    return true;
  } else {
    span.innerHTML = "Include uppercase, lowercase, digits, and symbols";
    span.style.color = "red";
    return false;
  }
}
