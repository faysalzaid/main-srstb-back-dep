-- phpMyAdmin SQL Dump
-- version 5.2.0
-- https://www.phpmyadmin.net/
--
-- Host: localhost
-- Generation Time: Aug 22, 2023 at 01:08 PM
-- Server version: 10.4.27-MariaDB
-- PHP Version: 8.2.0

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `project-management`
--

-- --------------------------------------------------------

--
-- Table structure for table `agreements`
--

CREATE TABLE `agreements` (
  `id` char(36) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NOT NULL,
  `file` varchar(255) NOT NULL,
  `EmployeeId` char(36) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `agreements`
--

INSERT INTO `agreements` (`id`, `file`, `EmployeeId`) VALUES
('1945113d-9679-46a7-b839-a805898e5d98', 'http://localhost:4000/docs/928966CT. 2022.02- Commercepal.docx', 'b74dd2ef-0495-40cb-9c37-636c4ebaf316');

-- --------------------------------------------------------

--
-- Table structure for table `appraisals`
--

CREATE TABLE `appraisals` (
  `id` char(36) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NOT NULL,
  `file` varchar(255) NOT NULL,
  `EmployeeId` char(36) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `appraisals`
--

INSERT INTO `appraisals` (`id`, `file`, `EmployeeId`, `createdAt`, `updatedAt`) VALUES
('2d9c6097-976f-4fcd-89a7-9d55bf6c9a15', 'http://localhost:4000/docs/cc3aa5CT. 2022.02- Commercepal.docx', 'b74dd2ef-0495-40cb-9c37-636c4ebaf316', '2023-04-25 11:08:05', '2023-04-25 11:08:05'),
('a0119268-04c5-4da6-8357-5ffc21f8e2f2', 'http://localhost:4000/docs/c53411cellu.jpg', 'b74dd2ef-0495-40cb-9c37-636c4ebaf316', '2023-04-16 08:29:19', '2023-04-16 08:29:19'),
('b660ce7f-ae40-4708-a78a-6b6236926f36', 'http://localhost:4000/docs/ea4610CT. 2022.02- Commercepal.docx', 'b74dd2ef-0495-40cb-9c37-636c4ebaf316', '0000-00-00 00:00:00', '0000-00-00 00:00:00');

-- --------------------------------------------------------

--
-- Table structure for table `Archives`
--

CREATE TABLE `Archives` (
  `id` int(11) NOT NULL,
  `filename` varchar(255) NOT NULL,
  `fileUrl` varchar(255) NOT NULL,
  `date` date NOT NULL,
  `DepartmentId` char(36) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin DEFAULT NULL,
  `color` varchar(255) DEFAULT NULL,
  `bcolor` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `Archives`
--

INSERT INTO `Archives` (`id`, `filename`, `fileUrl`, `date`, `DepartmentId`, `color`, `bcolor`) VALUES
(11, 'HOs', 'http://localhost:4000/docs/314aa391custom-600-x-1920-px-1 (2).png', '2023-05-06', '110a0fdf-f6b3-47cc-a9c6-62b7233bef79', '#963124', '#bd69ee'),
(12, 'Fileka dhagaxle', 'http://localhost:4000/docs/d339428fmother\'s-day-health-checkup-discount-cover-ad-1.png', '2023-05-07', '6571d264-1dea-480a-a04b-f73c848b5c51', '#a7d8ec', '#e78fcb'),
(13, 'WHO', 'http://localhost:4000/docs/8892fe7findex.js', '2023-05-08', '6571d264-1dea-480a-a04b-f73c848b5c51', '#9175bc', '#56cb21'),
(16, 'Discount found docs', 'http://localhost:4000/docs/fbb1e00cINSTALLATION SYSTEM.txt', '2023-07-02', 'bfec0030-d93f-4e54-a0f0-be7be581292f', '#163c24', '#f9c0d4');

-- --------------------------------------------------------

--
-- Table structure for table `Areas`
--

CREATE TABLE `Areas` (
  `id` char(36) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NOT NULL,
  `name` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `Areas`
--

INSERT INTO `Areas` (`id`, `name`) VALUES
('d1563286-a580-11ed-9198-4a850b0fd1f4', 'godey'),
('c540ef90-a580-11ed-9198-4a850b0fd1f4', 'jigjiga');

-- --------------------------------------------------------

--
-- Table structure for table `Attachments`
--

CREATE TABLE `Attachments` (
  `id` char(36) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NOT NULL,
  `ContractId` char(36) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin DEFAULT NULL,
  `name` varchar(255) DEFAULT NULL,
  `fileType` varchar(255) DEFAULT NULL,
  `attach` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `Attachments`
--

INSERT INTO `Attachments` (`id`, `ContractId`, `name`, `fileType`, `attach`) VALUES
('4473fb88-5627-4ece-8d9d-5eb1e3308497', NULL, '29f3afkanbanPage.png', 'image/png', 'http://localhost:4000/docs/29f3afkanbanPage.png'),
('4cef74a5-32d8-4ada-993f-96f07929c506', NULL, '2eb3bdbudget-proposal-screenshot-pdf-1.webp', 'image/webp', 'http://localhost:4000/docs/2eb3bdbudget-proposal-screenshot-pdf-1.webp'),
('635b3f8b-6151-436d-84d7-4f59a781b0d4', NULL, '221a52empUpload.js', 'text/javascript', 'http://localhost:4000/docs/221a52empUpload.js'),
('6ea40850-73c3-44ba-baa1-a6a9d9f3244b', NULL, '7f0632file-sample_100kB.doc', 'application/msword', 'http://localhost:4000/docs/7f0632file-sample_100kB.doc'),
('a2aa79b6-637b-49e2-912f-d69ed47dcd37', NULL, 'b3d977faysalp.jpeg', 'image/jpeg', 'http://localhost:4000/docs/b3d977faysalp.jpeg'),
('a464dfab-40de-44e5-93be-dfc2fd2eeb85', NULL, '1748e0Office-Space-Lease-Agreement.docx', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document', 'http://localhost:4000/docs/1748e0Office-Space-Lease-Agreement.docx'),
('cd39ba40-6dd9-4284-9f12-18762ccda2ee', '11a7c501-da24-495c-80e2-23ec56e48772', '768e3dOffice-Space-Lease-Agreement.docx', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document', 'http://localhost:4000/docs/768e3dOffice-Space-Lease-Agreement.docx'),
('fb5e3e37-a915-4c89-b87e-b26c3a0839d5', '11a7c501-da24-495c-80e2-23ec56e48772', 'a4803fKDU (1).txt', 'text/plain', 'http://localhost:4000/docs/a4803fKDU (1).txt');

-- --------------------------------------------------------

--
-- Table structure for table `Awards`
--

CREATE TABLE `Awards` (
  `id` char(36) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NOT NULL,
  `date` date NOT NULL,
  `file` varchar(255) NOT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  `BidId` char(36) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `Awards`
--

INSERT INTO `Awards` (`id`, `date`, `file`, `createdAt`, `updatedAt`, `BidId`) VALUES
('1b2c618c-8c13-4c70-a352-efecf1584bfc', '2023-06-19', 'http://localhost:4000/docs/fdb8d77f535a75efProject-Plan-Template-Replicon.docx', '2023-06-19 06:07:22', '2023-06-19 06:07:22', '686fb75c-b9de-4a9d-ac80-a37acc1d01fa'),
('5913c94c-3270-4bcf-b6a2-a06045fd5ad3', '2023-05-19', 'http://localhost:4000/docs/136ff7768e3dOffice-Space-Lease-Agreement.docx', '2023-05-19 14:52:24', '2023-06-19 06:22:58', '419d82ac-ee6c-4e0c-b190-06c112ec124c');

-- --------------------------------------------------------

--
-- Table structure for table `Bids`
--

CREATE TABLE `Bids` (
  `id` char(36) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NOT NULL,
  `license` varchar(255) DEFAULT NULL,
  `status` enum('approved','rejected','processing') NOT NULL DEFAULT 'processing',
  `performa` varchar(255) DEFAULT NULL,
  `proposal` varchar(255) DEFAULT NULL,
  `companydoc` varchar(255) DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  `fullname` varchar(255) NOT NULL,
  `phone` varchar(255) DEFAULT NULL,
  `amount` decimal(12,2) DEFAULT NULL,
  `bidUserPic` varchar(255) DEFAULT NULL,
  `UserId` char(36) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin DEFAULT NULL,
  `ProjectId` char(36) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin DEFAULT NULL,
  `score` float DEFAULT NULL,
  `description` text DEFAULT NULL,
  `evaluationStatus` enum('YES','NO') NOT NULL DEFAULT 'NO',
  `evaluationFile` varchar(255) DEFAULT NULL,
  `selected` int(11) DEFAULT 0
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `Bids`
--

INSERT INTO `Bids` (`id`, `license`, `status`, `performa`, `proposal`, `companydoc`, `createdAt`, `updatedAt`, `fullname`, `phone`, `amount`, `bidUserPic`, `UserId`, `ProjectId`, `score`, `description`, `evaluationStatus`, `evaluationFile`, `selected`) VALUES
('19b8d6b3-959b-4094-a8ea-0b82b2055aa8', 'http://localhost:4000/docs/6d1ccb4f1ecellu.jpg', 'processing', 'http://localhost:4000/docs/7f99fdfe26cellu.jpg', 'http://localhost:4000/docs/c9e21fef61cellu.jpg', 'http://localhost:4000/docs/0631703e32cellu.jpg', '2023-04-16 22:26:26', '2023-07-24 13:30:42', 'Faysal ali hussein', '09123423', '3000000.00', 'http://localhost:4000/profiles/e1bbf66dc4cellu.jpg', '179a941a-c741-4cc9-9bf4-3caff4d222a8', '772052ff-e087-47b6-b347-bbbde05b49cf', 60, 'None\r\n', 'NO', 'http://localhost:4000/docs/8da373CELLUTECH ERP PROP (1).pdf', 0),
('419d82ac-ee6c-4e0c-b190-06c112ec124c', 'http://localhost:4000/docs/b80479704aPayroll design-2.pdf', 'processing', 'http://localhost:4000/docs/7f535a75efProject-Plan-Template-Replicon.docx', 'http://localhost:4000/docs/85fce0d263Project-Plan-Template-Replicon.docx', 'http://localhost:4000/docs/d0195645a9Project-Plan-Template-Replicon.docx', '2023-06-19 01:45:49', '2023-07-24 13:30:42', 'Farah Moalins', '0978789', '500000.00', 'http://localhost:4000/profiles/b8dd864289Project-Plan-Template-Replicon.docx', '179a941a-c741-4cc9-9bf4-3caff4d222a8', '772052ff-e087-47b6-b347-bbbde05b49cf', 60, 'None\r\n', 'YES', 'http://localhost:4000/docs/c83fba7f535a75efProject-Plan-Template-Replicon.docx', 1),
('686fb75c-b9de-4a9d-ac80-a37acc1d01fa', 'http://localhost:4000/docs/378348ace2srsrb.jpg', 'processing', 'http://localhost:4000/docs/4cfa8ff4bcsrsrb.jpg', 'http://localhost:4000/docs/a441f2e575srsrb.jpg', 'http://localhost:4000/docs/56937e6ffbsrsrb.jpg', '2023-04-06 05:54:38', '2023-07-19 12:41:00', 'Bashir ali', '0934234', '12000000.00', 'http://localhost:4000/profiles/b68a52d635srsrb.jpg', '90761bc2-660d-40f1-abc5-26ccc393975a', '01b9d963-508a-487e-a277-01ca41a2ac11', 10.6, 'None\r\n', 'YES', 'http://localhost:4000/docs/b6858dkanban.png', 1),
('efba7e9d-b8c5-4073-9367-9e274512de07', 'http://localhost:4000/docs/186c51bfd0INSTALLATION SYSTEM.txt', 'processing', 'http://localhost:4000/docs/b2c5e7b2a9INSTALLATION SYSTEM.txt', 'http://localhost:4000/docs/dd382814c3INSTALLATION SYSTEM.txt', 'http://localhost:4000/docs/406a3cd0a4INSTALLATION SYSTEM.txt', '2023-06-30 14:38:23', '2023-06-30 14:38:23', 'Jacob films', '798789798', '434.44', 'http://localhost:4000/profiles/78cbc461b4INSTALLATION SYSTEM.txt', '179a941a-c741-4cc9-9bf4-3caff4d222a8', '6a6a37f2-0eeb-4fb6-a53c-34127e8692d0', 0, 'None', 'NO', NULL, 0);

-- --------------------------------------------------------

--
-- Table structure for table `BlogCategories`
--

CREATE TABLE `BlogCategories` (
  `id` int(11) NOT NULL,
  `name` varchar(255) NOT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `BlogCategories`
--

INSERT INTO `BlogCategories` (`id`, `name`, `createdAt`, `updatedAt`) VALUES
(1, 'News', '2023-06-14 16:51:12', '2023-06-14 16:51:12'),
(2, 'Business', '2023-06-14 16:51:27', '2023-06-14 16:51:27'),
(3, 'Transportation', '2023-06-14 16:51:37', '2023-06-14 16:51:37');

-- --------------------------------------------------------

--
-- Table structure for table `Blogs`
--

CREATE TABLE `Blogs` (
  `id` int(11) NOT NULL,
  `title` varchar(255) NOT NULL,
  `description` text NOT NULL,
  `date` date NOT NULL,
  `user` varchar(255) NOT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  `image` varchar(255) NOT NULL,
  `BlogCategoryId` int(11) DEFAULT NULL,
  `trending` tinyint(1) NOT NULL DEFAULT 0
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `Blogs`
--

INSERT INTO `Blogs` (`id`, `title`, `description`, `date`, `user`, `createdAt`, `updatedAt`, `image`, `BlogCategoryId`, `trending`) VALUES
(4, 'mashruuca Horumarinta iskusocodka Reer miyiga ', '<p>Mashruucan oo ah mid loogu talo galey in uu isbadel ku keeno habnolaleedka bulshada miyiga kunool ee ay kala xanibayaan buuraha iyo wabiyada ayaa wuxuu sahlayaa in bulshada loo sameeyo buundooyin ay iskaga gudbi karaan dadka iyo duunyaduba.</p><p>Waxaa mashruucan iska kaashanaya Xafiiska<strong> jidadka DDS</strong> iyo Haayada <strong>HELVETAS</strong> <strong>Swiss</strong> <strong>Intercooperation</strong>, waxa ayna kala saxeexdeen heshiiska <strong>2 sano</strong> Gudaheeda lagu sameynayo <strong>15 buundo.</strong></p>', '2023-06-29', 'Faysal Ali Hussein', '2023-06-29 05:16:13', '2023-08-07 08:26:57', 'http://localhost:4000/images/7ea30ajidadka.jpg', 1, 1),
(5, 'mashaariicaha jidadka ee ay ERA', '<p>10 kan mashuuc ee hoose oo kamida mashaariicaha jidadka ee ay ERA ka wado deegaanka soomaalida ayaa waxaa magaalada jigjiga laga furay xafiis ay hoos tagaan iyada oo markii hore lagaga xidhiiidhi jiray xarunta federalka balse hada wixii ka dambeeya ay xafiis ku yeesheen Caasimada DDS ee magaalada jigjiga.</p>', '2023-06-29', 'Faysal Ali', '2023-06-29 05:18:41', '2023-07-03 07:34:49', 'http://localhost:4000/images/466a94jidadka-1.jpg', 1, 1),
(6, 'Jidka laamiga ah  ee  Qabri dahar-shilaabo', '<p>Dalaalo ay sameeyeen ERA iyo xafiiska jidadka DDS ayaa waxay ERA jidka laamiga ah gaar ahaan Qabridahar -shilaabo ku samaysay jarista geedaha wada dhinacyadeeda ah jarista geedahan hareer wadada laamiga ah ee ay wado ERA ayaa waxay halis ku ahaayeen gaadiidka isticmaalaya wadada iyo dadka iyo xoolaha ka gudbaya laamiga taas oo sababi jirtay shilal Dadaalada noocan ah ayaa ah kuwo la sii wadi doono isla markaana lagu jari doono geedaha wadada dhinacyadeeda iyada oo ay iska kaashanayaan ERA iyo xafiiska jidadka</p>', '2023-06-29', 'faysalzaid', '2023-06-29 05:21:37', '2023-06-29 08:35:18', 'http://localhost:4000/images/e095f1jidadka-2.jpg', 1, 0),
(7, 'Mashariicda jidadka ee  ka socda Gobalada Faafan,Jarar, Qoraxay iyo Shabeele', 'Koox iskugu jirta Engineero iyo Shaqalaha waaxda Qorshaynta Iyo Dabagalka oo uu hogaaminayo Agaasinka Waaxda Qorshaynta Iyo Dabagalka  xafiiska Jidadka Abdifatah Nuur Muhmed ayaa Kormeer ku Gaadhay Mashariicda jidadka ee  ka socda Gobalada Faafan,Jarar, Qoraxay iyo Shabeele\r\n\r\n kormeerkan oo ay ujeedadiisu tahay dardar galinta shaqada  Rubaca labaad ee qorshaha Xafiiska ayaa waxay Kooxdu soo qiimayn doonaan geedi  socodka shaqo ee  mashaariicaha gobolada Faafan,Jarar,Qoraxay iyo shabeele.\r\n\r\nKormeerada Noocan ah ayaa waxay Qayb ka Yihiin kormeero Uu xafiisku  ugu Kuurgalayo geedi socodka shaqo ee Mashariicda  uu xafiisku ka wado Gobolada  Deegaanka si Loo dar dar galiyo.\r\nXafiiska Jidadka DDS', '2023-06-29', 'faysalzaid', '2023-06-29 05:26:21', '2023-06-29 05:26:21', 'http://localhost:4000/images/60a1e3jidadka-3.jpg', 2, 0),
(8, 'Kulankii guddiga maaraynta xafiiska', '<p>Kulankan ayay ujeedadiisu ahayd sidii caadada ahayd in Xubnaha guddigu isugu xogwaramo iyadoo xaaladaha soo kordha la iskula falanqeeyo kulankan ayaa waxaa shir gudoominayay Wasiirka Xafiiska Jidadka DDS <strong>eng. Sadaam Xuseen</strong> waxaa sidoo kale Kulanka ku wehelinayay wasiir-Ku-xigeenka Xafiiska <strong>Eng Axmed naasir Cali Soofe</strong>.iyo xubnaha Gudiga maaryanta Xafiiska.</p>', '2023-06-29', 'faysalzaid', '2023-06-29 05:36:14', '2023-06-29 08:36:00', 'http://localhost:4000/images/b6230djidadka-4.jpg', 2, 0),
(9, ' jidka jayga ah ee isku xidha tuulada Buladari ee degmada Shabeelley iyo magaalada Qabribayax', '<p>Masuuliyiin uu hogaminayo wasiir-kuxigeenka xafiiska jidadka DDS Eng. C/kariin C/raxmaan ayaa soo kormeeray jidka jayga ah ee isku xidha tuulada Buladari ee degmada Shabeelley iyo magaalada Qabribayax oo meel gabo\'gabo ah maraya .</p><p>Kormeerkan ayaa waxaa wasiirku-xigeenka ku wehelinay la-taliyaha madaxweynaha dhanka arrimaha bulshada, <strong>Maxamud Dayib </strong>guddoomiyaha gobolka Faafan <strong>Mudane C/xakiin Sh. Xasan</strong> iyo masuuliyiin ka socday degmooyinka Qabribayax iyo Shabeelley. </p><p>Ujeeddada kormeerkan ayaa ahayd sidii loo soo indho\'indhayn lahaa geedi socodka shaqada jidka loona soo qiimayn lahaa halka ay shaqadu marayso. </p><p>Jidkan ay kormeerka ku soo mareen masuuliyiinta isku dhafka ahi oo ay ku baxayso lacag dhan <strong>91 milyan</strong> dhererkiisuna yahay <strong>56km</strong> ayaa waxaa hirgalintiisa wada shirkadda Al-caafi waxaa uuna marayaa<strong> 96%</strong> sida ay sheegeen injineerrada gacanta ku haya dhismaha jidkani.</p>', '2023-06-29', 'faysalzaid', '2023-06-29 05:38:20', '2023-06-29 08:38:24', 'http://localhost:4000/images/bf2de9jidadka-5.jpg', 2, 1),
(10, 'kulan lagu soo bandhigayay qorshaha halbeega Waxqabadka Isku Dheeli tiran (BSC)', '<p>Xafiiska Jidadka DDS waxaa ka qabsoomay kulan lagu soo bandhigayay qorshaha halbeega Waxqabadka Isku Dheeli tiran (BSC)</p><p>Waxaa kasoo qayb galay Masuuliyiinta sare ee xafiiska <strong>Jidadka DDS</strong> Iyo Agaasinada xafiiska.</p><p>kulanka ayaa waxaa lagu kala saxeexday nidaamka halbeega waxqabdka isku dheeli tiran(BSC), qorshahan ayaa loo dhaadhiciyay Heer Waax, Koox iyo Shaqsi.</p><p>Halbeega waxqabadka isku-dheelitiran ayaa ah nidaam qorshe/maarayneed oo lagu cabiro waxqabadka Xafiiska, Isku dheelitirka shaqada iyo shaqaalaha &amp; Dhaadhicinta shaqada</p><p><br></p><p><em><u>Waaxda Xidhiidhka Dedweynaha ee Xafiiska jidadka DDS</u></em></p>', '2023-06-29', 'Faysal Ali Hussein', '2023-06-29 07:54:17', '2023-08-07 08:27:25', 'http://localhost:4000/images/db45edjidadka-6.jpg', 2, 1);

-- --------------------------------------------------------

--
-- Table structure for table `bugetTracks`
--

CREATE TABLE `bugetTracks` (
  `id` char(36) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NOT NULL,
  `date` date NOT NULL,
  `utilized` decimal(12,2) NOT NULL,
  `createdBy` varchar(255) NOT NULL,
  `yearlyBudgetId` char(36) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin DEFAULT NULL,
  `invoiced` int(11) DEFAULT 0,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `bugetTracks`
--

INSERT INTO `bugetTracks` (`id`, `date`, `utilized`, `createdBy`, `yearlyBudgetId`, `invoiced`, `createdAt`, `updatedAt`) VALUES
('6be5e54d-ad6e-4dd6-bac7-d74bb0da85be', '2023-06-20', '500000.00', 'faysalzaid', 'b4f304e0-dfbb-434a-8f08-7f7c042b7d04', 1, '2023-06-20 08:59:46', '2023-07-02 05:42:58'),
('99295d9a-acbe-40c1-925b-38de823f62d6', '2023-04-30', '3000000.00', 'faysalzaid', 'b5565caf-f1ef-451f-a8a4-f435f82e7e9e', 1, '2023-04-30 07:12:38', '2023-04-30 07:13:01'),
('a089ab40-2fdf-4a98-91dc-aa61d2fa3e50', '2023-05-02', '20383559.05', 'faysalzaid', '96f1b667-968a-4ca9-a5eb-6fe7d6b495d2', 1, '2023-05-02 13:20:49', '2023-05-02 13:21:19'),
('a35ec0ee-e5ff-4422-acd3-677daeb14e39', '2023-05-02', '20000000.00', 'faysalzaid', '45916dbc-c776-4a1a-bd2d-86f7501f7805', 1, '2023-05-02 13:07:29', '2023-05-02 13:09:11'),
('ad453670-945d-4329-8d01-2b1917297896', '2023-05-02', '59400000.00', 'faysalzaid', '7321d027-4109-475b-b1fa-f2d3485e4f45', 1, '2023-05-02 13:13:29', '2023-05-02 13:13:36'),
('af6036e6-96ba-4ea3-b51a-0f8354a427d6', '2023-05-02', '1500000.00', 'faysalzaid', 'fb1c9a60-21f1-4d76-a348-2692ca8c79ce', 1, '2023-05-02 13:14:29', '2023-05-02 13:14:41'),
('afffbb01-536f-4dcf-b217-d50ad7c04d89', '2023-05-02', '5000000.00', 'faysalzaid', '043f8af9-4579-462a-a0c5-47033e84b000', 1, '2023-05-02 14:35:24', '2023-05-02 14:35:36'),
('b57ff573-01fe-4dd2-963b-c86c00b06f67', '2023-05-02', '15000000.00', 'faysalzaid', '043f8af9-4579-462a-a0c5-47033e84b000', 1, '2023-05-02 13:31:29', '2023-05-02 13:31:39'),
('d25c318a-3183-42e7-9a35-26f4ea9528a3', '2023-06-19', '200000.00', 'faysalzaid', '043f8af9-4579-462a-a0c5-47033e84b000', 1, '2023-06-19 02:13:51', '2023-06-20 08:42:29');

-- --------------------------------------------------------

--
-- Table structure for table `Candidates`
--

CREATE TABLE `Candidates` (
  `id` char(36) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NOT NULL,
  `date` date NOT NULL,
  `qualification` varchar(255) NOT NULL,
  `yearsOfExperience` int(11) NOT NULL,
  `organizationWorkedBefore` varchar(255) NOT NULL,
  `address` varchar(255) NOT NULL,
  `location` varchar(255) NOT NULL,
  `vacancy` varchar(255) NOT NULL,
  `name` varchar(255) NOT NULL,
  `status` enum('rejected','shortlisted','selected','pending') NOT NULL DEFAULT 'pending'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `Candidates`
--

INSERT INTO `Candidates` (`id`, `date`, `qualification`, `yearsOfExperience`, `organizationWorkedBefore`, `address`, `location`, `vacancy`, `name`, `status`) VALUES
('2d3214d6-923a-4efe-974d-522536985f4c', '2023-03-22', 'Degree in s.Engineering', 5, 'SRS_TIB', '0912121212', 'jigjiga', 'Regional Manager', 'mahamud ahmed ibrahim', 'shortlisted'),
('db2eff46-7dd5-40b6-a900-81d333b566c4', '2023-03-23', 'Degree in s.Engineering', 4, 'none', '0912121212', 'jigjiga', 'IT', 'Farah Moalin', 'selected');

-- --------------------------------------------------------

--
-- Table structure for table `Chats`
--

CREATE TABLE `Chats` (
  `id` int(11) NOT NULL,
  `message` varchar(255) NOT NULL,
  `from` char(36) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NOT NULL,
  `to` char(36) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NOT NULL,
  `type` enum('text','image','video','file') NOT NULL DEFAULT 'text',
  `seen` tinyint(1) NOT NULL DEFAULT 1,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `Chats`
--

INSERT INTO `Chats` (`id`, `message`, `from`, `to`, `type`, `seen`, `createdAt`, `updatedAt`) VALUES
(1, 'Hey faysal', '99a09bd9-b9a1-4f08-a10c-dda8ebb2e4c4', '179a941a-c741-4cc9-9bf4-3caff4d222a8', 'text', 0, '2023-01-25 08:36:21', '2023-01-31 12:06:34'),
(2, 'hey cooler', '179a941a-c741-4cc9-9bf4-3caff4d222a8', '99a09bd9-b9a1-4f08-a10c-dda8ebb2e4c4', 'text', 0, '2023-01-25 08:37:07', '2023-01-31 12:03:28'),
(3, 'how are you doing', '99a09bd9-b9a1-4f08-a10c-dda8ebb2e4c4', '179a941a-c741-4cc9-9bf4-3caff4d222a8', 'text', 0, '2023-01-25 14:19:51', '2023-01-31 12:06:34'),
(4, 'i am doing fine bro', '99a09bd9-b9a1-4f08-a10c-dda8ebb2e4c4', '179a941a-c741-4cc9-9bf4-3caff4d222a8', 'text', 0, '2023-01-31 12:03:44', '2023-01-31 12:06:34'),
(5, 'thanks', '99a09bd9-b9a1-4f08-a10c-dda8ebb2e4c4', '179a941a-c741-4cc9-9bf4-3caff4d222a8', 'text', 0, '2023-01-31 12:05:55', '2023-01-31 12:06:34'),
(6, 'i was waiting you call', '99a09bd9-b9a1-4f08-a10c-dda8ebb2e4c4', '179a941a-c741-4cc9-9bf4-3caff4d222a8', 'text', 0, '2023-01-31 12:07:59', '2023-02-26 12:13:56'),
(7, 'how is everything', '99a09bd9-b9a1-4f08-a10c-dda8ebb2e4c4', '179a941a-c741-4cc9-9bf4-3caff4d222a8', 'text', 0, '2023-01-31 12:08:36', '2023-02-26 12:13:56'),
(8, 'good good', '99a09bd9-b9a1-4f08-a10c-dda8ebb2e4c4', '179a941a-c741-4cc9-9bf4-3caff4d222a8', 'text', 0, '2023-01-31 12:15:56', '2023-02-26 12:13:56'),
(9, 'bro', '99a09bd9-b9a1-4f08-a10c-dda8ebb2e4c4', '179a941a-c741-4cc9-9bf4-3caff4d222a8', 'text', 0, '2023-01-31 12:15:58', '2023-02-26 12:13:56'),
(10, 'hey bashir', '99a09bd9-b9a1-4f08-a10c-dda8ebb2e4c4', '90761bc2-660d-40f1-abc5-26ccc393975a', 'text', 0, '2023-02-03 20:59:46', '2023-03-15 20:44:42'),
(11, 'nice to see youi talk to your self', '179a941a-c741-4cc9-9bf4-3caff4d222a8', '99a09bd9-b9a1-4f08-a10c-dda8ebb2e4c4', 'text', 0, '2023-02-26 12:14:14', '2023-02-26 12:14:57'),
(12, 'yes bro', '99a09bd9-b9a1-4f08-a10c-dda8ebb2e4c4', '179a941a-c741-4cc9-9bf4-3caff4d222a8', 'text', 0, '2023-02-27 08:51:14', '2023-02-27 08:51:44'),
(13, 'what\'s up bro how are you doing', '99a09bd9-b9a1-4f08-a10c-dda8ebb2e4c4', '179a941a-c741-4cc9-9bf4-3caff4d222a8', 'text', 0, '2023-03-11 07:05:58', '2023-03-11 07:07:24'),
(14, 'ya bro', '179a941a-c741-4cc9-9bf4-3caff4d222a8', '99a09bd9-b9a1-4f08-a10c-dda8ebb2e4c4', 'text', 0, '2023-03-11 07:07:30', '2023-03-11 07:07:53'),
(15, 'i am doing great', '179a941a-c741-4cc9-9bf4-3caff4d222a8', '99a09bd9-b9a1-4f08-a10c-dda8ebb2e4c4', 'text', 0, '2023-03-11 07:07:34', '2023-03-11 07:07:53'),
(16, ' thanks', '179a941a-c741-4cc9-9bf4-3caff4d222a8', '99a09bd9-b9a1-4f08-a10c-dda8ebb2e4c4', 'text', 0, '2023-03-11 07:07:36', '2023-03-11 07:07:53'),
(17, 'hey bashir himself here how are you doing', '99a09bd9-b9a1-4f08-a10c-dda8ebb2e4c4', '90761bc2-660d-40f1-abc5-26ccc393975a', 'text', 0, '2023-03-15 20:44:07', '2023-03-15 20:44:42'),
(18, 'i am doing great bro thanks', '90761bc2-660d-40f1-abc5-26ccc393975a', '99a09bd9-b9a1-4f08-a10c-dda8ebb2e4c4', 'text', 0, '2023-03-15 20:45:09', '2023-03-15 20:45:34'),
(19, 'how are you', '90761bc2-660d-40f1-abc5-26ccc393975a', '99a09bd9-b9a1-4f08-a10c-dda8ebb2e4c4', 'text', 0, '2023-03-15 20:45:12', '2023-03-15 20:45:34'),
(20, 'fine bro', '99a09bd9-b9a1-4f08-a10c-dda8ebb2e4c4', '90761bc2-660d-40f1-abc5-26ccc393975a', 'text', 1, '2023-03-15 20:45:50', '2023-03-15 20:45:50'),
(21, 'hello engineer', '99a09bd9-b9a1-4f08-a10c-dda8ebb2e4c4', 'a65aff0c-e0a7-400b-9e58-1988405795c3', 'text', 0, '2023-04-16 10:21:20', '2023-04-16 10:22:44'),
(22, 'Hey faysal', '26585a09-f655-429c-8b33-dbcd2b4e0db4', '99a09bd9-b9a1-4f08-a10c-dda8ebb2e4c4', 'text', 0, '2023-07-06 07:15:27', '2023-07-06 07:15:49'),
(23, 'hello public', '99a09bd9-b9a1-4f08-a10c-dda8ebb2e4c4', '26585a09-f655-429c-8b33-dbcd2b4e0db4', 'text', 0, '2023-07-06 07:16:00', '2023-07-06 07:16:21');

-- --------------------------------------------------------

--
-- Table structure for table `Clients`
--

CREATE TABLE `Clients` (
  `id` char(36) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NOT NULL,
  `name` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL,
  `phone` varchar(255) NOT NULL,
  `status` enum('active','disabled') NOT NULL DEFAULT 'active',
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  `CompanyId` char(36) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `Clients`
--

INSERT INTO `Clients` (`id`, `name`, `email`, `phone`, `status`, `createdAt`, `updatedAt`, `CompanyId`) VALUES
('2a0b5220-34ee-4028-9eb6-e5afb9c23020', 'zaid', 'zaidtech@gmail.com', '789798', 'active', '2022-11-22 06:46:23', '2022-12-26 07:05:22', NULL),
('74d730d0-86de-41c3-a279-5e4eb40a572e', 'Nur sheikh', 'nursheikh@gmail.com', '79789789', 'active', '2022-11-26 07:29:13', '2022-11-26 07:29:13', NULL),
('85097940-bb87-40a1-be6e-263f604f4f86', 'Farah moalin', 'farah@gmail.com', '34343434', 'active', '2022-11-24 12:46:07', '2022-11-24 12:46:07', NULL);

-- --------------------------------------------------------

--
-- Table structure for table `Companies`
--

CREATE TABLE `Companies` (
  `id` char(36) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NOT NULL,
  `name` varchar(255) NOT NULL,
  `location` varchar(255) NOT NULL,
  `UserId` char(36) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `Companies`
--

INSERT INTO `Companies` (`id`, `name`, `location`, `UserId`) VALUES
('16c8bf3f-530a-4b39-baf8-f6fcc2eb7cc6', 'Makib Construction', 'jigjiga', '179a941a-c741-4cc9-9bf4-3caff4d222a8'),
('2090fcb6-a39d-46f2-a4d1-7b96eb4e4084', 'Fiidaar GCC', 'jigjiga', '179a941a-c741-4cc9-9bf4-3caff4d222a8'),
('4799385e-b777-4215-85ec-13ae26155da5', 'Kaafi Group Gc', 'jigjiga', '179a941a-c741-4cc9-9bf4-3caff4d222a8'),
('65e1e6f3-49cf-455c-a106-e12b0a41223e', 'RABAH & SONS Plc', 'jigjiga', '179a941a-c741-4cc9-9bf4-3caff4d222a8'),
('84a4faa3-3fed-40c7-b846-3956299d0107', 'Kooshin Construction', 'jigjiga', '179a941a-c741-4cc9-9bf4-3caff4d222a8'),
('9b04a54c-a5b3-4008-9edd-30a17a2ae81a', 'Shabeele', 'hargeisa', '179a941a-c741-4cc9-9bf4-3caff4d222a8'),
('9de96257-6e94-40c5-b90b-6bdb262dd6c8', 'Tawakal Gc', 'jigjiga', '179a941a-c741-4cc9-9bf4-3caff4d222a8'),
('a203e601-3564-43a5-9b75-02205bbc12b3', 'Ebirr', 'jigjiga', '179a941a-c741-4cc9-9bf4-3caff4d222a8'),
('b0488784-ac63-4807-95f8-df988e337510', 'Al-Afi Gc', 'jigjiga', '179a941a-c741-4cc9-9bf4-3caff4d222a8'),
('b7e7af6e-329d-451c-a037-2a47fcab15f4', 'Sahay', 'jigjiga', '90761bc2-660d-40f1-abc5-26ccc393975a'),
('bdeba5a8-fc96-4de9-93fc-fa6dd341d87b', 'Aamina GC', 'jigjiga', '179a941a-c741-4cc9-9bf4-3caff4d222a8'),
('c4ccce23-ca58-45e8-8a3f-d8c44425d0de', 'Sahal', 'jigjiga', '179a941a-c741-4cc9-9bf4-3caff4d222a8'),
('c63ebb01-0379-4e98-85ad-33374f58f385', 'Rabco', 'jigjiga', '179a941a-c741-4cc9-9bf4-3caff4d222a8'),
('ca53a1e8-d28a-4e1c-91d9-a59959bd254f', 'Magan Gc', 'jigjiga', '179a941a-c741-4cc9-9bf4-3caff4d222a8'),
('d8f973cf-a839-4a84-b1b2-c6ecbb00c504', 'Mowlis Ismail Gc', 'jigjiga', '179a941a-c741-4cc9-9bf4-3caff4d222a8'),
('dc151898-60e6-4f06-b212-47e9b88ebf6d', 'Ashkir Construction ', 'jigjiga', '179a941a-c741-4cc9-9bf4-3caff4d222a8'),
('dd7d3b34-f5eb-49e2-9e94-d8622f537347', 'SRS RCE', 'jigjiga', '179a941a-c741-4cc9-9bf4-3caff4d222a8'),
('e35eeea2-554b-4272-a13b-91be7e0292ce', 'CCC', 'jigjiga', '179a941a-c741-4cc9-9bf4-3caff4d222a8'),
('ffd8bc92-8192-43ae-a391-a544102b1e17', 'Namer Gc', 'jigjiga', '179a941a-c741-4cc9-9bf4-3caff4d222a8');

-- --------------------------------------------------------

--
-- Table structure for table `Contracts`
--

CREATE TABLE `Contracts` (
  `id` char(36) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NOT NULL,
  `subject` varchar(255) NOT NULL,
  `contractValue` decimal(12,2) DEFAULT 0.00,
  `startDate` date NOT NULL,
  `endDate` date NOT NULL,
  `UserId` char(36) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin DEFAULT NULL,
  `ProjectId` char(36) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin DEFAULT NULL,
  `ContractTypeId` char(36) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin DEFAULT NULL,
  `status` enum('signed','unsigned') DEFAULT 'unsigned',
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `Contracts`
--

INSERT INTO `Contracts` (`id`, `subject`, `contractValue`, `startDate`, `endDate`, `UserId`, `ProjectId`, `ContractTypeId`, `status`, `createdAt`, `updatedAt`) VALUES
('11a7c501-da24-495c-80e2-23ec56e48772', 'Paper for work', '200000.00', '2023-04-24', '2023-04-24', '90761bc2-660d-40f1-abc5-26ccc393975a', 'af00fdaf-32d2-4448-a0eb-d311a010af23', '5a75d69c-b09a-11ed-9348-4a850b0fd1f4', 'unsigned', '2023-04-24 11:43:09', '2023-05-03 13:09:37');

-- --------------------------------------------------------

--
-- Table structure for table `ContractTypes`
--

CREATE TABLE `ContractTypes` (
  `id` char(36) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NOT NULL,
  `type` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `ContractTypes`
--

INSERT INTO `ContractTypes` (`id`, `type`) VALUES
('5a75d69c-b09a-11ed-9348-4a850b0fd1f4', 'Fixed'),
('60f6bf90-b09a-11ed-9348-4a850b0fd1f4', 'Long-Term');

-- --------------------------------------------------------

--
-- Table structure for table `contract_types`
--

CREATE TABLE `contract_types` (
  `id` char(36) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NOT NULL,
  `type` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `Departments`
--

CREATE TABLE `Departments` (
  `id` char(36) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NOT NULL,
  `name` varchar(255) NOT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `Departments`
--

INSERT INTO `Departments` (`id`, `name`, `createdAt`, `updatedAt`) VALUES
('110a0fdf-f6b3-47cc-a9c6-62b7233bef79', 'Planning', '2023-01-28 12:42:10', '2023-01-28 12:42:10'),
('6571d264-1dea-480a-a04b-f73c848b5c51', 'ICT', '2022-11-20 12:45:56', '2022-11-20 12:45:56'),
('bfec0030-d93f-4e54-a0f0-be7be581292f', 'Finance', '2022-12-04 05:49:45', '2022-12-04 05:49:45');

-- --------------------------------------------------------

--
-- Table structure for table `Designations`
--

CREATE TABLE `Designations` (
  `id` char(36) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NOT NULL,
  `name` varchar(255) NOT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `Designations`
--

INSERT INTO `Designations` (`id`, `name`, `createdAt`, `updatedAt`) VALUES
('6acb3ab8-575b-4de8-9e9c-cb3cbec7e667', 'Head', '2022-11-20 12:47:10', '2022-11-20 12:47:10'),
('6fd60806-b4d7-419e-bbeb-763256fe05d6', 'ocasdf', '2023-07-02 17:12:12', '2023-07-02 17:12:12'),
('86fe852e-9123-40c7-bbf1-72f687c368ea', 'cooler', '2023-07-02 17:07:05', '2023-07-02 17:07:05'),
('9eeb31de-cd55-4844-ab3b-c4c1423d1409', 'Director', '2022-11-20 12:47:20', '2022-11-20 12:47:20'),
('b2e35a14-cd09-41c9-8294-1a8b146c0ba0', 'Employee', '2022-11-20 12:47:03', '2022-11-20 12:47:30'),
('fdb96d84-f322-4764-bdf7-4dfb7c75216b', 'Tech Lead', '2023-05-30 12:36:49', '2023-05-30 12:36:49');

-- --------------------------------------------------------

--
-- Table structure for table `Empemplloyees`
--

CREATE TABLE `Empemplloyees` (
  `id` char(36) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NOT NULL,
  `name` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL,
  `phone` varchar(255) NOT NULL,
  `area` varchar(255) DEFAULT NULL,
  `hiredDate` date DEFAULT NULL,
  `ssn` varchar(255) DEFAULT NULL,
  `passportNo` varchar(255) DEFAULT NULL,
  `contactPhone` varchar(255) DEFAULT NULL,
  `status` enum('active','inactive') NOT NULL DEFAULT 'active',
  `nationality` varchar(255) DEFAULT NULL,
  `address` varchar(255) DEFAULT NULL,
  `birthday` date DEFAULT NULL,
  `postCode` varchar(255) DEFAULT NULL,
  `image` varchar(255) DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  `DepartmentId` char(36) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin DEFAULT NULL,
  `DesignationId` char(36) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin DEFAULT NULL,
  `AreaId` char(36) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `Employees`
--

CREATE TABLE `Employees` (
  `id` char(36) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NOT NULL,
  `name` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL,
  `phone` varchar(255) NOT NULL,
  `status` enum('active','inactive') NOT NULL DEFAULT 'active',
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  `image` varchar(255) DEFAULT 'http://localhost:4000/profile.jpeg',
  `area` varchar(255) DEFAULT NULL,
  `hiredDate` date DEFAULT NULL,
  `ssn` varchar(255) DEFAULT NULL,
  `passportNo` varchar(255) DEFAULT NULL,
  `contactPhone` varchar(255) DEFAULT NULL,
  `nationality` varchar(255) DEFAULT NULL,
  `address` varchar(255) DEFAULT NULL,
  `birthday` date DEFAULT NULL,
  `postCode` varchar(255) DEFAULT NULL,
  `DepartmentId` char(36) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin DEFAULT NULL,
  `DesignationId` char(36) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin DEFAULT NULL,
  `AreaId` char(36) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `Employees`
--

INSERT INTO `Employees` (`id`, `name`, `email`, `phone`, `status`, `createdAt`, `updatedAt`, `image`, `area`, `hiredDate`, `ssn`, `passportNo`, `contactPhone`, `nationality`, `address`, `birthday`, `postCode`, `DepartmentId`, `DesignationId`, `AreaId`) VALUES
('5326bd76-1afd-4044-90cb-2c845157600b', 'xusen', 'ah@gmail.com', '67868768768', 'active', '2023-05-22 05:56:49', '2023-05-22 05:56:49', 'http://localhost:4000/profile.jpeg', NULL, '2023-05-22', 'None', 'None', '0934234', 'Ethiopian', 'qomadastreet', '2023-05-22', 'None', NULL, NULL, NULL),
('6c701fc3-187c-427b-9d5b-21eebc97e614', 'zaid', 'z@gmail.com', '43434343434', 'active', '2023-05-22 05:56:49', '2023-05-22 05:56:49', 'http://localhost:4000/profile.jpeg', NULL, '2023-05-22', 'None', 'None', '09352342', 'Ethiopian', 'Jigjiga', '2023-05-22', 'None', NULL, NULL, NULL),
('b74dd2ef-0495-40cb-9c37-636c4ebaf316', 'Faysal ali hussein', 'faysal@gmail.com', '9342342', 'active', '2023-04-06 06:37:13', '2023-04-22 13:42:44', 'http://localhost:4000/employees/156a38photo_2023-01-09 04.13.25.jpeg', 'Fanfan', '2023-02-02', '342', '6456', '9423432', 'Ethiopian', 'Jigjgia,ethiopia', '2023-04-04', '78979', '6571d264-1dea-480a-a04b-f73c848b5c51', '6acb3ab8-575b-4de8-9e9c-cb3cbec7e667', NULL);

-- --------------------------------------------------------

--
-- Table structure for table `Invoices`
--

CREATE TABLE `Invoices` (
  `id` char(36) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NOT NULL,
  `date` date NOT NULL,
  `notes` text NOT NULL,
  `totalPaid` decimal(12,2) NOT NULL,
  `amountDue` decimal(12,2) NOT NULL,
  `total` decimal(12,2) NOT NULL,
  `ProjectId` char(36) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin DEFAULT NULL,
  `UserId` char(36) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin DEFAULT NULL,
  `status` enum('Partially','Paid') NOT NULL DEFAULT 'Partially',
  `PaymentModeId` char(36) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin DEFAULT NULL,
  `sequential` varchar(255) DEFAULT ' '
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `Invoices`
--

INSERT INTO `Invoices` (`id`, `date`, `notes`, `totalPaid`, `amountDue`, `total`, `ProjectId`, `UserId`, `status`, `PaymentModeId`, `sequential`) VALUES
('026693b5-5c9f-4023-8463-22dabd9e160c', '2023-05-02', 'None', '0.00', '0.00', '249001500.00', '01b9d963-508a-487e-a277-01ca41a2ac11', '99a09bd9-b9a1-4f08-a10c-dda8ebb2e4c4', 'Partially', '22ccc0ee-2b15-414f-b7f3-f345ee5c2394', 'Receipt Voucher'),
('353db3a7-e668-45ab-982f-9ce18fba4e4a', '2023-05-02', 'None', '20700000.00', '73578016.31', '94278016.31', '772052ff-e087-47b6-b347-bbbde05b49cf', '99a09bd9-b9a1-4f08-a10c-dda8ebb2e4c4', 'Partially', '22ccc0ee-2b15-414f-b7f3-f345ee5c2394', ''),
('7e670299-26be-4109-98c8-0d2ec6006a92', '2023-04-30', 'None', '0.00', '0.00', '10000000.21', '93f46bc5-df26-4dbe-bc85-9f5f27e797fe', '99a09bd9-b9a1-4f08-a10c-dda8ebb2e4c4', 'Partially', '22ccc0ee-2b15-414f-b7f3-f345ee5c2394', 'Payment Voucher'),
('8c95bb57-c5fa-4178-9c34-5f62cce54c91', '2023-05-02', 'None', '59400000.00', '250769708.50', '310169708.50', 'af00fdaf-32d2-4448-a0eb-d311a010af23', '99a09bd9-b9a1-4f08-a10c-dda8ebb2e4c4', 'Partially', '22ccc0ee-2b15-414f-b7f3-f345ee5c2394', ''),
('9a043a8a-41e1-4d1a-a51d-b2d6b2eb9529', '2023-05-02', 'None', '20383559.00', '164974592.96', '185358151.96', '35342def-199f-4319-8079-f4cfacc6ba69', '99a09bd9-b9a1-4f08-a10c-dda8ebb2e4c4', 'Partially', '22ccc0ee-2b15-414f-b7f3-f345ee5c2394', ''),
('c2ee66a6-0a13-4d43-b0ec-9b3ad26f93fa', '2023-07-24', 'None', '79976370.00', '139926467.07', '219902837.07', '6a6a37f2-0eeb-4fb6-a53c-34127e8692d0', '99a09bd9-b9a1-4f08-a10c-dda8ebb2e4c4', 'Partially', '22ccc0ee-2b15-414f-b7f3-f345ee5c2394', ''),
('d7ae9833-cc7c-4c2d-9bbb-b07a67ab6cc9', '2023-04-30', 'None', '1500000.00', '8500000.00', '10000000.00', '03e5494a-4e38-47c2-a22c-0a27c708094d', '99a09bd9-b9a1-4f08-a10c-dda8ebb2e4c4', 'Partially', '22ccc0ee-2b15-414f-b7f3-f345ee5c2394', 'Payment voucher');

-- --------------------------------------------------------

--
-- Table structure for table `job_offers`
--

CREATE TABLE `job_offers` (
  `id` char(36) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NOT NULL,
  `file` varchar(255) NOT NULL,
  `EmployeeId` char(36) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `job_offers`
--

INSERT INTO `job_offers` (`id`, `file`, `EmployeeId`) VALUES
('117f2452-7521-48d2-be79-9bc447961ab6', 'http://localhost:4000/docs/7e3d0bCT. 2022.02- Commercepal.docx', 'b74dd2ef-0495-40cb-9c37-636c4ebaf316'),
('4755efa5-1cd1-43c4-9ed6-496548dfb5a6', 'http://localhost:4000/docs/f3daeaCT. 2022.02- Commercepal.docx', 'b74dd2ef-0495-40cb-9c37-636c4ebaf316'),
('8a4c6edf-5380-4104-9cb8-12eb71cbf430', 'http://localhost:4000/docs/58450diphone.jpg', NULL),
('b7a28fb1-2ee3-4886-9165-e8783ae0686f', 'http://localhost:4000/docs/4cc54fCT. 2022.01- Commercepal.docx', 'b74dd2ef-0495-40cb-9c37-636c4ebaf316');

-- --------------------------------------------------------

--
-- Table structure for table `LeaveRequests`
--

CREATE TABLE `LeaveRequests` (
  `id` char(36) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NOT NULL,
  `date` date NOT NULL,
  `numberOfDays` varchar(255) DEFAULT NULL,
  `startDate` date NOT NULL,
  `endDate` date NOT NULL,
  `comments` varchar(255) DEFAULT NULL,
  `createdBy` varchar(255) DEFAULT NULL,
  `DepartmentId` char(36) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin DEFAULT NULL,
  `status` varchar(255) DEFAULT 'Pending',
  `checkedBy` char(36) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin DEFAULT NULL,
  `approvedBy` char(36) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin DEFAULT NULL,
  `LeaveTypeId` char(36) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin DEFAULT NULL,
  `EmployeeId` char(36) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `LeaveRequests`
--

INSERT INTO `LeaveRequests` (`id`, `date`, `numberOfDays`, `startDate`, `endDate`, `comments`, `createdBy`, `DepartmentId`, `status`, `checkedBy`, `approvedBy`, `LeaveTypeId`, `EmployeeId`) VALUES
('27cfe505-7bb0-4166-ac2c-cd3244682c0f', '2023-07-02', '2', '2023-07-02', '2023-07-03', 'fasfd', 'Faysal Ali', NULL, 'Pending', '179a941a-c741-4cc9-9bf4-3caff4d222a8', '179a941a-c741-4cc9-9bf4-3caff4d222a8', '7ccccbce-1cc3-423e-810b-43d040b6db0a', '5326bd76-1afd-4044-90cb-2c845157600b');

-- --------------------------------------------------------

--
-- Table structure for table `LeaveTypes`
--

CREATE TABLE `LeaveTypes` (
  `id` char(36) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NOT NULL,
  `type` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `LeaveTypes`
--

INSERT INTO `LeaveTypes` (`id`, `type`) VALUES
('7ccccbce-1cc3-423e-810b-43d040b6db0a', 'Sick Leave'),
('84ad90e8-81fb-4eda-ba97-bb33293de39b', 'Unknown'),
('dd70f94e-9901-4fa2-9d27-f59056fa635e', 'Vacation');

-- --------------------------------------------------------

--
-- Table structure for table `leave_requests`
--

CREATE TABLE `leave_requests` (
  `id` char(36) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NOT NULL,
  `date` date NOT NULL,
  `numberOfDays` varchar(255) DEFAULT NULL,
  `startDate` date NOT NULL,
  `endDate` date NOT NULL,
  `comments` varchar(255) DEFAULT NULL,
  `createdBy` varchar(255) DEFAULT NULL,
  `status` varchar(255) DEFAULT 'Pending',
  `DepartmentId` char(36) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin DEFAULT NULL,
  `EmployeeId` char(36) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin DEFAULT NULL,
  `checkedBy` char(36) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin DEFAULT NULL,
  `approvedBy` char(36) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin DEFAULT NULL,
  `leaveTypeId` char(36) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `leave_types`
--

CREATE TABLE `leave_types` (
  `id` char(36) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NOT NULL,
  `type` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `letterRequests`
--

CREATE TABLE `letterRequests` (
  `id` int(11) NOT NULL,
  `letter` text NOT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  `UserId` char(36) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `letterRequests`
--

INSERT INTO `letterRequests` (`id`, `letter`, `createdAt`, `updatedAt`, `UserId`) VALUES
(2, '<p class=\"ql-align-center\"><strong style=\"color: rgb(106, 168, 79);\">Dear Partner,</strong></p><p>&nbsp;</p><p>As an update to our previous communication regarding data minimisation on the M-PESA API, we will be making adjustments to accommodate several of our partners who are experiencing technical challenges integrating the minimised APIs. .......</p><p>&nbsp;</p><p>As such, partners will continue to receive customer phone numbers through the M-PESA API beyond the earlier communicated deadline of 30th June 2022. This will ensure partners can continue to adequately process payments as we assist them to resolve resulting technical challenges.&nbsp;</p><p>&nbsp;</p><p>Further review of the APIs will be done in consultation with our partners to ensure you continue to meet your payment processing requirements while guaranteeing customer privacy and ensuring compliance with the Data Protection Act.  </p><p><br></p><p><br></p><p><br></p><p><br></p><p><br></p><p>&nbsp;</p><p>We remain committed in supporting you in both your transaction processing<span style=\"color: rgb(230, 0, 0);\"> requirements</span> as well as ensuring our customers data protection. For any queries on technical solutions kindly contact <a href=\"mailto:apisupport@Safaricom.co.ke\" rel=\"noopener noreferrer\" target=\"_blank\" style=\"color: blue;\">apisupport@Safaricom.co.ke</a> and for any data protection enquiries to our Data Protection Office at <a href=\"mailto:dpo@safaricom.co.ke\" rel=\"noopener noreferrer\" target=\"_blank\" style=\"color: blue;\">dpo@safaricom.co.ke</a>.</p>', '2023-06-21 11:28:28', '2023-07-24 13:36:53', '99a09bd9-b9a1-4f08-a10c-dda8ebb2e4c4'),
(12, '<p>fasdfasdfasd</p>', '2023-07-24 13:37:09', '2023-07-24 13:37:09', '99a09bd9-b9a1-4f08-a10c-dda8ebb2e4c4');

-- --------------------------------------------------------

--
-- Table structure for table `medical_allowances`
--

CREATE TABLE `medical_allowances` (
  `id` char(36) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NOT NULL,
  `file` varchar(255) NOT NULL,
  `EmployeeId` char(36) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `medical_allowances`
--

INSERT INTO `medical_allowances` (`id`, `file`, `EmployeeId`, `createdAt`, `updatedAt`) VALUES
('2a934fc4-98e4-455d-a39b-d1295acc75d9', 'http://localhost:4000/docs/d22178CT. 2022.02- Commercepal.docx', 'b74dd2ef-0495-40cb-9c37-636c4ebaf316', '2023-04-25 11:07:58', '2023-04-25 11:07:58'),
('f6131806-b8f5-4d03-89ef-b927c2c36602', 'http://localhost:4000/docs/4a72dcdefault.jpeg', 'b74dd2ef-0495-40cb-9c37-636c4ebaf316', '2023-04-13 12:26:20', '2023-04-13 12:26:20');

-- --------------------------------------------------------

--
-- Table structure for table `Monthlytimesheets`
--

CREATE TABLE `Monthlytimesheets` (
  `id` char(36) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NOT NULL,
  `attachment` varchar(255) NOT NULL,
  `EmployeeId` char(36) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin DEFAULT NULL,
  `date` date NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `Monthlytimesheets`
--

INSERT INTO `Monthlytimesheets` (`id`, `attachment`, `EmployeeId`, `date`) VALUES
('14f4901d-4163-4c05-9e80-2ebb501732d7', 'http://localhost:4000/timesheet/ba950e32default.jpeg', 'b74dd2ef-0495-40cb-9c37-636c4ebaf316', '2023-04-13');

-- --------------------------------------------------------

--
-- Table structure for table `monthly_timesheets`
--

CREATE TABLE `monthly_timesheets` (
  `id` char(36) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NOT NULL,
  `date` date NOT NULL,
  `attachment` varchar(255) NOT NULL,
  `EmployeeId` char(36) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `owda_accounts`
--

CREATE TABLE `owda_accounts` (
  `id` int(11) NOT NULL,
  `name` varchar(255) NOT NULL,
  `code` varchar(255) NOT NULL,
  `description` text DEFAULT NULL,
  `owdaBankId` int(11) DEFAULT NULL,
  `owdaAccountTypeId` int(11) DEFAULT NULL,
  `balance` decimal(12,2) NOT NULL DEFAULT 0.00,
  `remaining` decimal(12,2) NOT NULL DEFAULT 0.00,
  `utilized` decimal(12,2) NOT NULL DEFAULT 0.00
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `owda_accounts`
--

INSERT INTO `owda_accounts` (`id`, `name`, `code`, `description`, `owdaBankId`, `owdaAccountTypeId`, `balance`, `remaining`, `utilized`) VALUES
(35, 'WHO', '100', 'WHO Revenue Account	', 7, 7, '30000.00', '12000.00', '18000.00'),
(36, 'Poll account', '43', 'None', 1, 2, '40000.00', '23200.00', '16800.00');

-- --------------------------------------------------------

--
-- Table structure for table `owda_account_types`
--

CREATE TABLE `owda_account_types` (
  `id` int(11) NOT NULL,
  `name` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `owda_account_types`
--

INSERT INTO `owda_account_types` (`id`, `name`) VALUES
(10, 'Current Assets'),
(4, 'Current Liabilities'),
(1, 'Equity'),
(2, 'Expenses'),
(3, 'Fixed Assets'),
(7, 'Operating Expenses'),
(9, 'Other Assets'),
(8, 'Revenue');

-- --------------------------------------------------------

--
-- Table structure for table `owda_activities`
--

CREATE TABLE `owda_activities` (
  `id` int(11) NOT NULL,
  `unit` varchar(255) NOT NULL,
  `quantity` decimal(12,2) NOT NULL,
  `usd` decimal(12,2) NOT NULL,
  `totalAmount` decimal(12,2) NOT NULL,
  `description` text DEFAULT NULL,
  `owdaBudgetLineId` int(11) DEFAULT NULL,
  `owdaSiteId` int(11) DEFAULT NULL,
  `unitPrice` decimal(12,2) NOT NULL,
  `usdUnitRate` decimal(12,2) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `owda_activities`
--

INSERT INTO `owda_activities` (`id`, `unit`, `quantity`, `usd`, `totalAmount`, `description`, `owdaBudgetLineId`, `owdaSiteId`, `unitPrice`, `usdUnitRate`) VALUES
(4, 'ms', '12.00', '111.11', '6000.00', 'Wash co', 6, 1, '500.00', '54.00');

-- --------------------------------------------------------

--
-- Table structure for table `PaymentModes`
--

CREATE TABLE `PaymentModes` (
  `id` char(36) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NOT NULL,
  `mode` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `PaymentModes`
--

INSERT INTO `PaymentModes` (`id`, `mode`) VALUES
('17410c84-2999-4b3a-b883-0c6df7e597db', 'Sahay'),
('22ccc0ee-2b15-414f-b7f3-f345ee5c2394', 'CBE'),
('a8551b85-fd87-4e9c-9759-a56480707859', 'HelloCash'),
('ba9d0d20-c9d5-404b-897f-dd59ec0a7f56', 'Cash'),
('ec573b99-3fb9-4038-9f6b-7aa0feff1d88', 'EBIRR');

-- --------------------------------------------------------

--
-- Table structure for table `payments`
--

CREATE TABLE `payments` (
  `id` char(36) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NOT NULL,
  `date` date NOT NULL,
  `amountReceived` decimal(12,2) NOT NULL,
  `InvoiceId` char(36) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin DEFAULT NULL,
  `invoiced` int(11) DEFAULT 0,
  `createdBy` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `payments`
--

INSERT INTO `payments` (`id`, `date`, `amountReceived`, `InvoiceId`, `invoiced`, `createdBy`) VALUES
('2d6b7f88-2050-4100-9373-a5cc038784aa', '2023-05-02', '5000000.00', '353db3a7-e668-45ab-982f-9ce18fba4e4a', 1, 'faysalzaid'),
('463f6090-7f52-4445-bb5e-64fae42c28d1', '2023-05-02', '15000000.00', '353db3a7-e668-45ab-982f-9ce18fba4e4a', 1, 'faysalzaid'),
('4d88b1fc-1585-4cc6-94a3-5c41e9f0be5d', '2023-05-02', '20000000.00', '026693b5-5c9f-4023-8463-22dabd9e160c', 1, 'faysalzaid'),
('7fea5eab-bdb9-454b-840a-269499822c0b', '2023-07-02', '500000.00', '353db3a7-e668-45ab-982f-9ce18fba4e4a', 1, 'Faysal Ali'),
('8f9c1b1c-86a4-401c-85db-80e7e60869e3', '2023-05-02', '20383559.00', '9a043a8a-41e1-4d1a-a51d-b2d6b2eb9529', 1, 'faysalzaid'),
('97f958a5-772a-4fa0-9cba-8879b7980f39', '2023-06-20', '200000.00', '353db3a7-e668-45ab-982f-9ce18fba4e4a', 1, 'faysalzaid'),
('d865a44c-db86-4279-93d0-f16462141daf', '2023-04-30', '3000000.00', '7e670299-26be-4109-98c8-0d2ec6006a92', 1, 'faysalzaid'),
('f10f17ce-f099-418c-bf24-8c0cf9e9f9bb', '2023-05-02', '1500000.00', 'd7ae9833-cc7c-4c2d-9bbb-b07a67ab6cc9', 1, 'faysalzaid'),
('ff8a73fe-aad0-479f-8f02-cadacf056837', '2023-05-02', '59400000.00', '8c95bb57-c5fa-4178-9c34-5f62cce54c91', 1, 'faysalzaid');

-- --------------------------------------------------------

--
-- Table structure for table `Payrols`
--

CREATE TABLE `Payrols` (
  `id` char(36) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NOT NULL,
  `position` varchar(255) NOT NULL,
  `basicSalary` decimal(12,2) NOT NULL,
  `medicalAllowance` decimal(12,2) NOT NULL,
  `taxableAmount` decimal(12,2) NOT NULL,
  `hardshipAllowance` decimal(12,2) NOT NULL,
  `totalEarnings` decimal(12,2) NOT NULL,
  `incomeTax` decimal(12,2) NOT NULL,
  `staffAdvance` decimal(12,2) NOT NULL,
  `pfPension57` decimal(12,2) NOT NULL,
  `totalDeduction` decimal(12,2) NOT NULL,
  `pfPension1011` decimal(12,2) NOT NULL,
  `netPay` decimal(12,2) NOT NULL,
  `DepartmentId` char(36) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin DEFAULT NULL,
  `EmployeeId` char(36) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin DEFAULT NULL,
  `date` date NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `Payrols`
--

INSERT INTO `Payrols` (`id`, `position`, `basicSalary`, `medicalAllowance`, `taxableAmount`, `hardshipAllowance`, `totalEarnings`, `incomeTax`, `staffAdvance`, `pfPension57`, `totalDeduction`, `pfPension1011`, `netPay`, `DepartmentId`, `EmployeeId`, `date`) VALUES
('1efc78a7-09da-4973-929f-2bd0bde7977c', 'Employee', '12000.00', '416.67', '12416.70', '4800.00', '17216.70', '2845.83', '0.00', '840.00', '3685.83', '1320.00', '13530.80', '6571d264-1dea-480a-a04b-f73c848b5c51', NULL, '2023-04-01'),
('493f3db6-caf3-464d-a75b-53d239833c36', 'Employee', '12000.00', '416.67', '12416.70', '4800.00', '17216.70', '2845.83', '0.00', '840.00', '3685.83', '1320.00', '13530.80', '110a0fdf-f6b3-47cc-a9c6-62b7233bef79', NULL, '2023-03-23');

-- --------------------------------------------------------

--
-- Table structure for table `Pcomments`
--

CREATE TABLE `Pcomments` (
  `id` int(11) NOT NULL,
  `comment` varchar(255) NOT NULL,
  `user` varchar(255) NOT NULL,
  `image` varchar(255) NOT NULL,
  `date` date NOT NULL,
  `approved` int(11) NOT NULL DEFAULT 0,
  `ProjectId` char(36) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `Pcomments`
--

INSERT INTO `Pcomments` (`id`, `comment`, `user`, `image`, `date`, `approved`, `ProjectId`) VALUES
(1, 'This project has to be postponed for later months\n', 'faysalzaid', 'http://localhost:4000/profiles/5092671636project.png', '2023-06-19', 1, '772052ff-e087-47b6-b347-bbbde05b49cf'),
(2, 'Reports must be submitted within these two days\n', 'faysalzaid', 'http://localhost:4000/profiles/5092671636project.png', '2023-06-19', 0, '01b9d963-508a-487e-a277-01ca41a2ac11');

-- --------------------------------------------------------

--
-- Table structure for table `Procurements`
--

CREATE TABLE `Procurements` (
  `id` int(11) NOT NULL,
  `timeToSell` date NOT NULL,
  `budgetFrom` varchar(255) NOT NULL,
  `procurementMethod` varchar(255) NOT NULL,
  `procurementType` varchar(255) DEFAULT '0',
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  `ProjectId` char(36) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin DEFAULT NULL,
  `DepartmentId` char(36) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `projectReports`
--

CREATE TABLE `projectReports` (
  `id` int(11) NOT NULL,
  `date` date NOT NULL,
  `file` varchar(255) NOT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  `ProjectId` char(36) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin DEFAULT NULL,
  `createdBy` varchar(255) NOT NULL,
  `approved` tinyint(1) NOT NULL DEFAULT 0,
  `approvedBy` varchar(255) NOT NULL DEFAULT 'None'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `projectReports`
--

INSERT INTO `projectReports` (`id`, `date`, `file`, `createdAt`, `updatedAt`, `ProjectId`, `createdBy`, `approved`, `approvedBy`) VALUES
(1, '2023-06-20', 'http://localhost:4000/docs/0eebd8text-AA3630F72E04-1.txt', '2023-06-20 06:47:13', '2023-07-06 08:10:23', '772052ff-e087-47b6-b347-bbbde05b49cf', 'faysalzaid', 1, 'Faysal Ali'),
(2, '2023-06-21', 'http://localhost:4000/docs/16cacaProject-Plan-Template-Replicon.docx', '2023-06-20 06:48:17', '2023-06-20 08:22:20', '772052ff-e087-47b6-b347-bbbde05b49cf', 'faysalzaid', 1, 'faysalzaid'),
(3, '2023-06-23', 'http://localhost:4000/docs/377c24consultancy Service.pdf', '2023-06-20 07:46:50', '2023-06-20 08:17:50', '772052ff-e087-47b6-b347-bbbde05b49cf', 'faysalzaid', 1, 'faysalzaid'),
(4, '2023-06-19', 'http://localhost:4000/docs/bb3779text-AA3630F72E04-2.txt', '2023-06-20 07:47:10', '2023-06-20 08:17:39', '772052ff-e087-47b6-b347-bbbde05b49cf', 'faysalzaid', 1, 'faysalzaid'),
(5, '2023-07-24', 'http://localhost:4000/docs/02f528INSTALLATION SYSTEM (1).txt', '2023-07-24 11:41:21', '2023-08-07 08:40:47', '772052ff-e087-47b6-b347-bbbde05b49cf', 'Coolers', 0, 'Faysal Ali Hussein'),
(6, '2023-07-24', 'http://localhost:4000/docs/927a73INSTALLATION SYSTEM (1).txt', '2023-07-24 13:31:23', '2023-07-24 13:31:23', '772052ff-e087-47b6-b347-bbbde05b49cf', 'Faysal Ali Hussein', 0, 'None'),
(7, '2023-07-24', 'http://localhost:4000/docs/afec392881f8573d544753report(2).docx', '2023-07-24 13:31:29', '2023-07-24 13:31:29', '772052ff-e087-47b6-b347-bbbde05b49cf', 'Faysal Ali Hussein', 0, 'None'),
(8, '2023-07-24', 'http://localhost:4000/docs/bf63deINSTALLATION SYSTEM (1).txt', '2023-07-24 13:31:51', '2023-07-24 13:32:07', '772052ff-e087-47b6-b347-bbbde05b49cf', 'Faysal Ali Hussein', 1, 'Faysal Ali Hussein'),
(9, '2023-08-07', 'http://localhost:4000/docs/cfc325INSTALLATION SYSTEM (1).txt', '2023-08-07 08:31:55', '2023-08-07 08:31:55', '03e5494a-4e38-47c2-a22c-0a27c708094d', 'Faysal Ali Hussein', 0, 'None');

-- --------------------------------------------------------

--
-- Table structure for table `Projects`
--

CREATE TABLE `Projects` (
  `id` char(36) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NOT NULL,
  `name` varchar(255) NOT NULL,
  `status` enum('open','pending','active','completed') NOT NULL DEFAULT 'open',
  `place` varchar(255) DEFAULT NULL,
  `description` text DEFAULT NULL,
  `starttime` date NOT NULL,
  `endtime` date NOT NULL,
  `percentage` varchar(255) NOT NULL,
  `year` date NOT NULL,
  `consultant` varchar(255) DEFAULT NULL,
  `totalCost` decimal(15,2) NOT NULL,
  `utilizedCost` decimal(15,2) DEFAULT NULL,
  `remainingCost` decimal(15,2) DEFAULT 0.00,
  `physicalPerformance` decimal(15,2) DEFAULT 0.00,
  `financialPerformance` decimal(15,2) DEFAULT NULL,
  `color` varchar(255) DEFAULT NULL,
  `engineer` char(36) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin DEFAULT NULL,
  `BidId` char(36) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin DEFAULT NULL,
  `CompanyId` char(36) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin DEFAULT NULL,
  `distance` decimal(15,2) DEFAULT 0.00,
  `approved` tinyint(1) DEFAULT 0
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `Projects`
--

INSERT INTO `Projects` (`id`, `name`, `status`, `place`, `description`, `starttime`, `endtime`, `percentage`, `year`, `consultant`, `totalCost`, `utilizedCost`, `remainingCost`, `physicalPerformance`, `financialPerformance`, `color`, `engineer`, `BidId`, `CompanyId`, `distance`, `approved`) VALUES
('01b9d963-508a-487e-a277-01ca41a2ac11', 'Dhismaha jidka Qabribayax Hartisheekh', 'pending', 'jigjiga', 'None', '2023-05-01', '2023-05-02', '0', '2023-05-02', 'None', '249001500.00', '20000000.00', '229001500.00', '10.00', '8.03', '#f88ab1', NULL, '686fb75c-b9de-4a9d-ac80-a37acc1d01fa', '2090fcb6-a39d-46f2-a4d1-7b96eb4e4084', '23.00', 0),
('03e5494a-4e38-47c2-a22c-0a27c708094d', 'Dhismaha jidka Asphalt Gode', 'active', 'jigjiga', 'None', '2023-04-30', '2023-05-01', '0', '2022-04-30', 'Malaha', '10000000.00', '1500000.00', '8500000.00', '10.00', '15.00', '#c8367e', NULL, NULL, '2090fcb6-a39d-46f2-a4d1-7b96eb4e4084', '10.00', 1),
('35342def-199f-4319-8079-f4cfacc6ba69', 'Dhismaha jidka dhagaxbuur', 'active', 'jigjiga', 'None', '2023-05-02', '2023-05-01', '0', '2023-05-02', 'Malaha', '185358151.96', '20383559.05', '164974592.91', '10.00', '11.00', '#d0b048', NULL, NULL, '9de96257-6e94-40c5-b90b-6bdb262dd6c8', '94.00', 1),
('48312386-3aca-4109-ac6e-e5b96ca89e31', 'New ', 'pending', 'jijga', 'non', '2023-07-26', '2023-07-26', '0', '2023-07-26', 'non', '1200.00', '200.00', '1000.00', '10.00', '16.67', '#c0d593', NULL, NULL, 'bdeba5a8-fc96-4de9-93fc-fa6dd341d87b', '12.00', 0),
('6a6a37f2-0eeb-4fb6-a53c-34127e8692d0', 'Dhismaha jidka xoora-xaariss', 'active', 'jigjiga', 'None', '2023-05-05', '2023-07-12', '0', '2023-05-02', 'SRS_RB', '219902837.07', '0.00', '219902837.07', '10.00', '0.00', '#720931', NULL, NULL, 'ffd8bc92-8192-43ae-a391-a544102b1e17', '70.00', 1),
('772052ff-e087-47b6-b347-bbbde05b49cf', 'Dhismaha jidka Danaan-ceelwayne', 'pending', 'jigjiga', 'None', '2023-05-03', '2023-06-18', '0', '2023-05-02', 'SRS_TB', '94278016.31', '20700000.00', '73578016.31', '15.00', '21.96', '#2e9c0c', NULL, '419d82ac-ee6c-4e0c-b190-06c112ec124c', '4799385e-b777-4215-85ec-13ae26155da5', '55.00', 1),
('93f46bc5-df26-4dbe-bc85-9f5f27e797fe', 'Dhismaha Jidka Cadaadle Ceelbarde', 'open', 'jigjiga', 'None', '2023-04-27', '2023-06-24', '0', '2022-04-27', 'Malaha', '10000000.21', '3000000.00', '7000000.21', '10.00', '30.00', '#aa652a', NULL, NULL, '16c8bf3f-530a-4b39-baf8-f6fcc2eb7cc6', '10.00', 0),
('af00fdaf-32d2-4448-a0eb-d311a010af23', 'Dhismaha jidka Salax-Afcase-Qaraf', 'open', 'jigjiga', 'None', '2023-05-04', '2023-05-19', '0', '2023-05-02', 'Malaha', '310169708.50', '59400000.00', '250769708.50', '10.00', '19.15', '#8434bc', NULL, NULL, 'dd7d3b34-f5eb-49e2-9e94-d8622f537347', '120.00', 1);

-- --------------------------------------------------------

--
-- Table structure for table `Settings`
--

CREATE TABLE `Settings` (
  `id` int(11) NOT NULL,
  `logo` varchar(255) NOT NULL,
  `name` varchar(255) NOT NULL,
  `address1` text NOT NULL,
  `address2` text NOT NULL,
  `loginlogo` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `Settings`
--

INSERT INTO `Settings` (`id`, `logo`, `name`, `address1`, `address2`, `loginlogo`) VALUES
(1, 'http://localhost:4000/a0ddeasrsrb.jpg', 'SRS-RB', 'jigjiga,Ethiopia', 'Gibriga,fafan', 'http://localhost:4000/08c5adsrsrb.jpg');

-- --------------------------------------------------------

--
-- Table structure for table `SlipPapers`
--

CREATE TABLE `SlipPapers` (
  `id` char(36) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NOT NULL,
  `to` varchar(255) NOT NULL,
  `subject` varchar(255) NOT NULL,
  `message` text NOT NULL,
  `ProjectId` char(36) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin DEFAULT NULL,
  `UserId` char(36) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin DEFAULT NULL,
  `date` date NOT NULL,
  `status` varchar(255) NOT NULL DEFAULT 'pending',
  `createdBy` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `SlipPapers`
--

INSERT INTO `SlipPapers` (`id`, `to`, `subject`, `message`, `ProjectId`, `UserId`, `date`, `status`, `createdBy`) VALUES
('5d267f6b-3d1b-4480-9515-9104abe91397', 'Mahamed Ali', 'Payment on Hr system', '<p>This is to provide info about the payment</p><p>&nbsp;</p>', NULL, NULL, '0000-00-00', 'pending', 'coolers'),
('d992be62-bd8f-4fa6-a46e-03eba1e0e46d', 'Faysal ali ', 'Payment request', '<p>This is to faysal ali and this is to inform that we have payment request</p>', NULL, NULL, '0000-00-00', 'pending', 'coolers'),
('f5160666-3d62-41c1-98d1-e7b60a0c0252', 'Farah', 'Payment request', '<p>This is here for request</p>', NULL, NULL, '0000-00-00', 'pending', 'coolers');

-- --------------------------------------------------------

--
-- Table structure for table `Tasks`
--

CREATE TABLE `Tasks` (
  `id` char(36) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NOT NULL,
  `name` varchar(255) NOT NULL,
  `status` enum('pending','active','finished') DEFAULT 'pending',
  `priority` enum('high','low','moderate') DEFAULT 'low',
  `description` text DEFAULT NULL,
  `starttime` date DEFAULT NULL,
  `endtime` date DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  `estimatedHour` int(11) DEFAULT NULL,
  `pid` char(36) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `Tasks`
--

INSERT INTO `Tasks` (`id`, `name`, `status`, `priority`, `description`, `starttime`, `endtime`, `createdAt`, `updatedAt`, `estimatedHour`, `pid`) VALUES
('019b7ed0-e538-49b0-bd46-a8261d39ab42', 'faysal\'s', 'pending', 'low', NULL, NULL, NULL, '2023-01-24 07:47:24', '2023-01-24 11:41:51', NULL, NULL),
('064b8e4c-f192-4aae-9edd-8837362c7de2', 'road documentation', 'pending', 'low', NULL, NULL, NULL, '2023-01-24 07:47:58', '2023-01-24 07:47:58', NULL, NULL),
('078312e7-d507-4493-9b99-f6214c9786e4', 'phase 2', 'pending', 'low', NULL, NULL, NULL, '2023-01-24 08:35:13', '2023-01-24 08:35:13', NULL, NULL),
('0c12f4cd-1616-445e-a447-0504f1a69fc0', 'new Process', 'pending', 'low', NULL, NULL, NULL, '2023-01-24 07:47:30', '2023-01-24 07:47:30', NULL, NULL),
('0f7a566b-3293-4f36-9da4-a9e47d3d3339', 'implementation', 'pending', 'low', NULL, NULL, NULL, '2023-01-24 07:53:19', '2023-01-24 08:34:05', NULL, NULL),
('10454281-f9d9-4358-b7e8-5646dbfcad36', 'requirement gathering', 'pending', 'low', NULL, NULL, NULL, '2023-01-24 07:26:30', '2023-01-24 07:26:30', NULL, NULL),
('3148e67d-45c3-4927-a062-3ab4c6fc2423', 'new phase 11', 'pending', 'low', NULL, NULL, NULL, '2023-01-26 06:07:31', '2023-01-26 06:08:18', NULL, NULL),
('46428b5c-2f7f-4e26-9ece-6ebbb6bd4f4c', 'creating new task here', 'pending', 'low', NULL, NULL, NULL, '2023-02-16 14:44:31', '2023-02-16 14:44:31', NULL, NULL),
('4a668243-ae02-4b88-b706-b3a2a9cd69bf', 'design2', 'pending', 'low', NULL, NULL, NULL, '2023-01-24 07:36:30', '2023-01-24 07:36:30', NULL, NULL),
('4f8b3757-832d-4135-9b6c-07d887d49332', 'Analysis phase', 'pending', 'low', NULL, NULL, NULL, '2023-01-27 06:31:56', '2023-01-27 06:31:56', NULL, NULL),
('5e7e6b5e-c5ac-48ae-9ee6-d3ac34b2224a', 'design2', 'pending', 'low', NULL, NULL, NULL, '2023-01-24 07:36:41', '2023-01-24 07:36:41', NULL, NULL),
('734f5fa8-aa29-4e1b-a12b-0761683cb3cf', 'analysis phase', 'pending', 'low', NULL, NULL, NULL, '2023-01-24 07:24:05', '2023-01-24 07:24:05', NULL, NULL),
('73c2e41a-4418-4060-88c8-75e1b2bcade9', 'requirement gathering', 'pending', 'low', NULL, NULL, NULL, '2023-01-24 07:25:55', '2023-01-24 07:25:55', NULL, NULL),
('74ad8934-eacb-4cdd-a7f7-572d3e124131', 'analysis', 'pending', 'low', NULL, NULL, NULL, '2023-01-24 07:38:38', '2023-01-24 08:33:57', NULL, NULL),
('77cacab1-ee82-40f2-a5c3-ddedd62a1c61', 'new phase 1', 'pending', 'low', NULL, NULL, NULL, '2023-01-24 08:35:02', '2023-01-24 08:35:02', NULL, NULL),
('7bbf6edb-bba4-40ac-a4b1-afb7a7b05da1', 'new ones', 'pending', 'low', NULL, NULL, NULL, '2023-01-24 07:48:37', '2023-01-24 07:48:37', NULL, NULL),
('882bb908-9927-4aff-8627-67b92618ca42', 'design2', 'pending', 'low', NULL, NULL, NULL, '2023-01-24 07:37:10', '2023-01-24 07:37:10', NULL, NULL),
('9242ed02-fd86-4e06-b58e-5eb28e456d5d', 'implementation', 'pending', 'low', NULL, NULL, NULL, '2023-01-24 07:27:21', '2023-01-24 07:27:21', NULL, NULL),
('92f2d7f3-ca7a-4ab2-b870-956105fa7916', 'implementation 1', 'pending', 'low', NULL, NULL, NULL, '2023-01-24 07:56:58', '2023-01-24 07:56:58', NULL, NULL),
('9634a39b-ff33-4704-af76-8d24f0503cb4', 'design1', 'pending', 'low', NULL, NULL, NULL, '2023-01-24 07:27:54', '2023-01-24 07:27:54', NULL, NULL),
('a903f86f-1032-4d0b-8b8c-d79999aee37c', 'design', 'pending', 'low', NULL, NULL, NULL, '2023-01-24 08:35:27', '2023-01-24 08:35:41', NULL, NULL);

-- --------------------------------------------------------

--
-- Table structure for table `Users`
--

CREATE TABLE `Users` (
  `id` char(36) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NOT NULL,
  `name` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL,
  `password` varchar(255) DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  `role` enum('admin','manager','finance','design','client','roadquality','engineer','contractadmin','hr','planning','pRelation') DEFAULT 'client',
  `image` varchar(255) DEFAULT 'http://localhost:4000/profiles/default.png',
  `refreshToken` text DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `Users`
--

INSERT INTO `Users` (`id`, `name`, `email`, `password`, `createdAt`, `updatedAt`, `role`, `image`, `refreshToken`) VALUES
('179a941a-c741-4cc9-9bf4-3caff4d222a8', 'Faysal Ali Huss', 'faysal0503070@gmail.com', '$2b$10$1RiMTQChU4z4cFpdGNQxYeHlk.JAtTydcsRr51cjiRwAIb4VMdIxa', '2022-11-12 06:20:46', '2023-04-29 05:49:48', 'client', 'http://localhost:4000/profiles/93a66dc82fSomali_Region_emblem.png', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjE3OWE5NDFhLWM3NDEtNGNjOS05YmY0LTNjYWZmNGQyMjJhOCIsInVzZXJuYW1lIjoiRmF5c2FsIEFsaSIsImVtYWlsIjoiZmF5c2FsMDUwMzA3MEBnbWFpbC5jb20iLCJyb2xlIjoiZmluYW5jZSIsImltYWdlIjoiaHR0cDovL2xvY2FsaG9zdDo0MDAwL3Byb2ZpbGVzL2I1YjZjZWVlMjJkZWxsLnBuZyIsImlhdCI6MTY3ODUxODQzMn0.u0OoRcB6_N_sDFk2F4a1rYhmI4nNkGyNuqE4TVym6WY'),
('26585a09-f655-429c-8b33-dbcd2b4e0db4', 'publicRelationAccount', 'public@gmail.com', '$2b$10$0GRpxaas77gd/gKOpYjT3eIjXsZlYYK8zj1vxngNRXvNx8CPoRzTW', '2023-07-06 06:30:46', '2023-07-06 07:58:53', 'pRelation', 'http://localhost:4000/profiles/292197ee86pet-shop-logo-1(1).png', NULL),
('6d07c6ca-9a91-4a80-958a-9134ba21d988', 'finance', 'finance@gmail.com', '$2b$10$RV.ssRVnC1/UJhIpAd/TcuIRuoOu1VRrmPKpjDP.euy9gbZaN4Oc.', '2023-07-24 17:15:42', '2023-07-25 07:13:41', 'finance', 'http://localhost:4000/profiles/ab3a4597fasrsrb.jpg', NULL),
('90761bc2-660d-40f1-abc5-26ccc393975a', 'bashir Ali', 'takursiin253@gmail.com', '$2b$10$algIxe6h4u4bo.EXXfcf4O8T.XSCleBxRMQi1RSwUu4uG3UjJXiRa', '2022-12-05 08:32:11', '2023-03-16 08:14:52', 'client', 'http://localhost:4000/profiles/cdb4d7ded8cellu.png', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjkwNzYxYmMyLTY2MGQtNDBmMS1hYmM1LTI2Y2NjMzkzOTc1YSIsInVzZXJuYW1lIjoiYmFzaGlyIEFsaSIsImVtYWlsIjoidGFrdXJzaWluMjUzQGdtYWlsLmNvbSIsInJvbGUiOiJmaW5hbmNlIiwiaW1hZ2UiOiJodHRwOi8vbG9jYWxob3N0OjQwMDAvcHJvZmlsZXMvY2RiNGQ3ZGVkOGNlbGx1LnBuZyIsImlhdCI6MTY3ODkxMzA3NH0.bi1ri5fc3g0dAWHwPVIBqgGmfQ_HhG6GCe3BHNgruhc'),
('99a09bd9-b9a1-4f08-a10c-dda8ebb2e4c4', 'Faysal Ali Hussein', 'faysalzaid@gmail.com', '$2b$10$hdwtihVc9acDi15bADfLGu1wZdmsk61l75yvoFNbGNOmAECby6ZpO', '2022-11-26 08:14:51', '2023-08-22 07:47:15', 'admin', 'http://localhost:4000/profiles/feee520279srsrb.jpg', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6Ijk5YTA5YmQ5LWI5YTEtNGYwOC1hMTBjLWRkYThlYmIyZTRjNCIsInVzZXJuYW1lIjoiRmF5c2FsIEFsaSBIdXNzZWluIiwiZW1haWwiOiJmYXlzYWx6YWlkQGdtYWlsLmNvbSIsInJvbGUiOiJhZG1pbiIsImltYWdlIjoiaHR0cDovL2xvY2FsaG9zdDo0MDAwL3Byb2ZpbGVzL2ZlZWU1MjAyNzlzcnNyYi5qcGciLCJpYXQiOjE2OTI2OTA0MzV9.gBBRmaQ1CsKHrI8QmbW0guAf9qtF4wHI6Agc8VKiWCs'),
('a65aff0c-e0a7-400b-9e58-1988405795c3', 'engineer', 'engineer@gmail.com', '$2b$10$FzxCphL4g04STDZnJfEGGuIjex60bzkMUkLDE81LvbxLRGWZD6wpq', '2023-04-16 10:18:47', '2023-04-17 12:08:09', 'engineer', 'http://localhost:4000/profiles/4075834521coffee.webp', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6ImE2NWFmZjBjLWUwYTctNDAwYi05ZTU4LTE5ODg0MDU3OTVjMyIsInVzZXJuYW1lIjoiZW5naW5lZXIiLCJlbWFpbCI6ImVuZ2luZWVyQGdtYWlsLmNvbSIsInJvbGUiOiJlbmdpbmVlciIsImltYWdlIjoiaHR0cDovL2xvY2FsaG9zdDo0MDAwL3Byb2ZpbGVzLzQwNzU4MzQ1MjFjb2ZmZWUud2VicCIsImlhdCI6MTY4MTczMzI4OX0.dGq1M1L1fLwWvlFRvZ0vVMsJVAnEtVGqAc3M0gh94ac'),
('d9790384-96a7-49fc-a489-d16599d65053', 'planning', 'planning@gmail.com', '$2b$10$8mE8nKWqrr/9gHt0GHOrTeTCWUE2MnjPVVkc6tTFvCiCZCOODcJNC', '2023-04-29 13:01:39', '2023-06-24 07:20:21', 'planning', 'http://localhost:4000/profiles/7c89c6567fphoto_2022-11-07 09.14.21.jpeg', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6ImQ5NzkwMzg0LTk2YTctNDlmYy1hNDg5LWQxNjU5OWQ2NTA1MyIsInVzZXJuYW1lIjoicGxhbm5pbmciLCJlbWFpbCI6InBsYW5uaW5nQGdtYWlsLmNvbSIsInJvbGUiOiJwbGFubmluZyIsImltYWdlIjoiaHR0cDovL2xvY2FsaG9zdDo0MDAwL3Byb2ZpbGVzLzdjODljNjU2N2ZwaG90b18yMDIyLTExLTA3IDA5LjE0LjIxLmpwZWciLCJpYXQiOjE2ODc1OTEyMjF9.9KWaU882ZtTpP9udlr_mfYQfdd9rJlr6We_mb1iZkcw');

-- --------------------------------------------------------

--
-- Table structure for table `yearlyBudgets`
--

CREATE TABLE `yearlyBudgets` (
  `id` char(36) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NOT NULL,
  `year` date NOT NULL,
  `allocatedBudget` decimal(12,2) DEFAULT NULL,
  `utilizedBudget` decimal(12,2) DEFAULT NULL,
  `remainingBudget` decimal(12,2) DEFAULT NULL,
  `ProjectId` char(36) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin DEFAULT NULL,
  `financialPerformance` decimal(12,2) DEFAULT NULL,
  `invoiced` int(11) DEFAULT 0,
  `approved` tinyint(1) DEFAULT 0,
  `color` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `yearlyBudgets`
--

INSERT INTO `yearlyBudgets` (`id`, `year`, `allocatedBudget`, `utilizedBudget`, `remainingBudget`, `ProjectId`, `financialPerformance`, `invoiced`, `approved`, `color`) VALUES
('010d5db5-88dd-49f6-b61a-7af1f4ca8530', '2024-06-20', '500000.00', '0.00', '500000.00', '772052ff-e087-47b6-b347-bbbde05b49cf', '0.00', 0, 1, '#941127'),
('043f8af9-4579-462a-a0c5-47033e84b000', '2023-05-02', '25315433.00', '20200000.00', '5115433.00', '772052ff-e087-47b6-b347-bbbde05b49cf', '79.79', 0, 1, '#33f3ff'),
('45916dbc-c776-4a1a-bd2d-86f7501f7805', '2023-05-02', '36801279.00', '20000000.00', '16801279.00', '01b9d963-508a-487e-a277-01ca41a2ac11', '54.35', 0, 1, '#1c4465'),
('7321d027-4109-475b-b1fa-f2d3485e4f45', '2023-05-02', '290244747.00', '59400000.00', '230844747.00', 'af00fdaf-32d2-4448-a0eb-d311a010af23', '20.47', 0, 1, '#1427e4'),
('96f1b667-968a-4ca9-a5eb-6fe7d6b495d2', '2023-05-02', '50254781.00', '20383559.05', '29871221.95', '35342def-199f-4319-8079-f4cfacc6ba69', '40.56', 0, 1, '#940cf3'),
('b4f304e0-dfbb-434a-8f08-7f7c042b7d04', '2025-06-20', '74078016.31', '500000.00', '73578016.31', '772052ff-e087-47b6-b347-bbbde05b49cf', '0.67', 0, 1, '#d21c14'),
('b5565caf-f1ef-451f-a8a4-f435f82e7e9e', '2023-04-27', '5000000.00', '3000000.00', '2000000.00', '93f46bc5-df26-4dbe-bc85-9f5f27e797fe', '100.00', 0, 1, '#bbf30c'),
('fb1c9a60-21f1-4d76-a348-2692ca8c79ce', '2023-05-02', '5000000.00', '1500000.00', '3500000.00', '03e5494a-4e38-47c2-a22c-0a27c708094d', '30.00', 0, 1, '#ee104c');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `agreements`
--
ALTER TABLE `agreements`
  ADD PRIMARY KEY (`id`),
  ADD KEY `EmployeeId` (`EmployeeId`);

--
-- Indexes for table `appraisals`
--
ALTER TABLE `appraisals`
  ADD PRIMARY KEY (`id`),
  ADD KEY `EmployeeId` (`EmployeeId`);

--
-- Indexes for table `Archives`
--
ALTER TABLE `Archives`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `filename` (`filename`),
  ADD UNIQUE KEY `filename_2` (`filename`),
  ADD UNIQUE KEY `filename_3` (`filename`),
  ADD UNIQUE KEY `filename_4` (`filename`),
  ADD KEY `DepartmentId` (`DepartmentId`);

--
-- Indexes for table `Areas`
--
ALTER TABLE `Areas`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `name` (`name`),
  ADD UNIQUE KEY `name_2` (`name`);

--
-- Indexes for table `Attachments`
--
ALTER TABLE `Attachments`
  ADD PRIMARY KEY (`id`),
  ADD KEY `ContractId` (`ContractId`);

--
-- Indexes for table `Awards`
--
ALTER TABLE `Awards`
  ADD PRIMARY KEY (`id`),
  ADD KEY `BidId` (`BidId`);

--
-- Indexes for table `Bids`
--
ALTER TABLE `Bids`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `fullname` (`fullname`),
  ADD UNIQUE KEY `fullname_2` (`fullname`),
  ADD UNIQUE KEY `fullname_3` (`fullname`),
  ADD UNIQUE KEY `fullname_4` (`fullname`),
  ADD KEY `UserId` (`UserId`),
  ADD KEY `ProjectId` (`ProjectId`);

--
-- Indexes for table `BlogCategories`
--
ALTER TABLE `BlogCategories`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `Blogs`
--
ALTER TABLE `Blogs`
  ADD PRIMARY KEY (`id`),
  ADD KEY `BlogCategoryId` (`BlogCategoryId`);

--
-- Indexes for table `bugetTracks`
--
ALTER TABLE `bugetTracks`
  ADD PRIMARY KEY (`id`),
  ADD KEY `yearlyBudgetId` (`yearlyBudgetId`);

--
-- Indexes for table `Candidates`
--
ALTER TABLE `Candidates`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `name` (`name`),
  ADD UNIQUE KEY `name_2` (`name`);

--
-- Indexes for table `Chats`
--
ALTER TABLE `Chats`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `Clients`
--
ALTER TABLE `Clients`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `email` (`email`),
  ADD UNIQUE KEY `email_2` (`email`),
  ADD UNIQUE KEY `email_3` (`email`),
  ADD UNIQUE KEY `email_4` (`email`),
  ADD UNIQUE KEY `email_5` (`email`),
  ADD UNIQUE KEY `email_6` (`email`),
  ADD UNIQUE KEY `email_7` (`email`),
  ADD UNIQUE KEY `email_8` (`email`),
  ADD UNIQUE KEY `email_9` (`email`),
  ADD UNIQUE KEY `email_10` (`email`),
  ADD UNIQUE KEY `email_11` (`email`),
  ADD UNIQUE KEY `email_12` (`email`),
  ADD UNIQUE KEY `email_13` (`email`),
  ADD UNIQUE KEY `email_14` (`email`),
  ADD UNIQUE KEY `email_15` (`email`),
  ADD UNIQUE KEY `email_16` (`email`),
  ADD UNIQUE KEY `email_17` (`email`),
  ADD UNIQUE KEY `email_18` (`email`),
  ADD UNIQUE KEY `email_19` (`email`),
  ADD UNIQUE KEY `email_20` (`email`),
  ADD UNIQUE KEY `email_21` (`email`),
  ADD UNIQUE KEY `email_22` (`email`),
  ADD UNIQUE KEY `email_23` (`email`),
  ADD UNIQUE KEY `email_24` (`email`),
  ADD UNIQUE KEY `email_25` (`email`),
  ADD UNIQUE KEY `email_26` (`email`),
  ADD UNIQUE KEY `email_27` (`email`),
  ADD UNIQUE KEY `email_28` (`email`),
  ADD UNIQUE KEY `email_29` (`email`),
  ADD UNIQUE KEY `email_30` (`email`),
  ADD UNIQUE KEY `email_31` (`email`),
  ADD UNIQUE KEY `email_32` (`email`),
  ADD UNIQUE KEY `email_33` (`email`),
  ADD UNIQUE KEY `email_34` (`email`),
  ADD UNIQUE KEY `email_35` (`email`),
  ADD UNIQUE KEY `email_36` (`email`),
  ADD UNIQUE KEY `email_37` (`email`),
  ADD UNIQUE KEY `email_38` (`email`),
  ADD UNIQUE KEY `email_39` (`email`),
  ADD UNIQUE KEY `email_40` (`email`),
  ADD UNIQUE KEY `email_41` (`email`),
  ADD UNIQUE KEY `email_42` (`email`),
  ADD UNIQUE KEY `email_43` (`email`),
  ADD UNIQUE KEY `email_44` (`email`),
  ADD UNIQUE KEY `email_45` (`email`),
  ADD UNIQUE KEY `email_46` (`email`),
  ADD UNIQUE KEY `email_47` (`email`),
  ADD UNIQUE KEY `email_48` (`email`),
  ADD KEY `CompanyId` (`CompanyId`);

--
-- Indexes for table `Companies`
--
ALTER TABLE `Companies`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `name` (`name`),
  ADD UNIQUE KEY `name_2` (`name`),
  ADD KEY `UserId` (`UserId`);

--
-- Indexes for table `Contracts`
--
ALTER TABLE `Contracts`
  ADD PRIMARY KEY (`id`),
  ADD KEY `UserId` (`UserId`),
  ADD KEY `ProjectId` (`ProjectId`),
  ADD KEY `ContractTypeId` (`ContractTypeId`);

--
-- Indexes for table `ContractTypes`
--
ALTER TABLE `ContractTypes`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `ContractTypes_type_unique` (`type`);

--
-- Indexes for table `contract_types`
--
ALTER TABLE `contract_types`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `type` (`type`),
  ADD UNIQUE KEY `type_2` (`type`),
  ADD UNIQUE KEY `type_3` (`type`),
  ADD UNIQUE KEY `type_4` (`type`),
  ADD UNIQUE KEY `type_5` (`type`),
  ADD UNIQUE KEY `type_6` (`type`),
  ADD UNIQUE KEY `type_7` (`type`),
  ADD UNIQUE KEY `type_8` (`type`),
  ADD UNIQUE KEY `type_9` (`type`);

--
-- Indexes for table `Departments`
--
ALTER TABLE `Departments`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `Designations`
--
ALTER TABLE `Designations`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `Empemplloyees`
--
ALTER TABLE `Empemplloyees`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `Empemplloyees_email_unique` (`email`);

--
-- Indexes for table `Employees`
--
ALTER TABLE `Employees`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `email` (`email`),
  ADD UNIQUE KEY `email_2` (`email`),
  ADD UNIQUE KEY `email_3` (`email`),
  ADD UNIQUE KEY `email_4` (`email`),
  ADD UNIQUE KEY `email_5` (`email`),
  ADD UNIQUE KEY `email_6` (`email`),
  ADD UNIQUE KEY `email_7` (`email`),
  ADD UNIQUE KEY `email_8` (`email`),
  ADD UNIQUE KEY `email_9` (`email`),
  ADD UNIQUE KEY `email_10` (`email`),
  ADD UNIQUE KEY `email_11` (`email`),
  ADD UNIQUE KEY `email_12` (`email`),
  ADD UNIQUE KEY `email_13` (`email`),
  ADD UNIQUE KEY `email_14` (`email`),
  ADD UNIQUE KEY `email_15` (`email`),
  ADD UNIQUE KEY `email_16` (`email`),
  ADD UNIQUE KEY `email_17` (`email`),
  ADD UNIQUE KEY `email_18` (`email`),
  ADD UNIQUE KEY `email_19` (`email`),
  ADD UNIQUE KEY `email_20` (`email`),
  ADD UNIQUE KEY `email_21` (`email`),
  ADD UNIQUE KEY `email_22` (`email`),
  ADD UNIQUE KEY `email_23` (`email`),
  ADD UNIQUE KEY `email_24` (`email`),
  ADD UNIQUE KEY `email_25` (`email`),
  ADD UNIQUE KEY `email_26` (`email`),
  ADD UNIQUE KEY `email_27` (`email`),
  ADD UNIQUE KEY `email_28` (`email`),
  ADD UNIQUE KEY `email_29` (`email`),
  ADD UNIQUE KEY `email_30` (`email`),
  ADD UNIQUE KEY `email_31` (`email`),
  ADD UNIQUE KEY `email_32` (`email`),
  ADD UNIQUE KEY `email_33` (`email`),
  ADD UNIQUE KEY `email_34` (`email`),
  ADD UNIQUE KEY `email_35` (`email`),
  ADD UNIQUE KEY `email_36` (`email`),
  ADD UNIQUE KEY `email_37` (`email`),
  ADD UNIQUE KEY `email_38` (`email`),
  ADD UNIQUE KEY `email_39` (`email`),
  ADD UNIQUE KEY `email_40` (`email`),
  ADD UNIQUE KEY `email_41` (`email`),
  ADD UNIQUE KEY `email_42` (`email`),
  ADD UNIQUE KEY `email_43` (`email`),
  ADD UNIQUE KEY `email_44` (`email`),
  ADD UNIQUE KEY `email_45` (`email`),
  ADD UNIQUE KEY `email_46` (`email`),
  ADD UNIQUE KEY `email_47` (`email`),
  ADD KEY `DepartmentId` (`DepartmentId`),
  ADD KEY `DesignationId` (`DesignationId`),
  ADD KEY `AreaId` (`AreaId`);

--
-- Indexes for table `Invoices`
--
ALTER TABLE `Invoices`
  ADD PRIMARY KEY (`id`),
  ADD KEY `ProjectId` (`ProjectId`),
  ADD KEY `UserId` (`UserId`),
  ADD KEY `PaymentModeId` (`PaymentModeId`);

--
-- Indexes for table `job_offers`
--
ALTER TABLE `job_offers`
  ADD PRIMARY KEY (`id`),
  ADD KEY `EmployeeId` (`EmployeeId`);

--
-- Indexes for table `LeaveRequests`
--
ALTER TABLE `LeaveRequests`
  ADD PRIMARY KEY (`id`),
  ADD KEY `DepartmentId` (`DepartmentId`),
  ADD KEY `checkedBy` (`checkedBy`),
  ADD KEY `approvedBy` (`approvedBy`),
  ADD KEY `LeaveTypeId` (`LeaveTypeId`),
  ADD KEY `EmployeeId` (`EmployeeId`);

--
-- Indexes for table `LeaveTypes`
--
ALTER TABLE `LeaveTypes`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `leave_requests`
--
ALTER TABLE `leave_requests`
  ADD PRIMARY KEY (`id`),
  ADD KEY `DepartmentId` (`DepartmentId`),
  ADD KEY `EmployeeId` (`EmployeeId`),
  ADD KEY `checkedBy` (`checkedBy`),
  ADD KEY `approvedBy` (`approvedBy`),
  ADD KEY `leaveTypeId` (`leaveTypeId`);

--
-- Indexes for table `leave_types`
--
ALTER TABLE `leave_types`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `letterRequests`
--
ALTER TABLE `letterRequests`
  ADD PRIMARY KEY (`id`),
  ADD KEY `UserId` (`UserId`);

--
-- Indexes for table `medical_allowances`
--
ALTER TABLE `medical_allowances`
  ADD PRIMARY KEY (`id`),
  ADD KEY `EmployeeId` (`EmployeeId`);

--
-- Indexes for table `Monthlytimesheets`
--
ALTER TABLE `Monthlytimesheets`
  ADD PRIMARY KEY (`id`),
  ADD KEY `EmployeeId` (`EmployeeId`);

--
-- Indexes for table `monthly_timesheets`
--
ALTER TABLE `monthly_timesheets`
  ADD PRIMARY KEY (`id`),
  ADD KEY `EmployeeId` (`EmployeeId`);

--
-- Indexes for table `PaymentModes`
--
ALTER TABLE `PaymentModes`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `payments`
--
ALTER TABLE `payments`
  ADD PRIMARY KEY (`id`),
  ADD KEY `InvoiceId` (`InvoiceId`);

--
-- Indexes for table `Payrols`
--
ALTER TABLE `Payrols`
  ADD PRIMARY KEY (`id`),
  ADD KEY `DepartmentId` (`DepartmentId`),
  ADD KEY `EmployeeId` (`EmployeeId`);

--
-- Indexes for table `Pcomments`
--
ALTER TABLE `Pcomments`
  ADD PRIMARY KEY (`id`),
  ADD KEY `ProjectId` (`ProjectId`);

--
-- Indexes for table `Procurements`
--
ALTER TABLE `Procurements`
  ADD PRIMARY KEY (`id`),
  ADD KEY `ProjectId` (`ProjectId`),
  ADD KEY `DepartmentId` (`DepartmentId`);

--
-- Indexes for table `projectReports`
--
ALTER TABLE `projectReports`
  ADD PRIMARY KEY (`id`),
  ADD KEY `ProjectId` (`ProjectId`);

--
-- Indexes for table `Projects`
--
ALTER TABLE `Projects`
  ADD PRIMARY KEY (`id`),
  ADD KEY `engineer` (`engineer`),
  ADD KEY `BidId` (`BidId`),
  ADD KEY `CompanyId` (`CompanyId`);

--
-- Indexes for table `Settings`
--
ALTER TABLE `Settings`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `SlipPapers`
--
ALTER TABLE `SlipPapers`
  ADD PRIMARY KEY (`id`),
  ADD KEY `ProjectId` (`ProjectId`),
  ADD KEY `UserId` (`UserId`);

--
-- Indexes for table `Tasks`
--
ALTER TABLE `Tasks`
  ADD PRIMARY KEY (`id`),
  ADD KEY `pid` (`pid`);

--
-- Indexes for table `Users`
--
ALTER TABLE `Users`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `email` (`email`),
  ADD UNIQUE KEY `email_2` (`email`),
  ADD UNIQUE KEY `email_3` (`email`),
  ADD UNIQUE KEY `email_4` (`email`),
  ADD UNIQUE KEY `email_5` (`email`),
  ADD UNIQUE KEY `email_6` (`email`),
  ADD UNIQUE KEY `email_7` (`email`),
  ADD UNIQUE KEY `email_8` (`email`),
  ADD UNIQUE KEY `email_9` (`email`),
  ADD UNIQUE KEY `email_10` (`email`),
  ADD UNIQUE KEY `email_11` (`email`),
  ADD UNIQUE KEY `email_12` (`email`),
  ADD UNIQUE KEY `email_13` (`email`),
  ADD UNIQUE KEY `email_14` (`email`),
  ADD UNIQUE KEY `email_15` (`email`),
  ADD UNIQUE KEY `email_16` (`email`),
  ADD UNIQUE KEY `email_17` (`email`),
  ADD UNIQUE KEY `email_18` (`email`),
  ADD UNIQUE KEY `email_19` (`email`),
  ADD UNIQUE KEY `email_20` (`email`),
  ADD UNIQUE KEY `email_21` (`email`),
  ADD UNIQUE KEY `email_22` (`email`),
  ADD UNIQUE KEY `email_23` (`email`),
  ADD UNIQUE KEY `email_24` (`email`),
  ADD UNIQUE KEY `email_25` (`email`),
  ADD UNIQUE KEY `email_26` (`email`),
  ADD UNIQUE KEY `email_27` (`email`),
  ADD UNIQUE KEY `email_28` (`email`),
  ADD UNIQUE KEY `email_29` (`email`),
  ADD UNIQUE KEY `email_30` (`email`),
  ADD UNIQUE KEY `email_31` (`email`),
  ADD UNIQUE KEY `email_32` (`email`),
  ADD UNIQUE KEY `email_33` (`email`),
  ADD UNIQUE KEY `email_34` (`email`),
  ADD UNIQUE KEY `email_35` (`email`),
  ADD UNIQUE KEY `email_36` (`email`),
  ADD UNIQUE KEY `email_37` (`email`),
  ADD UNIQUE KEY `email_38` (`email`),
  ADD UNIQUE KEY `email_39` (`email`),
  ADD UNIQUE KEY `email_40` (`email`),
  ADD UNIQUE KEY `email_41` (`email`),
  ADD UNIQUE KEY `email_42` (`email`),
  ADD UNIQUE KEY `email_43` (`email`),
  ADD UNIQUE KEY `email_44` (`email`),
  ADD UNIQUE KEY `email_45` (`email`),
  ADD UNIQUE KEY `email_46` (`email`),
  ADD UNIQUE KEY `email_47` (`email`),
  ADD UNIQUE KEY `email_48` (`email`),
  ADD UNIQUE KEY `email_49` (`email`),
  ADD UNIQUE KEY `email_50` (`email`),
  ADD UNIQUE KEY `email_51` (`email`),
  ADD UNIQUE KEY `email_52` (`email`);

--
-- Indexes for table `yearlyBudgets`
--
ALTER TABLE `yearlyBudgets`
  ADD PRIMARY KEY (`id`),
  ADD KEY `ProjectId` (`ProjectId`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `Archives`
--
ALTER TABLE `Archives`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=18;

--
-- AUTO_INCREMENT for table `BlogCategories`
--
ALTER TABLE `BlogCategories`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT for table `Blogs`
--
ALTER TABLE `Blogs`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=12;

--
-- AUTO_INCREMENT for table `Chats`
--
ALTER TABLE `Chats`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=24;

--
-- AUTO_INCREMENT for table `letterRequests`
--
ALTER TABLE `letterRequests`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=13;

--
-- AUTO_INCREMENT for table `Pcomments`
--
ALTER TABLE `Pcomments`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT for table `Procurements`
--
ALTER TABLE `Procurements`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT for table `projectReports`
--
ALTER TABLE `projectReports`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=10;

--
-- AUTO_INCREMENT for table `Settings`
--
ALTER TABLE `Settings`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `agreements`
--
ALTER TABLE `agreements`
  ADD CONSTRAINT `agreements_ibfk_1` FOREIGN KEY (`EmployeeId`) REFERENCES `Employees` (`id`) ON DELETE SET NULL ON UPDATE CASCADE;

--
-- Constraints for table `appraisals`
--
ALTER TABLE `appraisals`
  ADD CONSTRAINT `appraisals_ibfk_1` FOREIGN KEY (`EmployeeId`) REFERENCES `Employees` (`id`) ON DELETE SET NULL ON UPDATE CASCADE;

--
-- Constraints for table `Archives`
--
ALTER TABLE `Archives`
  ADD CONSTRAINT `archives_ibfk_1` FOREIGN KEY (`DepartmentId`) REFERENCES `Departments` (`id`) ON DELETE SET NULL ON UPDATE CASCADE;

--
-- Constraints for table `Attachments`
--
ALTER TABLE `Attachments`
  ADD CONSTRAINT `attachments_ibfk_1` FOREIGN KEY (`ContractId`) REFERENCES `Contracts` (`id`) ON DELETE SET NULL ON UPDATE CASCADE;

--
-- Constraints for table `Awards`
--
ALTER TABLE `Awards`
  ADD CONSTRAINT `awards_ibfk_1` FOREIGN KEY (`BidId`) REFERENCES `Bids` (`id`) ON DELETE SET NULL ON UPDATE CASCADE;

--
-- Constraints for table `Bids`
--
ALTER TABLE `Bids`
  ADD CONSTRAINT `bids_ibfk_633` FOREIGN KEY (`UserId`) REFERENCES `Users` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `bids_ibfk_634` FOREIGN KEY (`ProjectId`) REFERENCES `Projects` (`id`) ON DELETE SET NULL ON UPDATE CASCADE;

--
-- Constraints for table `Blogs`
--
ALTER TABLE `Blogs`
  ADD CONSTRAINT `blogs_ibfk_1` FOREIGN KEY (`BlogCategoryId`) REFERENCES `BlogCategories` (`id`) ON DELETE SET NULL ON UPDATE CASCADE;

--
-- Constraints for table `bugetTracks`
--
ALTER TABLE `bugetTracks`
  ADD CONSTRAINT `bugettracks_ibfk_1` FOREIGN KEY (`yearlyBudgetId`) REFERENCES `yearlyBudgets` (`id`) ON DELETE SET NULL ON UPDATE CASCADE;

--
-- Constraints for table `Clients`
--
ALTER TABLE `Clients`
  ADD CONSTRAINT `clients_ibfk_1` FOREIGN KEY (`CompanyId`) REFERENCES `Companies` (`id`) ON DELETE SET NULL ON UPDATE CASCADE;

--
-- Constraints for table `Companies`
--
ALTER TABLE `Companies`
  ADD CONSTRAINT `companies_ibfk_1` FOREIGN KEY (`UserId`) REFERENCES `Users` (`id`) ON DELETE SET NULL ON UPDATE CASCADE;

--
-- Constraints for table `Contracts`
--
ALTER TABLE `Contracts`
  ADD CONSTRAINT `contracts_ibfk_925` FOREIGN KEY (`UserId`) REFERENCES `Users` (`id`) ON DELETE SET NULL ON UPDATE CASCADE,
  ADD CONSTRAINT `contracts_ibfk_926` FOREIGN KEY (`ProjectId`) REFERENCES `Projects` (`id`) ON DELETE SET NULL ON UPDATE CASCADE,
  ADD CONSTRAINT `contracts_ibfk_927` FOREIGN KEY (`ContractTypeId`) REFERENCES `ContractTypes` (`id`) ON DELETE SET NULL ON UPDATE CASCADE;

--
-- Constraints for table `Employees`
--
ALTER TABLE `Employees`
  ADD CONSTRAINT `employees_ibfk_927` FOREIGN KEY (`DepartmentId`) REFERENCES `Departments` (`id`) ON DELETE SET NULL ON UPDATE CASCADE,
  ADD CONSTRAINT `employees_ibfk_928` FOREIGN KEY (`DesignationId`) REFERENCES `Designations` (`id`) ON DELETE SET NULL ON UPDATE CASCADE,
  ADD CONSTRAINT `employees_ibfk_929` FOREIGN KEY (`AreaId`) REFERENCES `Areas` (`id`) ON DELETE SET NULL ON UPDATE CASCADE;

--
-- Constraints for table `Invoices`
--
ALTER TABLE `Invoices`
  ADD CONSTRAINT `invoices_ibfk_750` FOREIGN KEY (`ProjectId`) REFERENCES `Projects` (`id`) ON DELETE SET NULL ON UPDATE CASCADE,
  ADD CONSTRAINT `invoices_ibfk_751` FOREIGN KEY (`UserId`) REFERENCES `Users` (`id`) ON DELETE SET NULL ON UPDATE CASCADE,
  ADD CONSTRAINT `invoices_ibfk_752` FOREIGN KEY (`PaymentModeId`) REFERENCES `PaymentModes` (`id`) ON DELETE SET NULL ON UPDATE CASCADE;

--
-- Constraints for table `job_offers`
--
ALTER TABLE `job_offers`
  ADD CONSTRAINT `job_offers_ibfk_1` FOREIGN KEY (`EmployeeId`) REFERENCES `Employees` (`id`) ON DELETE SET NULL ON UPDATE CASCADE;

--
-- Constraints for table `LeaveRequests`
--
ALTER TABLE `LeaveRequests`
  ADD CONSTRAINT `leaverequests_ibfk_927` FOREIGN KEY (`DepartmentId`) REFERENCES `Departments` (`id`) ON DELETE SET NULL ON UPDATE CASCADE,
  ADD CONSTRAINT `leaverequests_ibfk_928` FOREIGN KEY (`checkedBy`) REFERENCES `Users` (`id`) ON DELETE SET NULL ON UPDATE CASCADE,
  ADD CONSTRAINT `leaverequests_ibfk_929` FOREIGN KEY (`approvedBy`) REFERENCES `Users` (`id`) ON DELETE SET NULL ON UPDATE CASCADE,
  ADD CONSTRAINT `leaverequests_ibfk_930` FOREIGN KEY (`LeaveTypeId`) REFERENCES `LeaveTypes` (`id`) ON DELETE SET NULL ON UPDATE CASCADE,
  ADD CONSTRAINT `leaverequests_ibfk_931` FOREIGN KEY (`EmployeeId`) REFERENCES `Employees` (`id`) ON DELETE SET NULL ON UPDATE CASCADE;

--
-- Constraints for table `leave_requests`
--
ALTER TABLE `leave_requests`
  ADD CONSTRAINT `leave_requests_ibfk_1` FOREIGN KEY (`DepartmentId`) REFERENCES `Departments` (`id`) ON DELETE SET NULL ON UPDATE CASCADE,
  ADD CONSTRAINT `leave_requests_ibfk_2` FOREIGN KEY (`EmployeeId`) REFERENCES `Employees` (`id`) ON DELETE SET NULL ON UPDATE CASCADE,
  ADD CONSTRAINT `leave_requests_ibfk_3` FOREIGN KEY (`checkedBy`) REFERENCES `Users` (`id`) ON DELETE SET NULL ON UPDATE CASCADE,
  ADD CONSTRAINT `leave_requests_ibfk_4` FOREIGN KEY (`approvedBy`) REFERENCES `Users` (`id`) ON DELETE SET NULL ON UPDATE CASCADE,
  ADD CONSTRAINT `leave_requests_ibfk_5` FOREIGN KEY (`leaveTypeId`) REFERENCES `leave_types` (`id`) ON DELETE SET NULL ON UPDATE CASCADE;

--
-- Constraints for table `letterRequests`
--
ALTER TABLE `letterRequests`
  ADD CONSTRAINT `letterrequests_ibfk_1` FOREIGN KEY (`UserId`) REFERENCES `Users` (`id`) ON DELETE SET NULL ON UPDATE CASCADE;

--
-- Constraints for table `medical_allowances`
--
ALTER TABLE `medical_allowances`
  ADD CONSTRAINT `medical_allowances_ibfk_1` FOREIGN KEY (`EmployeeId`) REFERENCES `Employees` (`id`) ON DELETE SET NULL ON UPDATE CASCADE;

--
-- Constraints for table `Monthlytimesheets`
--
ALTER TABLE `Monthlytimesheets`
  ADD CONSTRAINT `monthlytimesheets_ibfk_1` FOREIGN KEY (`EmployeeId`) REFERENCES `Employees` (`id`) ON DELETE SET NULL ON UPDATE CASCADE;

--
-- Constraints for table `monthly_timesheets`
--
ALTER TABLE `monthly_timesheets`
  ADD CONSTRAINT `monthly_timesheets_ibfk_1` FOREIGN KEY (`EmployeeId`) REFERENCES `Employees` (`id`) ON DELETE SET NULL ON UPDATE CASCADE;

--
-- Constraints for table `payments`
--
ALTER TABLE `payments`
  ADD CONSTRAINT `payments_ibfk_1` FOREIGN KEY (`InvoiceId`) REFERENCES `Invoices` (`id`) ON DELETE SET NULL ON UPDATE CASCADE;

--
-- Constraints for table `Payrols`
--
ALTER TABLE `Payrols`
  ADD CONSTRAINT `payrols_ibfk_7` FOREIGN KEY (`DepartmentId`) REFERENCES `Departments` (`id`) ON DELETE SET NULL ON UPDATE CASCADE,
  ADD CONSTRAINT `payrols_ibfk_8` FOREIGN KEY (`EmployeeId`) REFERENCES `Employees` (`id`) ON DELETE SET NULL ON UPDATE CASCADE;

--
-- Constraints for table `Pcomments`
--
ALTER TABLE `Pcomments`
  ADD CONSTRAINT `pcomments_ibfk_1` FOREIGN KEY (`ProjectId`) REFERENCES `Projects` (`id`) ON DELETE SET NULL ON UPDATE CASCADE;

--
-- Constraints for table `Procurements`
--
ALTER TABLE `Procurements`
  ADD CONSTRAINT `procurements_ibfk_97` FOREIGN KEY (`ProjectId`) REFERENCES `Projects` (`id`) ON DELETE SET NULL ON UPDATE CASCADE,
  ADD CONSTRAINT `procurements_ibfk_98` FOREIGN KEY (`DepartmentId`) REFERENCES `Departments` (`id`) ON DELETE SET NULL ON UPDATE CASCADE;

--
-- Constraints for table `projectReports`
--
ALTER TABLE `projectReports`
  ADD CONSTRAINT `projectreports_ibfk_1` FOREIGN KEY (`ProjectId`) REFERENCES `Projects` (`id`) ON DELETE SET NULL ON UPDATE CASCADE;

--
-- Constraints for table `Projects`
--
ALTER TABLE `Projects`
  ADD CONSTRAINT `projects_ibfk_867` FOREIGN KEY (`engineer`) REFERENCES `Users` (`id`) ON DELETE SET NULL ON UPDATE CASCADE,
  ADD CONSTRAINT `projects_ibfk_868` FOREIGN KEY (`BidId`) REFERENCES `Bids` (`id`) ON DELETE SET NULL ON UPDATE CASCADE,
  ADD CONSTRAINT `projects_ibfk_869` FOREIGN KEY (`CompanyId`) REFERENCES `Companies` (`id`) ON DELETE SET NULL ON UPDATE CASCADE;

--
-- Constraints for table `SlipPapers`
--
ALTER TABLE `SlipPapers`
  ADD CONSTRAINT `slippapers_ibfk_633` FOREIGN KEY (`ProjectId`) REFERENCES `Projects` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `slippapers_ibfk_634` FOREIGN KEY (`UserId`) REFERENCES `Users` (`id`) ON DELETE SET NULL ON UPDATE CASCADE;

--
-- Constraints for table `Tasks`
--
ALTER TABLE `Tasks`
  ADD CONSTRAINT `tasks_ibfk_1` FOREIGN KEY (`pid`) REFERENCES `Projects` (`id`) ON DELETE SET NULL ON UPDATE CASCADE;

--
-- Constraints for table `yearlyBudgets`
--
ALTER TABLE `yearlyBudgets`
  ADD CONSTRAINT `yearlybudgets_ibfk_1` FOREIGN KEY (`ProjectId`) REFERENCES `Projects` (`id`) ON DELETE SET NULL ON UPDATE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
