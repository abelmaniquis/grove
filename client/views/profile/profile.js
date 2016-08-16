$(document).ready(function(){
  
  var displayName = "";
  $.getJSON("profile/mine",function(data){
    if(data.hasOwnProperty('name')){
      displayName = (data.username.local.name);
    }
    else{
      console.log("Does not have this data");
    };
  });
  console.log(displayName);
});