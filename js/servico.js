$(document).ready(function () {

    /* Mostrando os serviços - GET  OK*/
    $.ajax({
        url: 'http://localhost:3333/servico',
        method: 'GET',
        dataType: 'json',
        success: function (data) {
            var table = $('#cadastro tbody')
            $.each(data, function (index, item) {
                table.append('<tr id="line">' +
                    '<td id="code">' + item.id_servico + '</td>' +
                    '<td>' + item.nome_servico + '</td>' +
                    '<td>' + item.valor_servico + '</td>' +
                    '<td>' + item.tempo + '</td>' +
                    '<td>' + item.imagem + '</td>' +
                    '<td>' + item.tipo + '</td>' +
                    '<td> <button type="button" class="btn btn-success" data-bs-toggle="modal" data-bs-target="#updateModal" data-id="' + item.id_servico + '" id="btnEdit">Editar</button></td>' +
                    '<td> <button type="button" class="btn btn-danger" data-bs-toggle="modal" data-bs-target="#deleteModal" data-id="' + item.id_servico + '" id="btnDelete">Excluir</button></td>' +
                    '</tr>')
            })
        }
    })

   
    $('#btnSalvar').on('click', function () {
        
        $('#form').on('click', function (event) {
            event.preventDefault();
        })

        var nome_servico = $('#m-nome').val();
        var valor_servico = $('#m-valor').val().replace(',', '.');
        var tempo = $('#m-tempo').val();
        var imagem = $('#m-imagem').val();
        var tipo = $('#m-tipo').val();

        
        if (nome_servico != '' && valor_servico != '' && tempo != '' && imagem != '' && tipo != '') {
            
            $.ajax({
                url: 'http://localhost:3333/servico',
                method: 'POST',
                cache: false,
                
                dataType: 'json',
                data: {
                    
                    nome_servico: nome_servico,
                    valor_servico: valor_servico,
                    tempo: tempo,
                    imagem: imagem,
                    tipo: tipo,
                },
                success: function () {
                    alert('Serviço Cadastrado com Sucesso!')
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
        var id_servico = line.find('#code').text();

        $.ajax({
            url: 'http://localhost:3333/servico/' + id_servico,
            method: 'GET',
            dataType: 'json',

            success: function (data) {
               
                $('#u-nome').val(data[0].nome_servico),
                    $('#u-valor').val(data[0].valor_servico),
                    $('#u-tempo').val(data[0].tempo),
                    $('#u-imagem').val(data[0].imagem),
                    $('#u-tipo').val(data[0].tipo),

                    $('#updateModal').modal('show')
            },
            error: function (error) {
                console.log(error);
                console.log('Não foi possível mostrar o serviço.')
            }
        })

        $(document).on('click', '#btnAlterar', function () {
            var novoNomeServico = $('#u-nome').val();
            var novoValor = $('#u-valor').val();
            var novoTempo = $('#u-tempo').val(); 
            var novaImagem = $('#u-imagem').val();
            var novoTipo = $('#u-tipo').val();

            if (novoNomeServico != '' && novoValor != '' && novoTempo != '' && novaImagem != '' && novoTipo != '') {

                $.ajax({
                    url: 'http://localhost:3333/servico/' + id_servico,
                    method: 'PATCH',
                    dataType: 'json',
                    data: {
                        nome_servico: novoNomeServico,
                        valor_servico: novoValor,
                        tempo: novoTempo,
                        imagem: novaImagem,
                        tipo: novoTipo,
                    },
                    success: function () {
                        alert('Serviço atualizado com sucesso!')
                        $('#updateModal').modal('hide');
                        location.reload();
                    },
                    error: function (error) {
                        alert('Não foi possível atualizar o serviço.')
                        console.log(error)
                        location.reload();
                    }

                })
            } else {
                alert('Falha ao atualizar o serviço.')
            }
        })
    })


    // Excluir um serviço OK
    $(document).on('click', '#btnDelete', function () {
        var line = $(this).closest('tr');
        var id_servico = line.find('#code').text();

        $('#deleteModal').modal('show')

        $(document).on('click', '#btnSim', function () {
            $.ajax({
                url: 'http://localhost:3333/servico/' + id_servico,
                method: 'DELETE',
                success: function () {
                    line.remove();
                    alert('Serviço excluído com sucesso!')
                    location.reload();
                },
                error: function (error) {
                    alert('Não foi possível excluir o serviço.')
                    console.log(error)
                }
            })

        })

    })


})


