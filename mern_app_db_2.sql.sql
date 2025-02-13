-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Feb 13, 2025 at 10:21 AM
-- Server version: 10.4.32-MariaDB
-- PHP Version: 8.2.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `mern_app_db`
--

-- --------------------------------------------------------

--
-- Table structure for table `products`
--

CREATE TABLE `products` (
  `id` int(11) NOT NULL,
  `title` varchar(255) NOT NULL,
  `description` text NOT NULL,
  `price` decimal(10,2) NOT NULL,
  `image` varchar(255) NOT NULL,
  `quantity` int(11) DEFAULT 1
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `products`
--

INSERT INTO `products` (`id`, `title`, `description`, `price`, `image`, `quantity`) VALUES
(1, 'Pizza Margherita', 'Classic Margherita pizza with fresh mozzarella and basil.', 12.99, './download (1).jpg', 1),
(5, 'salad', 'a dish consisting of mixed ingredients, frequently vegetables', 100.50, './download (2).jpg', 5),
(6, 'pasta', 'pasta, any of several starchy food preparations (pasta alimentaria) frequently associated with Italian cuisine ', 150.75, './download (3).jpg', 10),
(7, 'burger ', 'a patty of ground beef grilled and placed between two halves of a bun.', 200.00, './download.jpg', 15),
(8, 'noodles ', 'a cooked egg-and-flour paste prominent in European and Asian cuisine', 200.00, './download (4).jpg', 15),
(9, 'rer', 'srhys', 45.00, 'uploads\\acd62f1e91bc6fb500975195cbf35808', 1),
(10, 'drink', 'this is a drink', 20.00, 'uploads\\ebd48628ebac0178a927d4a250f21a67', 1);

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `id` int(11) NOT NULL,
  `name` varchar(200) NOT NULL,
  `email` varchar(200) NOT NULL,
  `password` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`id`, `name`, `email`, `password`) VALUES
(1, 'demo', 'demo@test.com', '123456'),
(2, 'demo2', 'demo@test2.com', '12345'),
(3, 'demo3', 'demo3@test.com', '123123'),
(4, 'ankit', 'ankit@12test.com', '123123'),
(5, 'vijay kumar', 'vijay@test.com', '654321'),
(6, 'aryan', 'aryan1@test.com', '1234'),
(10, 'anil', 'ani@test.com', '12345678');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `products`
--
ALTER TABLE `products`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `products`
--
ALTER TABLE `products`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=11;

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=11;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
