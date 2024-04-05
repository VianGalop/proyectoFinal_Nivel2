-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Servidor: localhost:3308
-- Tiempo de generación: 05-04-2024 a las 10:38:59
-- Versión del servidor: 10.4.32-MariaDB
-- Versión de PHP: 8.2.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de datos: `blogging`
--

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `categories`
--

CREATE TABLE `categories` (
  `id_category` int(11) NOT NULL,
  `name_category` varchar(250) DEFAULT NULL,
  `create_date` varchar(100) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `categories`
--

INSERT INTO `categories` (`id_category`, `name_category`, `create_date`) VALUES
(1, 'Cars', '2022/10/07'),
(2, 'Education', '2023/09/08'),
(3, 'Food', '2023/04/01'),
(4, 'Comics', '2021/07/10'),
(5, 'Sport', '2021/05/02'),
(6, 'Music', '2023/09/09'),
(7, 'Games', '2022/01/27'),
(8, 'Places to eat', '2022/01/25'),
(9, 'Toys', '2023/01/13'),
(10, 'Tourist attractions', '2023/06/06'),
(11, 'Artist', '2022/12/19'),
(12, 'Animals', '2022/09/02'),
(13, 'Politics', '2023/05/06'),
(14, 'Tecnologics', '2022/04/24'),
(15, 'Movies', '2021/08/08'),
(16, 'Cultural', '2023/05/21'),
(17, 'Finance', '2022/08/13'),
(18, 'Health', '2023/04/15'),
(19, 'Spiritually', '2023/02/25'),
(20, 'Nature', '2020/01/15');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `category_publication`
--

CREATE TABLE `category_publication` (
  `id` int(11) NOT NULL,
  `category_id` int(11) DEFAULT NULL,
  `publication_id` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `category_publication`
--

INSERT INTO `category_publication` (`id`, `category_id`, `publication_id`) VALUES
(1, 12, 17),
(2, 9, 3),
(3, 20, 19),
(4, 13, 4),
(5, 12, 6),
(6, 10, 8),
(7, 15, 20),
(8, 14, 12),
(9, 13, 3),
(10, 18, 19),
(11, 5, 3),
(12, 17, 11),
(13, 11, 8),
(14, 14, 7),
(15, 15, 14),
(16, 9, 9),
(17, 15, 7),
(18, 7, 13),
(19, 16, 6),
(20, 3, 6);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `comments`
--

CREATE TABLE `comments` (
  `id_comment` int(11) NOT NULL,
  `content` varchar(250) DEFAULT NULL,
  `comment_date` varchar(50) DEFAULT NULL,
  `user_id` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `comments`
--

INSERT INTO `comments` (`id_comment`, `content`, `comment_date`, `user_id`) VALUES
(1, 'Switchable impactful hardware', '2021/03/31', 9),
(2, 'Visionary next generation array', '2023/10/12', 7),
(3, 'Balanced directional support', '2022/07/18', 10),
(4, 'Assimilated solution-oriented middleware', '2022/06/29', 1),
(5, 'Enterprise-wide content-based infrastructure', '2023/07/20', 7),
(6, 'Up-sized user-facing customer loyalty', '2023/06/30', 10),
(7, 'Distributed encompassing access', '2024/02/25', 8),
(8, 'Realigned zero defect implementation', '2023/09/02', 9),
(9, 'User-centric exuding success', '2023/09/18', 7),
(10, 'Fundamental 3rd generation workforce', '2022/01/15', 4),
(11, 'Cloned transitional middleware', '2022/02/24', 10),
(12, 'Assimilated stable service-desk', '2020/09/29', 1),
(13, 'Reverse-engineered dynamic migration', '2021/10/14', 4),
(14, 'User-friendly impactful definition', '2022/11/23', 10),
(15, 'Centralized zero defect framework', '2022/08/21', 1),
(16, 'Upgradable neutral system engine', '2023/01/10', 10),
(17, 'Customer-focused solution-oriented focus group', '2023/05/31', 3),
(18, 'Secured holistic policy', '2022/02/07', 4),
(19, 'Advanced 6th generation framework', '2022/02/09', 9),
(20, 'Right-sized zero administration archive', '2023/08/05', 9);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `comment_publication`
--

CREATE TABLE `comment_publication` (
  `id` int(11) NOT NULL,
  `comment_id` int(11) DEFAULT NULL,
  `publication_id` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `comment_publication`
--

INSERT INTO `comment_publication` (`id`, `comment_id`, `publication_id`) VALUES
(1, 11, 8),
(2, 7, 1),
(3, 20, 17),
(4, 19, 10),
(5, 13, 13),
(6, 10, 6),
(7, 19, 10),
(8, 6, 5),
(9, 20, 10),
(10, 14, 10),
(11, 20, 7),
(12, 7, 4),
(13, 12, 11),
(14, 2, 17),
(15, 17, 16),
(16, 10, 1),
(17, 18, 15),
(18, 12, 16),
(19, 1, 19);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `publications`
--

CREATE TABLE `publications` (
  `id_publication` int(11) NOT NULL,
  `title` varchar(250) DEFAULT NULL,
  `content` varchar(300) DEFAULT NULL,
  `publication_date` varchar(100) DEFAULT NULL,
  `user_id` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `publications`
--

INSERT INTO `publications` (`id_publication`, `title`, `content`, `publication_date`, `user_id`) VALUES
(1, 'Linemen', 'De-engineered intangible analyzer', '2022/06/10', 7),
(2, 'Refridgeration', 'Open-architected 3rd generation model', '2022/11/12', 10),
(3, 'Equipment Operator', 'Up-sized incremental artificial intelligence', '2024/02/05', 7),
(4, 'Pipefitter', 'Multi-lateral interactive analyzer', '2023/06/14', 4),
(5, 'Terrazzo', 'Decentralized user-facing product', '2022/04/18', 4),
(6, 'Terrazzo', 'Reverse-engineered executive hardware', '2022/07/23', 10),
(7, 'Plasterers', 'Assimilated cohesive strategy', '2023/09/29', 3),
(8, 'Equipment Operator', 'Re-engineered local protocol', '2022/07/04', 5),
(9, 'Safety Officer', 'Persistent static knowledge user', '2022/02/22', 7),
(10, 'Glazier', 'Programmable next generation local area network', '2022/02/20', 1),
(11, 'Ironworker', 'Synergistic directional flexibility', '2022/03/19', 7),
(12, 'Sheet Metal Worker', 'Enterprise-wide 5th generation forecast', '2022/03/23', 10),
(13, 'Pipefitter', 'Seamless static methodology', '2023/03/22', 2),
(14, 'Plumber', 'Future-proofed regional Graphical User Interface', '2022/11/04', 6),
(15, 'Welder', 'Open-architected explicit matrices', '2023/06/30', 10),
(16, 'Linemen', 'Team-oriented next generation utilisation', '2023/03/13', 7),
(17, 'Boilermaker', 'Assimilated stable leverage', '2023/08/14', 10),
(18, 'Cement Mason', 'Focused executive approach', '2023/11/15', 3),
(19, 'Welder', 'Ergonomic modular circuit', '2022/07/27', 9),
(20, 'Waterproofer', 'Diverse regional model', '2023/07/20', 6),
(21, 'Joseph', 'Diverse regional model', '2023/07/20', 5);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `roles`
--

CREATE TABLE `roles` (
  `id_rol` int(11) NOT NULL,
  `roles` varchar(50) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `roles`
--

INSERT INTO `roles` (`id_rol`, `roles`) VALUES
(1, 'administrator'),
(2, 'user');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `users`
--

CREATE TABLE `users` (
  `id_user` int(11) NOT NULL,
  `name` varchar(100) NOT NULL,
  `last_name` varchar(250) NOT NULL,
  `email` varchar(250) NOT NULL,
  `username` varchar(250) NOT NULL,
  `password` varchar(250) NOT NULL,
  `date_birthday` varchar(100) NOT NULL,
  `gender` varchar(100) NOT NULL,
  `role_type` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `users`
--

INSERT INTO `users` (`id_user`, `name`, `last_name`, `email`, `username`, `password`, `date_birthday`, `gender`, `role_type`) VALUES
(1, 'Sacha', 'Stokes', 'sstokes0@economist.com', 'Sacha0', 'zF5BTaQnL', '2003/07/11', 'F', 1),
(2, 'Griffie', 'Skirling', 'gskirling1@webnode.com', 'GriffieSK2', 'a9tkyPJeQHZ', '2019/07/21', 'M', 2),
(3, 'Bette', 'Vido', 'bvido2@bigcartel.com', 'bVido2', 'gW0rh6Ppd', '2016/01/31', 'F', 2),
(4, 'Felizio', 'Waldren', 'fwaldren3@sciencedaily.com', 'waldren3', 'bJ9RI4', '2009/12/20', 'M', 2),
(5, 'Richmond', 'Druce', 'rdruce4@ebay.com', 'Rdruce4', 'pI58RR', '2007/09/26', 'M', 2),
(6, 'Mariana', 'Thebeaud', 'mthebeaud5@miibeian.gov.cn', 'MarianaTheb5', 'lZ8wIDi', '2009/02/23', 'F', 2),
(7, 'Job', 'Birdsall', 'jbirdsall6@nationalgeographic.com', 'jbirdsall6', 'fB4Rvo', '2003/01/13', 'M', 2),
(8, 'Kiel', 'Biagini', 'kbiagini7@google.com.br', 'kbiagini7', 'fJ7e3diwy', '2004/02/08', 'M', 2),
(9, 'Reba', 'Leys', 'rleys8@businesswire.com', 'rleys8', 'sD8PjqkVs', '2015/08/01', 'F', 2),
(10, 'Emeline', 'Cleaton', 'ecleaton9@census.gov', 'Ecleaton9', 'hM4PR', '2010/12/03', 'F', 2);

--
-- Índices para tablas volcadas
--

--
-- Indices de la tabla `categories`
--
ALTER TABLE `categories`
  ADD PRIMARY KEY (`id_category`);

--
-- Indices de la tabla `category_publication`
--
ALTER TABLE `category_publication`
  ADD PRIMARY KEY (`id`),
  ADD KEY `category_publication_ibfk_1` (`category_id`),
  ADD KEY `category_publication_ibfk_2` (`publication_id`);

--
-- Indices de la tabla `comments`
--
ALTER TABLE `comments`
  ADD PRIMARY KEY (`id_comment`),
  ADD KEY `comments_ibfk_1` (`user_id`);

--
-- Indices de la tabla `comment_publication`
--
ALTER TABLE `comment_publication`
  ADD PRIMARY KEY (`id`),
  ADD KEY `comment_publication_ibfk_1` (`comment_id`),
  ADD KEY `comment_publication_ibfk_2` (`publication_id`);

--
-- Indices de la tabla `publications`
--
ALTER TABLE `publications`
  ADD PRIMARY KEY (`id_publication`),
  ADD KEY `publications_ibfk_1` (`user_id`);

--
-- Indices de la tabla `roles`
--
ALTER TABLE `roles`
  ADD PRIMARY KEY (`id_rol`);

--
-- Indices de la tabla `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id_user`),
  ADD UNIQUE KEY `username` (`username`),
  ADD KEY `role_type` (`role_type`);

--
-- AUTO_INCREMENT de las tablas volcadas
--

--
-- AUTO_INCREMENT de la tabla `categories`
--
ALTER TABLE `categories`
  MODIFY `id_category` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=21;

--
-- AUTO_INCREMENT de la tabla `category_publication`
--
ALTER TABLE `category_publication`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=21;

--
-- AUTO_INCREMENT de la tabla `comments`
--
ALTER TABLE `comments`
  MODIFY `id_comment` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=21;

--
-- AUTO_INCREMENT de la tabla `comment_publication`
--
ALTER TABLE `comment_publication`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=20;

--
-- AUTO_INCREMENT de la tabla `publications`
--
ALTER TABLE `publications`
  MODIFY `id_publication` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=22;

--
-- AUTO_INCREMENT de la tabla `roles`
--
ALTER TABLE `roles`
  MODIFY `id_rol` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT de la tabla `users`
--
ALTER TABLE `users`
  MODIFY `id_user` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=11;

--
-- Restricciones para tablas volcadas
--

--
-- Filtros para la tabla `category_publication`
--
ALTER TABLE `category_publication`
  ADD CONSTRAINT `category_publication_ibfk_1` FOREIGN KEY (`category_id`) REFERENCES `categories` (`id_category`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `category_publication_ibfk_2` FOREIGN KEY (`publication_id`) REFERENCES `publications` (`id_publication`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Filtros para la tabla `comments`
--
ALTER TABLE `comments`
  ADD CONSTRAINT `comments_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`id_user`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Filtros para la tabla `comment_publication`
--
ALTER TABLE `comment_publication`
  ADD CONSTRAINT `comment_publication_ibfk_1` FOREIGN KEY (`comment_id`) REFERENCES `comments` (`id_comment`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `comment_publication_ibfk_2` FOREIGN KEY (`publication_id`) REFERENCES `publications` (`id_publication`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Filtros para la tabla `publications`
--
ALTER TABLE `publications`
  ADD CONSTRAINT `publications_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`id_user`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Filtros para la tabla `users`
--
ALTER TABLE `users`
  ADD CONSTRAINT `users_ibfk_1` FOREIGN KEY (`role_type`) REFERENCES `roles` (`id_rol`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
