

const formElement=document.querySelector('form');

formElement.addEventListener('submit',(e)=>{
    e.preventDefault();
    document.getElementById("message").innerHTML="Loading";
    const searchvalue= document.forms[0]["location"].value;
    console.log("submit event fired"+ "value seaarched: "+searchvalue);
    fetch('/weather?address='+searchvalue).then((response)=>{
      response.json().then((data)=>{
        if(data.error)
        {
          document.getElementById("message").innerHTML=data.error
        }
        else {
          document.getElementById("message").innerHTML="For location: "+ data.location + ", "+data.forecast;
        }
   })
})
})