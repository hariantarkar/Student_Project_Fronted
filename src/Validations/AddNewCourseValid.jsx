export function validateNewCourse(str)
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
			span.innerHTML="Invalid Course Name:";
			span.style.color="red";
			span.style.padding="20px";
		}
	}
export function UpdateCourseValid(str)
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
			span.innerHTML="Invalid Course Name:";
			span.style.color="red";
			span.style.padding="20px";
		}
	}