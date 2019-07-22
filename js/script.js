var dateAtualEL = document.querySelector('#dataAtual');
var horaAtualEL = document.querySelector('#horaAtual');
setInterval(() => {
    var dt = new Date().toLocaleDateString('DE-de', { day: "2-digit", month: "long", year: "numeric" });
    var hr = new Date().toLocaleTimeString('DE-de');
    dateAtualEL.innerHTML = dt;
    horaAtualEL.innerHTML = hr;
}, 1000);

$(document).ready(function () {
    $('#tbl').bdt({
        showSearchForm: 0,
        showEntriesPerPageField: 0
    });
});

$(document).on("click", ".cel1", ".cel2", function () {
    var nomePessoa = $(this).parent().parent().find(".cel1", ".cel2").text();

    $('#g').val(nomePessoa);
});


//Varial Global
var rIndex, table = document.getElementById("table")
function checkEmptyInput() {

    var isEmpty = false;
    txtName = document.getElementById("name").value;
    txtM = document.getElementById("m").value;
    txtS = document.getElementById("s").value;
    txtG = document.getElementById("g").value;

    if (txtName === "") {
        alert("Name is empty!")
        isEmpty = true;
    }
    else if (txtM === "") {
        alert("Mundlich is empty!")
        isEmpty = true;
    }
    else if (txtS === "") {
        alert("Schriblich is empty!")
        isEmpty = true;
    }
    else if (txtG === "") {
        alert("Gesamt is empty!")
        isEmpty = true;
    }
    return isEmpty;
}



//Add rows
function addHTMLTableRow() {
    //Pega a table apelo ID
    //cria uma nova linha e uma nova celula
    //pega o valor dos inputs
    //coloca os valores dentros da linhas
    if (!checkEmptyInput()) {
        var newRow = table.insertRow(table.length),
            cell1 = newRow.insertCell(0),
            cell2 = newRow.insertCell(1),
            cell3 = newRow.insertCell(2),
            cell4 = newRow.insertCell(3),

            txtName = document.getElementById("name").value,
            txtM = document.getElementById("m").value,
            txtS = document.getElementById("s").value,
            txtG = document.getElementById("g").value;

        cell1.innerHTML = txtName;
        cell2.innerHTML = txtM;
        cell3.innerHTML = txtS;
        cell4.innerHTML = txtG;
        //chama a funcao para setar o evento para a nova linha
        selectRowInput()
    }
}

function selectRowInput() {


    for (var i = 1; i < table.rows.length; i++) {
        table.rows[i].onclick = function () {
            //pegar a linha selecionada
            rIndex = this.rowIndex;
            document.getElementById("name").value = this.cells[0].innerHTML;
            document.getElementById("m").value = this.cells[1].innerHTML;
            document.getElementById("s").value = this.cells[2].innerHTML;
            document.getElementById("g").value = this.cells[3].innerHTML;
        };
    }
}
selectRowInput()

function editHtmlTableSelectedRow() {
    var txtName = document.getElementById("name").value,
        txtM = document.getElementById("m").value,
        txtS = document.getElementById("s").value,
        txtG = document.getElementById("g").value;

    if (!checkEmptyInput()) {
        table.rows[rIndex].cells[0].innerHTML = txtName;
        table.rows[rIndex].cells[1].innerHTML = txtM;
        table.rows[rIndex].cells[2].innerHTML = txtS;
        table.rows[rIndex].cells[3].innerHTML = txtG;
    }

}

function deleta() {
    table.deleteRow(rIndex)

    //Limpa os campos
    document.getElementById("name").value = "";
    document.getElementById("m").value = "";
    document.getElementById("s").value = "";
    document.getElementById("g").value = "";
}

//Export Table to Excel
function exportTableToExcel(tableID, filename = '') {
    var downloadLink;
    var dataType = 'application/vnd.ms-excel';
    var tableSelect = document.getElementById(tableID);
    var tableHTML = tableSelect.outerHTML.replace(/ /g, '%20');

    // Specify file name
    filename = filename ? filename + '.xls' : 'excel_data.xls';

    // Create download link element
    downloadLink = document.createElement("a");

    document.body.appendChild(downloadLink);

    if (navigator.msSaveOrOpenBlob) {
        var blob = new Blob(['\ufeff', tableHTML], {
            type: dataType
        });
        navigator.msSaveOrOpenBlob(blob, filename);
    } else {
        // Create a link to the file
        downloadLink.href = 'data:' + dataType + ', ' + tableHTML;

        // Setting the file name
        downloadLink.download = filename;

        //triggering the function
        downloadLink.click();
    }
}

//HORIZONTAL
$(document).ready(function (e) {
    $("#m").keyup(function () {

        if ($(this).val() == "") {
            $(".searchtbl").find("tr").not("tr:first").find("td").removeClass('highlighted');
            return false;
        }
        var data = this.value.toUpperCase().split(" ");
        $(".searchtbl").find("tr").not("tr:first").find(".row-m").each(function (index, elem) {
            var $elem = $(elem);
            for (var d = 0; d < data.length; ++d) {
                // Highlight
                if ($elem.text().toUpperCase().indexOf(data[d]) != -1) {
                    $elem.addClass('highlighted');
                } else {
                    $elem.removeClass('highlighted');
                }
                //console.log();

                if ($elem.find(".inputType").length == 1) {

                    if ($elem.find(".inputType").val().toUpperCase().indexOf(data[d]) != -1) {
                        $elem.addClass('highlighted');
                        $elem.find(".inputType").addClass('highlighted');
                    } else {
                        $elem.removeClass('highlighted');
                        $elem.find(".inputType").removeClass('highlighted');
                    }
                }

            }
        })
    })
});

//VERTICAL
$(document).ready(function (e) {
    $("#s").keyup(function () {

        if ($(this).val() == "") {
            $(".searchtbl").find("tr").not("tr:first").find("td").removeClass('highlighted');
            return false;
        }
        var data = this.value.toUpperCase().split(" ");
        $(".searchtbl").find("tr").not("tr:first").find(".row-s").each(function (index, elem) {
            var $elem = $(elem);
            for (var d = 0; d < data.length; ++d) {
                // Highlight
                if ($elem.text().toUpperCase().indexOf(data[d]) != -1) {
                    $elem.addClass('highlighted');
                } else {
                    $elem.removeClass('highlighted');
                }
                //console.log();

                if ($elem.find(".inputType").length == 1) {

                    if ($elem.find(".inputType").val().toUpperCase().indexOf(data[d]) != -1) {
                        $elem.addClass('highlighted');
                        $elem.find(".inputType").addClass('highlighted');
                    } else {
                        $elem.removeClass('highlighted');
                        $elem.find(".inputType").removeClass('highlighted');
                    }
                }

            }
        })
    })
});