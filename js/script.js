$(document).ready(function(){

    const cursor = document.querySelector('#curseur');
    document.addEventListener('mousemove', e => {
        cursor.style.left = e.pageX - 15 + 'px';
        cursor.style.top = e.pageY - 15 + 'px';
    })

    $('#cadre').mouseleave(function(){
        console.log("sortie");
        $(this).css({cursor: "auto"}); 
    });
    
    $("#cadre").mouseenter(function(){
        console.log("entrée");
        $(this).css({cursor: "none"});
    });

    var total_secondes = 9999;
    total_secondes += 1;
    var tps = document.getElementById("temps");

    function decompte()
    {
        total_secondes -= 1;

        if(total_secondes <= 0){
            prompt("Entre ton Prénom", "Michel");
        }
        else {
            tps.innerHTML = "Temps : " + total_secondes + "s";
            console.log("test");
            setTimeout(function(){ decompte(); }, 1000);
        }
    }
    decompte();
});