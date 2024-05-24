CREATE DATABASE  IF NOT EXISTS `clinica_estetica` /*!40100 DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci */ /*!80016 DEFAULT ENCRYPTION='N' */;
USE `clinica_estetica`;
-- MySQL dump 10.13  Distrib 8.0.36, for Win64 (x86_64)
--
-- Host: localhost    Database: clinica_estetica
-- ------------------------------------------------------
-- Server version	8.0.36

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `cliente`
--

DROP TABLE IF EXISTS `cliente`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `cliente` (
  `id_cliente` int NOT NULL AUTO_INCREMENT,
  `nome` varchar(50) NOT NULL,
  `telefone` bigint NOT NULL,
  `endereco` varchar(100) NOT NULL,
  `bairro` varchar(100) NOT NULL,
  `complemento` varchar(60) DEFAULT NULL,
  `cidade` varchar(50) NOT NULL,
  `cpf` bigint NOT NULL,
  `data_nascimento` date NOT NULL,
  `observacao` varchar(1000) DEFAULT NULL,
  `email` varchar(50) NOT NULL,
  `senha` varchar(100) NOT NULL,
  PRIMARY KEY (`id_cliente`)
) ENGINE=InnoDB AUTO_INCREMENT=19 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `cliente`
--

LOCK TABLES `cliente` WRITE;
/*!40000 ALTER TABLE `cliente` DISABLE KEYS */;
INSERT INTO `cliente` VALUES (1,'Ana Carolina ',111511,'Rua Savério Gilene','Parque São Paulo (Vila Xavier)','','Araraquara',1783744073,'1996-06-28','','',''),(2,'Bruna Cardosa',189003,'Rua Dez','Jardim Maria Luiza V','','Araraquara',63472357061,'1998-03-10','','',''),(3,'Charlene Santos',154928,'Rua Comendador Pedro Morganti','Jardim do Carmo','','Araraquara',9886953080,'1991-10-12','','',''),(4,'Cleusa Rodrigues',179268,'Avenida Paschoalino Palamone Lepre','Parque Residencial Laura Molina','','Araraquara',18026979001,'1983-04-15','','',''),(5,'Cristiane Lopez',167918,'Avenida Eduardo de Freitas Gouveia Filho','Jardim Altos de Pinheiros I e II','','Araraquara',25755622019,'1997-02-28','','',''),(6,'Danielli Pires',189103,'Rua Joaquim de Arruda Campos','Parque Igaçaba','Apartamento 7, Bloco 03','Araraquara',36768155059,'1998-03-10','','',''),(7,'Francieli Silva',151214,'Avenida Francisco Vaz Filho','Jardim América (Vila Xavier)','','Américo Brasiliense',37485152009,'2002-06-15','','',''),(8,'Giovana Silva',160422,'Avenida Marcilio dos Santos','Condomínio Bella Vittà','','Araraquara',7378524026,'1987-11-26','','',''),(9,'Gislaine Oliveira',106912,'Rua Rômulo Mingotti','2° Distrito Industrial (Domingos Ferrari)','Condomínio Alto da Boa Vista','Araraquara',90456194070,'1999-05-18','','',''),(10,'Jayne Pereira',147491,'Rua Elias Jorge Abi Rached Filho','Doutor Tancredo de Almeida Neves','','Araraquara',67692540004,'1977-03-19','','',''),(11,'Larissa Barros',120752,'Rua José de Freitas Caetano','Parque São Paulo (Vila Xavier)','','Araraquara',4977836065,'1971-01-15','','',''),(12,'Maísa de Andrade',167990,'Rua Mário Barbugli','Jardim Arco-Íris','','Araraquara',5679590077,'1993-08-29','','',''),(13,'Mércia Diogo',138171,'Avenida Sylvio Mascia','Jardim Bandeirantes','','Araraquara',96363059003,'1986-07-01','','',''),(14,'Pâmela Cassiano',159280,'Avenida Benedito de Arruda Falcão','Jardim Eliana','Apartamento 402, Bloco 07','Araraquara',68790635000,'1976-04-18','','',''),(15,'Rafaela Lisboa',104007,'Avenida Francellino Mendes','Jardim Santa Rosa','','Araraquara',95698915059,'2003-03-29','','',''),(16,'Vitória Cayres',165361,'Avenida Floridiana','Jardim Floridiana (Vila Xavier)','','Araraquara',76971733010,'2002-06-19','','',''),(17,'Yasmin da Silva',175161,'Rua Doutor Norberto Dini Monteiro','Jardim Altos do Cecap I e II','','Araraquara',90508397030,'2001-12-12','','','');
/*!40000 ALTER TABLE `cliente` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2024-05-24 18:53:05
