const express = require("express");
const bodyparser = require("body-parser");
const mongoose = require("mongoose");    //require mongodb packages

const app = express();
app.set('view engine', 'ejs');

app.use(bodyparser.urlencoded({extended : true }));
app.use(express.static("public"));


//mongodb+srv://<username>:<password>@cluster0.ounfc.mongodb.net/myFirstDatabase?retryWrites=true&w=majority
//mongodb://localhost:27017/todolistdb

mongoose.connect('mongodb+srv://joshuadaniel:Joshua12345@cluster0.ounfc.mongodb.net/todolistdb'); //connect to mongodb server


var itemz = [];
var listz =[];
var clicked =[];
var once=0;
var currentlist;

const itemzschema = new mongoose.Schema({ content: String }); //create new schema
const idindex = new mongoose.Schema({_id: Number, index: Number}); 

const itemmodel = mongoose.model("item",itemzschema); //create a new model

const listschema = new mongoose.Schema({lname: String , litems: [itemzschema] }); //create list schema

const listmodel = mongoose.model("list", listschema);



function findalllists()
{
    
    listmodel.find(function(err,data)                // reading the total data
    { 

        if(err)
        {
              console.log(err);
        }
        else{
         listz =[];
        data.forEach(element => {
            listz.push(element.lname);
            // console.log(listz);
        });

          }

          console.log(listz);

    });
    

    

}

function renderpage(res)
{
     
        res.render("list",{whatday: currentlist, additem: itemz , clicks: clicked ,alllists: listz });
     
    

}




function syncdbtoitems(ifrender,res) {





    listmodel.find(function(err,data)                // reading the total data
    { 

        if(err)
        {
              console.log(err);
        }
        else{
         listz =[];
        data.forEach(element => {
            listz.push(element.lname);
            // console.log(listz);
        });

          }

          console.log(listz);

   


  
     
    console.log(currentlist);
    if(currentlist == day)
    {
       
    itemmodel.find(function(err,data)                // reading the total data
    {       itemz =[];

    data.forEach(element => {
            
        itemz.push(element.content);
       
       
    });
    console.log("items are:");
    console.log(itemz);
     
    if (ifrender==1)
    {
      
        console.log(itemz);
        renderpage(res);
      
    }


    });
}

else
{
      
     

    listmodel.findOne({lname: currentlist} , function(err,res12){            // reading the total data
       
       if(err)
       {
              console.log(err);
       }
       else{
       
        itemz = [];
        temp1= res12.litems;
        temp1.forEach(element => {

           itemz.push( element.content );
            
            
        });
       
         //console.log(temp1);
         
    }
   
     
    if (ifrender==1)
    {
      
       
      renderpage(res);
      
    }
       


});               

 
 
}



 
 


////////////////////////

});
///////////////////////
    

}




if( once == 0)
{

    console.log("this is once");
var today = new Date();
var options = {

     weekday: "long",
     day: "numeric",
     month: "long"
    };
    var day = today.toLocaleDateString("en-US",options);
    currentlist = day;
    itemmodel.deleteMany({}, function(err,data){});
syncdbtoitems(0);     //run once only no more 
 
once =1;

}

app.get("/",function(req,res){

   
        syncdbtoitems(1,res);  
      
         
          

         

});




app.post("/",function(req,respo){
     
     
    var additem = req.body.newitem;
    var clickdataraw=[];
    var clickdatarefi=[];
    clickdataraw = req.body.inpclick2;
    clickdatarefi=JSON.parse(clickdataraw);
     
    if( currentlist == day){

        
    var data2send = new itemmodel({ content: additem });    // packaging the data to send
    
    itemmodel.insertMany([data2send],function(err){ if(err){console.log(err)}   //insertion of all the data into items collection
    else
{  
    console.log("successfull insertion ");
    itemz.push(additem);
    clicked=clickdatarefi; 
respo.redirect("/"); 
    
}



});

 
     
    //console.log(clickdatarefi);
  
    
    
}
else
{
    console.log("else is exec");

    /////////////
    listmodel.findOne({lname: currentlist} , function(err,res){             // reading the req data

        
        if(err)
        {
            console.log(err);
        }
        
        else
        { 
            


            var items2send = new itemmodel({ content:  additem });  

            listmodel.updateOne( { lname: currentlist }, { $push: { litems: items2send } } ,function(err,resd)
            {
                  console.log(err);
                  console.log(resd);

                  clicked=clickdatarefi;
                  respo.redirect("/");  


            });

          

         
       
        }
        


    });
    //////////////
   

}






   


});


app.post("/delete",function(req,respo){
     
     
    var todelete = req.body.dbutton;
    var clickdataraw=[];
    var clickdatarefi=[];
    clickdataraw = req.body.inpclick;
    
     clickdatarefi=JSON.parse(clickdataraw);
     



     if( currentlist == day)
     {
      
    clickdatarefi.splice(todelete,1);



    itemz.splice(todelete,1); 
    var idtodelete=0;                                //variable for id
    itemmodel.find(function(err,data)                // reading the total data
    {       

        if(err)
{
    console.log("error");
}

else
{
        var temp22=0;
        data.forEach(element => {
            
            if(temp22 == todelete)                                //getting the specficn id ti be deleted
            { 
                idtodelete=element._id;                            //the id is taken          
            }
            
           temp22=temp22+1; 
        });


    }
 console.log(idtodelete);    
 itemmodel.deleteOne({  _id: idtodelete },function(err){if(err){console.log(err);} else{ clicked=clickdatarefi;   respo.redirect("/");} });                    //deleting the specfic id entry

}


 
    
    );



    console.log(todelete); 
    console.log(clickdatarefi);
    

     }
     else
     {
          
        clickdatarefi.splice(todelete,1);

        itemz.splice(todelete,1); 
        var idtodelete=0;                                //variable for id
        listmodel.findOne({lname: currentlist} , function(err,data)                // reading the total data
        {       
    
            if(err)
    {
        console.log("error");
    }
    
    else
    {
            var temp22=0;
            var temp14= data.litems;
            temp14.forEach(element => {
                
                if(temp22 == todelete)                                //getting the specficn id ti be deleted
                { 
                    idtodelete=element._id;                            //the id is taken          
                }
                
               temp22=temp22+1; 
            });
    
    
        }
     console.log(idtodelete);    
     listmodel.findOneAndUpdate({lname: currentlist},{$pull: {litems: {_id: idtodelete}}} , function(err,datum){ if(err){console.log(err);} else{clicked=clickdatarefi;  respo.redirect("/");} });                //deleting the specfic id entry
    
    }
    
    
     
        
        );

         
     }








     


});










app.post("/createorsearch",function(req,respo){

   

    var tosearchorcreate = req.body.searchorcreatet;
  

    if(tosearchorcreate != "deleteallmylists")
    {
        currentlist = tosearchorcreate ;
        clicked=[];
     listmodel.findOne({lname: tosearchorcreate} , function(err,res){             // reading the req data

        
        if(err)
        {
            console.log(err);
        }
        
        else
        { 
          if(res)                   //if res exists then 
          {
             
          //  console.log(res.litems);
          respo.redirect("/");
        
        }

        else                    //if the list does not exist then create a anew one
        {
            var items2send = new itemmodel({ content: "New List Created" });   // packaging the data to send
            var data2send = new listmodel({ lname: tosearchorcreate , litems: [items2send]  });    // packaging the data to send
            
            listmodel.insertMany([data2send],function(err){ 
                
                if(err){
                    console.log(err);
                }   //insertion of all the data into items collection
            else
        {console.log("successfull insertion ");

        respo.redirect("/");
              }
        
        });
        }


        }
       


     });

     
    }
    else
    {
        currentlist = day ;
        clicked=[];
        itemmodel.deleteMany({}, function(err,data){});
        listmodel.deleteMany({}, function(err,data){respo.redirect("/");});
        console.log("deleting all your lists");
    }
        
     
   
      
    

    //console.log(tosearchorcreate);
    


});



app.post("/deletelist",function(req,respo){
             
    currentlist = day;
    var todeletwlist = req.body.deletelt;
    console.log("delete this "+ todeletwlist);
    listmodel.deleteOne({lname: todeletwlist} , function(err,res){ 

        if(err)
        {
            console.log(err);
        }

      if(res.deletedCount == 1)
      {
        respo.redirect("/");
      }
    });
     

    


});

 


app.listen(process.env.PORT || 3000,function(){console.log("on 3k");});
