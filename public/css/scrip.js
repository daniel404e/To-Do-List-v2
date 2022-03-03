  var finished = [] ;
  





//-----------------------------------------------------





  function pageupdate()
  {


    var blclicks=0;
  var temp =  JSON.parse(document.getElementById("cache").innerText);

  for(var i=0; i< temp.length;i++)
  {    
         finished[i]=temp[i];

         if(finished[i]==1)
         {
             var element = document.getElementById(i);  
             element.classList.toggle("active"); 

  
           blclicks++;
         }
 

  }

  console.log(blclicks);
  var noftasks = document.getElementById("iosid").innerHTML;

  if(blclicks > 0)
  {
  var percentage1 = blclicks/noftasks *100; 
    
  document.getElementById("pgbar").style = "width:"+percentage1+"%";

  document.getElementById("pgbar").innerText = Math.floor(percentage1)+"%";

  }

  for(var i =0;i< 2*noftasks;i++)
  {
  
    document.getElementsByClassName("qsd")[i].value = JSON.stringify(finished);

  }


    
   
  

  

  

}


pageupdate();


 
  //--------------------------------------------------------------------------------------------------------------





  function makeActive(e) {  


    

    var blueclicks=0;
    if (finished[e] != 1)
    {
     finished[e] = 1;     
    }
    else
    {
     finished[e] = 0; 
    }   
    
         
         var element = document.getElementById(e);  
      element.classList.toggle("active"); 
      
      for(var i=0;i < finished.length; i++)
      {
            if(finished[i]==1)
            {
               blueclicks++;
            }
            else
            {
                finished[i]=0;
            }
            

      }
  
       

        noftasks = document.getElementById("iosid").innerHTML;


      var percentage = blueclicks/noftasks *100;

    

    
      document.getElementById("pgbar").style = "width:"+percentage+"%";


      document.getElementById("pgbar").innerText = Math.floor(percentage)+"%";

      
      
       

      
       
      for(var i =0;i< 2*noftasks;i++)
      {
      
        document.getElementsByClassName("qsd")[i].value = JSON.stringify(finished);

      }
      
     
    }   
         
      
   
     
    
    function superfunc()
    {
      document.querySelector('.dots4').classList.toggle("active");

       if(document.querySelector('.dots4').classList.contains("active") == 1){      // if 3dots clicked 
        document.getElementById("klmj").classList.remove("bringback");
        document.getElementById("klmj").classList.add("bringfront");
         document.getElementById("uniqs").classList.add("shadowed");
        document.getElementById("drpdn").style.opacity=1;
        document.getElementById("opq").classList.remove("posc");
        document.getElementById("opqw").classList.remove("posc");
        document.getElementById("opqwe").classList.remove("posc");
        
       }
       else{                                                            //is 3dots not clicked

        document.getElementById("klmj").classList.add("bringback");
        document.getElementById("klmj").classList.remove("bringfront");
         document.getElementById("uniqs").classList.remove("shadowed");
        document.getElementById("drpdn").style.opacity=0;

        document.getElementById("opq").classList.add("posc");
        document.getElementById("opqw").classList.add("posc");
        document.getElementById("opqwe").classList.add("posc");
       }


       
      //  onclick="document.querySelector('.dots4').classList.toggle('active');" 
    }
    
    //document.querySelector('.dots4').classList.remove("active");
   
    //superfunc();
     
   

   // document.querySelector('.posc').classList.remove("posc");

  
     
     


    