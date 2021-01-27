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

    $('.objet').click(function(){
        if($(this).css('opacity') == 0){
        }
        else {

            if ($(this).attr('id') == 'obj1'){
                $(this).removeAttr('id');
                $(this).attr('id', 'obj2');
                console.log("2");
            }
            else if ($(this).attr('id') == 'obj2'){
                $(this).removeAttr('id');
                $(this).attr('id', 'obj3');
                console.log("3");
                $(this).css({opacity:"0"});

                total_score ++;
                score.innerHTML = "Score : " + total_score;
            }
            else {
                $(this).attr('id', 'obj1');
                console.log("1");
            }
        }
    });
});