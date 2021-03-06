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

    var flame_max_health = 3;
    var localDifficulty = 1200;

    $('#facile').click(function(){
        vie.innerHTML = "Vie des flammes : 3";
        var flame_max_health = 3;
        var localDifficulty = 1200;
        $('#start').css('opacity', '1');
        $('#start').css('pointer-events', 'auto');
    });

    $('#moyen').click(function(){
        vie.innerHTML = "Vie des flammes : 5";
        var flame_max_health = 5;
        var localDifficulty = 800;
        $('#start').css('opacity', '1');
        $('#start').css('pointer-events', 'auto');
    });

    $('#diff').click(function(){
        vie.innerHTML = "Vie des flammes : 8";
        var flame_max_health = 8;
        var localDifficulty = 600;
        $('#start').css('opacity', '1');
        $('#start').css('pointer-events', 'auto');
    });

    $('#start').click(function(){
        $('#menu').css('display', 'none');
        decompte();
        boucleApparition();
    });
        //fin Menu

        //Img alea
        function randImg(){
            randSrc = getRandomInt(8);
            $("#" + i).attr('src','img/' + randSrc +'.png');
            $("#" + i).css('height', '80%');
    
    
            if(randSrc == 0 || randSrc == 7) {
                $("#" + i).css('height', '50%');
                //console.log('voiture');
            }
            else if(randSrc == 1) {
                $("#" + i).css('height', '100%');
                //console.log('arbre');
            }
        }

        for (var i = 0; i <= 8; i++) {
            randImg();
        }
    
        //Curseur
    const cursor = document.querySelector('#curseur');
    document.addEventListener('mousemove', e => {
        cursor.style.left = e.pageX - 15 + 'px';
        cursor.style.top = e.pageY - 15 + 'px';
    });

    $('#cadre').mouseleave(function(){
        console.log("sortie");
        $(this).css({cursor: "auto"}); 
        $('#curseur').css({display: "none"});
    });
    
    $("#cadre").mouseenter(function(){
        console.log("entrée");
        $(this).css({cursor: "none"});
        $('#curseur').css({display: "block"});
    });

        //Decompte du temps
    var total_secondes = 9999; //Changez ici pour le temps
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

        //Apparition des flammes 
    
    total_flammes = 0;

    function apparitionFlamme(){
        var choixalea = getRandomInt(9);

        if($('#' + choixalea).attr('class') == "objetFeu"){
            console.log("oups");
            return 0;
        }
        else {
            $('#' + choixalea).removeClass("objet").addClass("objetFeu");
            $('.objetFeu').attr('src', srcFeu + compteur + ".png");
            $('.objetFeu').attr('hp', flame_max_health);

            total_flammes++;
            console.log(total_flammes);
            return 1;
        }
        
    }
    function boucleApparition(){
        rep = apparitionFlamme();

        if(rep == 1){

            if(total_flammes > 8){
                prompt("Entre ton Prénom", "Michel");
            }
            else {
                setTimeout(function(){ boucleApparition(); }, localDifficulty);
            }
        }
        else if(rep == 0){
            boucleApparition();
        }
    }

        //Gestion du score + extinction des flammes

    var score = document.getElementById("score");
    var total_score = 0;
    var flame_health = 0;

    $('.objetFeu').hover(function(){
        console.log("hover feu !");
        if($(this).css('opacity') == 1){
            flame_health = $(this).attr('hp');
            flame_health--;
            console.log('vie restante : ' + flame_health);
            width = $(this).width() * 0.7;
            height = $(this).height() * 0.7;
            $(this).css({
                width: width,
                height: height,
                });

            if (flame_health <= 0){
                $(this).removeAttr('hp');
                console.log("flamme éteinte");
                $(this).css({opacity:"0"});
                
                total_score ++;
                score.innerHTML = "Score : " + total_score;

                apparitionFlamme();
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
        $('.objetFeu').css('height', '100%');
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

});