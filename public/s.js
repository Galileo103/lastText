"use strict";
var mycontext={code:""};
//var soundcheck = true;

function wellappend()
{
	$("#chatbox").append("<div class = 'well well-sm'>" +$("#mycomment").val()+ "</div>");
	  var params= {
       "input": $("#mycomment").val(),
        "context": mycontext
    }; 
/*	$.post("/conv",
    {
        input: $("#mycomment").val(),
        context: mycontext
    },
    function(data, status){
        mydata=JSON.parse(data);
		$("#chatbox").append("<div class = 'well well-sm'>" +mydata.output.text[0]+ "</div>");
		mycontext=data.context;		
    	playsound(mydata.output.text[0]);
    })*/
    $.post("/conv",params).done(function onSucess(dialog){
    	console.log("before context: "+JSON.stringify(mycontext));
    	mycontext=dialog.context;	
    	console.log("after context: "+JSON.stringify(mycontext));
    	console.log(JSON.stringify(dialog.output));
    	console.log(dialog.output);
    	
    	// IF MAP
    	if(dialog.output.text === "MAP")
    	{
    		
    	}
    	//IF MUSIC 
    	else if (dialog.output.text === "Music")
    	{
    		
    		
    	}    	
    	//ELSE
    	else
    	{
    		
    	}
    		$("#chatbox").append("<div class = 'well well-sm' style='background-color: #0099FF'>" +dialog.output.text+ "</div>");
    	playsound(dialog.output.text);
    	
    });
	$("#mycomment").val('');
}

function sendcod(codetxt)
{
	console.log("code is "+codetxt);
	
	console.log(JSON.stringify(mycontext));
	mycontext.code=codetxt;
	
	  var params= {
        input: $("#mycomment").val(),
        context: mycontext
    }; 
/*	$.post("/conv",
    {
        input: $("#mycomment").val(),
        context: mycontext
    },
    function(data, status){
        mydata=JSON.parse(data);
		$("#chatbox").append("<div class = 'well well-sm'>" +mydata.output.text[0]+ "</div>");
		mycontext=data.context;		
    	playsound(mydata.output.text[0]);
    })*/
    $.post("/conv",params).done(function onSucess(dialog){
    	mycontext=dialog.context;	
    	console.log(JSON.stringify(dialog.output));
    		$("#chatbox").append("<div class = 'well well-sm' style='background-color: #0099FF'>" +dialog.output.text+ "</div>");
    		mycontext.code="";
    	playsound(dialog.output.text);
    	
    });
	
}
function playsound(text)
{
	//while(soundcheck === false){}
	//soundcheck = true;
	 var audio = $("#mysound");      
    $("#mysrc").attr("src", "/sync2?"+"txt=" +text);
    /****************/
    audio[0].pause();
    audio[0].load();//suspends and restores all audio element

    //audio[0].play(); changed based on Sprachprofi's comment below
    audio[0].oncanplaythrough = audio[0].play();
    /****************/
  // soundcheck = false;
}


$( document ).ready(function() {
	    	console.log("context: "+JSON.stringify(mycontext));
    console.log( "ready!" );
    refresh();
  var params= {
        "input": "",
        "context": mycontext
    };  	
/*	$.post("/conv",
    {
        input: $("#mycomment").val(),
        context: mycontext
    },
    function(data, status){
        mydata=JSON.parse(data);
		$("#chatbox").append("<div class = 'well well-sm'>" +mydata.output.text[0]+ "</div>");
		mycontext=data.context;		
    	playsound(mydata.output.text[0]);
    })*/
    $.post("/conv",params).done(function onSucess(dialog){
    	mycontext=dialog.context;	
    	console.log("context: "+JSON.stringify(mycontext));
    		$("#chatbox").append("<div class = 'well well-sm' style='background-color: #0099FF'>" +dialog.output.text+ "</div>");
    	playsound(dialog.output.text);
    	
    });
    
    
    
    ;
});