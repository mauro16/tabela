var indexV, indexH, across, selectedRow = null;
function onFormSubmit() {
    var formData = readFormData();
    if (selectedRow == null) {
        insertNewRecord(formData);
        resetForm();
    } else
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
    cell4.innerHTML = `<button type="button" onClick="onEdit(this)" class="btn btn-primary btn-sm">Edit</button>
                       <button type="button" onClick="onDelete(this)" class="btn btn-danger btn-sm">Delete</button> `;
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
    if (confirm('Müchten Sie wirklich löschen?')) {
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

    //Messagem Saudacoes
    hr = new Date();
    hour = hr.getHours();
    if (hour < 12) {
        dia.innerHTML = "Guten Morgen!";
    }
    else
        if (hour < 18) {
            dia.innerHTML = "Guten Tag!";
        }
        else {
            dia.innerHTML = "Guten Abend";
            document.getElementById('sol').remove()
        }

}, 1000);

//*END* GET DATE AND TIME


$(document).on("click", ".cel1", ".cel2", function () {
    var nomePessoa = $(this).parent().parent().find(".cel1", ".cel2").text();

    $('#g').val(nomePessoa);
});

//Export Table to Excel
function exportTableToExcel(tableID, filename = '') {
    if (confirm('Nach dem Importieren der Tabelle weden alle Daten geloescht. Moechten Sie wirklich importieren?')) {
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

}
//End Export Table to Excel

//Begin M
$('#m').on('keyup', (e) => {
    s = $('#s').val();
    $('.row-m').each((i, etd) => {
        if ($(etd).text().toUpperCase() == e.target.value.toUpperCase()) {
            $(etd).addClass("highlighted")
            indexV = $(etd).parent().index();
        } else {
            $(etd).removeClass("highlighted");
            if (across) {
                $('#g').val("");
                $(across).removeClass("highlighted");
            }
        }
    })
});
//End M

//Begin S
$('#s').on('keyup', (e) => {
    m = $('#m').val();
    $('.row-s').each((i, etd) => {
        if ($(etd).text().toUpperCase() == e.target.value.toUpperCase()) {
            $(etd).addClass("highlighted")
            indexH = $(etd).index();
        } else {
            $(etd).removeClass("highlighted");
            if (across) {
                $('#g').val("");
                $(across).removeClass("highlighted");
            }
        }
    })
});
//End S

//Begin 
$('#s, #m').on('blur', (e) => {
    hasM = $('#m .highlighted');
    hasS = $('#s .highlighted');
    if (hasM && hasS) {
        linhas = document.querySelectorAll('.searchtbl tr');
        across = linhas[indexV].cells[indexH]
        $('#g').val($(across).text());
        $(across).addClass("highlighted");
        $('#g').attr('indexV', indexV);
        $('#g').attr('indexH', indexH);
    } else {
        $('#g').val("");
        $(across).removeClass("highlighted");
    }
});
//End

//Begin
$('#g').on('keyup', (e) => {
    atbIndexH = $('#g').attr('indexH');
    atbIndexV = $('#g').attr('indexV');
    text = $('#g').val();

    if (atbIndexH && atbIndexV && (text.length > 2)) {
        linhas = document.querySelectorAll('.searchtbl tr');
        across = linhas[atbIndexV].cells[atbIndexH];
        $(across).html(`${(text[0] + text[1]).toUpperCase()}<span>${text[2]}</span>`);
    }
})
//End


function resetForm() {
    document.getElementById("name").value = "";
    document.getElementById("m").value = "";
    document.getElementById("s").value = "";
    document.getElementById("g").value = "";
    document.getElementById("name").focus();
    $(".searchtbl").find("tr").not("tr:first").find("td").removeClass('highlighted');
    $(across).removeClass('highlighted');
    atbIndexV = null;
    atbIndexH = null;
    selectedRow = null;
}



//Begin Search
$(document).ready(function () {
    $("#txtBuscar").on("keyup", function () {
        var value = $(this).val().toLowerCase();
        $("#table tr").filter(function () {
            $(this).toggle($(this).text().toLowerCase().indexOf(value) > -1)
        });
    });
});
//END Search