$(document).ready(function () {

    /* Mostrando os pacotes - GET */
    $.ajax({
        url: 'http://localhost:3333/pacotes',
        method: 'GET',
        dataType: 'json',
        success: function (data) {
            var table = $('#cadastro tbody')
            $.each(data, function (index, item) {
                table.append('<tr id="line">' +
                    '<td id="code">' + item.id_pacote + '</td>' +
                    '<td>' + item.nome + '</td>' +
                    '<td>' + item.qtde_sessao + '</td>' +
                    '<td>' + item.observacao + '</td>' +
                    '<td>' + item.valor_pacote + '</td>' +
                    '<td>' + item.id_servico + '</td>' +
                    '<td> <button type="button" class="btn btn-success" data-bs-toggle="modal" data-bs-target="#updateModal" data-id="' + item.id_pacote + '" id="btnEdit">Editar</button></td>' +
                    '<td> <button type="button" class="btn btn-danger" data-bs-toggle="modal" data-bs-target="#deleteModal" data-id="' + item.id_pacote + '" id="btnDelete">Excluir</button></td>' + '</tr>')

            })
        }
    })

    
    $('#btnSalvar').on('click', function () {
        $('#form').on('click', function (event) {
            event.preventDefault();
        })

        var nome = $('#m-nome').val();
        var qtde_sessao = $('#m-qtde_sessao').val();
        var observacao = $('#m-observacao').val();
        var valor_pacote = $('#m-valor_pacote').val().replace(',', '.');
        var id_servico = $('#m-id_servico').val();

        if (nome != '' && qtde_sessao != '' && observacao != '' && valor_pacote != '' && id_servico != '') {

            
            $.ajax({
                url: 'http://localhost:3333/pacotes',
                method: 'POST',
                cache: false,
                dataType: 'json',
                data: {
                    nome: nome,
                    qtde_sessao: qtde_sessao,
                    observacao: observacao,
                    valor_pacote: valor_pacote,
                    id_servico: id_servico
                },
                success: function () {
                    alert('Pacote Cadastrado com Sucesso!')
                    $('#form').each(function () {
                        this.reset();
                        $('#addModal').modal('hide')
                    })
                    location.reload();
                }
            })
        } else {
            $('#addModal').modal('hide')
            alert('Preencha os dados Corretamente!')
        }
    })

    
    $(document).on('click', '#btnEdit', function () {
        var line = $(this).closest('tr');
        var id_pacote = line.find('#code').text();

        $.ajax({
            url: 'http://localhost:3333/pacotes/' + id_pacote,
            method: 'GET',
            dataType: 'json',

            success: function (data) {

                $('#u-nome').val(data[0].nome),
                    $('#u-qtde_sessao').val(data[0].qtde_sessao),
                    $('#u-observacao').val(data[0].observacao),
                    $('#u-valor_pacote').val(data[0].valor_pacote),
                    $('#u-id_servico').val(data[0].id_servico),

                    $('#updateModal').modal('show')
            },
            error: function (error) {
                console.log(error);
                console.log('Não foi possível mostrar o pacote.')
            }
        })

        $(document).on('click', '#btnAlterar', function () {
            var novoNome = $('#u-nome').val();
            var novaQtdeSessao = $('#u-qtde_sessao').val();
            var novaObservacao = $('#u-observacao').val();
            var novoValorPacote = $('#u-valor_pacote').val().replace(',', '.');
            var novoIdServico = $('#u-id_servico').val();

            if (novoNome != '' && novaQtdeSessao != '' && novaObservacao != '' && novoValorPacote != '' && novoIdServico != '') {

                $.ajax({
                    url: 'http://localhost:3333/pacotes/' + id_pacote,
                    method: 'PATCH',
                    dataType: 'json',
                    data: {
                        nome: novoNome,
                        qtde_sessao: novaQtdeSessao,
                        observacao: novaObservacao,
                        valor_pacote: novoValorPacote,
                        id_servico: novoIdServico,
                    },
                    success: function () {
                        alert('Pacote atualizado com sucesso!')
                        $('#updateModal').modal('hide');
                        location.reload();
                    },
                    error: function (error) {
                        alert('Não foi possível atualizar o pacote.')
                        console.log(error)
                        // location.reload();
                    }

                })
            } else {
                alert('Falha ao atualizar o pacote.')
            }
        })
    })


   
    $(document).on('click', '#btnDelete', function () {
        var line = $(this).closest('tr');
        var id_pacote = line.find('#code').text();

        $('#deleteModal').modal('show')

        $(document).on('click', '#btnSim', function () {
            $.ajax({
                url: 'http://localhost:3333/pacotes/' + id_pacote,
                method: 'DELETE',
                success: function () {
                    line.remove();
                    alert('Pacote excluído com sucesso!')
                    location.reload();
                },
                error: function (error) {
                    alert('Não foi possível excluir o pacote.')
                    console.log(error)
                }
            })

        })

    })


})