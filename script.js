fetch("http://www.omdbapi.com/?s=Aquaman&i=tt3896198&apikey=433b12bb")
    .then(res => res.json())
    .then(data => console.log(data))