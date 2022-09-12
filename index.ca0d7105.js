function e(e){}document.getElementById("search-box").addEventListener("input",(function(n){const t=n.currentTarget.value;console.log(t),(name,fetch("https://restcountries.com/v2/all?fields=name,capital,currencies,population,flags,languages").then((e=>e.json())).then(console.log)).then(e).catch((e=>console.log(e)))}));
//# sourceMappingURL=index.ca0d7105.js.map
