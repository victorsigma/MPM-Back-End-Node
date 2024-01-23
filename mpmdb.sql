-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Servidor: 127.0.0.1
-- Tiempo de generación: 19-01-2024 a las 11:30:35
-- Versión del servidor: 10.4.28-MariaDB
-- Versión de PHP: 8.0.28

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de datos: `mpmdb`
--

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `activities`
--

CREATE TABLE `activities` (
  `id` varchar(450) NOT NULL,
  `title` text NOT NULL,
  `subtitle` text NOT NULL,
  `src` text NOT NULL,
  `status` int(11) NOT NULL,
  `dateEnd` datetime(6) NOT NULL,
  `leader` bit(1) NOT NULL,
  `analyst` bit(1) NOT NULL,
  `designer` bit(1) NOT NULL,
  `programmer` bit(1) NOT NULL,
  `projectId` varchar(450) NOT NULL,
  CONSTRAINT FK_Project FOREIGN KEY (`projectId`) REFERENCES projects(`id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `projects`
--

CREATE TABLE `projects` (
  `id` varchar(450) NOT NULL,
  `title` text NOT NULL,
  `subtitle` text NOT NULL,
  `src` text NOT NULL,
  `dateStart` datetime(6) NOT NULL,
  `dateEnd` datetime(6) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `projectshasusers`
--






-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `users`
--

CREATE TABLE `users` (
  `userId` varchar(450) NOT NULL,
  `userName` text NOT NULL,
  `password` text NOT NULL,
  `userMail` text NOT NULL,
  `phoneNumber` text DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
--
-- Volcado de datos para la tabla `users`
--

CREATE TABLE `rols` (
  `Id` int(11) NOT NULL,
  `proyectsIdProject` varchar(450) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;


CREATE TABLE `projectsHasUsers` (
  `Id` int(11) NOT NULL AUTO_INCREMENT PRIMARY KEY,
  `proyectsIdProject` varchar(450) NOT NULL,
  `userIdUser` varchar(450) NOT NULL,
  `idRol` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

ALTER TABLE `rols`
  ADD PRIMARY KEY (`id`);


ALTER TABLE `projectshasusers`
  ADD CONSTRAINT FK_Project FOREIGN KEY (`proyectsIdProject`) REFERENCES projects(`id`) ON DELETE CASCADE;
ALTER TABLE `projectshasusers`
  ADD CONSTRAINT FK_User FOREIGN KEY (`userIdUser`) REFERENCES users(`userId`) ON DELETE CASCADE;
ALTER TABLE `projectshasusers`
  ADD CONSTRAINT FK_Rol FOREIGN KEY (`idRol`) REFERENCES rols(`id`) ON DELETE CASCADE;
  
--
-- Índices para tablas volcadas
--

--
-- Indices de la tabla `activities`
--
ALTER TABLE `activities`
  ADD PRIMARY KEY (`id`);

--
-- Indices de la tabla `projects`
--
ALTER TABLE `projects`
  ADD PRIMARY KEY (`id`);

--
-- Indices de la tabla `projectshasusers`
--
ALTER TABLE `projectshasusers`
  ADD PRIMARY KEY (`Id`);

--
-- Indices de la tabla `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`userId`);

ALTER TABLE `projects` 
  ADD `owner` VARCHAR(450) NOT NULL AFTER `dateEnd`;

ALTER TABLE `projects`
  ADD CONSTRAINT FK_Owner FOREIGN KEY (`owner`) REFERENCES users(`userId`) ON DELETE CASCADE;

--
-- AUTO_INCREMENT de las tablas volcadas
--

--
-- AUTO_INCREMENT de la tabla `projectshasusers`
--
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;

INSERT INTO `users` (`userId`, `userName`, `password`, `userMail`, `phoneNumber`) VALUES
('4e2c2e1c-0808-4ed3-aaeb-f7133aed9d5b', 'Sigma', '$2b$10$SN/vVAcvwGHzyjuM2R/P8emWQIfymjv.L4otIAaeaXr0ML4zNvHV2', 'test2@gmail.com', '4181121123'),
('59c5d536-7f75-47d3-b774-191819093733', 'victorsigma', '$2b$10$lIYFnpA4IswZ1eDz6uZyUe91mQsIr2DFV7vvMn/HId9UBNXc9wCSW', 'victorossielgaray1@gmail.com', '4181121125');

INSERT INTO `rols` (`id`, `rolName`) VALUES (0, 'leader'), (1, 'analyst'), (2, 'designer'), (3, 'programmer');