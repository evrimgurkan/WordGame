-- phpMyAdmin SQL Dump
-- version 4.0.10deb1
-- http://www.phpmyadmin.net
--
-- Anamakine: localhost
-- Üretim Zamanı: 29 Eki 2015, 13:08:45
-- Sunucu sürümü: 5.5.46-0ubuntu0.14.04.2
-- PHP Sürümü: 5.5.9-1ubuntu4.14

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;

--
-- Veritabanı: `db_word_game`
--

-- --------------------------------------------------------

--
-- Tablo için tablo yapısı `tbl_answer`
--

CREATE TABLE IF NOT EXISTS `tbl_answer` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `text` varchar(25) NOT NULL,
  `section_id` int(11) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=MyISAM  DEFAULT CHARSET=latin5 AUTO_INCREMENT=7 ;

--
-- Tablo döküm verisi `tbl_answer`
--

INSERT INTO `tbl_answer` (`id`, `text`, `section_id`) VALUES
(1, 'Sayısal', 1),
(2, 'Sozel', 1),
(3, 'Sehir', 2),
(4, 'Ulke', 2);

-- --------------------------------------------------------

--
-- Tablo için tablo yapısı `tbl_question`
--

CREATE TABLE IF NOT EXISTS `tbl_question` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `text` varchar(256) NOT NULL,
  `section_id` int(11) NOT NULL,
  `answer_id` int(11) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=MyISAM  DEFAULT CHARSET=latin5 AUTO_INCREMENT=10 ;

--
-- Tablo döküm verisi `tbl_question`
--

INSERT INTO `tbl_question` (`id`, `text`, `section_id`, `answer_id`) VALUES
(1, 'Ziraat Mühendisliği', 1, 1),
(2, 'Tarih Öğretmenliği', 1, 2),
(3, 'Almanya', 2, 4),
(4, 'Prag', 2, 3),
(7, 'Massachusetts', 2, 3),
(8, 'Izlanda', 2, 4),
(9, 'Konya', 2, 3);

-- --------------------------------------------------------

--
-- Tablo için tablo yapısı `tbl_section`
--

CREATE TABLE IF NOT EXISTS `tbl_section` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `needed_time` tinyint(4) NOT NULL,
  `score_constant` double NOT NULL,
  `base_score` mediumint(9) NOT NULL,
  `description` varchar(256) DEFAULT NULL,
  `question_count` tinyint(4) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=MyISAM  DEFAULT CHARSET=latin5 AUTO_INCREMENT=3 ;

--
-- Tablo döküm verisi `tbl_section`
--

INSERT INTO `tbl_section` (`id`, `needed_time`, `score_constant`, `base_score`, `description`, `question_count`) VALUES
(1, 90, 1, 0, 'Hangi kategoriye ait olduğunu bulunuz', 2),
(2, 90, 1, 0, 'Hangi kategoriye ait oldugunu bulunuz!', 5);

-- --------------------------------------------------------

--
-- Tablo için tablo yapısı `tbl_user`
--

CREATE TABLE IF NOT EXISTS `tbl_user` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `nickname` varchar(25) NOT NULL,
  `score` mediumint(9) NOT NULL,
  `section_id` int(11) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=MyISAM DEFAULT CHARSET=latin5 AUTO_INCREMENT=1 ;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
