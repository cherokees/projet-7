-- phpMyAdmin SQL Dump
-- version 5.0.2
-- https://www.phpmyadmin.net/
--
-- Hôte : 127.0.0.1:3308
-- Généré le : lun. 07 déc. 2020 à 13:27
-- Version du serveur :  5.7.31
-- Version de PHP : 7.3.21

SET SQL_MODE
= "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone
= "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de données : `groupomania`
--

-- --------------------------------------------------------

--
-- Structure de la table `comments`
--

DROP TABLE IF EXISTS `comments`;
CREATE TABLE
IF NOT EXISTS `comments`
(
  `comment_id` int
(11) NOT NULL AUTO_INCREMENT,
  `comment_user_id` int
(11) NOT NULL,
  `comment_content` text,
  `comment_date` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `comment_post_id` int
(11) NOT NULL,
  `comment_image` varchar
(255) DEFAULT NULL,
  PRIMARY KEY
(`comment_id`)
) ENGINE=MyISAM AUTO_INCREMENT=2 DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Structure de la table `messages`
--

DROP TABLE IF EXISTS `messages`;
CREATE TABLE
IF NOT EXISTS `messages`
(
  `msg_id` int
(11) NOT NULL AUTO_INCREMENT,
  `msg_user_id` int
(11) NOT NULL DEFAULT '0',
  `msg_title` varchar
(255) NOT NULL,
  `msg_content` text,
  `msg_attachment` varchar
(255) DEFAULT NULL,
  `msg_date` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `msg_image` varchar
(255) DEFAULT NULL,
  PRIMARY KEY
(`msg_id`)
) ENGINE=MyISAM AUTO_INCREMENT=2 DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Structure de la table `users`
--

DROP TABLE IF EXISTS `users`;
CREATE TABLE
IF NOT EXISTS `users`
(
  `users_id` int
(11) NOT NULL AUTO_INCREMENT,
  `users_email` varchar
(255) NOT NULL,
  `users_first_name` varchar
(255) NOT NULL,
  `users_last_name` varchar
(255) NOT NULL,
  `users_password` varchar
(255) NOT NULL,
  `users_image` varchar
(255) NOT NULL,
  `users_created_date` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `users_admin` tinyint
(1) NOT NULL DEFAULT '0',
  PRIMARY KEY
(`users_id`)
) ENGINE=MyISAM AUTO_INCREMENT=8 DEFAULT CHARSET=utf8;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
