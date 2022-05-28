$(document).ready(function(){
    //OSLUSKIVACI ZA UPUTSTVO
    let razumem1 = 0;
    let razumem2 = 0;
    $(".razumem").click(function(){
        let id = $(this).attr("id");
        if(id == "razumem1" ){
            razumem1 = 1;
        }
        if(id == "razumem2"){
            razumem2 = 1;
        }
        if(razumem1 == 1 & razumem2 == 1){
            window.location.href = "asocijacije-igra.html";
            alert("Igraci Upisite Svoja Imena i Time Zapocnite Igru");
        }
    })



    let ass = [
        {
            DG : [],
            LG : [],
            DD : [],
            LD : [],
            kon : "_"
        }
    ]

    let Igrac1 ={
        ozn: "Igrac1P",
        ime : '',
        poeni : 0,
        color: "tomato",
    }

    let Igrac2 ={
        ozn: "Igrac2P",
        ime : '',
        poeni : 0,
        color: "cornflowerblue",
    }
    let trenutniIgrac = Igrac1;


    //RANDOMIZOVANJE
    let random = 1;
    function Randomizuj (){
        let brojA = Math.floor(Math.random() * 6);
        random = brojA
    }

    //INICIJALIZACIJA
    function Inicijalizuj(){
        let assoc = localStorage.getItem("assoc");
        if(assoc != null){
            ass = JSON.parse(assoc);
        }
        else{
            localStorage.setItem("assoc",JSON.stringify(ass));
        }
    }


    //DODAJ ASOCIJACIJU
    function DodajAsocijaciju(){
        ass.push({
            DG : ['jedan','dva','tri','cetiri','pet'],
            LG : ['jedan1','dva1','tri1','cetiri1','pet1'],
            DD : ['jedan2','dva2','tri2','cetiri2','pet2'],
            LD : ['jedan3','dva3','tri3','cetiri3','pet3'],
            kon : 'sdssdsds',
        })
        localStorage.setItem("assoc", JSON.stringify(ass))
    }


    //DODAJ ASOCIJACIJE
    function functionDodajAsocijacije(){
        for(let k=1; k<5; k++){
            $("#LevoG"+k).attr("value", ass[random].LG[k-1]);
        }
            $("#LevoGKonacno").attr("value", "");


        for(let k=1; k<5; k++){
            $("#DesnoG"+k).attr("value", ass[random].DG[k-1]);
        }
           $("#DesnoGKonacno").attr("value", "");


        for(let k=1; k<5; k++){
            $("#LevoD"+k).attr("value", ass[random].LD[k-1]);
        }
            $("#LevoDKonacno").attr("value", "");


        for(let k=1; k<5; k++){
            $("#DesnoD"+k).attr("value", ass[random].DD[k-1]);
        }
            $("#DesnoDKonacno").attr("value", "");

        
        $("#Konacno").attr("value", "");
    }


    //OSLUSKIVAC ZA IGRACE
    let igrac1 = 0;
    let igrac2 = 0;
    let pocela = 0;
    $(".player").change(function(){
        let id = $(this).attr("id");

        if( id == "I1" & igrac1 == 0){ //Igrac JEDAN se prijavio
            ime = $(this).val();
            $(this).attr("value", ime);
            Igrac1.ime = ime;
            igrac1 = 1;
        }
        if( id == "I2" & igrac2 == 0){ //Igrac DVA se prijavio
            ime = $(this).val();
            $(this).attr("value", ime);
            Igrac2.ime = ime;
            igrac2 = 1;
        }

        if(igrac1 == 1 & igrac2 == 1){ // OBA igraca su se prijavili
            alert("Igra je pocela");
            $("#trenutni").text(trenutniIgrac.ime)
            pocela = 1;
            zapocni();
        }
    })


    let dugmeSme = 0;
    //OSLUSKIVAC ZA DUGME "DALJE"
    $("#dalje").click(function(){
        if(dugmeSme == 0){return;}
        if(trenutniIgrac == Igrac1){ //ZAMENA IGRACA
            //alert("alo");
            trenutniIgrac = Igrac2;
            $("#trenutni").text(trenutniIgrac.ime)
            
        }
        else if(trenutniIgrac == Igrac2){
            //alert("alo");
            trenutniIgrac = Igrac1;
            $("#trenutni").text(trenutniIgrac.ime)
        }

        $(".inputA").attr("disabled", true);//disable inputa
        $(".konacno").attr("disabled", true);

        dugmeSme = 0;//FLAGOVI
        provera = 0; //ENABLE DUGMICA
        vremeIgraca = 0;

    })

    //OSLUSKIVAC ZA POLJA
    let provera = 0;
    $(".polje").click(function(){
        if($(this).hasClass("open")) {return;} //provera dal je vec otvoreno
        if (provera==1 || pocela == 0) {return;} //provera dal smo vec otvorili jednu i dal smo zapoceli igru

        let value = $(this).attr("value");
        $(this).text(value);

        $(this).addClass("open");
        $(this).removeClass("close");

        provera = 1; //FLAGOVI
        dugmeSme = 1;

        if($("#LevoDKonacno").val() != ass[random].LD[4]){ $("#LevoDKonacno").attr("disabled", false)}
        if($("#DesnoDKonacno").val() != ass[random].DD[4]){ $("#DesnoDKonacno").attr("disabled", false)}
        if($("#LevoGKonacno").val() != ass[random].LG[4]){ $("#LevoGKonacno").attr("disabled", false)}
        if($("#DesnoGKonacno").val() != ass[random].DG[4]){ $("#DesnoGKonacno").attr("disabled", false)}

        $(".konacno").attr("disabled", false);
    })


    //OSLUSKIVAC ZA PRVE INPUTE
    $(".inputA").change(function(){
        let odgovorTacan=0;

        let poeni = 0;
        let odgovor = $(this).val();
        let id = $(this).attr("id");

        if(id == "LevoGKonacno"){ //GDE GOD DA SE ODGOVORI
            let tacno = ass[random].LG[4]
            if(tacno == odgovor){
                poeni += 5;
                for(let i=1; i<5;i++){
                    if($("#LevoG"+i).hasClass("close")){
                        poeni += 1;
                        let value = $("#LevoG"+i).attr("value");
                        $("#LevoG"+i).text(value);
                        $("#LevoG"+i).addClass("open");
                        $("#LevoG"+i).removeClass("close");
                    }
                }
            
                $("#LevoGKonacno").css('background-color', trenutniIgrac.color);
                for(let i=1; i<5;i++){$("#LevoG"+i).css('background-color', trenutniIgrac.color);}
                //alert(poeni);
                odgovorTacan = 1;
                trenutniIgrac.poeni += poeni;
                $("#"+trenutniIgrac.ozn).text(trenutniIgrac.poeni)
            }
        }
        if(id == "DesnoGKonacno"){ 
            let tacno = ass[random].DG[4]
            if(tacno == odgovor){
                poeni += 5;
                for(let i=1; i<5;i++){
                    if($("#DesnoG"+i).hasClass("close")){
                        poeni += 1;
                        let value = $("#DesnoG"+i).attr("value");
                        $("#DesnoG"+i).text(value);
                        $("#DesnoG"+i).addClass("open");
                        $("#DesnoG"+i).removeClass("close");
                    }
                }
            
                $("#DesnoGKonacno").css('background-color', trenutniIgrac.color);
                for(let i=1; i<5;i++){$("#DesnoG"+i).css('background-color', trenutniIgrac.color);}
                //alert(poeni);
                odgovorTacan = 1;
                trenutniIgrac.poeni += poeni;
                $("#"+trenutniIgrac.ozn).text(trenutniIgrac.poeni)
            }
        }
        if(id == "LevoDKonacno"){ 
            let tacno = ass[random].LD[4]
            if(tacno == odgovor){
                poeni += 5;
                for(let i=1; i<5;i++){
                    if($("#LevoD"+i).hasClass("close")){
                        poeni += 1;
                        let value = $("#LevoD"+i).attr("value");
                        $("#LevoD"+i).text(value);
                        $("#LevoD"+i).addClass("open");
                        $("#LevoD"+i).removeClass("close");
                    }
                }
             
                $("#LevoDKonacno").css('background-color', trenutniIgrac.color);
                for(let i=1; i<5;i++){$("#LevoD"+i).css('background-color', trenutniIgrac.color);}
                //alert(poeni);
                odgovorTacan = 1;
                trenutniIgrac.poeni += poeni;
                $("#"+trenutniIgrac.ozn).text(trenutniIgrac.poeni)
            }
        }
        if(id == "DesnoDKonacno"){ 
            let tacno = ass[random].DD[4]
            if(tacno == odgovor){
                poeni += 5;
                for(let i=1; i<5;i++){
                    if($("#DesnoD"+i).hasClass("close")){
                        poeni += 1;
                        let value = $("#DesnoD"+i).attr("value");
                        $("#DesnoD"+i).text(value);
                        $("#DesnoD"+i).addClass("open");
                        $("#DesnoD"+i).removeClass("close");
                    }
                }

                $("#DesnoDKonacno").css('background-color', trenutniIgrac.color);
                for(let i=1; i<5;i++){$("#DesnoD"+i).css('background-color', trenutniIgrac.color);}
                //alert(poeni);
                odgovorTacan = 1;
                trenutniIgrac.poeni += poeni;
                $("#"+trenutniIgrac.ozn).text(trenutniIgrac.poeni)

            }
        }

        if(odgovorTacan == 0){
            provera = 0; //FLAGOVI
            dugmeSme = 0;
            vremeIgraca = 0;

            $(this).val("");
            $(".inputA").attr("disabled", true);
            $(".konacno").attr("disabled", true);
    
            if(trenutniIgrac == Igrac1){ //ZAMENA IGRACA
                //alert("alo");
                trenutniIgrac = Igrac2;
                $("#trenutni").text(trenutniIgrac.ime)
                return;
                
            }
            if(trenutniIgrac == Igrac2){
                //alert("alo");
                trenutniIgrac = Igrac1;
                $("#trenutni").text(trenutniIgrac.ime)
                return;
            }
            
        }
        else{
            $(".inputA").attr("disabled", true);


        }

    })


    //OSLUSKIVAC ZA KONACNO
    $("#Konacno").change(function(){
        let odgovor = $(this).val();
        let poeni = 0;

        if( ass[random].kon ==  odgovor){ //TACAN ODGOVOR NA KONACNO

            for(let i=1; i<5; i++){//OTVARENJE OSTALIH NEOTVORENIH POLJA I SABIRANJE POENA
                if($("#DesnoD"+i).hasClass("close")){
                    poeni += 1;
                    let value = $("#DesnoD"+i).attr("value");
                    $("#DesnoD"+i).text(value);
                    $("#DesnoD"+i).addClass("open");
                    $("#DesnoD"+i).removeClass("close");
                }
            }
            if(!$("#DesnoDKonacno").val()){//BOJENJE NEOBOJENIH SVIH POLJA
                for(let i=1; i<5;i++){$("#DesnoD"+i).css('background-color', trenutniIgrac.color);}//bojenje polja 
                $("#DesnoDKonacno").css('background-color', trenutniIgrac.color);//bojenje inputa
                $("#DesnoDKonacno").val(ass[random].DD[4]);
                //poeni += 5;
            }

            for(let i=1; i<5; i++){//OTVARENJE OSTALIH NEOTVORENIH POLJA I SABIRANJE POENA
                if($("#LevoD"+i).hasClass("close")){
                    poeni += 1;
                    let value = $("#LevoD"+i).attr("value");
                    $("#LevoD"+i).text(value);
                    $("#LevoD"+i).addClass("open");
                    $("#LevoD"+i).removeClass("close");
                }  
            }
            if(!$("#LevoDKonacno").val()){//BOJENJE NEOBOJENIH SVIH POLJA
                for(let i=1; i<5;i++){$("#LevoD"+i).css('background-color', trenutniIgrac.color);}//bojenje polja 
                $("#LevoDKonacno").css('background-color', trenutniIgrac.color);//bojenje inputa
                $("#LevoDKonacno").val(ass[random].LD[4]);
                //poeni += 5;
            }

            for(let i=1; i<5; i++){//OTVARENJE OSTALIH NEOTVORENIH POLJA I SABIRANJE POENA
                if($("#LevoG"+i).hasClass("close")){
                    poeni += 1;
                    let value = $("#LevoG"+i).attr("value");
                    $("#LevoG"+i).text(value);
                    $("#LevoG"+i).addClass("open");
                    $("#LevoG"+i).removeClass("close");
                } 
            }
            if(!$("#LevoGKonacno").val()){//BOJENJE NEOBOJENIH SVIH POLJA
                for(let i=1; i<5;i++){$("#LevoG"+i).css('background-color', trenutniIgrac.color);}//bojenje polja 
                $("#LevoGKonacno").css('background-color', trenutniIgrac.color);//bojenje inputa
                $("#LevoGKonacno").val(ass[random].LG[4]);
                //poeni += 5;
            }

            for(let i=1; i<5; i++){ //OTVARENJE OSTALIH NEOTVORENIH POLJA I SABIRANJE POENA
                if($("#DesnoG"+i).hasClass("close")){
                    poeni += 1;
                    let value = $("#DesnoG"+i).attr("value");
                    $("#DesnoG"+i).text(value);
                    $("#DesnoG"+i).addClass("open");
                    $("#DesnoG"+i).removeClass("close");
                } 
            }
            if(!$("#DesnoGKonacno").val()){ //BOJENJE NEOBOJENIH SVIH POLJA
                for(let i=1; i<5;i++){$("#DesnoG"+i).css('background-color', trenutniIgrac.color);} //bojenje polja 
                $("#DesnoGKonacno").css('background-color', trenutniIgrac.color); //bojenje inputa
                $("#DesnoGKonacno").val(ass[random].DG[4]);
                //poeni += 5;
            }

            //BOJENJE TABELE DODAVANJE POENA IGRACU
            $("#Konacno").css('background-color', trenutniIgrac.color);
            poeni += 10;
            trenutniIgrac.poeni += poeni;
            $("#"+trenutniIgrac.ozn).text(trenutniIgrac.poeni)

            //KRAJ IGRE
            provera = 1;
            dugmeSme = 0;
            $(".inputA").attr("disabled", true);
            $(".konacno").attr("disabled", true);
            zaustavi();
            if(Igrac1.poeni > Igrac2.poeni){
                alert("Pobedio je Igrac" + Igrac1.ime);
            
            }
            else if(Igrac1.poeni < Igrac2.poeni){
                alert("Pobedio je Igrac" + Igrac2.ime);
            }
            if(Igrac1.poeni == Igrac2.poeni){
                alert("Nereseno je");
            }



        }
        else{ //NETACAN ODGOVOR NA KONACNO

            provera = 0; //FLAGOVI
            dugmeSme = 0;
            vremeIgraca = 0;

            $(".inputA").attr("disabled", true);
            $(".konacno").attr("disabled", true);
    
            if(trenutniIgrac == Igrac1){ //ZAMENA IGRACA
                //alert("alo");
                trenutniIgrac = Igrac2;
                $("#trenutni").text(trenutniIgrac.ime)
                return;
                
            }
            if(trenutniIgrac == Igrac2){
                //alert("alo");
                trenutniIgrac = Igrac1;
                $("#trenutni").text(trenutniIgrac.ime)
                return;
            }
           
        }

    })


    //TIMER ZA ASOCIJACIJE
    let vremeIgraca = 0;
    let vremeIgre = 0;
    let hendler;
    function zapocni(){
        hendler = setInterval(stoperica,1000);
    }

    function zaustavi(){
        clearInterval(hendler);
    }

    function stoperica(){
        vremeIgraca++;
        vremeIgre++;
        document.getElementById("vremeIgraca").innerHTML = vremeIgraca;
        document.getElementById("vremeIgre").innerHTML = vremeIgre;
        if(vremeIgraca == 10){

            provera = 0; //FLAGOVI
            dugmeSme = 0;
            $(".inputA").attr("disabled", true);
            $(".konacno").attr("disabled", true);
    
            if(trenutniIgrac == Igrac1){ //ZAMENA IGRACA
                //alert("alo");
                trenutniIgrac = Igrac2;
                $("#trenutni").text(trenutniIgrac.ime)
            }
            else if(trenutniIgrac == Igrac2){
                //alert("alo");
                trenutniIgrac = Igrac1;
                $("#trenutni").text(trenutniIgrac.ime)
            
            }
            vremeIgraca =0;
        }

        if(vremeIgre == 240){
            provera = 1;//FLAGOVI
            dugmeSme = 0;
            $(".inputA").attr("disabled", true);
            $(".konacno").attr("disabled", true);
            zaustavi();

            if(Igrac1.poeni > Igrac2.poeni){
                alert("Pobedio je Igrac 1");
            }
            if(Igrac1.poeni < Igrac2.poeni){
                alert("Pobedio je Igrac 2");
            }
            if(Igrac1.poeni == Igrac2.poeni){
                alert("NeresenoJe");
            }

        }

    }

    //POZIVI FUNKCIJA
    Inicijalizuj();
    functionDodajAsocijacije();
    //DodajAsocijaciju();

    



})
