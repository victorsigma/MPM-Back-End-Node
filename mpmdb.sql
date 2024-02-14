-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Servidor: 127.0.0.1
-- Tiempo de generación: 14-02-2024 a las 10:43:34
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
  `projectId` varchar(450) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `activities`
--

INSERT INTO `activities` (`id`, `title`, `subtitle`, `src`, `status`, `dateEnd`, `leader`, `analyst`, `designer`, `programmer`, `projectId`) VALUES
('1e18210a-9cfa-4304-9c3c-bcbe949d5909', 'ATest1', 'ATest1', 'img_6', 1, '2024-01-31 00:00:00.000000', b'1', b'1', b'0', b'0', 'e647ccd4-7e9a-4602-98e4-04e2ea3d5839'),
('dc7e651b-8b94-4587-a6cb-f0612ec3a346', 'ATest2', 'ATest2', 'img_7', 4, '2024-02-10 00:00:00.000000', b'1', b'0', b'0', b'1', 'e647ccd4-7e9a-4602-98e4-04e2ea3d5839'),
('dd383e0e-bc81-45f1-802f-6651efbe2417', 'ATest3', 'ATest3', 'img_5', 2, '2024-01-31 00:00:00.000000', b'1', b'0', b'1', b'0', 'e647ccd4-7e9a-4602-98e4-04e2ea3d5839'),
('e6699a37-26ea-40e8-8b67-33ea6aa0d632', 'ATest4', 'ATest4', 'img_2', 3, '2024-02-29 00:00:00.000000', b'1', b'1', b'1', b'1', 'e647ccd4-7e9a-4602-98e4-04e2ea3d5839');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `activitystatus`
--

CREATE TABLE `activitystatus` (
  `Id` int(11) NOT NULL,
  `statusName` varchar(450) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `activitystatus`
--

INSERT INTO `activitystatus` (`Id`, `statusName`) VALUES
(1, 'Unassigned'),
(2, 'In progress'),
(3, 'Completed'),
(4, 'Pause');

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
  `dateEnd` datetime(6) NOT NULL,
  `owner` varchar(450) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `projects`
--

INSERT INTO `projects` (`id`, `title`, `subtitle`, `src`, `dateStart`, `dateEnd`, `owner`) VALUES
('2717c361-000d-4428-87df-1b59a775d78f', 'Test3', 'ssadaada', 'img_6', '2024-01-23 09:24:02.072000', '2024-02-02 00:00:00.000000', '59c5d536-7f75-47d3-b774-191819093733'),
('93fdcaa7-e003-4c21-8474-e843450bbf06', 'Test2', 'Test2', 'img_4', '2024-02-12 02:53:27.745000', '2024-03-09 00:00:00.000000', '4e2c2e1c-0808-4ed3-aaeb-f7133aed9d5b'),
('c560f34f-2791-4055-a4f1-2bf38982b6ce', 'Test2', 'sasasas', 'img_1', '2024-01-23 09:23:50.833000', '2024-02-01 00:00:00.000000', '59c5d536-7f75-47d3-b774-191819093733'),
('e647ccd4-7e9a-4602-98e4-04e2ea3d5839', 'Test', 'dadada', 'img_6', '2024-01-23 09:23:42.320000', '2024-01-31 00:00:00.000000', '59c5d536-7f75-47d3-b774-191819093733');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `projectshasusers`
--

CREATE TABLE `projectshasusers` (
  `Id` int(11) NOT NULL,
  `proyectsIdProject` varchar(450) NOT NULL,
  `userIdUser` varchar(450) NOT NULL,
  `idRol` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `projectshasusers`
--

INSERT INTO `projectshasusers` (`Id`, `proyectsIdProject`, `userIdUser`, `idRol`) VALUES
(1, 'e647ccd4-7e9a-4602-98e4-04e2ea3d5839', '59c5d536-7f75-47d3-b774-191819093733', 0),
(5, 'c560f34f-2791-4055-a4f1-2bf38982b6ce', '59c5d536-7f75-47d3-b774-191819093733', 0),
(6, '2717c361-000d-4428-87df-1b59a775d78f', '59c5d536-7f75-47d3-b774-191819093733', 0),
(15, '93fdcaa7-e003-4c21-8474-e843450bbf06', '4e2c2e1c-0808-4ed3-aaeb-f7133aed9d5b', 0),
(16, '93fdcaa7-e003-4c21-8474-e843450bbf06', '59c5d536-7f75-47d3-b774-191819093733', 3),
(26, 'e647ccd4-7e9a-4602-98e4-04e2ea3d5839', '4e2c2e1c-0808-4ed3-aaeb-f7133aed9d5b', 2);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `rols`
--

CREATE TABLE `rols` (
  `Id` int(11) NOT NULL,
  `rolName` varchar(450) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `rols`
--

INSERT INTO `rols` (`Id`, `rolName`) VALUES
(0, 'Leader'),
(1, 'Analyst'),
(2, 'Designer'),
(3, 'Programmer');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `usericons`
--

CREATE TABLE `usericons` (
  `id` varchar(450) NOT NULL,
  `iconName` text NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `usericons`
--

INSERT INTO `usericons` (`id`, `iconName`) VALUES
('182eb2e9-48e6-40c9-b808-c5466eb4ab8d', 'Sunset Forest 4'),
('19a94a03-4542-4421-a90c-356dfb827ccc', 'Sunset Forest 2'),
('239ecede-9851-4484-8f70-2aedd48747f9', 'Cosmo Tree 6'),
('2bd7e399-610c-402d-9690-dffa740766de', 'Cosmo Tree 1'),
('3fe00483-437b-4619-be35-989b53e4c5a0', 'Cosmo Tree 2'),
('42a93043-f960-4782-a6b2-e2c4a29de232', 'Sunset Forest 3'),
('4326df68-2ee5-4ba2-a8f9-580c368718b4', 'Cosmo Tree 7'),
('49bd1a35-4357-4176-a341-6222efd319b7', 'Cosmo Tree 4'),
('4c12c95d-1494-4f29-8ae3-c847f2f24c4b', 'New Hope 1'),
('51117713-ec59-4381-ac9c-524d98b9fb8a', 'Cosmo Tree 8'),
('526139c5-6898-47f5-8b3a-75903e3eb4dc', 'Sunset Forest 6'),
('64c50970-286e-4290-9f08-625d4b735a8b', 'New Hope 2'),
('7141b169-5161-47da-852c-1659395409ec', 'Sunset Forest 5'),
('72d1ff4a-7573-46d5-a171-a8f302cdbca4', 'New Hope 3'),
('7be924c3-0be4-43e5-a714-1199660b68b7', 'Cosmo Tree 3'),
('96d49121-bab0-4a3c-9662-622cb854a8c6', 'Cosmo Tree 5'),
('9a0474d4-82c1-4b6a-bfc0-f85ad6401243', 'Sunset Forest 1'),
('c1e8e508-8f3a-4b61-a427-cee032c64ff5', 'New Hope 4'),
('d640f7d5-dc64-498b-bf69-ae8311cfcf30', 'Sunset Forest 7'),
('e178b216-d81b-400e-b71f-e0378048fa64', 'New Hope 6'),
('e37b2afb-95b9-46fe-ac88-5719eebc9dec', 'Sunset Forest 8'),
('e93df72c-25de-457b-bdae-104c9d535976', 'New Hope 5'),
('eb4209af-400b-4af9-806a-8aae69d5b8ef', 'New Hope 7'),
('f03f689f-27d3-476a-abb1-f8323b59e9c6', 'New Hope 8');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `users`
--

CREATE TABLE `users` (
  `userId` varchar(450) NOT NULL,
  `userName` text NOT NULL,
  `password` text NOT NULL,
  `userMail` text NOT NULL,
  `phoneNumber` text DEFAULT NULL,
  `userIcon` varchar(450) NOT NULL DEFAULT '42a93043-f960-4782-a6b2-e2c4a29de232'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `users`
--

INSERT INTO `users` (`userId`, `userName`, `password`, `userMail`, `phoneNumber`, `userIcon`) VALUES
('4e2c2e1c-0808-4ed3-aaeb-f7133aed9d5b', 'Sigma', '$2b$10$SN/vVAcvwGHzyjuM2R/P8emWQIfymjv.L4otIAaeaXr0ML4zNvHV2', 'test2@gmail.com', '4181121123', '49bd1a35-4357-4176-a341-6222efd319b7'),
('59c5d536-7f75-47d3-b774-191819093733', 'victorsigma', '$2b$10$lIYFnpA4IswZ1eDz6uZyUe91mQsIr2DFV7vvMn/HId9UBNXc9wCSW', 'victorossielgaray1@gmail.com', '4181121125', '42a93043-f960-4782-a6b2-e2c4a29de232');

--
-- Índices para tablas volcadas
--

--
-- Indices de la tabla `activities`
--
ALTER TABLE `activities`
  ADD KEY `FK_Project` (`projectId`),
  ADD KEY `FK_Status` (`status`);

--
-- Indices de la tabla `activitystatus`
--
ALTER TABLE `activitystatus`
  ADD PRIMARY KEY (`Id`);

--
-- Indices de la tabla `projects`
--
ALTER TABLE `projects`
  ADD PRIMARY KEY (`id`),
  ADD KEY `FK_Owner` (`owner`);

--
-- Indices de la tabla `projectshasusers`
--
ALTER TABLE `projectshasusers`
  ADD PRIMARY KEY (`Id`),
  ADD KEY `FK_ProjectHas` (`proyectsIdProject`),
  ADD KEY `FK_User` (`userIdUser`),
  ADD KEY `FK_Rol` (`idRol`);

--
-- Indices de la tabla `rols`
--
ALTER TABLE `rols`
  ADD PRIMARY KEY (`Id`);

--
-- Indices de la tabla `usericons`
--
ALTER TABLE `usericons`
  ADD PRIMARY KEY (`id`);

--
-- Indices de la tabla `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`userId`),
  ADD KEY `fk_userIcon` (`userIcon`);

--
-- AUTO_INCREMENT de las tablas volcadas
--

--
-- AUTO_INCREMENT de la tabla `activitystatus`
--
ALTER TABLE `activitystatus`
  MODIFY `Id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT de la tabla `projectshasusers`
--
ALTER TABLE `projectshasusers`
  MODIFY `Id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=27;

--
-- Restricciones para tablas volcadas
--

--
-- Filtros para la tabla `activities`
--
ALTER TABLE `activities`
  ADD CONSTRAINT `FK_Project` FOREIGN KEY (`projectId`) REFERENCES `projects` (`id`) ON DELETE CASCADE,
  ADD CONSTRAINT `FK_Status` FOREIGN KEY (`status`) REFERENCES `activitystatus` (`Id`) ON DELETE CASCADE;

--
-- Filtros para la tabla `projects`
--
ALTER TABLE `projects`
  ADD CONSTRAINT `FK_Owner` FOREIGN KEY (`owner`) REFERENCES `users` (`userId`) ON DELETE CASCADE;

--
-- Filtros para la tabla `projectshasusers`
--
ALTER TABLE `projectshasusers`
  ADD CONSTRAINT `FK_ProjectHas` FOREIGN KEY (`proyectsIdProject`) REFERENCES `projects` (`id`) ON DELETE CASCADE,
  ADD CONSTRAINT `FK_Rol` FOREIGN KEY (`idRol`) REFERENCES `rols` (`Id`) ON DELETE CASCADE,
  ADD CONSTRAINT `FK_User` FOREIGN KEY (`userIdUser`) REFERENCES `users` (`userId`) ON DELETE CASCADE;

--
-- Filtros para la tabla `users`
--
ALTER TABLE `users`
  ADD CONSTRAINT `fk_userIcon` FOREIGN KEY (`userIcon`) REFERENCES `usericons` (`id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
