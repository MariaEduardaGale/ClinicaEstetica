$(document).ready(function () {

    
    $.ajax({
        url: 'http://localhost:3333/prestador',
        method: 'GET',
        dataType: 'json',
        success: function (data) {
            var table = $('#cadastro tbody')
            $.each(data, function (index, item) {
                var dataNascimentoFormatada = moment(item.data_nascimento).format('DD/MM/YYYY');

                table.append('<tr id="line">' +
                    '<td id="code">' + item.id_prestador + '</td>' +
                    '<td>' + item.nome_prestador + '</td>' +
                    '<td>' + item.telefone + '</td>' +
                    '<td>' + item.endereco + '</td>' +
                    '<td>' + item.bairro + '</td>' +
                    '<td>' + item.complemento + '</td>' +
                    '<td>' + item.cidade + '</td>' +
                    '<td>' + item.cpf + '</td>' +
                    '<td>' + dataNascimentoFormatada + '</td>' +
                    '<td>' + item.profissao + '</td>' +
                    '<td>' + item.email + '</td>' +
                    '<td>' + item.senha + '</td>' +
                    '<td> <button type="button" class="btn btn-success" data-bs-toggle="modal" data-bs-target="#updateModal" data-id="' + item.id_prestador + '" id="btnEdit">Editar</button></td>' +
                    '<td> <button type="button" class="btn btn-danger" data-bs-toggle="modal" data-bs-target="#deleteModal" data-id="' + item.id_prestador + '" id="btnDelete">Excluir</button></td>' +
                    '</tr>')
            })
        }
    })

    
    $('#btnSalvar').on('click', function () {
        
        $('#form').on('click', function (event) {
            event.preventDefault();
        })

        var nome_prestador = $('#m-nome').val();
        var telefone = $('#m-telefone').val();
        var endereco = $('#m-endereco').val();
        var bairro = $('#m-bairro').val();
        var complemento = $('#m-complemento').val();
        var cidade = $('#m-cidade').val();
        var cpf = $('#m-cpf').val();
        var data_nascimento = moment($('#m-dataNascimento').val()).format('YYYY/MM/DD');
        var profissao = $('#m-profissao').val();
        var email = $('#m-email').val();
        var senha = $('#m-senha').val();

        
        if (nome_prestador != '' && telefone != '' && endereco != '' && bairro != '' && complemento != '' && cidade != '' && cpf != '' && data_nascimento != '' && profissao != '' && email != '' && senha != '') {

           
            $.ajax({
                url: 'http://localhost:3333/prestador',
                method: 'POST',
                cache: false,
                
                dataType: 'json',
                data: {
                    
                    nome_prestador: nome_prestador,
                    telefone: telefone,
                    endereco: endereco,
                    bairro: bairro,
                    complemento: complemento,
                    cidade: cidade,
                    cpf: cpf,
                    data_nascimento: data_nascimento,
                    profissao: profissao,
                    email: email,
                    senha: senha

                },
                success: function () {
                    alert('Colaborador Cadastrado com Sucesso!')
                    $('#form').each(function () {
                        this.reset(); 
                        $('#addModal').modal('hide') 
                    })
                    location.reload(); 
                }
            })
        } else {
            $('#addModal').modal('hide')
            alert('Preencha todos os campos!')
        }
    })


    
    $(document).on('click', '#btnEdit', function () {
        var line = $(this).closest('tr');
        var id_prestador = line.find('#code').text();

        $.ajax({
            url: 'http://localhost:3333/prestador/' + id_prestador,
            method: 'GET',
            dataType: 'json',

            success: function (data) {
                $('#u-nome').val(data[0].nome_prestador),
                    $('#u-telefone').val(data[0].telefone),
                    $('#u-endereco').val(data[0].endereco),
                    $('#u-bairro').val(data[0].bairro),
                    $('#u-complemento').val(data[0].complemento),
                    $('#u-cidade').val(data[0].cidade),
                    $('#u-cpf').val(data[0].cpf),
                    $('#u-dataNascimento').val(moment(data[0].data_nascimento).format('YYYY-MM-DD'));
                    $('#u-profissao').val(data[0].profissao),
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
            var novaProfissao = $('#u-profissao').val();
            var novoEmail = $('#u-email').val();
            var novaSenha = $('#u-senha').val();

            if (novoNome != '' && novoTelefone != '' && novoEndereco != '' && novoBairro != '' && novoComplemento != '' && novaCidade != '' && novoCpf != '' && novaData_nascimento != '' && novaProfissao != '' && novoEmail != '' && novaSenha != '') {

                $.ajax({
                    url: 'http://localhost:3333/prestador/' + id_prestador,
                    method: 'PATCH',
                    dataType: 'json',
                    data: {
                        nome_prestador: novoNome,
                        telefone: novoTelefone,
                        endereco: novoEndereco,
                        bairro: novoBairro,
                        complemento: novoComplemento,
                        cidade: novaCidade,
                        cpf: novoCpf,
                        data_nascimento: novaData_nascimento,
                        profissao: novaProfissao,
                        email: novoEmail,
                        senha: novaSenha
                    },
                    success: function () {
                        alert('Colaborador atualizada com sucesso!')
                        $('#updateModal').modal('hide');
                        location.reload();
                    },
                    error: function (error) {
                        alert('Não foi possível atualizar o colaborador.')
                        console.log(error)
                        location.reload();
                    }

                })
            } else {
                alert('Falha ao atualizar o colaborador.')
            }
        })
    })


    
    $(document).on('click', '#btnDelete', function () {
        var line = $(this).closest('tr');
        var id_prestador = line.find('#code').text();

        $('#deleteModal').modal('show')

        $(document).on('click', '#btnSim', function () {
            $.ajax({
                url: 'http://localhost:3333/prestador/' + id_prestador,
                method: 'DELETE',
                success: function () {
                    line.remove();
                    alert('Colaborador excluído com sucesso!')
                    location.reload();
                },
                error: function (error) {
                    alert('Não foi possível excluir o colaborador.')
                    console.log(error)
                }
            })

        })

    })


})


