export function FullNameValid(str)
	{
		str=str.toLowerCase();
		let flag=true;
		let span=document.getElementById("s");
		
		  for (var i = 0; i < str.length; i++) {
        if (!( (str.charCodeAt(i) >= 97 && str.charCodeAt(i) <= 122) || str.charCodeAt(i) == 32 )) {
            flag = false;
        }
    }
		if(flag)
		{
			span.innerHTML="";
			span.style.color="white";
			span.style.padding="20px";
		}
		else
		{
			span.innerHTML="Invalid Name:";
			span.style.color="red";
			span.style.padding="20px";
		}
	}
    export function validateEmail(e) {
    const str = e.target.value;  
    const dot = str.lastIndexOf(".");
    const domain = dot > 0 ? str.slice(dot + 1) : "";
    console.log("domain: ", dot, domain);

    let index = str.indexOf("@");
    let index1 = str.lastIndexOf("@");

    let span = document.getElementById("s");

    if (index <= 0 || index !== index1) {
        span.innerHTML = "Invalid Email";
        span.style.color = "red";
        e.target.style.borderColor = "red";  
    } else {
        let as = str.substring(index + 1);
        index = as.indexOf(".");
        index1 = as.lastIndexOf(".");

        if (
            (index === -1 || index !== index1) ||
            ((index !== as.length - 4 && index !== as.length - 3) && domain.length > 3)
        ) {
            span.innerText = "Invalid Email";
            span.style.color = "red";
            e.target.style.borderColor = "red";
        } else {
            span.innerHTML = "";
            span.style.color = "green";
            e.target.style.borderColor = "green";
        }
    }
}
export function SubjectValid(str)
	{
		str=str.toLowerCase();
		let flag=true;
		let span=document.getElementById("sub");
		
		  for (var i = 0; i < str.length; i++) {
        if (!( (str.charCodeAt(i) >= 97 && str.charCodeAt(i) <= 122) || str.charCodeAt(i) == 32 )) {
            flag = false;
        }
    }
		if(flag)
		{
			span.innerHTML="";
			span.style.color="white";
			span.style.padding="20px";
		}
		else
		{
			span.innerHTML="Invalid Subject Name:";
			span.style.color="red";
			span.style.padding="20px";
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
                str.charCodeAt(i) === 63    
            )
        ) {
            flag = false;
        }
    }

    if (flag) {
        span.innerHTML = "";
        span.style.color = "green";
        span.style.padding = "10px";
    } else {
        span.innerHTML = "Invalid message ";
        span.style.color = "red";
        span.style.padding = "10px";
    }
}
