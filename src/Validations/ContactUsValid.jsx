
export function FullNameValid(str)
{
    str = str.toLowerCase();
    let flag = true;
    let span = document.getElementById("s");

    for (var i = 0; i < str.length; i++) {
        if (!((str.charCodeAt(i) >= 97 && str.charCodeAt(i) <= 122) || str.charCodeAt(i) == 32)) {
            flag = false;
        }
    }

    if (flag) {
        span.innerHTML = "";
        span.style.color = "white";
        span.style.padding = "20px";
        return true; 
    } else {
        span.innerHTML = "Invalid Name:";
        span.style.color = "red";
        span.style.padding = "20px";
        return false; 
    }
}

export function validateEmail(e) {
    let str = e.target.value.trim().toLowerCase();  
    e.target.value = str;
    const span = document.getElementById("s");

    const setInvalid = (msg = "Invalid Email") => {
        span.innerHTML = msg;
        span.style.color = "red";
        e.target.style.borderColor = "red";
    };

    const setValid = () => {
        span.innerHTML = "";
        span.style.color = "green";
        e.target.style.borderColor = "green";
    };

    if (/\s/.test(str)) { setInvalid("Invalid Email: spaces not allowed"); return false; }
    if (!/^[a-z0-9._@-]+$/.test(str)) { setInvalid("Invalid Email: invalid characters"); return false; }
    if (str.includes("..")) { setInvalid("Invalid Email: consecutive dots not allowed"); return false; }

    const atIndex = str.indexOf("@");
    if (atIndex <= 0 || atIndex !== str.lastIndexOf("@")) { setInvalid(); return false; }

    const domainFull = str.slice(atIndex + 1);
    if (domainFull.startsWith(".")) { setInvalid("Invalid Email: dot not allowed right after @"); return false; }

    const lastDot = str.lastIndexOf(".");
    if (lastDot === -1 || lastDot < atIndex + 2) { setInvalid(); return false; }

    const domainParts = domainFull.split(".");
    if (domainParts.some(part => part.length === 0)) { setInvalid("Invalid Email: empty domain section"); return false; }

    const extension = domainParts[domainParts.length - 1];
    if (!/^[a-z]{2,4}$/.test(extension)) { setInvalid("Invalid Email: wrong domain extension"); return false; }

    setValid();
    return true; 
}

export function SubjectValid(str)
{
    str = str.toLowerCase();
    let flag = true;
    let span = document.getElementById("sub");

    for (var i = 0; i < str.length; i++) {
        if (!((str.charCodeAt(i) >= 97 && str.charCodeAt(i) <= 122) || str.charCodeAt(i) == 32)) {
            flag = false;
        }
    }

    if (flag) {
        span.innerHTML = "";
        span.style.color = "white";
        span.style.padding = "20px";
        return true; 
    } else {
        span.innerHTML = "Invalid Subject Name:";
        span.style.color = "red";
        span.style.padding = "20px";
        return false; 
    }
}

export function TextMessageValid(str) {
    str = str.toLowerCase();
    let flag = true;
    let span = document.getElementById("msgBox");

    for (var i = 0; i < str.length; i++) {
        if (
            !(
                (str.charCodeAt(i) >= 97 && str.charCodeAt(i) <= 122) || 
                (str.charCodeAt(i) >= 48 && str.charCodeAt(i) <= 57) || 
                str.charCodeAt(i) === 32 || 
                str.charCodeAt(i) === 46 ||
                str.charCodeAt(i) === 44 || 
                str.charCodeAt(i) === 33 || 
                str.charCodeAt(i) === 63 ||
                str.charCodeAt(i) === 34     
            )
        ) {
            flag = false;
        }
    }

    if (flag) {
        span.innerHTML = "";
        span.style.color = "green";
        span.style.padding = "10px";
        return true; 
    } else {
        span.innerHTML = "Invalid message ";
        span.style.color = "red";
        span.style.padding = "10px";
        return false; 
    }
}
