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
		
	
