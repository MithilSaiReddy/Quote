const TOKEN = "x"//"HFtJ8YEqD9ngc4aNmwZAeSBLVPpQ7fhbjMKC3X5TyvUzskRru"; //token



async function loadQuote()
{
	const urlParams = new URLSearchParams(window.location.search);
	const userToken = urlParams.get("token");
	console.log("Token from url",userToken);
	
	if(userToken !== TOKEN)
	{
		document.body.innerHTML = "<h1>Access Denied</h1>";
		
		return;
	}
	
	/*if(window.history.replaceState)
	{
		window.history.replaceState(null,null,window.location.pathname);
	}*/
		
	try
	{
		const response = await fetch("gita.json");
		const verses = await response.json();
		
		let startDate = new Date(25, 3, 3);
		let today = new Date();
		let daySinceStart = Math.floor((today - startDate) / (1000 * 60 * 60 * 24));
		let dayIndex = daySinceStart % verses.length;
		
		const quoteEle = document.getElementById("quote");
		
		quoteEle.textContent = verses[dayIndex];
	}
	catch (error)
	{
		console.error("error loading verses:",error);
		document.getElementById("quote").textContent = "FAILED TO LOAD VERSE";
	}
}

document.addEventListener("DOMContentLoded",loadQuote());


