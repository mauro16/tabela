function inittbletohoverHighlight() {

    if (tbletohover == null) {
        return;
    }

    // detect cursor position
    for (var i = 0; i < tbletohover.rows.length; i++) {
        tbletohover.rows[i].row_index = i;
     
        for (var j = 0; j < tbletohover.rows[i].cells.length; j++) {
            tbletohover.rows[i].cells[j].column_index = j;
            tbletohover.rows[i].cells[j].onmouseover = function () {
                highlight(this.parentNode.row_index, this.column_index, 'on');
                console.log(j)
            }
            tbletohover.rows[i].cells[j].onmouseout = function () {
                highlight(this.parentNode.row_index, this.column_index, 'off');
            }
        }
    }
}

function highlight(row, col, state) {
    if (row == 0 || col == 0) {
        return;
    }
    for (var i = 0; i < tbletohover.rows.length; i++) {
        if (state == 'off') {
            for (var j = 0; j < tbletohover.rows[i].cells.length; j++) {
                tbletohoverElement = tbletohover.rows[i].cells[j]
                $(tbletohoverElement).removeClass('cur_col');
            }
        }
        if (state == 'on') {
            tbletohoverElement = tbletohover.rows[i].cells[col]
            $(tbletohoverElement).addClass('cur_col');
        }
    }

    for (var i = 0; i < tbletohover.rows[row].cells.length; i++) {
        if (state == 'on') {
            tbletohoverElement = tbletohover.rows[row].cells[i]
            $(tbletohoverElement).addClass('cur_row');
            tbletohoverElement = tbletohover.rows[row].cells[col]
            $(tbletohoverElement).removeClass('cur_row');
            $(tbletohoverElement).removeClass('cur_col');
            $(tbletohoverElement).addClass('cur_cell');
        }
        if (state == 'off') {
            tbletohoverElement = tbletohover.rows[row].cells[i]
            $(tbletohoverElement).removeClass('cur_row');
            tbletohoverElement = tbletohover.rows[row].cells[col]
            $(tbletohoverElement).removeClass('cur_cell');
        }
    }
}

var tbletohover = document.getElementById('pricing');
inittbletohoverHighlight();


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
    txtFirma = document.getElementById("firma").value;
    txtName = document.getElementById("name").value;
    txtM = document.getElementById("m").value;
    txtS = document.getElementById("s").value;
    txtG = document.getElementById("g").value;
    if (txtFirma === "") {
        alert("Firma Name is empty!")
        isEmpty = true;
    }
    else if (txtName === "") {
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
            cell5 = newRow.insertCell(4),
            txtFirma = document.getElementById("firma").value,
            txtName = document.getElementById("name").value,
            txtM = document.getElementById("m").value,
            txtS = document.getElementById("s").value,
            txtG = document.getElementById("g").value;

        cell1.innerHTML = txtFirma;
        cell2.innerHTML = txtName;
        cell3.innerHTML = txtM;
        cell4.innerHTML = txtS;
        cell5.innerHTML = txtG;
        //chama a funcao para setar o evento para a nova linha
        selectRowInput()
    }
}

function selectRowInput() {


    for (var i = 1; i < table.rows.length; i++) {
        table.rows[i].onclick = function () {
            //pegar a linha selecionada
            rIndex = this.rowIndex;
            document.getElementById("firma").value = this.cells[0].innerHTML;
            document.getElementById("name").value = this.cells[1].innerHTML;
            document.getElementById("m").value = this.cells[2].innerHTML;
            document.getElementById("s").value = this.cells[3].innerHTML;
            document.getElementById("g").value = this.cells[4].innerHTML;
        };
    }
}
selectRowInput()

function editHtmlTableSelectedRow() {
    var txtFirma = document.getElementById("firma").value,
        txtName = document.getElementById("name").value,
        txtM = document.getElementById("m").value,
        txtS = document.getElementById("s").value,
        txtG = document.getElementById("g").value;

    if (!checkEmptyInput()) {
        table.rows[rIndex].cells[0].innerHTML = txtFirma;
        table.rows[rIndex].cells[1].innerHTML = txtName;
        table.rows[rIndex].cells[2].innerHTML = txtM;
        table.rows[rIndex].cells[3].innerHTML = txtS;
        table.rows[rIndex].cells[4].innerHTML = txtG;
    }

}

function deleta() {
    table.deleteRow(rIndex)

    //Limpa os campos
    document.getElementById("firma").value = "";
    document.getElementById("name").value = "";
    document.getElementById("m").value = "";
    document.getElementById("s").value = "";
    document.getElementById("g").value = "";
}