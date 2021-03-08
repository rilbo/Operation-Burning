$(document).ready(function(){

    function getRandomInt(max){
        return Math.floor(Math.random() * Math.floor(max));
    }

        //Menu
    $('#selection p').hover(function(){
        RandomColor = Math.floor(Math.random()*16777215).toString(16);
        $(this).css('background-color', '#' + RandomColor);

        var complement = 0xffffff ^ RandomColor;
        $(this).css('color', '#' + complement);
        
    });

    $('#selection p').mouseleave(function(){
        $(this).css('background-color', 'white');
        $(this).css('color', 'black');
    });

    $('#start').hover(function(){
        $(this).css('background-color', 'white');
        $(this).css('color', 'black');
    });

    $('#start').mouseleave(function(){
        $(this).css('background-color', 'black');
        $(this).css('color', 'white');
    });

        //fin Menu

        //Img alea
        function randImg(id){
            randSrc = getRandomInt(8);
            $("#" + id).attr('src','img/' + randSrc +'.png');
            $('#' + id).removeClass("objetFeu");
            $('#' + id).addClass("objet");
            $('#' + id).width('35%');
            $('#' + id).height('65%');

    
    
            if(randSrc == 0 || randSrc == 7) {
                $('#' + id).height('50%');
                $('#' + id).width('60%');
                //console.log('voiture');
            }
            else if(randSrc == 1) {
                $('#' + id).height('100%');
                $('#' + id).width('25%');
                //console.log('arbre');
            }
        }

        for (var i = 0; i <= 8; i++) {
            randImg(i);
        }
    
        //Curseur
    const cursor = document.querySelector('#curseur');
    document.addEventListener('mousemove', e => {
        cursor.style.left = e.pageX - 15 + 'px';
        cursor.style.top = e.pageY - 15 + 'px';
    });

    $('#cadre').mouseleave(function(){
        $(this).css({cursor: "auto"}); 
        $('#curseur').css({display: "none"});
    });
    
    $("#cadre").mouseenter(function(){
        $(this).css({cursor: "none"});
        $('#curseur').css({display: "block"});
    });

        //Decompte du temps
    var total_secondes = 30; //Changez ici pour le temps
    var tps = document.getElementById("temps");

    function decompte()
    {
        total_secondes -= 1;

        if((total_secondes <= 0) || (total_flammes >= 8)){
            prompt("Entre ton Prénom", "Michel");
            $('#menu').css('display', 'block');
        }
        else {
            tps.innerHTML = "Temps : " + total_secondes + "s";
            setTimeout(function(){ decompte(); }, 1000);
        }
    }

        //Gestion du game over + apparition des flammes 
    
    total_flammes = 0;

    function apparitionFlamme(){
        var choixalea = getRandomInt(8) + 1;

        if($('#' + choixalea).attr('class') == "objetFeu"){
            return 0;
        }
        else {
            $('#' + choixalea).addClass("objetFeu");
            $('#' + choixalea).removeClass("objet");
            $('#' + choixalea).attr('src', srcFeu + compteur + ".png");
            $('#' + choixalea).attr('hp', flame_max_health);
            $('#' + choixalea).height('100%');
            $('#' + choixalea).width('55%');
        return 1;
        }
        
    }
    function boucleApparition(){
        rep = apparitionFlamme();

        if(rep == 1){
            total_flammes++;
            //console.log("total_flammes : " + total_flammes);
            setTimeout(function(){ boucleApparition(); }, localDifficulty);
        }
        else if((total_secondes <= 0) || (total_flammes >= 8)){
            console.log("Partie terminée !");
        }
        else {
            boucleApparition();
        }
    }

        //Gestion du score + extinction des flammes

    var score = document.getElementById("score");
    var total_score = 0;
    var flame_health = 0;

    $('.objet').mouseover(function(){
        if($(this).attr('class') == "objetFeu"){
            flame_health = $(this).attr('hp');
            flame_health--;
            //console.log('vie restante : ' + flame_health);
            width = $(this).width() * 0.7;
            height = $(this).height() * 0.7;
            $(this).css({
                width: width,
                height: height,
            });

            if (flame_health <= 0){
                $(this).removeAttr('hp');
                //console.log("flamme éteinte");
                total_flammes--;

                CurrentID = $(this).attr('id');
                randImg(CurrentID);

                total_score ++;
                score.innerHTML = "Score : " + total_score;
            }
            else if (flame_health > 0){
                $(this).removeAttr('hp');
                $(this).attr('hp', flame_health);
            }
        }
    });
 
        //Gestion des animations
    srcFeu = "img/feu_pos_";
    srcEau = "img/eau_pos_";
    compteur = 1;   

    function mouvement(){
        
        $('.objetFeu').attr('src', srcFeu + compteur + ".png");
        $('#eau').attr('src', srcEau + compteur + ".png");
        compteur++;

        if(compteur >= 4){
            compteur = 1;
        }
    setTimeout(function(){ mouvement(); }, 100);
    }
    mouvement();

    function pinpon(){
        if($(cursor).css('left') <= '300px'){
            $('#pompier').attr('src', "img/pompier_vise_gauche.png");
        }
        else if($(cursor).css('left') >= '430px'){
            $('#pompier').attr('src', "img/pompier_vise_droite.png");
        }
        else{
            $('#pompier').attr('src', "img/pompier_vise_milieu.png");
        }
    setTimeout(function(){ pinpon(); }, 250);
    }
    pinpon();


    $('#start').click(function(){
        $('#menu').css('display', 'none');
        decompte();
        boucleApparition();
    });

});

var flame_max_health;
var localDifficulty;

function menu(a, b){
    vie.innerHTML = "Vie des flammes : " + a;
    flame_max_health = a;
    localDifficulty = b;
    console.log("flame_max_health : " + flame_max_health + " | localDifficulty : " + localDifficulty);
    $('#start').css('opacity', '1');
    $('#start').css('pointer-events', 'auto');
}