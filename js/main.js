window.onload = function(){
    ajaxZahtev("data/artikli.json", function(data){
        ispisChbxLevogBloka(data)
        $("#tasterA").click(prebaciUDesniBlok)
    })
    $("#tasterC").click(posaljiNaObradu)
}

function ajaxZahtev(putanja, uspeh){
    $.ajax({
        url: putanja,
        method:"GET",
        dataType:"json",
        success:uspeh,
        error:function(xhr, status, error){
            console.log("Nije uspelo.")
        }
    })

}

function prebaciUDesniBlok(){
    let nizCekiranih = [];
    let cekiraniB = $(".chbxB")
    console.log(typeof cekiraniB)

    $('.chbxA').each(function(){
        var cekiran = $(this);
        if (cekiran.is(':checked')){
            if(!nizCekiranih.includes(cekiran.val())){
                nizCekiranih.push(parseInt(cekiran.val()))
            }
        }
    });
    console.log(nizCekiranih)

    if(cekiraniB != undefined){
        if(cekiraniB.length == 0){
            nizCekiranih.push(parseInt(cekiraniB));
        }
        else {
            for(let cekB of cekiraniB){
                nizCekiranih.push(parseInt(cekB.value));
            }
        }
    }

    if(nizCekiranih.length > 0){
        ajaxZahtev("data/artikli.json", function(data){
            const nizB = data.filter(d => {
                for(let pojedinacniCek of nizCekiranih){
                    if(pojedinacniCek == d.idArtikla)
                        return true;
                }
            })

            ispisChbx(nizB, "#desniBlok", "chbxB", "tasterB", "Taster B", prebaciULeviBlok)

            let vrednosti = data.map(d => d.idArtikla);
            for(let pojedinacniCek of nizCekiranih){
                const filtriraj = vrednosti.filter(vred => {
                    if(vred != pojedinacniCek){
                        return true;
                    }
                })
                vrednosti = filtriraj;
            }

            const nizA = data.filter(d => {
                for(let vred of vrednosti){
                    if(vred == d.idArtikla){
                        return true;
                    }
                }
            })

            ispisChbx(nizA, "#listaChbx", "chbxA", "tasterA", "Taster A", prebaciUDesniBlok)
        })
    }

}

function prebaciULeviBlok(){
    /* alert("aaa") */
    let nizCekiranih = [];
    let cekiraniA = $(".chbxA")
    console.log(typeof cekiraniA)

    $('.chbxB').each(function(){
        var cekiran = $(this);
        if (cekiran.is(':checked')){
            if(!nizCekiranih.includes(cekiran.val())){
                nizCekiranih.push(parseInt(cekiran.val()))
            }
        }
    });
    /* console.log(nizCekiranih) */

    if(cekiraniA != undefined){
        if(cekiraniA.length == 0){
            nizCekiranih.push(parseInt(cekiraniA));
        }
        else {
            for(let cekA of cekiraniA){
                nizCekiranih.push(parseInt(cekA.value));
            }
        }
    }

    if(nizCekiranih.length > 0){
        ajaxZahtev("data/artikli.json", function(data){
            const nizA = data.filter(d => {
                for(let pojedinacniCek of nizCekiranih){
                    if(pojedinacniCek == d.idArtikla)
                        return true;
                }
            })

            ispisChbx(nizA, "#listaChbx", "chbxA", "tasterA", "Taster A", prebaciUDesniBlok)

            let vrednosti = data.map(d => d.idArtikla);
            for(let pojedinacniCek of nizCekiranih){
                const filtriraj = vrednosti.filter(vred => {
                    if(vred != pojedinacniCek){
                        return true;
                    }
                })
                vrednosti = filtriraj;
            }

            const nizB = data.filter(d => {
                for(let vred of vrednosti){
                    if(vred == d.idArtikla){
                        return true;
                    }
                }
            })

            ispisChbx(nizB, "#desniBlok", "chbxB", "tasterB", "Taster B", prebaciULeviBlok)
        })
    }

}

function ispisChbx(data, idBloka, imeKlase, idTastera, tasterVal, funkcija){
    let ispis = `<ul class="mt-5">`
    data.forEach( d => {
        ispis += `<li>
                    <input type="checkbox" name="artikli" value="${d.idArtikla}" class="${imeKlase}" /><label class="ml-3">${d.imeArtikla}</label>
                </li>`
    });
    ispis += `</ul><input type="button" class="bg-dark p-2 ml-5" id="${idTastera}" value="${tasterVal}" />`
    $(idBloka).html(ispis);
    document.getElementById(idTastera).addEventListener("click", funkcija)

}

function ispisChbxLevogBloka(data){

    let ispis = `<ul class="mt-5">`
    data.forEach( d => {
        ispis += `<li>
                    <input type="checkbox" name="artikli" value="${d.idArtikla}" class="chbxA" /><label class="ml-3">${d.imeArtikla}</label>
                </li>`
    });
    ispis += `</ul><input type="button" class="bg-dark p-2 ml-5" id="tasterA" value="Taster A" />`
    $("#listaChbx").html(ispis);
}

function posaljiNaObradu(){
    let cekiranB = $(".chbxB:checked");
    let cekiranBVal = $(".chbxB:checked").val()
    let validno = true;

    if(cekiranB.length == 0){
        alert("Morate cekirati barem 1 artikal.")
        validno = false;
    }

    if(validno){
        $.ajax({
            url:"obrada.php",
            method:"POST",
            data:{
                vrednost: cekiranBVal
            },
            success:function(data){
                alert("Uspesno slanje")
            },
            error:function(xhr, status, error){
                alert("Neuspesno slanje")
            }
        })
    }
}