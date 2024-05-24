CREATE DATABASE clinica_estetica;

CREATE TABLE cliente (
    id_cliente INT AUTO_INCREMENT NOT NULL PRIMARY KEY,
    nome VARCHAR(50) NOT NULL, 
    telefone BIGINT NOT NULL, 
    endereco VARCHAR(100) NOT NULL,
	bairro VARCHAR(100) NOT NULL,
    complemento VARCHAR(60),
    cidade VARCHAR(50) NOT NULL,
    cpf BIGINT NOT NULL,
    data_nascimento DATE NOT NULL,
    observacao VARCHAR(1000), 
    email VARCHAR (50) NOT NULL, 
    senha VARCHAR(100) NOT NULL
);

CREATE TABLE prestador (
    id_prestador INT AUTO_INCREMENT NOT NULL PRIMARY KEY,
    nome_prestador VARCHAR(50) NOT NULL, 
    telefone BIGINT NOT NULL, 
    endereco VARCHAR(100) NOT NULL,
	bairro VARCHAR(100) NOT NULL,
    complemento VARCHAR(60),
    cidade VARCHAR(50) NOT NULL,
    cpf BIGINT NOT NULL,
    data_nascimento DATE NOT NULL,
    profissao VARCHAR(1000) NOT NULL, 
    email VARCHAR (50) NOT NULL, 
    senha VARCHAR(100) NOT NULL
);

CREATE TABLE servico (
    id_servico INT AUTO_INCREMENT NOT NULL PRIMARY KEY, 
    nome_servico VARCHAR(50) NOT NULL,
    valor_servico DECIMAL(6,2) NOT NULL, 
    tempo TIME NOT NULL, 
    imagem VARCHAR(30) NULL, 
    tipo VARCHAR(20) NOT NULL
); 

CREATE TABLE pacotes (
	id_pacote INT AUTO_INCREMENT NOT NULL PRIMARY KEY, 
	nome VARCHAR(30) NOT NULL, 
	qtde_sessao INT NOT NULL,
	observacao VARCHAR(50) NULL, 
	valor_pacote Decimal (5,2) NOT NULL,
    id_servico INT NOT NULL,
    FOREIGN KEY (id_servico) REFERENCES servico (id_servico)
);

CREATE TABLE compromisso (
    id_compromisso INT AUTO_INCREMENT NOT NULL PRIMARY KEY,
    data_compromisso DATE NOT NULL, 
    hora TIME NOT NULL, 
    status_compromisso VARCHAR(30) NOT NULL, 
    id_cliente INT NOT NULL, 
    id_servico INT NOT NULL,
    FOREIGN KEY (id_cliente) REFERENCES cliente (id_cliente),
    FOREIGN KEY (id_servico) REFERENCES servico (id_servico)
);

CREATE TABLE agenda (
	id_agendamento INT AUTO_INCREMENT NOT NULL PRIMARY KEY,
    id_cliente INT NOT NULL, 
    id_compromisso INT NOT NULL,
	FOREIGN KEY (id_cliente) REFERENCES cliente (id_cliente),
	FOREIGN KEY (id_compromisso) REFERENCES compromisso (id_compromisso)
);
 
CREATE TABLE prestado (
    id_prestado INT AUTO_INCREMENT NOT NULL PRIMARY KEY,
    status_prestado VARCHAR(20) NOT NULL,
    situacao VARCHAR(20) NOT NULL,
    forma_pagamento VARCHAR(50) NOT NULL,
    id_compromisso INT NOT NULL, 
    id_servico INT NOT NULL, 
    FOREIGN KEY (id_compromisso) REFERENCES compromisso (id_compromisso), 
    FOREIGN KEY (id_servico) REFERENCES servico (id_servico)
);
 
INSERT INTO cliente (nome, telefone, endereco, bairro, complemento, cidade, cpf, data_nascimento, observacao, email, senha) VALUES
('Ana Carolina ', 0113745-2234,'Rua Savério Gilene', 'Parque São Paulo (Vila Xavier)' ,'', 'Araraquara', 01783744073,'1996-06-28', '', '', ''), 
('Bruna Cardosa', 0192984-3981, 'Rua Dez', 'Jardim Maria Luiza V' ,'' , 'Araraquara', 63472357061,'1998-03-10','', '', ''),
('Charlene Santos', 0162975-8047, 'Rua Comendador Pedro Morganti' ,'Jardim do Carmo' , '', 'Araraquara', 09886953080,'1991-10-12', '', '', ''),
('Cleusa Rodrigues', 0183611-4343, 'Avenida Paschoalino Palamone Lepre', 'Parque Residencial Laura Molina' ,'' , 'Araraquara', 18026979001,'1983-04-15' , '', '', ''),
('Cristiane Lopez', 0173332-5414, 'Avenida Eduardo de Freitas Gouveia Filho', 'Jardim Altos de Pinheiros I e II' ,'' , 'Araraquara', 25755622019, '1997-02-28','', '', ''),
('Danielli Pires', 0193538-4435, 'Rua Joaquim de Arruda Campos', 'Parque Igaçaba', 'Apartamento 7, Bloco 03' , 'Araraquara', 36768155059,'1998-03-10' ,'', '', ''),
('Francieli Silva', 0153235-2021, 'Avenida Francisco Vaz Filho', 'Jardim América (Vila Xavier)' ,'' , 'Américo Brasiliense', 37485152009,'2002-06-15' ,'', '', ''),
('Giovana Silva', 0162086-1664, 'Avenida Marcilio dos Santos', 'Condomínio Bella Vittà' ,'' , 'Araraquara', 07378524026,'1987-11-26' , '', '', ''),
('Gislaine Oliveira', 0113533-6621, 'Rua Rômulo Mingotti', '2° Distrito Industrial (Domingos Ferrari)' ,'Condomínio Alto da Boa Vista' , 'Araraquara', 90456194070,'1999-05-18' ,'', '', ''),
('Jayne Pereira', 0153736-6245, 'Rua Elias Jorge Abi Rached Filho', 'Doutor Tancredo de Almeida Neves' ,'' , 'Araraquara', 67692540004,'1977-03-19' , '', '', ''),
('Larissa Barros', 0123127-2375, 'Rua José de Freitas Caetano', 'Parque São Paulo (Vila Xavier)' ,'' , 'Araraquara', 04977836065, '1971-01-15', '', '', ''),
('Maísa de Andrade', 0173112-5122, 'Rua Mário Barbugli', 'Jardim Arco-Íris' ,'' , 'Araraquara',05679590077,'1993-08-29'  , '', '', ''),
('Mércia Diogo', 0143716-5545, 'Avenida Sylvio Mascia', 'Jardim Bandeirantes' ,'' , 'Araraquara', 96363059003,'1986-07-01', '', '', ''),
('Pâmela Cassiano', 0163789-4509, 'Avenida Benedito de Arruda Falcão', 'Jardim Eliana' ,'Apartamento 402, Bloco 07' , 'Araraquara', 68790635000,'1976-04-18' ,'', '', ''),
('Rafaela Lisboa', 0112436-8429, 'Avenida Francellino Mendes', 'Jardim Santa Rosa' ,'' , 'Araraquara', 95698915059,'2003-03-29' , '', '', ''),
('Vitória Cayres', 0172676-7315, 'Avenida Floridiana', 'Jardim Floridiana (Vila Xavier)' ,'' , 'Araraquara', 76971733010,'2002-06-19' , '', '', ''),
('Yasmin da Silva', 0183032-7871, 'Rua Doutor Norberto Dini Monteiro', 'Jardim Altos do Cecap I e II' ,'' , 'Araraquara', 90508397030,'2001-12-12','', '', '');
 
 INSERT INTO prestador (nome_prestador, telefone, endereco, bairro, complemento, cidade, cpf, data_nascimento, profissao, email,senha) VALUES
 ('Maria Julia',016997158669, 'Rua Treze', 'Portal das Laranjeiras', '', 'Araraquara', 44782059060, '1974-10-30', 'Esteticista', '','');
 
INSERT INTO servico (nome_servico, valor_servico, tempo, imagem, tipo) VALUES 
('Aplicação de Fibra de Vidro', 220.00, '2:30','Imagem 1', 'Unha'),
('Manutenção de Fibra de Vidro', 120.00, '1:30','Imagem 2', 'Unha'),
('Manutenção (de outra Profissional)', 150.00,'2:30', 'Imagem 3', 'Unha'),
('Concerto de Unha', 20.00, '0:15','Imagem 4', 'Unha'),
('Blindagem', 90.00,'1:00', 'Imagem 5', 'Unha'),
('Banho de Gel ', 120.00, '1:30', 'Imagem 6', 'Unha'),
('Banho de Fibra', 120.00, '1:30', 'Imagem 7', 'Unha'),
('Esmaltação em Gel', 70.00, '1:00', 'Imagem 8', 'Unha'),
('Remoção Fibra', 80.00, '0:40', 'Imagem 9', 'Unha'),
('Remoção Esmalte em Gel', 40.00, '0:30', 'Imagem 9', 'Unha'),
('Decoração Completa', 60.00, '0:20', 'Imagem 12', 'Unha'),
('Decoração Individual', 20.00, '0:10', 'Imagem 13', 'Unha'),
('Retífica de comprimento', 30.00, '0:30', 'Imagem 14', 'Unha'),
('Limpeza da Unha Natural', 30.00, '0:10', 'Imagem 15', 'Unha'),
('Troca de Formato (Reposição de Fibra)', 60.00, '0:30', 'Imagem 16', 'Unha'),
('Aplicação e Esmaltação em Gel', 260.00, '3:00', 'Imagem 17', 'Unha'),
('Manutenção e Esmaltação em Gel', 160.00, '2:30', 'Imagem 18', 'Unha'),
('Blindagem e Esmaltação em Gel', 130.00, '1:30', 'Imagem 19', 'Unha'),
('Banho de Fibra e Esmaltação em Gel', 160.00, '2:30', 'Imagem 20', 'Unha'),
('Banho de Fibra e Esmaltação em Gel', 160.00, '2:30', 'Imagem 21', 'Unha'),
('Aplicação e Decoração Completa', 280.00, '3:00', 'Imagem 22', 'Unha'),
('Manutenção e Decoração Completa', 180.00, '2:00', 'Imagem 23', 'Unha'),
('Aplicação e Decoração Individual', 240.00, '2:45', 'Imagem 24', 'Unha'),
('Manutenção e Decoração Individual', 140.00, '1:45', 'Imagem 25', 'Unha'),
('Manutenção e Troca de Formato', 180.00, '2:00', 'Imagem 26', 'Unha'),
('Massagem Relaxante', 100.00, '1:15','Imagem 27', 'Estética'), 
('Drenagem Linfática', 100.00, '1:15', 'Imagem 28', 'Estética'), 
('Limpeza de Pele', 100.00, '1:30','Imagem 29', 'Estética'), 
('Maquiagem', 160.00, '1:30','Imagem 30', 'Estética'), 
('Sobrancelha sem Henna', 35.00, '1:00','Imagem 31', 'Estética'), 
('Sobrancelha com Henna', 45.00, '1:30','Imagem 32', 'Estética');
 
INSERT INTO pacotes (nome, qtde_sessao, observacao, valor_pacote, id_servico) VALUES 
('Massagem Relaxante', 4, '1 por semana (90.00 cada)', 360.00 , 26),
('Massagem Relaxante', 8, '2 por semana (80,00 cada)', 640.00, 26),
('Massagem Relaxante', 12, '3 por semana (70,00 cada)', 840.00, 26),
('Drenagem Linfática', 4, '1 por semana (90,00 cada)', 360.00, 27),
('Drenagem Linfática', 8, '2 por semana (80,00 cada)', 640.00, 27),
('Drenagem Linfática', 12, '3 por semana (70,00 cada)', 840.00, 27);
 
INSERT INTO compromisso (data_compromisso, hora, status_compromisso, id_cliente, id_servico) VALUES 
('2023-10-03', '18:00', 'aguardando confirmação', 2,1),
('2023-10-06' , '15:00', 'aguardando confirmação', 6,2),
('2023-10-20', '9:00', 'aguardando confirmação', 1,4),
('2023-10-20' , '16:30', 'aguardando confirmação', 7,10),
('2023-10-21', '13:30', 'aguardando confirmação', 10,12); 

INSERT INTO prestado (status_prestado, situacao, forma_pagamento, id_compromisso, id_servico) VALUES 
('agendado', 'concluido', 'crédito', 1, 17),
('agendado', 'concluido', 'débito', 2, 1),
('agendado', 'concluido', 'dinheiro', 3, 26),
('agendado', 'concluido', 'pix', 4, 8),
('agendado', 'cancelado', 'crédito e pix', 5, 29);

INSERT INTO agenda (id_cliente, id_compromisso) VALUES
(1,3),
(3,1);
 




