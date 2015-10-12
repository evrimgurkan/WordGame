-- phpMyAdmin SQL Dump
-- version 2.10.3
-- http://www.phpmyadmin.net
-- 
-- Host: localhost
-- Generation Time: Oct 12, 2015 at 10:35 PM
-- Server version: 5.0.45
-- PHP Version: 5.2.3

SET SQL_MODE="NO_AUTO_VALUE_ON_ZERO";

-- 
-- Database: `db_word_game`
-- 

-- --------------------------------------------------------

-- 
-- Table structure for table `tbl_answer`
-- 

CREATE TABLE `tbl_answer` (
  `id` int(11) NOT NULL auto_increment,
  `text` varchar(25) NOT NULL,
  `section_id` int(11) NOT NULL,
  PRIMARY KEY  (`id`)
) ENGINE=MyISAM  DEFAULT CHARSET=latin5 AUTO_INCREMENT=3 ;

-- 
-- Dumping data for table `tbl_answer`
-- 

INSERT INTO `tbl_answer` (`id`, `text`, `section_id`) VALUES 
(1, 'Sayısal', 1),
(2, 'Sozel', 1);

-- --------------------------------------------------------

-- 
-- Table structure for table `tbl_question`
-- 

CREATE TABLE `tbl_question` (
  `id` int(11) NOT NULL auto_increment,
  `text` varchar(256) NOT NULL,
  `section_id` int(11) NOT NULL,
  `answer_id` int(11) NOT NULL,
  PRIMARY KEY  (`id`)
) ENGINE=MyISAM  DEFAULT CHARSET=latin5 AUTO_INCREMENT=3 ;

-- 
-- Dumping data for table `tbl_question`
-- 

INSERT INTO `tbl_question` (`id`, `text`, `section_id`, `answer_id`) VALUES 
(1, 'Ziraat Mühendisliği', 1, 1),
(2, 'Tarih Öğretmenliği', 1, 2);

-- --------------------------------------------------------

-- 
-- Table structure for table `tbl_section`
-- 

CREATE TABLE `tbl_section` (
  `id` int(11) NOT NULL auto_increment,
  `needed_time` tinyint(4) NOT NULL,
  `score_constant` double NOT NULL,
  `base_score` mediumint(9) NOT NULL,
  `description` varchar(256) default NULL,
  `question_count` tinyint(4) NOT NULL,
  PRIMARY KEY  (`id`)
) ENGINE=MyISAM  DEFAULT CHARSET=latin5 AUTO_INCREMENT=3 ;

-- 
-- Dumping data for table `tbl_section`
-- 

INSERT INTO `tbl_section` (`id`, `needed_time`, `score_constant`, `base_score`, `description`, `question_count`) VALUES 
(1, 90, 1, 0, 'Hangi kategoriye ait olduğunu bulunuz', 2),
(2, 90, 1, 0, 'Hangi kategoriye ait olduğunu bulunuz', 0);

-- --------------------------------------------------------

-- 
-- Table structure for table `tbl_user`
-- 

CREATE TABLE `tbl_user` (
  `id` int(11) NOT NULL auto_increment,
  `nickname` varchar(25) NOT NULL,
  `score` mediumint(9) NOT NULL,
  `section_id` int(11) NOT NULL,
  PRIMARY KEY  (`id`)
) ENGINE=MyISAM DEFAULT CHARSET=latin5 AUTO_INCREMENT=1 ;

-- 
-- Dumping data for table `tbl_user`
-- 

