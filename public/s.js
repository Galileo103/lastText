
function playsound(text)
{
	 var audio = $("#mysound");      
    $("#mysrc").attr("src", "/sync2?"+"txt=" +text);
    /****************/
    audio[0].pause();
    audio[0].load();//suspends and restores all audio element

    //audio[0].play(); changed based on Sprachprofi's comment below
    audio[0].oncanplaythrough = audio[0].play();
    /****************/
}
$( document ).ready(function() {
    console.log( "ready!" );
    refresh();
});