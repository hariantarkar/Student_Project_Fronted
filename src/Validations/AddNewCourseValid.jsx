export function validateNewCourse(str) {
    str = str.trim().toLowerCase();
    let flag = true;
    let span = document.getElementById("s");

    for (let i = 0; i < str.length; i++) {
        const code = str.charCodeAt(i);
        if (i === 0 && code === 46) {
            if (str.length === 1) {
                flag = false;
                break;
            }
            if (str.charCodeAt(1) === 32) {
                if (
                    str.length < 3 || 
                    !(str.charCodeAt(2) >= 97 && str.charCodeAt(2) <= 122)
                ) {
                    flag = false;
                    break;
                }
            }
            
            else if (!(str.charCodeAt(1) >= 97 && str.charCodeAt(1) <= 122)) {
                flag = false;
                break;
            }

            continue;
        }

       
        if (!( (code >= 97 && code <= 122) || code === 32 )) {
            flag = false;
            break;
        }
    }

    if (flag) {
        span.innerHTML = "";
        span.style.color = "white";
        span.style.padding = "20px";
    } else {
        span.innerHTML = "Invalid Course Name:";
        span.style.color = "red";
        span.style.padding = "20px";
    }
}

export function UpdateCourseValid(str) {

    return validateNewCourse(str);
}
