
export function validateEmail(e) {
    let str = e.target.value.trim().toLowerCase();  // normalize lowercase
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


    if (/\s/.test(str)) {
        setInvalid("Invalid Email: spaces not allowed");
        return;
    }


    if (!/^[a-z0-9._@-]+$/.test(str)) {
        setInvalid("Invalid Email: invalid characters");
        return;
    }

    if (str.includes("..")) {
        setInvalid("Invalid Email: consecutive dots not allowed");
        return;
    }
    const atIndex = str.indexOf("@");
    if (atIndex <= 0 || atIndex !== str.lastIndexOf("@")) {
        setInvalid();
        return;
    }

    const local = str.slice(0, atIndex);
    const domainFull = str.slice(atIndex + 1);

    if (domainFull.startsWith(".")) {
        setInvalid("Invalid Email: dot not allowed right after @");
        return;
    }


    const lastDot = str.lastIndexOf(".");
    if (lastDot === -1 || lastDot < atIndex + 2) {
        setInvalid();
        return;
    }


    const domainParts = domainFull.split(".");
    if (domainParts.some(part => part.length === 0)) {
        setInvalid("Invalid Email: empty domain section");
        return;
    }

    
    const extension = domainParts[domainParts.length - 1];
    if (!/^[a-z]{2,4}$/.test(extension)) {
        setInvalid("Invalid Email: wrong domain extension");
        return;
    }


    setValid();
}

export function Passwordvalid(str)
{
		let flag=false;
		let span=document.getElementById("passwordMessage");
		const allowSymbol=['@','#','$','&','_'];
	if(str.length < 8)
	{
			span.innerHTML="password at list 8 char";
			span.style.color="red";
			return;
	}
			let digit=false;
			let upper=false;
			let lower=false;
			let symbol=false;
			let isvalid=true;
		for(var i=0;i<str.length;i++)
		{
			const Char=str[i];
			
			const ascii=str.charCodeAt(i);
			
			if(ascii>=48 && ascii<=57) 
			{
				digit=true;
			}
			else if(ascii >=65 && ascii<=90)
			{
				upper=true;
			}
			else if(ascii>=97 && ascii <=122)
			{
				lower=true;
			}
			else if(allowSymbol.indexOf(Char)!==-1)
			{
				symbol=true;
			}
			else
			{
				isvalid=false;
				break;
			}
		}
		
		if(!isvalid)
		{
			span.innerHTML="password contain invalid ";
			span.style.color="red";
			return;
		}
		if(digit && upper && lower && symbol )
		{
			span.innerHTML="";
			span.style.color="white";
			return;
		}
		else
		{
			span.innerHTML="include upper and lower case letters, digits, and symbols";
			span.style.color="red";
		}
}
		
	
