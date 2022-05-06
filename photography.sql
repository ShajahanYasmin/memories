-- phpMyAdmin SQL Dump
-- version 5.1.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1:3307
-- Generation Time: May 06, 2022 at 02:31 AM
-- Server version: 10.4.21-MariaDB
-- PHP Version: 7.3.31

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `photography`
--

-- --------------------------------------------------------

--
-- Table structure for table `admin`
--

CREATE TABLE `admin` (
  `admin_email` varchar(255) NOT NULL,
  `admin_password` varchar(255) NOT NULL,
  `admin_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `admin`
--

INSERT INTO `admin` (`admin_email`, `admin_password`, `admin_id`) VALUES
('admin@gmail.com', 'admin123', 1);

-- --------------------------------------------------------

--
-- Table structure for table `cartitems`
--

CREATE TABLE `cartitems` (
  `id` int(11) NOT NULL,
  `orderTime` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  `cartId` int(11) DEFAULT NULL,
  `productId` int(11) DEFAULT NULL,
  `quantity` int(11) DEFAULT 1,
  `address` varchar(500) NOT NULL,
  `email` varchar(255) NOT NULL,
  `phno` varchar(20) NOT NULL,
  `name` varchar(255) NOT NULL,
  `eventdate` date NOT NULL,
  `extra` varchar(500) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Table structure for table `carts`
--

CREATE TABLE `carts` (
  `id` int(11) NOT NULL,
  `createdAt` datetime NOT NULL,
  `userId` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `carts`
--

INSERT INTO `carts` (`id`, `createdAt`, `userId`) VALUES
(1, '2022-04-11 23:25:29', 1),
(30, '2022-04-13 14:41:24', 2),
(33, '0000-00-00 00:00:00', 21),
(34, '0000-00-00 00:00:00', 22);

-- --------------------------------------------------------

--
-- Table structure for table `feedback`
--

CREATE TABLE `feedback` (
  `content` varchar(500) NOT NULL,
  `id` int(11) NOT NULL,
  `email_id` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `feedback`
--

INSERT INTO `feedback` (`content`, `id`, `email_id`) VALUES
('You did an amazing job.we love your work', 9, 'mdyasmin0210@gmail.com'),
('        good', 10, 'mettelavinay@gmail.com');

-- --------------------------------------------------------

--
-- Table structure for table `images`
--

CREATE TABLE `images` (
  `image` varchar(400) NOT NULL,
  `image_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `images`
--

INSERT INTO `images` (`image`, `image_id`) VALUES
('gallery-6.jpg', 1);

-- --------------------------------------------------------

--
-- Table structure for table `orderitems`
--

CREATE TABLE `orderitems` (
  `id` int(11) NOT NULL,
  `orderTime` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  `orderId` int(11) DEFAULT NULL,
  `productId` int(11) DEFAULT NULL,
  `quantity` int(11) DEFAULT 1,
  `address` varchar(500) NOT NULL,
  `email` varchar(255) NOT NULL,
  `phno` varchar(20) NOT NULL,
  `name` varchar(255) NOT NULL,
  `eventdate` date NOT NULL,
  `extra` varchar(500) NOT NULL,
  `status` varchar(255) NOT NULL DEFAULT 'NO',
  `approval` varchar(255) NOT NULL DEFAULT 'pending'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `orderitems`
--

INSERT INTO `orderitems` (`id`, `orderTime`, `orderId`, `productId`, `quantity`, `address`, `email`, `phno`, `name`, `eventdate`, `extra`, `status`, `approval`) VALUES
(11, '2022-04-20 00:26:04', 26, 16, 1, 'Guntur', 'mdafreen15042000@gmail.com', '1245678664', 'Mohammed Afreen', '2022-04-20', 'Be on time', 'yes', 'pending'),
(12, '2022-04-18 22:29:10', 27, 16, 1, 'Guntur', 'sriman@gmail.com', '1456145632', 'Rajya Lakshmi', '2022-04-23', 'nothing', 'yes', 'approved'),
(13, '2022-04-20 00:30:00', 28, 15, 1, 'Guntur', 'mdyasmin0210@gmail.com', '1234567892', 'Mohammed Yasmin', '2022-04-22', 'Be on time', 'yes', 'approved'),
(14, '2022-04-20 05:48:06', 29, 16, 1, 'guntur', 'mettelavinay@gmail.com', '1234567890', 'mettela vinay', '2022-04-22', 'urgent', 'yes', 'rejected'),
(15, '2022-04-20 08:30:03', 30, 17, 1, 'Guntur', 'mettelavinay@gmail.com', '1234567891', 'vinay', '2022-04-29', 'dsfsgsh', 'yes', 'pending');

-- --------------------------------------------------------

--
-- Table structure for table `orders`
--

CREATE TABLE `orders` (
  `id` int(11) NOT NULL,
  `createdAt` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  `userId` int(11) DEFAULT NULL,
  `status` varchar(255) NOT NULL DEFAULT 'no'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `orders`
--

INSERT INTO `orders` (`id`, `createdAt`, `userId`, `status`) VALUES
(15, '0000-00-00 00:00:00', 1, 'no'),
(16, '0000-00-00 00:00:00', 1, 'no'),
(17, '0000-00-00 00:00:00', 1, 'no'),
(18, '2022-04-16 08:42:39', 1, 'no'),
(19, '2022-04-17 02:26:25', NULL, 'no'),
(20, '2022-04-17 02:31:29', NULL, 'no'),
(21, '2022-04-17 03:18:52', 2, 'no'),
(22, '2022-04-17 04:02:22', NULL, 'no'),
(23, '2022-04-17 17:11:30', NULL, 'no'),
(24, '2022-04-18 11:12:40', 1, 'no'),
(25, '2022-04-18 21:33:27', 2, 'no'),
(26, '2022-04-18 21:36:59', 2, 'no'),
(27, '2022-04-18 21:45:48', 21, 'no'),
(28, '2022-04-19 09:42:06', 1, 'no'),
(29, '2022-04-20 05:42:51', 22, 'no'),
(30, '2022-04-20 08:30:02', 22, 'no');

-- --------------------------------------------------------

--
-- Table structure for table `products`
--

CREATE TABLE `products` (
  `product_id` int(11) NOT NULL,
  `product_title` varchar(255) NOT NULL,
  `product_price` decimal(10,0) NOT NULL,
  `product_description` varchar(455) NOT NULL,
  `product_img` varchar(400) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `products`
--

INSERT INTO `products` (`product_id`, `product_title`, `product_price`, `product_description`, `product_img`) VALUES
(15, 'Pre wedding', '450', 'Pre wedding shoot. Event pricing-20 hrs', 'h.jpg'),
(16, 'Birthday', '3000', 'BIrthday.Event pricing-6hrs', 'gallery-14.jpg'),
(17, 'wedding', '15000', 'Wedding.Event pricing-full wedding', 'gallery-2.jpg'),
(18, 'Passport Size photos', '100', 'Passport size.Pricing-12 photos', 'passport.jpg'),
(19, 'Engagement', '3000', 'Engagement.Event pricing-5hrs', 'pexels-minhaz-box-9438016.jpg');

-- --------------------------------------------------------

--
-- Table structure for table `sessiontb1`
--

CREATE TABLE `sessiontb1` (
  `session_id` varchar(128) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NOT NULL,
  `expires` int(11) UNSIGNED NOT NULL,
  `data` mediumtext CHARACTER SET utf8mb4 COLLATE utf8mb4_bin DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `sessiontb1`
--

INSERT INTO `sessiontb1` (`session_id`, `expires`, `data`) VALUES
('AiFbjdt-bsFLTCaEaHD9j9t-0k-JyHsE', 1650520635, '{\"cookie\":{\"originalMaxAge\":null,\"expires\":null,\"httpOnly\":true,\"path\":\"/\"},\"flash\":{},\"isLoggedIn\":true,\"loginuser\":\"admin\",\"loginrole\":\"admin\"}'),
('DsqSUvjn_lfn_pwnoYEHZlgQi9s1Emsa', 1650501001, '{\"cookie\":{\"originalMaxAge\":null,\"expires\":null,\"httpOnly\":true,\"path\":\"/\"},\"flash\":{},\"isLoggedIn\":true,\"loginuser\":\"admin\",\"loginrole\":\"admin\"}'),
('I03CXM9ZENxiwkZdAxMb5PvU70hFywdz', 1650532262, '{\"cookie\":{\"originalMaxAge\":null,\"expires\":null,\"httpOnly\":true,\"path\":\"/\"},\"flash\":{},\"isLoggedIn\":true,\"loginuser\":\"mettela vinay\",\"user_id\":22,\"loginrole\":\"user\"}'),
('oNqQ-5ASKSY78B-1C73FjeXMedx1sV3y', 1650447785, '{\"cookie\":{\"originalMaxAge\":null,\"expires\":null,\"httpOnly\":true,\"path\":\"/\"},\"flash\":{},\"isLoggedIn\":true,\"loginuser\":\"admin\",\"loginrole\":\"admin\"}');

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `user_id` int(11) NOT NULL,
  `name` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`user_id`, `name`, `email`, `password`) VALUES
(1, 'Mohammed Yasmin', 'mdyasmin0210@gmail.com', 'yasmin123'),
(2, 'M', 'mdafreen15042000@gmail.com', 'afreen'),
(21, 'Rajyalaksmi', 'sriman@gmail.com', 'raji'),
(22, 'mettela vinay', 'mettelavinay@gmail.com', 'vinay@1234');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `admin`
--
ALTER TABLE `admin`
  ADD PRIMARY KEY (`admin_id`);

--
-- Indexes for table `cartitems`
--
ALTER TABLE `cartitems`
  ADD PRIMARY KEY (`id`),
  ADD KEY `cartId` (`cartId`),
  ADD KEY `productId` (`productId`);

--
-- Indexes for table `carts`
--
ALTER TABLE `carts`
  ADD PRIMARY KEY (`id`),
  ADD KEY `userId` (`userId`);

--
-- Indexes for table `feedback`
--
ALTER TABLE `feedback`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `images`
--
ALTER TABLE `images`
  ADD PRIMARY KEY (`image_id`);

--
-- Indexes for table `orderitems`
--
ALTER TABLE `orderitems`
  ADD PRIMARY KEY (`id`),
  ADD KEY `orderId` (`orderId`),
  ADD KEY `productId` (`productId`);

--
-- Indexes for table `orders`
--
ALTER TABLE `orders`
  ADD PRIMARY KEY (`id`),
  ADD KEY `userId` (`userId`);

--
-- Indexes for table `products`
--
ALTER TABLE `products`
  ADD PRIMARY KEY (`product_id`);

--
-- Indexes for table `sessiontb1`
--
ALTER TABLE `sessiontb1`
  ADD PRIMARY KEY (`session_id`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`user_id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `admin`
--
ALTER TABLE `admin`
  MODIFY `admin_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `cartitems`
--
ALTER TABLE `cartitems`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=57;

--
-- AUTO_INCREMENT for table `carts`
--
ALTER TABLE `carts`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=35;

--
-- AUTO_INCREMENT for table `feedback`
--
ALTER TABLE `feedback`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=11;

--
-- AUTO_INCREMENT for table `orderitems`
--
ALTER TABLE `orderitems`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=16;

--
-- AUTO_INCREMENT for table `orders`
--
ALTER TABLE `orders`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=31;

--
-- AUTO_INCREMENT for table `products`
--
ALTER TABLE `products`
  MODIFY `product_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=20;

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `user_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=23;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `cartitems`
--
ALTER TABLE `cartitems`
  ADD CONSTRAINT `cartitems_ibfk_1` FOREIGN KEY (`cartId`) REFERENCES `carts` (`id`) ON DELETE SET NULL ON UPDATE CASCADE,
  ADD CONSTRAINT `cartitems_ibfk_2` FOREIGN KEY (`productId`) REFERENCES `products` (`product_id`) ON DELETE SET NULL ON UPDATE CASCADE;

--
-- Constraints for table `carts`
--
ALTER TABLE `carts`
  ADD CONSTRAINT `carts_ibfk_1` FOREIGN KEY (`userId`) REFERENCES `users` (`user_id`) ON DELETE SET NULL ON UPDATE CASCADE;

--
-- Constraints for table `orderitems`
--
ALTER TABLE `orderitems`
  ADD CONSTRAINT `orderitems_ibfk_1` FOREIGN KEY (`orderId`) REFERENCES `orders` (`id`) ON DELETE SET NULL ON UPDATE CASCADE,
  ADD CONSTRAINT `orderitems_ibfk_2` FOREIGN KEY (`productId`) REFERENCES `products` (`product_id`) ON DELETE SET NULL ON UPDATE CASCADE;

--
-- Constraints for table `orders`
--
ALTER TABLE `orders`
  ADD CONSTRAINT `orders_ibfk_1` FOREIGN KEY (`userId`) REFERENCES `users` (`user_id`) ON DELETE SET NULL ON UPDATE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
