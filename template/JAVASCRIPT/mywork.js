async function loadFiles() {
const response = await fetch("/showfotos");
const files = await response.json();



const filebox = document.getElementById('filebox');
files.forEach(file => {
   
     
     filebox.insertAdjacentHTML('beforeend',`<div> 

<img width="400px" height="300px" style="object-fit: cover;" src='` + file.path + `'/>
<input type="text" id="rating" onkeypress="enter(event,this)" name="rating" placeholder="Ihr Kommentar">
<div style="display:flex">
<div onclick="like(this)">
<svg id="herz" xmlns="http://www.w3.org/2000/svg" fill="black" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" height="20px" width="20px">
<path d="M11.645 20.91l-.007-.003-.022-.012a15.247 15.247 0 01-.383-.218 25.18 25.18 0 01-4.244-3.17C4.688 15.36 2.25 12.174 2.25 8.25 2.25 5.322 4.714 3 7.688 3A5.5 5.5 0 0112 5.052 5.5 5.5 0 0116.313 3c2.973 0 5.437 2.322 5.437 5.25 0 3.925-2.438 7.111-4.739 9.256a25.175 25.175 0 01-4.244 3.17 15.247 15.247 0 01-.383.219l-.022.012-.007.004-.003.001a.752.752 0 01-.704 0l-.003-.001z" />
</svg>
</div>
<p> ` + file.likes + `</p>

</div>
<div style="height:100px;overflow:scroll;">
<p> `+ file.comments.join('<br>') + `</p>
</div>
</div>`
 )


})
}

function enter(event,el) {
     
     if (event.key === "Enter") {
       
       event.preventDefault();
       // Trigger the button element with a click
       rating(el)
     }
   };

const rating = (el) => {
     fetch("/rating?comment=" + el.value + "&src=" + el.parentElement.getElementsByTagName('img')[0].src).then(() => location.reload())
}


const like = (el) => {
     fetch("/like?src=" + el.parentElement.parentElement.getElementsByTagName('img')[0].src).then(() => location.reload())
}




loadFiles();