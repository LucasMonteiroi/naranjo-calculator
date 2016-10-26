var currentValue = 0;
var questoes = 0;
var numeroCaso = "";
var dataCaso = "";

$(function() {
    $("input#txtCaso").on({
        keydown: function(e) {
            if (e.which === 32)
                return false;
        },
        change: function() {
            this.value = this.value.replace(/\s/g, "");
        }
    });
});

function handleClick(myRadio) {
    var valRadio = myRadio.value;
    if (valRadio < 0) {
        currentValue = currentValue - 1;
    } else if (valRadio == 1) {
        currentValue += 1;
    } else if (valRadio == 2) {
        currentValue += 2;
    } else {
        currentValue = currentValue;
    }

    $(":radio[name='" + myRadio.name + "']").attr("disabled", true);

    questoes += 1;

    if (questoes == 10) {
        $("#btnCalcula").show();

    }
    // console.log(currentValue);
    // console.log(myRadio.name);
}


var calcularNaranjo = function() {
    if (currentValue.valueOf() < 2) {
        //console.log("Duvidoso");
        $("#txtCausalidade").val("DUVIDOSO");
    } else if (currentValue.valueOf() >= 2 && currentValue.valueOf() <= 4) {
        // console.log("Possivel");
        $("#txtCausalidade").val("POSSIVEL");
    } else if (currentValue.valueOf() >= 5 && currentValue.valueOf() <= 8) {
        // console.log("Provavel");
        $("#txtCausalidade").val("PROVAVEL");
    } else if (currentValue.valueOf() > 9) {
        // console.log("Definido");
        $("#txtCausalidade").val("DEFINIDO");
    }

    $("#btnImprime").show();

    // console.log(numeroCaso.valueOf());
    // console.log(dataCaso.valueOf());
}

var generatePDF = function() {
    kendo.drawing.drawDOM($("#formConfirmation")).then(function(group) {
        kendo.drawing.pdf.saveAs(group, "Calculo de Naranjo.pdf");
    });
}

var validarCampos = function() {
    var valido = true;
    var mensagem = "";
    numeroCaso = $("#txtCaso").val();
    numeroCaso = numeroCaso.toUpperCase();
    dataCaso = $("#txtDataCaso").val();

    if (numeroCaso.length == 10) {
        if (dataCaso.valueOf() != undefined) {
            // console.log("Validado");
            valido = true;
        } else {
            valido = false;
            mensagem = "Necessario preencher a data do caso!"
        }
    } else {
        valido = false;
        mensagem = "Necessario preencher o numero do caso!"
    }

    if (valido == true) {
        calcularNaranjo();
    } else {
        exibirMensagem(mensagem);
        $("#alerta").show();
        $("#alerta").attr("tabindex", -1).focus();
        $("#lblconteudo-alerta").focus();
    }


}


var exibirMensagem = function(mensagem) {
    $("#lblconteudo-alerta").text(mensagem);
}