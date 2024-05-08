//accessing the movie titles using fetch
function moviesArray(){
    fetch("https://json-api-yf7x.onrender.com/films")
    .then(res=>res.json())
    .then(moviesArray=>{
        displayMovieTitles(moviesArray)
        dispalyMovieOne(moviesArray[0])
    })
}
//creating a movie array
moviesArray()

//displaying the movie details by extracting
function handleClick(data){
    // console.log(movie)
    let h1=document.getElementById("title")
    h1.textContent=data.title
    let div=document.getElementById("runtime")
    div.textContent=`${data.runtime }`
    let p=document.getElementById("film-info")
    p.textContent=data.description
    let span=document.getElementById("showtime")
    span.textContent=data.showtime
    let span2=document.getElementById("ticket-num")
    span2.textContent=data.capacity-data.tickets_sold
    let img=document.getElementById("poster")
    img.src=data.poster
    let btn = document.getElementById("buy-ticket");
    btn.removeEventListener("click", handleTicket);
    btn.addEventListener("click", () => handleTicket(span2, data));

}
//displaying the first movies details
function dispalyMovieOne(data){  
    let h1=document.getElementById("title")
    h1.textContent=data.title
    let div=document.getElementById("runtime")
    div.textContent=`${data.runtime } ` 
    let p=document.getElementById("film-info")
    p.textContent=data.description
    let span=document.getElementById("showtime")
    span.textContent=data.showtime
    let span2=document.getElementById("ticket-num")
    span2.textContent=data.capacity-data.tickets_sold
    let img=document.getElementById("poster")
    img.src=data.poster
    let btn = document.getElementById("buy-ticket");
    btn.removeEventListener("click", handleTicket);
    btn.addEventListener("click", () => handleTicket(span2,data));

}
//handling the buy ticket button
function handleTicket(span2, data) {
    // console.log(data.tickets_sold)
    let count = parseInt(span2.textContent);
    if (count > 0) {
      count -= 1;
      span2.textContent = count;
    }
    console.log(data.id)
    fetch(`https://json-api-yf7x.onrender.com/films/${data.id}`,{
        method:"PATCH",
        headers:{
            "Content-Type": "application/json"  
        },
        body: JSON.stringify({
            tickets_sold: data.tickets_sold + 1 
          }),
    }
    )
    .then(res=>res.json())
    .then(updated=>console.log(updated))
  }
//adding a delete button to the movie titles 
  function handleDelete(movie){
    fetch(`https://json-api-yf7x.onrender.com/films/${movie.id}`,{
        method:"DELETE"
    })
    .then(res=>res.json)
  }
  //deleting a movie title from list
  function displayMovieTitles(moviesarray){
    let ul=document.getElementById("films")
    ul.innerHTML=""  
    moviesarray.map(movie=>{
        let li=document.createElement("li")
        let btn =document.createElement("button")
        btn.textContent= "DELETE" 
        btn.addEventListener("click",()=>handleDelete(movie))
        btn.className="btn" 
        li.className="film item"
        li.addEventListener("click",()=>handleClick(movie))
        li.textContent=`${movie.title}`
        li.append(btn)
        ul.appendChild(li)
    })

    
}
