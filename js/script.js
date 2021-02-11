$(document).ready(function(){

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

    $('#facile').click(function(){
        vie.innerHTML = "Vie des flammes : 3";
        
    });

    $('#moyen').click(function(){
        vie.innerHTML = "Vie des flammes : 5";
        
    });

    $('#diff').click(function(){
        vie.innerHTML = "Vie des flammes : 8";
        
    });

    $('#start').click(function(){
        $('#menu').css('display', 'none');
        decompte();
        mouvement();
    });



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

    var total_secondes = 9999; //Changez ici pour le temps
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


    var score = document.getElementById("score");
    var total_score = 0;
    var flame_health = 0;
    var flame_max_health = 3; //Changez ici pour la difficulté

    
    //$('.objetFeu').css({display: "none"});
    
    function getRandomInt(max) {
        return Math.floor(Math.random() * Math.floor(max));
      }
      
      let nomClasse = ["barbecue", "voiture1", "batiment", "poubelle", "arbre", "maison", "voiture2", "baril"]
      let compteurtab = 8;

    function apparitionFlamme(){
        var choixalea = getRandomInt(compteurtab);
        compteurtab -- ;
        var choixImg = nomClasse[choixalea];
        $('#'+choixImg).removeClass("objet").addClass("objetFeu");
        $(".objetFeu").attr('src','img/feu_pos_1.png'); 
        nomClasse.splice(choixalea, 1);
        eteindreFlamme(); 
    }

    apparitionFlamme();

    function eteindreFlamme(){

        $('.objetFeu').attr('hp', flame_max_health);
        $('.objetFeu').mouseover(function(){
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
    }

    srcFeu = "img/feu_pos_";
    srcEau = "img/eau_pos_";
    compteur = 1;   

    function mouvement()
    {
        
        $('.objetFeu').attr('src', srcFeu + compteur + ".png");
        $('#eau').attr('src', srcEau + compteur + ".png");
        compteur++;

        if(compteur >= 4){
            compteur = 1;
        }
    setTimeout(function(){ mouvement(); }, 100);
    }

    function pinpon()
    {
        if($('#curseur').css('left') <= '300px'){
            $('#pompier').attr('src', "img/pompier_vise_gauche.png");
        }
        else if($('#curseur').css('left') >= '430px'){
            $('#pompier').attr('src', "img/pompier_vise_droite.png");
        }
        else{
            $('#pompier').attr('src', "img/pompier_vise_milieu.png");
        }
    setTimeout(function(){ pinpon(); }, 250);
    }
    pinpon();

});