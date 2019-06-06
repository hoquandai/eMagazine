/*
 Navicat Premium Data Transfer

 Source Server         : localhost_3030
 Source Server Type    : MySQL
 Source Server Version : 50718
 Source Host           : localhost:3030
 Source Schema         : emagazine

 Target Server Type    : MySQL
 Target Server Version : 50718
 File Encoding         : 65001

 Date: 06/06/2019 18:27:22
*/

SET NAMES utf8mb4;
SET FOREIGN_KEY_CHECKS = 0;

-- ----------------------------
-- Table structure for categories
-- ----------------------------
DROP TABLE IF EXISTS `categories`;
CREATE TABLE `categories`  (
  `cateid` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(45) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL,
  `subcate1` varchar(45) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL,
  `subcate2` varchar(45) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL,
  `subcate3` varchar(45) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL,
  `subcate4` varchar(45) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL,
  `link1` varchar(45) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL,
  `link2` varchar(45) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL,
  `link3` varchar(45) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL,
  `link4` varchar(45) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL,
  `link` varchar(45) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL,
  PRIMARY KEY (`cateid`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 8 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_general_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of categories
-- ----------------------------
INSERT INTO `categories` VALUES (1, 'Kinh Doanh', 'Nông sản', 'Hải sản', NULL, NULL, '/nongsan', '/haisan', NULL, NULL, '/kinhdoanh');
INSERT INTO `categories` VALUES (2, 'Chính trị', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '/chinhtri');
INSERT INTO `categories` VALUES (3, 'Pháp luật', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '/phapluat');
INSERT INTO `categories` VALUES (4, 'Xã hội', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '/xahoi');
INSERT INTO `categories` VALUES (5, 'Giáo dục', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '/giaoduc');
INSERT INTO `categories` VALUES (6, 'News', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '/news');
INSERT INTO `categories` VALUES (7, 'Top', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '/top');

-- ----------------------------
-- Table structure for posts
-- ----------------------------
DROP TABLE IF EXISTS `posts`;
CREATE TABLE `posts`  (
  `postid` int(11) NOT NULL AUTO_INCREMENT,
  `category` varchar(20) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL,
  `title` varchar(200) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL,
  `summary` varchar(500) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL,
  `content` varchar(20000) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL,
  `tag` varchar(20) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL,
  PRIMARY KEY (`postid`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 2 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_general_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of posts
-- ----------------------------
INSERT INTO `posts` VALUES (1, '<p>nongsan</p>\r\n', '<h1>Nam Định: Nuôi cả ngàn thỏ trắng bán cho Nhật, lãi 40 triệu/tháng</h1>\r\n', '<p>Nuoi tho trang</p>\r\n', '<p>Mỗi tháng anh Thụ xuất chuồng hơn 600 con thỏ thịt thương phẩm, trong đó bán cho doanh nghiệp Nhật Bản khoảng hơn 300 con. Từ mô hình nuôi loài thỏ trắng giống New Zealand hiền lành, sau khi trừ hết mọi chi phí, mỗi tháng gia đình anh Thụ có lãi gần 40 triệu đồng. Đây là một trong những mô hình làm giàu ở nông thôn.</p>\r\n\r\n<p>Anh Trịnh Văn Thụ xóm 9, xã Hải Xuân, huyện Hải Hậu (Nam Định) chia sẻ, trước đây anh làm thợ điện nước ở trên thành phố với mức thu nhập khiêm tốn. “Trong một lần đi chơi thấy gia đình một người bạn nuôi thỏ. Bạn của anh Thụ khẳng định, nuôi thỏ sinh sản, nuôi thỏ thịt đang là một trong những cách làm giàu ở nông thôn. Sau khi tìm hiểu thấy hay hay tôi cũng mua mua hơn 20 cặp thỏ giống về nuôi thử”, anh Thụ cho biết.</p>\r\n\r\n<p>Trong quá trình nuôi thỏ, anh Thụ nhận thấy loại vật nuôi này ít dịch bệnh, thức ăn đồ uống đơn giản, miễn là sạch thì chúng phát triển khỏe mạnh. Đúng lúc nhu cầu thị trường tiêu thụ thịt thỏ rất mạnh nên anh quyết định bỏ nghề điện nước, về quê đầu tư mở rộng quy mô chuồng trại, chuyên tâm với nghề nuôi loài vật hiền lành, dễ thương này.</p>\r\n\r\n<p><img alt=\"Nhờ nuôi thỏ bán cho công ty Nhật mà mỗi tháng anh Thụ bỏ túi gần 40 triệu đồng.\" sizes=\"(max-width: 640px) 100vw, 640px\" src=\"https://nongsanvietnam.vn/wp-content/uploads/2018/11/nuoi-ca-ngan-tho-trang-lai-40-trieu-thang-2.jpg\" srcset=\"https://nongsanvietnam.vn/wp-content/uploads/2018/11/nuoi-ca-ngan-tho-trang-lai-40-trieu-thang-2.jpg 640w, https://nongsanvietnam.vn/wp-content/uploads/2018/11/nuoi-ca-ngan-tho-trang-lai-40-trieu-thang-2-300x169.jpg 300w\" style=\"height:360px; width:640px\" /></p>\r\n\r\n<p>Nhờ nuôi thỏ bán cho công ty Nhật mà mỗi tháng anh Thụ bỏ túi gần 40 triệu đồng.</p>\r\n\r\n<p>Khởi nghiệp từ hơn 40 con thỏ làm vốn, nhận thấy con thỏ này cho hiệu quả kinh tế cao, anh tiếp tục nhân đàn, ở rộng chuồng trại. Sau hơn 4 năm lăn lộn với nghề, đến nay quy mô chăn nuôi thỏ thịt thương phẩm của gia đình anh Thụ đã lên tới hàng nghìn con. Trong số này, thỏ nái sinh sản luôn được anh Thụ duy trì khoảng hơn 300 con và hơn 1.700 con thỏ thịt thương phẩm.</p>\r\n\r\n<p>Với số lượng và sản lượng thỏ nuôi, trung bình mỗi năm gia đình anh Thụ cung cấp ra thị trường khoảng hơn 600 con thỏ thương phẩm. Với giá bán trung bình 180 ngàn đồng/1 con, sau khi trừ hết chi phí mỗi tháng anh Thụ có lãi gần 40 triệu đồng.</p>\r\n\r\n<p>Trong quá trình nuôi thỏ, anh Thụ không ngừng học hỏi thêm kinh nghiệm nuôi thỏ, tham gia vào các lớp tập huấn kiến thức, kỹ thuật nuôi thỏ, cũng như đi thăm quan các mô hình nuôi thỏ cho hiệu quả cao ở trong và ngoài tỉnh.</p>\r\n\r\n<p>Chia sẻ với phóng viên Dân Việt, anh Thụ cho biết, hiện tại gia đình anh đang có hơn 300m2 chuồng trại, được đầu tư xây dựng hoàn toàn khép kín, gồm hệ thống quạt thông gió, chuồng nuôi nhốt, máng ăn uống tự động..và hiện trong trang trại đang nuôi hơn 2.000 con thỏ các loại.</p>\r\n\r\n<p>“Vừa rồi tôi mới xuất bán 300 con thỏ cho phía công ty Nhật với giá 178 ngàn đồng/con, loại trên 2,3kg/con và cũng bán cho thương lái cũng khoảng 300 con với giá 80.000 đồng một kg (loại thỏ có trọng lượng thấp hơn thỏ xuất bán cho công ty Nhật), sau khi trừ hết chi phí đi tháng nào tôi cũng có gần 40 triệu đồng” anh Thụ tiết lộ.</p>\r\n\r\n<p><img alt=\"Cận cảnh quy mô nuôi thỏ thương phẩm của anh Trịnh Văn Thụ ở xóm 9, xã Hải Xuân.\" sizes=\"(max-width: 640px) 100vw, 640px\" src=\"https://nongsanvietnam.vn/wp-content/uploads/2018/11/nuoi-ca-ngan-tho-trang-lai-40-trieu-thang-1.jpg\" srcset=\"https://nongsanvietnam.vn/wp-content/uploads/2018/11/nuoi-ca-ngan-tho-trang-lai-40-trieu-thang-1.jpg 640w, https://nongsanvietnam.vn/wp-content/uploads/2018/11/nuoi-ca-ngan-tho-trang-lai-40-trieu-thang-1-300x169.jpg 300w\" style=\"height:360px; width:640px\" /></p>\r\n\r\n<p>Cận cảnh quy mô nuôi thỏ thương phẩm của anh Trịnh Văn Thụ ở xóm 9, xã Hải Xuân.</p>\r\n\r\n<p>Nói thêm về con thỏ, anh Thụ cho hay, giống thỏ New Zealand là một giống thỏ có nhiều ưu điểm như khả năng sinh trưởng và phát triển nhanh, vóc dáng lớn, sinh sản đều, thịt thơm ngon, hấp dẫn… Trung bình một con thỏ mẹ giống New Zealand một năm đẻ được từ 6-9 lứa, mỗi lứa khoảng 6-8 con. Thỏ con sau sinh, nuôi khoảng hơn 4 tháng thành thỏ thịt với trọng lượng bình quân 2,3kg/con là có thể xuất bán được.</p>\r\n\r\n<p>Những năm gần đây, thị trường tiêu thụ thịt thỏ ngày càng rộng mở và giá cả khá ổn định nên người chăn nuôi thỏ nhơ gia đình anh Thụ có thu nhập khá ổn định. “Nuôi thỏ không tốn nhiều sức lao động nhưng lại cho thu nhập cao, rất phù hợp với bà con nông dân vùng nông thôn muốn có thêm thu nhập…Đây cũng là một trong những cách, những mô hình làm giàu ở nông thôn…”, anh Thụ nói thêm.</p>\r\n', '<p>#nongsan</p>\r\n');

SET FOREIGN_KEY_CHECKS = 1;
