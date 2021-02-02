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
        //$(this).css({cursor: "none"});
    });

    var total_secondes = 9999;
    total_secondes ++;
    var tps = document.getElementById("temps");

    function decompte()
    {
        total_secondes -= 1;

        if(total_secondes <= 0){
            prompt("Entre ton Prénom", "Michel");
        }
        else {
            tps.innerHTML = "Temps : " + total_secondes + "s";
            setTimeout(function(){ decompte(); }, 1000);
        }
    }
    decompte();


    var score = document.getElementById("score");
    var total_score = 0;
    var flame_health = 0;
    var flame_max_health = 3;

    $('.objet').attr('hp', flame_max_health);


    $('.objet').click(function(){
        if($(this).css('opacity') == 1){
            flame_health = $(this).attr('hp');
            flame_health--;
            console.log('vie restante : ' + flame_health);

            if (flame_health <= 0){
                $(this).removeAttr('hp');
                console.log("flame éteinte");
                $(this).css({opacity:"0"});

                total_score ++;
                score.innerHTML = "Score : " + total_score;
            }
            else if (flame_health > 0){
                $(this).removeAttr('hp');
                $(this).attr('hp', flame_health);
            }
        }
    });
});