$(document).ready(function(){

    const cursor = document.querySelector('.curseur');
    document.addEventListener('mousemove', e => {
        cursor.style.left = e.pageX - 15 + 'px';
        cursor.style.top = e.pageY - 15 + 'px';
    })

    $('#cadre').mouseleave(function(){
        console.log("sortie");
        $(this).css({cursor: "auto"}); 
    });
    
    $("#cadre").mouseenter(function(){
        console.log("entrer");
        $(this).css({cursor: "url('cursor.png')"});
    });
    

});