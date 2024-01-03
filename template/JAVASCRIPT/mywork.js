async function loadFiles() {
const response = await fetch("/showfotos");
const files = await response.json();



const filebox = document.getElementById('filebox');
files.forEach(file => {
   
     
     filebox.insertAdjacentHTML('beforeend',`<div> 

<img height="300px" style="object-fit: cover;width:100%;border-radius:15px" src='` + file.path + `' onclick="clickpicture(this)"/>
<div class="imagebox" style="height:100px;overflow:scroll;display:none">
<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" style="width:30px;height:30px;"  onclick="closeComments(this)">
  <path stroke-linecap="round" stroke-linejoin="round" d="M9 15L3 9m0 0l6-6M3 9h12a6 6 0 010 12h-3" />
</svg>
<img height="1000px" style="object-fit: cover;width:100%;border-radius:15px" src='` + file.path + `'/>
</div>
<div style="display:flex;align-items:center;gap:10px;width:100%;margin-top:10px;margin-bottom:10px">

<div onclick="like(this)" style="display:flex;align-items:center;gap:10px">
<svg id="herz" xmlns="http://www.w3.org/2000/svg" fill="black" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" height="20px" width="20px">
<path d="M11.645 20.91l-.007-.003-.022-.012a15.247 15.247 0 01-.383-.218 25.18 25.18 0 01-4.244-3.17C4.688 15.36 2.25 12.174 2.25 8.25 2.25 5.322 4.714 3 7.688 3A5.5 5.5 0 0112 5.052 5.5 5.5 0 0116.313 3c2.973 0 5.437 2.322 5.437 5.25 0 3.925-2.438 7.111-4.739 9.256a25.175 25.175 0 01-4.244 3.17 15.247 15.247 0 01-.383.219l-.022.012-.007.004-.003.001a.752.752 0 01-.704 0l-.003-.001z" />
</svg>
<div>` + file.likes + `</div>
</div>

<input type="text" id="rating" onkeypress="enter(event,this)" name="rating" placeholder="Ihr Kommentar" style="margin-bottom:0px;margin-top:0px;border-radius:15px">
<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" onclick="openComments(this)" style="width:30px;height:30px;">
  <path stroke-linecap="round" stroke-linejoin="round" d="M7.5 8.25h9m-9 3H12m-9.75 1.51c0 1.6 1.123 2.994 2.707 3.227 1.129.166 2.27.293 3.423.379.35.026.67.21.865.501L12 21l2.755-4.133a1.14 1.14 0 01.865-.501 48.172 48.172 0 003.423-.379c1.584-.233 2.707-1.626 2.707-3.228V6.741c0-1.602-1.123-2.995-2.707-3.228A48.394 48.394 0 0012 3c-2.392 0-4.744.175-7.043.513C3.373 3.746 2.25 5.14 2.25 6.741v6.018z" />
</svg>

</div>
<div class="commentsbox" style="height:100px;overflow:scroll;display:none">
<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" style="width:30px;height:30px;"  onclick="closeComments(this)">
  <path stroke-linecap="round" stroke-linejoin="round" d="M9 15L3 9m0 0l6-6M3 9h12a6 6 0 010 12h-3" />
</svg>

<p>Kommentare Box</p>
<p> `+ file.comments.join('<br>') + `</p>
</div>
</div>`
 )


})
}

function clickpicture(el) {
     el.parentElement.querySelector('.imagebox').style = "width:1000px;height:1000px;display:block;position:fixed;z-index:999;top:50%;left:50%;transform:translate(-50%,-50%);background-color:white"
}


function openComments(el){
     el.parentElement.parentElement.querySelector('.commentsbox').style = "width:500px;height:500px;overflow:scroll;display:block;position:fixed;z-index:999;top:50%;left:50%;transform:translate(-50%,-50%);background-color:white";
}
function closeComments(el){
     el.parentElement.style = "display:none";
}

function enter(event,el) {
     
     if (event.key === "Enter") {
       
       rating(el)
     }
   };

//Zugriff auf comments, auf parentelement zugreifen
const rating = (el) => {
     fetch("/rating?comment=" + el.value + "&src=" + el.parentElement.parentElement.getElementsByTagName('img')[0].src).then(() => location.reload())
}

//Zugriff auf Likes, auf parentelement zugreifen
const like = (el) => {
     fetch("/like?src=" + el.parentElement.parentElement.getElementsByTagName('img')[0].src).then(() => location.reload())
}




loadFiles();