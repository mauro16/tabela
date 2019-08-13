var selectedRow = null;

function onFormSubmit() {
    var formData = readFormData();
    if (selectedRow == null)
        insertNewRecord(formData)
    else
        updateRecord(formData);
    resetForm();
}

function readFormData() {
    var formData = {};
    formData["name"] = document.getElementById("name").value;
    formData["m"] = document.getElementById("m").value;
    formData["s"] = document.getElementById("s").value;
    formData["g"] = document.getElementById("g").value;
    return formData;
}

function insertNewRecord(data) {
    var table = document.getElementById("table").getElementsByTagName('tbody')[0];
    var newRow = table.insertRow(table.length);

    cell1 = newRow.insertCell(0);
    cell1.innerHTML = data.name;

    cell2 = newRow.insertCell(1);
    cell2.innerHTML = data.m;

    cell3 = newRow.insertCell(2);
    cell3.innerHTML = data.s;

    cell4 = newRow.insertCell(3);
    cell4.innerHTML = data.g;

    cell4 = newRow.insertCell(4);
    cell4.innerHTML = `<button type="button" onClick="onEdit(this)" class="btn btn-primary">Edit</button>
                       <button type="button" onClick="onDelete(this)" class="btn btn-danger">Delete</button> `;
}

function resetForm() {
    document.getElementById("name").value = "";
    document.getElementById("m").value = "";
    document.getElementById("s").value = "";
    document.getElementById("g").value = "";
    document.getElementById("name").focus();
    selectedRow = null;
}

function onEdit(td) {
    selectedRow = td.parentElement.parentElement;
    document.getElementById("name").value = selectedRow.cells[0].innerHTML;
    document.getElementById("m").value = selectedRow.cells[1].innerHTML;
    document.getElementById("s").value = selectedRow.cells[2].innerHTML;
    document.getElementById("g").value = selectedRow.cells[3].innerHTML;
}

function updateRecord(formData) {
    selectedRow.cells[0].innerHTML = formData.name;
    selectedRow.cells[1].innerHTML = formData.m;
    selectedRow.cells[2].innerHTML = formData.s;
    selectedRow.cells[3].innerHTML = formData.g;
}

function onDelete(td) {
    if (confirm('deseja deletar isso?')) {
        row = td.parentElement.parentElement;
        document.getElementById("table").deleteRow(row.rowIndex);
        resetForm();
    }

}

txtM = document.getElementById("m").value,
    txtS = document.getElementById("s").value,
    txtG = document.getElementById("g").value;

//GET DATE AND TIME
var dateAtualEL = document.querySelector('#dataAtual');
var horaAtualEL = document.querySelector('#horaAtual');
var dia = document.querySelector('#msg');
setInterval(() => {
    var dt = new Date().toLocaleDateString('DE-de', { day: "2-digit", month: "long", year: "numeric" });
    var hr = new Date().toLocaleTimeString('DE-de');
    dateAtualEL.innerHTML = dt;
    horaAtualEL.innerHTML = hr;

    if (hr < 5) {
        dia.innerHTML = "Guten Abend";
    }
    else
        if (hr < 8) {
            dia.innerHTML = "guten morgen!";
        }
        else
            if (hr < 12) {
                dia.innerHTML = "guten morgen!";
            }
            else
                if (hr < 18) {
                    dia.innerHTML = "Guten nachmittag!";
                }
                else {
                    dia.innerHTML = "Guten Abend!";
                }
}, 1000);

//*END* GET DATE AND TIME

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
//End Export Table to Excel



//VERTICAL INPUT TEXT "TxtMundlich"
function VerticalM() {
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
}
// END VERTICAL INPUT TEXT "TxtMundlich"

//HORIZONTAL INPUT TEXT "TxtSchriftlich"
function HorizonzalS() {
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
}
//END HORIZONTAL INPUT TEXT "TxtSchriftlich"
// Function to observe the inputs and take the intersection

$('#m, #s').on('blur', (e) => {
    linhas = document.querySelectorAll('.searchtbl tr');
    across = linhas[Vindex].cells[Hindex]
    $('#g').val($(across).text());
    $(across).addClass("highlighted");
})

//Botao Pesquisar
$(document).ready(function () {
    $("#txtBuscar").on("keyup", function () {
        var value = $(this).val().toLowerCase();
        $("#table tr").filter(function () {
            $(this).toggle($(this).text().toLowerCase().indexOf(value) > -1)
        });
    });
});