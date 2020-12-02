-- phpMyAdmin SQL Dump
-- version 5.0.3
-- https://www.phpmyadmin.net/
--
-- Host: localhost
-- Generation Time: Dec 02, 2020 at 07:26 AM
-- Server version: 10.4.14-MariaDB
-- PHP Version: 7.4.11

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `emoney`
--

-- --------------------------------------------------------

--
-- Table structure for table `banner`
--

CREATE TABLE `banner` (
  `id` int(11) NOT NULL,
  `title` varchar(100) NOT NULL,
  `description` longtext NOT NULL,
  `image` varchar(100) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `banner`
--

INSERT INTO `banner` (`id`, `title`, `description`, `image`) VALUES
(1, 'Gara-gara CLBK, Hati Jadi Berbunga-bunga', 'Eits, bukan CLBK sembarangan nih! CLBK yang ini artinya Cashback Lagi Buat Kamu! Jadi kamu bisa dapetin Cashback 20% buat ajak temen, gebetan, atau mantan buat makan di merchant partner OVO yang oke banget! Pokoknya mau makan sama siapa aja, mau makan di tempat, atau delivery order semuanya dijamin lebih enak kalo pake Cashback 20% di CLBK (Cashback Lagi Buat Kamu) OVO!\r\n', 'https://images-loyalty.ovo.id/public/deal/82/46/l/27430.jpg'),
(2, 'Pakai Maskernya, Sebar Kebaikanya', 'Kamu tau nggak, kalo ternyata dengan pake masker kamu bisa mengurangi tingkat penularan virus sampe 75% lho! Jadi kayaknya nggak ada lagi alasan buat kita semua untuk nggak pake masker!\r\nPas banget OVO saat ini lagi berkolaborasi dalam mendukung langkah pemerintah untuk memutus mata rantai penyebaran virus. Caranya gampang kok, cukup pakai maskermu saat keluar rumah untuk jaga dirimu dan lindungi orang di sekitarmu. ', 'https://images-loyalty.ovo.id/public/deal/52/45/l/27330.jpg'),
(3, 'Voucher 100.000 Discount 25% Semua Menu', 'Mau Ayam Spicy, Big Mac, McNuggets, atau lainnya? Cuma bayar Rp75.000 nikmati voucher McDonald\'s senilai Rp100.000!', 'https://images-loyalty.ovo.id/public/deal/50/46/l/27427.jpg'),
(4, 'Jadwal Baru Layanan Customer Service Antoo', 'Dear pengguna setia  OVO, mengikuti anjuran pemerintah tentang bekerja dari rumah untuk membantu mencegah penyebaran virus COVID-19. Mulai tanggal 4 Mei 2020:\r\nLayanan Customer Service OVO via telepon (1 500 696) untuk sementara hanya akan beroperasi dari pukul 06.00 WIB hingga 22.00 WIB.', 'https://images-loyalty.ovo.id/public/deal/67/38/l/27122.jpg'),
(5, 'Dapet Cashback Sekarang Jadi Makin Seru', 'Di tengah masa pandemi, pastiin kalo kamu keluar rumah cuma waktu kamu butuh beli kebutuhan rumah di supermarket dan beli kebutuhan kesehatan di apotik ya. Selain itu, kamu bisa beli semua kebutuhan di rumah aja kok. ', 'https://images-loyalty.ovo.id/public/deal/52/38/l/27113.jpg'),
(6, 'Bebas Belanja Sampe Puas di SOS Antoo', 'Online shoppers mana suaranyaa??? Kabar gembira buat kamu semua, karena SOS: Sepuasnya Online Shopping OVO kembali lagi buat kasih Cashback hingga 50% buat kamu belanja online sepuasnya!', 'https://images-loyalty.ovo.id/public/deal/08/47/l/27441.jpg'),
(7, 'Voucher 100.000 Discount 25% Semua Menu', 'Mau Ayam Spicy, Big Mac, McNuggets, atau lainnya? Cuma bayar Rp75.000 nikmati voucher McDonald\'s senilai Rp100.000!', 'https://images-loyalty.ovo.id/public/deal/50/46/l/27427.jpg'),
(8, 'Jadwal Baru Layanan Customer Service Antoo', 'Dear pengguna setia  OVO, mengikuti anjuran pemerintah tentang bekerja dari rumah untuk membantu mencegah penyebaran virus COVID-19. Mulai tanggal 4 Mei 2020:\r\nLayanan Customer Service OVO via telepon (1 500 696) untuk sementara hanya akan beroperasi dari pukul 06.00 WIB hingga 22.00 WIB.', 'https://images-loyalty.ovo.id/public/deal/67/38/l/27122.jpg');

-- --------------------------------------------------------

--
-- Table structure for table `transactions`
--

CREATE TABLE `transactions` (
  `id` int(11) NOT NULL,
  `user_id` int(11) NOT NULL,
  `type_id` int(11) NOT NULL,
  `amount` int(10) NOT NULL,
  `date` datetime NOT NULL DEFAULT current_timestamp(),
  `concerned` varchar(50) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `transactions`
--

INSERT INTO `transactions` (`id`, `user_id`, `type_id`, `amount`, `date`, `concerned`) VALUES
(1, 17, 1, 100000, '2020-07-16 15:27:19', NULL),
(2, 17, 2, -1000, '2020-07-16 15:49:56', 'alvisya80@gmail.com'),
(3, 18, 2, 1000, '2020-07-16 15:49:56', 'muhamadadam20@gmail.com'),
(4, 17, 2, -1000, '2020-07-16 15:49:56', 'alvisya80@gmail.com'),
(5, 18, 2, 1000, '2020-07-16 15:49:56', 'muhamadadam20@gmail.com'),
(6, 17, 2, -1000, '2020-07-16 15:49:56', 'alvisya80@gmail.com'),
(7, 18, 2, 1000, '2020-07-16 15:49:56', 'muhamadadam20@gmail.com'),
(8, 17, 2, -1000, '2020-07-16 15:49:56', 'alvisya80@gmail.com'),
(9, 18, 2, 1000, '2020-07-16 15:49:56', 'muhamadadam20@gmail.com'),
(10, 17, 2, -1000, '2020-07-16 15:49:56', 'alvisya80@gmail.com'),
(11, 18, 2, 1000, '2020-07-16 15:49:56', 'muhamadadam20@gmail.com'),
(12, 17, 2, -1000, '2020-07-16 15:50:56', 'alvisya80@gmail.com'),
(13, 18, 2, 1000, '2020-07-16 15:50:56', 'muhamadadam20@gmail.com'),
(14, 17, 2, -1000, '2020-07-16 16:16:46', 'alvisya80@gmail.com'),
(15, 18, 2, 1000, '2020-07-16 16:16:46', 'muhamadadam20@gmail.com'),
(16, 18, 3, -100, '2020-07-17 02:20:54', '1673-3218-3734-8386'),
(17, 18, 3, -100, '2020-07-17 02:21:04', '5950-1698-8301-2187'),
(18, 18, 3, -1000, '2020-07-17 02:21:19', '6265-8653-1995-8658'),
(19, 18, 3, -5000, '2020-07-17 02:24:46', '8623-2301-6165-2093'),
(20, 17, 2, -1000, '2020-07-17 11:23:17', 'alvisya80@gmail.com'),
(21, 18, 2, 1000, '2020-07-17 11:23:17', 'muhamadadam20@gmail.com'),
(22, 24, 1, 100000, '2020-11-26 14:52:41', NULL),
(23, 24, 2, -100000, '2020-11-26 14:54:23', 'akusampah404@gmail.com'),
(25, 27, 1, 100000, '2020-12-02 13:12:14', NULL),
(26, 27, 2, -50000, '2020-12-02 13:18:39', 'wedussenpai@gmail.com'),
(27, 29, 2, 50000, '2020-12-02 13:18:39', 'mamang@gmail.com'),
(28, 27, 3, -20000, '2020-12-02 13:24:08', '7471-1892-3016-5847-2802'),
(29, 27, 3, -20000, '2020-12-02 13:24:55', '4025-8238-2548-5081-5615');

-- --------------------------------------------------------

--
-- Table structure for table `transaction_types`
--

CREATE TABLE `transaction_types` (
  `id` int(11) NOT NULL,
  `type` varchar(30) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `transaction_types`
--

INSERT INTO `transaction_types` (`id`, `type`) VALUES
(1, 'topup'),
(2, 'transfer'),
(3, 'payment');

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `id` int(11) NOT NULL,
  `email` varchar(30) NOT NULL,
  `password` varchar(60) NOT NULL,
  `balance` int(10) UNSIGNED NOT NULL,
  `otp` varchar(10) NOT NULL,
  `isVerified` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`id`, `email`, `password`, `balance`, `otp`, `isVerified`) VALUES
(17, 'muhamadadam20@gmail.com', '$2a$12$1pXZCj6xSIBXARV6SVpyMud1ZQK.1rbZo4GXY0yb/TxXaoiSsnaSq', 92000, '6401', 1),
(18, 'alvisya80@gmail.com', '$2a$12$Uog0O4u0AwQ.lMqm7KGK7.ILcpLAERWyUhcTcMHjVb2xG.GiK6EkK', 1800, '3750', 1),
(23, 'akusampah404@gmail.com', '$2a$12$EiyigI.kWwIM.z7SUX.sC.In9sYmIXoVYdpCeKuuLYFJP442AyK4O', 100000, '0168', 1),
(24, 'wedussenpai@mail.com', '$2a$12$llb0Pv5uI7ZenSOmFtK6GeqcziHji2Dfg35O0Y5/dic3soAqvevX6', 0, '3641', 1),
(27, 'mamang@gmail.com', '$2a$12$4SRKlpGQUb9huZSo.qsW0u7Wy1LqKNZn75WpN/nrcvFurgFDnQj8S', 10000, '2757', 1),
(29, 'wedussenpai@gmail.com', '$2a$12$lXz3IRX/to6zjxrtqeRbSed5aG/9r9V/jAWdQgFoMBxf.vZHfudtC', 50000, '4698', 1);

-- --------------------------------------------------------

--
-- Table structure for table `user_details`
--

CREATE TABLE `user_details` (
  `id` int(11) NOT NULL,
  `user_id` int(11) NOT NULL,
  `full_name` varchar(40) NOT NULL,
  `image` varchar(40) DEFAULT NULL,
  `phone_number` varchar(40) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `user_details`
--

INSERT INTO `user_details` (`id`, `user_id`, `full_name`, `image`, `phone_number`) VALUES
(2, 24, 'Yourname', 'me.png', '00000000'),
(5, 27, 'Yourname', 'me.png', '00000000'),
(7, 29, 'Yourname', 'me.png', '00000000');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `banner`
--
ALTER TABLE `banner`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `transactions`
--
ALTER TABLE `transactions`
  ADD PRIMARY KEY (`id`),
  ADD KEY `user_id` (`user_id`),
  ADD KEY `type_id` (`type_id`);

--
-- Indexes for table `transaction_types`
--
ALTER TABLE `transaction_types`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `user_details`
--
ALTER TABLE `user_details`
  ADD PRIMARY KEY (`id`),
  ADD KEY `user_id` (`user_id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `banner`
--
ALTER TABLE `banner`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=12;

--
-- AUTO_INCREMENT for table `transactions`
--
ALTER TABLE `transactions`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=30;

--
-- AUTO_INCREMENT for table `transaction_types`
--
ALTER TABLE `transaction_types`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=33;

--
-- AUTO_INCREMENT for table `user_details`
--
ALTER TABLE `user_details`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=11;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `transactions`
--
ALTER TABLE `transactions`
  ADD CONSTRAINT `transactions_ibfk_1` FOREIGN KEY (`type_id`) REFERENCES `transaction_types` (`id`),
  ADD CONSTRAINT `transactions_ibfk_2` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`);

--
-- Constraints for table `user_details`
--
ALTER TABLE `user_details`
  ADD CONSTRAINT `user_details_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
