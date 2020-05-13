
//Inicializaão variáveis
var pag = 1

$(document).ready(function () {
    loadDdlCategoria();
    loadDataPagination(pag);

});

//Load Categorias
function loadDdlCategoria() {
    $.ajax({
        url: "categorias/all",
        type: "GET",
        contentType: "application/json;charset=utf-8",
        dataType: "json",
        success: function (result) {
            var html = '';
            $.each(result, function (key, item) {                
                html += '<option id=' + item.categoriaId +'>' + item.categoriaNome + '</option>';                               
            });
            $('#DdlCategoria').html(html);
        },
        error: function (errormessage) {
            alert(errormessage.responseText);
        }
    });
}

//Load Categorias paginadas
function loadDataPagination(pag) {
    $.ajax({
        url: "categorias/paginacao/" + pag,
        type: "GET",
        contentType: "application/json;charset=utf-8",
        dataType: "json",
        success: function (result) {
            console.log(result);
            var html = '';
            $.each(result.categoria, function (key, item) {
                html += '<tr>';
                html += '<td>' + item.categoriaId + '</td>';
                html += '<td>' + item.categoriaNome + '</td>';
                html += '<td><button type="button" class="btn btn-primary btn-sm" onclick="return getbyID(' + item.categoriaId + ')">Alterar</button> | <button type="button" class="btn btn-danger btn-sm" onclick="Delele(' + item.categoriaId + ')">Excluir</button></td >';
                html += '</tr>';
            });
            $('#tblCategoria').html(html);

            var htmlPg = '';
            for (i = 1; i <= result.paginas; i++) {
                
                if (i == pag) {
                    htmlPg += ' <li class="page-item">'                    
                }
                else {
                    htmlPg += ' <li class="page-item active">'
                }
                htmlPg += '<a class="page-link active" href="#" onClick=" loadDataPagination(' + i + ')">' + i + '</a > '
                htmlPg += '</li>'
            }
            $('#pagination').html(htmlPg);

        },
        error: function (errormessage) {
            alert(errormessage.responseText);
        }
    });
}

//Nova Categoria
function Add() {
    var res = validate();
    if (res == false) {
        return false;
    }
    var catgrObj = {
        CategoriaId: 0,
        CategoriaNome: $('#Categoria').val(),
    };
    $.ajax({
        url: "categorias/salvar",
        data: JSON.stringify(catgrObj),
        type: "POST",
        contentType: "application/json;charset=utf-8",
        dataType: "json",
        success: function (result) {
            loadDataPagination(pag);
            $('#myModal').modal('hide');
        },
        error: function (errormessage) {
            console.log(errormessage);
            loadDataPagination(pag);
            $('#myModal').modal('hide');
        }
    });
}

//Retornar a Categoria baseado pelo ID
function getbyID(id) {
    $('#CategoriaNome').css('border-color', 'lightgrey');
    $.ajax({
        url: "categorias/ObterPorID/" + id,
        typr: "GET",
        contentType: "application/json;charset=UTF-8",
        dataType: "json",
        success: function (result) {
            $('#CategoriaId').val(result.categoriaId);
            $('#Categoria').val(result.categoriaNome);

            $('#myModal').modal('show');
            $('#btnUpdate').show();
            $('#btnAdd').hide();
        },
        error: function (errormessage) {
            alert(errormessage.responseText);
        }
    });
    return false;
}

//Alterar Categoria
function Update() {
    var res = validate();
    if (res == false) {
        return false;
    }
    var catgrObj = {
        CategoriaId: $('#CategoriaId').val(),
        CategoriaNome: $('#Categoria').val(),
    };
    $.ajax({
        url: "categorias/salvar",
        data: JSON.stringify(catgrObj),
        type: "POST",
        contentType: "application/json;charset=utf-8",
        dataType: "json",
        success: function (result) {
            loadDataPagination(pag);
            $('#myModal').modal('hide');
            $('#CategoriaId').val("");
            $('#CategoriaNome').val("");
        },
        error: function (errormessage) {
           // alert("Erro ao Alterar Categoria");
            console.log(errormessage);

            loadDataPagination(pag);
            $('#myModal').modal('hide');
            $('#CategoriaId').val("");
            $('#CategoriaNome').val("");
        }
    });
}

//Exclusão da Categoria
function Delele(id) {
    var ans = confirm("Você deseja excluir esta categoria, produtos associados a categoria serão excluidos também?");
    if (ans) {
        $.ajax({
            url: "categorias/excluir/" + id,
            type: "DELETE",
            contentType: "application/json;charset=UTF-8",
            dataType: "json",
            success: function (result) {
                loadDataPagination(pag);
            },
            error: function (errormessage) {
                //alert('Erro ao Excluir a Categoria');
                loadDataPagination(pag);
                console.log(errormessage);
            }
        });
    }
}

//Limpeza Texbox
function clearTextBox() {
    $('#CategoriaId').val("");
    $('#CategoriaNome').val("");

    $('#btnUpdate').hide();
    $('#btnAdd').show();

    $('#CategoriaId').css('border-color', 'lightgrey');
    $('#CategoriaNome').css('border-color', 'lightgrey');

}

//Validando Preenchimento
function validate() {
    var isValid = true;
    if ($('#Categoria').val().trim() == "") {

        $('#Categoria').css('border-color', 'Red');

        $('#frmCategoria').validate({
            errorElement: 'span',
            errorClass: 'help-inline',
            rules: {
                Categoria: "required",
            },
            messages: {
                Categoria: "Categoria Obrigatória !",
            },
        })

        isValid = false;
    }
    else {
        $('#Categoria').css('border-color', 'lightgrey');
    }
    return isValid;
}