var tempoInicial =  $("#tempo-digitacao").text();
var campo = $(".campo-de-digitacao");

//ou só $(function(){})
$(document).ready(function () {
    atualizaTamanhoFrase();
    inicializaContadores();
    inicializaCronometro();
    inicializaMarcadores();
    $("#botao-reiniciar").click(reiniciaJogo);

    atualizaPlacar();

    $("#usuarios").selectize({
        create: true,
        sortField: 'text'
    });

    $(".tooltip").tooltipster();
    trigger: "custom"
});

function atualizaTamanhoFrase() {
    var frase = $(".frase").text();
    var numPalavras = frase.split(" ").length;
    var tamanhoFrase = $("#tamanho-frase");
    tamanhoFrase.text(numPalavras);
}

function inicializaContadores() {
    campo.on("input", function(){
   var conteudo = campo.val();

   var qtdPalavras = conteudo.split(/\S+/).length - 1;
   $("#contador-palavras").text(qtdPalavras);

   var qtdCaracteres = conteudo.length;
   $("#contador-caracteres").text(qtdCaracteres);
});
}

function inicializaCronometro() {
    var tempoRestante = $("#tempo-digitacao").text();
    campo.one("focus", function(){
        var tempoRestante = $("#tempo-digitacao").text();
        $("#botao-reiniciar").attr("disabled",true);
        var cronometroID = setInterval(function(){
            tempoRestante--;
            $("#tempo-digitacao").text(tempoRestante);
            if(tempoRestante < 1){
                campo.attr("disabled", true);
                clearInterval(cronometroID);
                campo.toggleClass("campo-desativado");
                $("#botao-reiniciar").attr("disabled",false);
                finalizaJogo();
            }
        },1000)
    })
}

function finalizaJogo(){
    campo.attr("disabled", true);
    campo.toggleClass("campo-desativado");
    inserePlacar();
}

function inicializaMarcadores() {
    var frase = $(".frase").text();
    campo.on("input", function() {
        var frase = $(".frase").text();
        var digitado = campo.val();
        var comparavel = frase.substr(0 , digitado.length);

        if(digitado == comparavel) {
            campo.addClass("borda-verde");
            campo.removeClass("borda-vermelha");
        } else {
            campo.addClass("borda-vermelha");
            campo.removeClass("borda-verde");
        }
    });
}

function atualizaTempoInicial(tempo) {
    tempoInicial = tempo;
    $("#tempo-digitacao").text(tempo);
}

function reiniciaJogo() {
    campo.attr("disabled", false);
    campo.val("");
    $("#contador-palavras").text("0");
    $("#contador-caracteres").text("0");
    $("#tempo-digitacao").text(tempoInicial);
    inicializaCronometro();
    campo.toggleClass("campo-desativado");
    campo.removeClass("borda-vermelha");
    campo.removeClass("borda-verde");
}
