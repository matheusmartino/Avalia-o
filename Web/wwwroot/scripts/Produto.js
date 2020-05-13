
//Inicializaão variáveis
var pag = 1

$(document).ready(function () {    
    loadDataPaginationPrd(pag);
});

// Produtos páginados
function loadDataPaginationPrd(pag) {
    $.ajax({
        url: "produtos/paginacao/" + pag,
        type: "GET",
        contentType: "application/json;charset=utf-8",
        dataType: "json",        
        success: function (result) {
            console.log(result);
            var html = '';
            $.each(result.produto, function (key, item) {
                html += '<tr>';
                html += '<td>' + item.produtoId + '</td>';
                html += '<td>' + item.produtoNome + '</td>';
                html += '<td>R$ ' + item.produtoValor + '</td>';
                html += '<td>' + item.categoria.categoriaNome + '</td>';
                html += '<td><button type="button" class="btn btn-primary btn-sm" onclick="return getPrdByID(' + item.produtoId + ')">Alterar</button> | <button type="button" class="btn btn-danger btn-sm" onclick="DeletePrd(' + item.produtoId + ')">Excluir</button></td >';
                html += '</tr>';
            });
            $('#tblProduto').html(html);

            var htmlPg = '';
            for (i = 1; i <= result.paginas; i++) {

                if (i == pag) {
                    htmlPg += ' <li class="page-item">'
                }
                else {
                    htmlPg += ' <li class="page-item active">'
                }
                htmlPg += '<a class="page-link active" href="#" onClick=" loadDataPaginationPrd(' + i + ')">' + i + '</a > '
                htmlPg += '</li>'
            }
            $('#pagination').html(htmlPg);

        },
        error: function (errormessage) {
            console.log(errormessage);
            alert(errormessage.responseText);
        }
    });
}

//Novo Produto
function AddPrd() {
    var res = validatePrd();
    if (res == false) {
        return false;
    }
    var prdObj = {
        ProdutoId: 0,
        CategoriaId: $('#DdlCategoria').children(":selected").attr("id"),
        ProdutoNome: $('#Produto').val(),
        ProdutoValor: $('#Valor').val(),
    };

    console.log(prdObj);

    $.ajax({
        url: "produtos/salvar",
        data: JSON.stringify(prdObj),
        type: "POST",
        contentType: "application/json;charset=utf-8",
        dataType: "json",
        success: function (result) {
            loadDataPaginationPrd(pag);
            $('#myModal').modal('hide');
        },
        error: function (errormessage) {
            console.log(errormessage);
            loadDataPaginationPrd(pag);
            $('#myModal').modal('hide');
        }
    });
}

//Exclusão Produto
function DeletePrd(id) {
    var ans = confirm("Você deseja excluir este Produto?");
    if (ans) {
        $.ajax({
            url: "produtos/excluir/" + id,
            type: "DELETE",
            contentType: "application/json;charset=UTF-8",
            dataType: "json",
            success: function (result) {
                loadDataPaginationPrd(pag);
            },
            error: function (errormessage) {
                //alert('Erro ao Excluir a Categoria');
                loadDataPaginationPrd(pag);
                console.log(errormessage);
            }
        });
    }
}

// Obter Produto pelo seu ID
function getPrdByID(id) {
    $('#Produto').css('border-color', 'lightgrey');
    $.ajax({
        url: "produtos/obterporID/" + id,
        typr: "GET",
        contentType: "application/json;charset=UTF-8",
        dataType: "json",
        success: function (result) {
            console.log(result)
            $('#DdlCategoria').val(result.categoria.categoriaNome);
            $('#ProdutoId').val(result.produtoId);
            $('#Produto').val(result.produtoNome);
            $('#Valor').val(result.produtoValor);

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

// Alteração Produto
function UpdatePrd() {
    var res = validatePrd();
    if (res == false) {
        return false;
    }
    var catgrObj = {
        CategoriaId: $('#DdlCategoria').children(":selected").attr("id"),
        ProdutoNome: $('#Produto').val(),
        ProdutoId: $('#ProdutoId').val(),
        ProdutoValor: $('#Valor').val(),
    };
    $.ajax({
        url: "produtos/salvar",
        data: JSON.stringify(catgrObj),
        type: "POST",
        contentType: "application/json;charset=utf-8",
        dataType: "json",
        success: function (result) {
            loadDataPaginationPrd(pag);
            $('#myModal').modal('hide');
            $('#CategoriaId').val("");
            $('#Produto').val("");
            $('#ProdutoId').val("");
            $('#Valor').val("");
        },
        error: function (errormessage) {
            // alert("Erro ao Alterar Categoria");
            console.log(errormessage);

            loadDataPaginationPrd(pag);
            $('#myModal').modal('hide');
            $('#CategoriaId').val("");
            $('#Produto').val("");
            $('#ProdutoId').val("");
            $('#Valor').val("");
        }
    });
}

//Limpeza Texbox
function clearTextBoxPrd() {
    $('#CategoriaId').val("");
    $('#Produto').val("");
    $('#ProdutoId').val("");
    $('#Valor').val("");

    $('#btnUpdate').hide();
    $('#btnAdd').show();

    $('#ProdutoId').css('border-color', 'lightgrey');
    $('#Produto').css('border-color', 'lightgrey');
    $('#Valor').css('border-color', 'lightgrey');
    $('#CategoriaId').css('border-color', 'lightgrey');

}

//Validando Preenchimento
function validatePrd() {
    var isValid = true;
    if ($('#Produto').val().trim() == "") {

        $('#Produto').css('border-color', 'Red');
        
        isValid = false;
    }
    else {
        $('#Produto').css('border-color', 'lightgrey');
    }

    if ($('#Valor').val().trim() == "") {

        $('#Valor').css('border-color', 'Red');      

        isValid = false;
    }
    else {
        $('#Valor').css('border-color', 'lightgrey');
    }

    if ($('#DdlCategoria').val().trim() == "") {

        $('#DdlCategoria').css('border-color', 'Red');

        isValid = false;
    }
    else {
        $('#DdlCategoria').css('border-color', 'lightgrey');
    }



    return isValid;
}
