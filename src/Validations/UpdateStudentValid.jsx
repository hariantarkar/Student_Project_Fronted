export function FullNameValid(str) {
  const span = document.getElementById("nameError");
  const flag = /^[a-zA-Z ]+$/.test(str);
  span.innerHTML = flag ? "" : "Invalid Name: Only letters and spaces allowed";
  span.style.color = flag ? "white" : "red";
  return flag;
}

export function PhoneValid(phone) {
  const span = document.getElementById("phoneError");

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

export function validateEmailValue(input) {
  const span = document.getElementById("emailError");
  const raw = typeof input === "string" ? input : (input && input.value) || "";

  const setError = (msg) => {
    if (span) {
      span.innerText = msg;
      span.style.color = "red";
    }
    return false;
  };
  const clearError = () => {
    if (span) {
      span.innerText = "";
      span.style.color = "white";
    }
    return true;
  };

  if (raw.length === 0) return setError("Email is required");

  if (raw[0] === " ") return setError("Invalid Email: no leading spaces allowed");

  const str = raw.trim();
  if (str.length === 0) return setError("Email is required");

  if (!/^[a-z0-9]$/i.test(str[0])) {
    return setError("Invalid Email: first character must be a letter or digit");
  }

  if (/\s/.test(str)) return setError("Invalid Email: spaces not allowed");

  if (!/^[a-z0-9._@-]+$/i.test(str))
    return setError("Invalid Email: invalid characters");

  if (str.includes(".."))
    return setError("Invalid Email: consecutive dots not allowed");

  const atIndex = str.indexOf("@");
  if (atIndex <= 0 || atIndex !== str.lastIndexOf("@"))
    return setError("Invalid Email: must contain exactly one @");

  const domainFull = str.slice(atIndex + 1);
  if (domainFull.startsWith("."))
    return setError("Invalid Email: dot not allowed after @");

  const domainParts = domainFull.split(".");
  if (domainParts.some((p) => p.length === 0))
    return setError("Invalid Email: empty domain section");


 const extension = domainParts[domainParts.length - 1];
  if (!/^[a-z]{2,4}$/i.test(extension)) return setError("Invalid Email: wrong domain extension");

  return clearError();
}