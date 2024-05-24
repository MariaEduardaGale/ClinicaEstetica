$(document).ready(function () {

    /* Mostrando os serviços - GET  OK*/
    $.ajax({
        url: 'http://localhost:3333/cliente',
        method: 'GET',
        dataType: 'json',
        success: function (data) {
            var table = $('#cadastro tbody')
            $.each(data, function (index, item) {
                var dataNascimentoFormatada = moment(item.data_nascimento).format('DD/MM/YYYY');

                table.append('<tr id="line">' +
                    '<td id="code">' + item.id_cliente + '</td>' +
                    '<td>' + item.nome + '</td>' +
                    '<td>' + item.telefone + '</td>' +
                    '<td>' + item.endereco + '</td>' +
                    '<td>' + item.bairro + '</td>' +
                    '<td>' + item.complemento + '</td>' +
                    '<td>' + item.cidade + '</td>' +
                    '<td>' + item.cpf + '</td>' +
                    '<td>' + dataNascimentoFormatada + '</td>' +
                    '<td>' + item.observacao + '</td>' +
                    '<td>' + item.email + '</td>' +
                    '<td>' + item.senha + '</td>' +
                    '<td> <button type="button" class="btn btn-success" data-bs-toggle="modal" data-bs-target="#updateModal" data-id="' + item.id_cliente + '" id="btnEdit">Editar</button></td>' +
                    '<td> <button type="button" class="btn btn-danger" data-bs-toggle="modal" data-bs-target="#deleteModal" data-id="' + item.id_cliente + '" id="btnDelete">Excluir</button></td>' +
                    '</tr>')
            })
        }
    })

    // Cadastrando novo cliente
    $('#btnSalvar').on('click', function () {
        //previne o envio de formulário em branco
        $('#form').on('click', function (event) {
            event.preventDefault();
        })

        var nome = $('#m-nome').val();
        var telefone = $('#m-telefone').val();
        var endereco = $('#m-endereco').val();
        var bairro = $('#m-bairro').val();
        var complemento = $('#m-complemento').val();
        var cidade = $('#m-cidade').val();
        var cpf = $('#m-cpf').val();
        var data_nascimento = moment($('#m-dataNascimento').val()).format('YYYY/MM/DD');
        var observacao = $('#m-observacao').val();
        var email = $('#m-email').val();
        var senha = $('#m-senha').val();

        // verificar se TODOS os campos estão preenchidos
        if (nome != '' && telefone != '' && endereco != '' && bairro != '' && cidade != '' && cpf != '' && data_nascimento != ''  && email != '' && senha != '') {
            
            //Envia o POST
            $.ajax({
                url: 'http://localhost:3333/cliente',
                method: 'POST',
                cache: false,
                /*    contentType: 'application/ x-www-form-urlenconded', */
                dataType: 'json',
                data: {
                    // propriedade (BD) recebe variável
                    nome: nome,
                    telefone: telefone,
                    endereco: endereco,
                    bairro: bairro,
                    complemento: complemento,
                    cidade: cidade,
                    cpf: cpf,
                    data_nascimento: data_nascimento,
                    observacao: observacao,
                    email: email,
                    senha: senha
                    
                },
                success: function () {
                    alert('Cliente Cadastrado com Sucesso!')
                    $('#form').each(function () {
                        this.reset(); //limpa o formulário
                        $('#addModal').modal('hide') //esconde o modal
                    })
                    location.reload(); // atualizar a página
                }
            })
        } else {
            $('#addModal').modal('hide')
            alert('Preencha todos os campos!')
        }
    })


    // Edição dos dados cadastrados - PATCH
    $(document).on('click', '#btnEdit', function () {
        var line = $(this).closest('tr');
        var id_cliente = line.find('#code').text();

        $.ajax({
            url: 'http://localhost:3333/cliente/' + id_cliente,
            method: 'GET',
            dataType: 'json',

            success: function (data) {
                $('#u-nome').val(data[0].nome),
                    $('#u-telefone').val(data[0].telefone),
                    $('#u-endereco').val(data[0].endereco),
                    $('#u-bairro').val(data[0].bairro),
                    $('#u-complemento').val(data[0].complemento),
                    $('#u-cidade').val(data[0].cidade),
                    $('#u-cpf').val(data[0].cpf),
                    $('#u-dataNascimento').val(moment(data[0].data_nascimento).format('YYYY-MM-DD'));
                    $('#u-observacao').val(data[0].observacao),
                    $('#u-email').val(data[0].email),
                    $('#u-senha').val(data[0].senha)

                    $('#updateModal').modal('show')
            },
            error: function (error) {
                console.log(error);
                console.log('Não foi possível mostrar a cliente.')
            }

        })

        $(document).on('click', '#btnAlterar', function () {
            var novoNome = $('#u-nome').val();
            var novoTelefone = $('#u-telefone').val();
            var novoEndereco = $('#u-endereco').val();
            var novoBairro = $('#u-bairro').val();
            var novoComplemento = $('#u-complemento').val();
            var novaCidade = $('#u-cidade').val();
            var novoCpf = $('#u-cpf').val();
            var novaData_nascimento = moment($('#u-dataNascimento').val()).format('YYYY/MM/DD');
            var novaObservacao = $('#u-observacao').val();
            var novoEmail = $('#u-email').val();
            var novaSenha = $('#u-senha').val();

            if (novoNome != '' && novoTelefone != '' && novoEndereco != '' && novoBairro != '' && novaCidade != '' && novoCpf != '' && novaData_nascimento != '' && novoEmail != '' && novaSenha != '') {

                $.ajax({
                    url: 'http://localhost:3333/cliente/' + id_cliente,
                    method: 'PATCH',
                    dataType: 'json',
                    data: {
                        nome: novoNome,
                        telefone: novoTelefone,
                        endereco: novoEndereco,
                        bairro: novoBairro,
                        complemento: novoComplemento,
                        cidade: novaCidade,
                        cpf: novoCpf,
                        data_nascimento: novaData_nascimento,
                        observacao: novaObservacao,
                        email: novoEmail,
                        senha: novaSenha
                    },
                    success: function () {
                        alert('Cliente atualizada com sucesso!')
                        $('#updateModal').modal('hide');
                        location.reload();
                    },
                    error: function (error) {
                        alert('Não foi possível atualizar a cliente.')
                        console.log(error)
                        location.reload();
                    }

                })
            } else {
                alert('Falha ao atualizar a cliente.')
            }
        })
    })


    // Excluir um serviço OK
    $(document).on('click', '#btnDelete', function () {
        var line = $(this).closest('tr');
        var id_cliente = line.find('#code').text();

        $('#deleteModal').modal('show')

        $(document).on('click', '#btnSim', function () {
            $.ajax({
                url: 'http://localhost:3333/cliente/' + id_cliente,
                method: 'DELETE',
                success: function () {
                    line.remove();
                    alert('Cliente excluída com sucesso!')
                    location.reload();
                },
                error: function (error) {
                    alert('Não foi possível excluir a cliente.')
                    console.log(error)
                }
            })

        })

    })


})


