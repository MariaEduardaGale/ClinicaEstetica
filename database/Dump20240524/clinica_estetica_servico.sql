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
-- Table structure for table `servico`
--

DROP TABLE IF EXISTS `servico`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `servico` (
  `id_servico` int NOT NULL AUTO_INCREMENT,
  `nome_servico` varchar(50) NOT NULL,
  `valor_servico` decimal(6,2) NOT NULL,
  `tempo` time NOT NULL,
  `imagem` varchar(30) DEFAULT NULL,
  `tipo` varchar(20) NOT NULL,
  PRIMARY KEY (`id_servico`)
) ENGINE=InnoDB AUTO_INCREMENT=32 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `servico`
--

LOCK TABLES `servico` WRITE;
/*!40000 ALTER TABLE `servico` DISABLE KEYS */;
INSERT INTO `servico` VALUES (1,'Aplicação de Fibra de Vidro',220.00,'02:30:00','Imagem 1','Unha'),(2,'Manutenção de Fibra de Vidro',120.00,'01:30:00','Imagem 2','Unha'),(3,'Manutenção (de outra Profissional)',150.00,'02:30:00','Imagem 3','Unha'),(4,'Concerto de Unha',20.00,'00:15:00','Imagem 4','Unha'),(5,'Blindagem',90.00,'01:00:00','Imagem 5','Unha'),(6,'Banho de Gel ',120.00,'01:30:00','Imagem 6','Unha'),(7,'Banho de Fibra',120.00,'01:30:00','Imagem 7','Unha'),(8,'Esmaltação em Gel',70.00,'01:00:00','Imagem 8','Unha'),(9,'Remoção Fibra',80.00,'00:40:00','Imagem 9','Unha'),(10,'Remoção Esmalte em Gel',40.00,'00:30:00','Imagem 9','Unha'),(11,'Decoração Completa',60.00,'00:20:00','Imagem 12','Unha'),(12,'Decoração Individual',20.00,'00:10:00','Imagem 13','Unha'),(13,'Retífica de comprimento',30.00,'00:30:00','Imagem 14','Unha'),(14,'Limpeza da Unha Natural',30.00,'00:10:00','Imagem 15','Unha'),(15,'Troca de Formato (Reposição de Fibra)',60.00,'00:30:00','Imagem 16','Unha'),(16,'Aplicação e Esmaltação em Gel',260.00,'03:00:00','Imagem 17','Unha'),(17,'Manutenção e Esmaltação em Gel',160.00,'02:30:00','Imagem 18','Unha'),(18,'Blindagem e Esmaltação em Gel',130.00,'01:30:00','Imagem 19','Unha'),(19,'Banho de Fibra e Esmaltação em Gel',160.00,'02:30:00','Imagem 20','Unha'),(20,'Banho de Fibra e Esmaltação em Gel',160.00,'02:30:00','Imagem 21','Unha'),(21,'Aplicação e Decoração Completa',280.00,'03:00:00','Imagem 22','Unha'),(22,'Manutenção e Decoração Completa',180.00,'02:00:00','Imagem 23','Unha'),(23,'Aplicação e Decoração Individual',240.00,'02:45:00','Imagem 24','Unha'),(24,'Manutenção e Decoração Individual',140.00,'01:45:00','Imagem 25','Unha'),(25,'Manutenção e Troca de Formato',180.00,'02:00:00','Imagem 26','Unha'),(26,'Massagem Relaxante',100.00,'01:15:00','Imagem 27','Estética'),(27,'Drenagem Linfática',100.00,'01:15:00','Imagem 28','Estética'),(28,'Limpeza de Pele',100.00,'01:30:00','Imagem 29','Estética'),(29,'Maquiagem',160.00,'01:30:00','Imagem 30','Estética'),(30,'Sobrancelha sem Henna',35.00,'01:00:00','Imagem 31','Estética'),(31,'Sobrancelha com Henna',45.00,'01:30:00','Imagem 32','Estética');
/*!40000 ALTER TABLE `servico` ENABLE KEYS */;
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
