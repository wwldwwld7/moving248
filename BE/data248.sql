-- MySQL Workbench Forward Engineering

SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0;
SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0;
SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION';

-- -----------------------------------------------------
-- Schema mydb
-- -----------------------------------------------------
-- --------------------------------------------apply_form---------
-- Schema test2
-- -----------------------------------------------------
DROP SCHEMA IF EXISTS `test2` ;

-- -----------------------------------------------------
-- Schema test2
-- -----------------------------------------------------
CREATE SCHEMA IF NOT EXISTS `test2` DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci ;
USE `test2` ;

-- -----------------------------------------------------
-- Table `test2`.`members`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `test2`.`members` ;

CREATE TABLE IF NOT EXISTS `test2`.`members` (
  `m_id` INT NOT NULL AUTO_INCREMENT,
  `member_type` CHAR(1) NOT NULL,
  `email` VARCHAR(30) NOT NULL,
  `password` VARCHAR(100) NOT NULL,
  `phone` VARCHAR(13) NOT NULL,
  `name` VARCHAR(15) NOT NULL,
  `profile_url` VARCHAR(255) NULL DEFAULT NULL,
  `p_ceo` VARCHAR(15) NULL DEFAULT NULL,
  `p_exp` TINYINT NULL DEFAULT '0',
  `p_emp_cnt` SMALLINT NULL DEFAULT '0',
  `p_starttime` CHAR(2) NULL DEFAULT NULL,
  `p_endtime` CHAR(2) NULL DEFAULT NULL,
  `p_desc` VARCHAR(255) NULL DEFAULT NULL,
  `p_location` VARCHAR(100) NULL DEFAULT NULL,
  `p_move_cnt` SMALLINT NULL DEFAULT '0',
  `p_code` CHAR(12),
  `p_total_score` INT NULL DEFAULT '0',
  `p_review_cnt` SMALLINT NULL DEFAULT '0',
  PRIMARY KEY (`m_id`))
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8mb4
COLLATE = utf8mb4_0900_ai_ci;


-- -----------------------------------------------------
-- Table `test2`.`apply_form`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `test2`.`apply_form` ;

CREATE TABLE IF NOT EXISTS `test2`.`apply_form` (
  `f_id` INT NOT NULL AUTO_INCREMENT,
  `u_id` INT NOT NULL,
  `p_id` INT NULL,
  `f_category` CHAR(1) NOT NULL,
  `f_date` DATE NOT NULL,
  `f_dep_sido` CHAR(2) NOT NULL,
  `f_dep_gungu` CHAR(2) NOT NULL,
  `f_dep_ev` CHAR(1) NOT NULL DEFAULT 'f',
  `f_dep_ladder` CHAR(1) NOT NULL DEFAULT 'f',
  `f_arr_sido` CHAR(2) NOT NULL,
  `f_arr_gungu` CHAR(2) NOT NULL,
  `f_arr_ev` CHAR(1) NOT NULL DEFAULT 'f',
  `f_arr_ladder` CHAR(1) NOT NULL DEFAULT 'f',
  `f_room_video_url` VARCHAR(255) NOT NULL,
  `f_status` CHAR(1) NOT NULL DEFAULT '1',
  `f_create_time` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `f_req_desc` VARCHAR(255) NULL DEFAULT NULL,
  `f_modify_time` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`f_id`),
  INDEX `FK_members_TO_apply_form_1` (`u_id` ASC) VISIBLE,
  INDEX `FK_members_TO_chat_room_2` (`p_id` ASC) VISIBLE,
  CONSTRAINT `FK_members_TO_apply_form_1`
    FOREIGN KEY (`u_id`)
    REFERENCES `test2`.`members` (`m_id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `FK_members_TO_apply_form_2`
    FOREIGN KEY (`p_id`)
    REFERENCES `test2`.`members` (`m_id`) ON UPDATE CASCADE)
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8mb4
COLLATE = utf8mb4_0900_ai_ci;


-- -----------------------------------------------------
-- Table `test2`.`chat_room`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `test2`.`chat_room` ;

CREATE TABLE IF NOT EXISTS `test2`.`chat_room` (
  `room_id` INT NOT NULL AUTO_INCREMENT,
  `p_id` INT NOT NULL,
  `u_id` INT NOT NULL,
  `room_last_message` VARCHAR(500)  NULL,
  `room_last_date` TIMESTAMP NULL,
  PRIMARY KEY (`room_id`),
  INDEX `FK_members_TO_chat_room_1` (`p_id` ASC) VISIBLE ,
  INDEX `FK_members_TO_chat_room_2` (`u_id` ASC) VISIBLE,
  CONSTRAINT `FK_members_TO_chat_room_1`
    FOREIGN KEY (`p_id`)
    REFERENCES `test2`.`members` (`m_id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `FK_members_TO_chat_room_2`
    FOREIGN KEY (`u_id`)
    REFERENCES `test2`.`members` (`m_id`) ON DELETE CASCADE ON UPDATE CASCADE)
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8mb4
COLLATE = utf8mb4_0900_ai_ci;


-- -----------------------------------------------------
-- Table `test2`.`chat_messages`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `test2`.`chat_messages` ;

CREATE TABLE IF NOT EXISTS `test2`.`chat_messages` (
  `c_id` INT NOT NULL AUTO_INCREMENT,
  `room_id` INT NOT NULL,
  `m_id` INT NOT NULL,
  `c_message` VARCHAR(500)  NULL,
  `c_read_yn` CHAR(1) NOT NULL DEFAULT 'f',
  `c_write_date` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`c_id`),
  INDEX `FK_chatRoom_TO_chat_messages_1` (`room_id` ASC) VISIBLE,
  INDEX `FK_members_TO_chat_messages_1` (`m_id` ASC) VISIBLE,
  CONSTRAINT `FK_chatRoom_TO_chat_messages_1`
    FOREIGN KEY (`room_id`)
    REFERENCES `test2`.`chat_room` (`room_id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `FK_members_TO_chat_messages_1`
    FOREIGN KEY (`m_id`)
    REFERENCES `test2`.`members` (`m_id`) ON DELETE CASCADE ON UPDATE CASCADE)
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8mb4
COLLATE = utf8mb4_0900_ai_ci;


-- -----------------------------------------------------
-- Table `test2`.`form_status`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `test2`.`form_status` ;

CREATE TABLE IF NOT EXISTS `test2`.`form_status` (
  `status_code` CHAR(1) NOT NULL,
  `status_name` VARCHAR(10) NOT NULL,
  PRIMARY KEY (`status_code`))
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8mb4
COLLATE = utf8mb4_0900_ai_ci;


-- -----------------------------------------------------
-- Table `test2`.`sido`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `test2`.`sido` ;

CREATE TABLE IF NOT EXISTS `test2`.`sido` (
  `sido_code` CHAR(2) NOT NULL,
  `sido_name` VARCHAR(30) NULL DEFAULT NULL,
  PRIMARY KEY (`sido_code`))
ENGINE = InnoDB
AUTO_INCREMENT = 40
DEFAULT CHARACTER SET = utf8mb4
COLLATE = utf8mb4_0900_ai_ci;


-- -----------------------------------------------------
-- Table `test2`.`gu`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `test2`.`gu` ;

CREATE TABLE IF NOT EXISTS `test2`.`gu` (
  `gu_code` CHAR(2) NOT NULL,
  `sido_code` CHAR(2) NOT NULL,
  `gu_name` VARCHAR(30) NULL DEFAULT NULL,
  PRIMARY KEY (`gu_code`, `sido_code`),
  INDEX `FK_sido_TO_gu_1` (`sido_code` ASC) VISIBLE,
  CONSTRAINT `FK_sido_TO_gu_1`
    FOREIGN KEY (`sido_code`)
    REFERENCES `test2`.`sido` (`sido_code`))
ENGINE = InnoDB
AUTO_INCREMENT = 32
DEFAULT CHARACTER SET = utf8mb4
COLLATE = utf8mb4_0900_ai_ci;


-- -----------------------------------------------------
-- Table `test2`.`move_category`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `test2`.`move_category` ;

CREATE TABLE IF NOT EXISTS `test2`.`move_category` (
  `category_code` CHAR(1) NOT NULL,
  `category_name` VARCHAR(10) NOT NULL,
  PRIMARY KEY (`category_code`))
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8mb4
COLLATE = utf8mb4_0900_ai_ci;


-- -----------------------------------------------------
-- Table `test2`.`review`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `test2`.`review` ;

CREATE TABLE IF NOT EXISTS `test2`.`review` (
  `r_id` INT NOT NULL AUTO_INCREMENT,
  `u_id` INT NOT NULL,
  `p_id` INT NOT NULL,
  `r_rate` tinyint NOT NULL,
  `r_content` VARCHAR(255) NULL DEFAULT NULL,
  `r_create_time` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`r_id`),
  INDEX `FK_members_TO_review_1` (`u_id` ASC) VISIBLE,
  INDEX `FK_members_TO_review_2` (`p_id` ASC) VISIBLE,
  CONSTRAINT `FK_members_TO_review_1`
    FOREIGN KEY (`u_id`)
    REFERENCES `test2`.`members` (`m_id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `FK_members_TO_review_2`
    FOREIGN KEY (`p_id`)
    REFERENCES `test2`.`members` (`m_id`) ON DELETE CASCADE ON UPDATE CASCADE)
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8mb4
COLLATE = utf8mb4_0900_ai_ci;


-- -----------------------------------------------------
-- Table `test2`.`suggestion`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `test2`.`suggestion` ;

CREATE TABLE IF NOT EXISTS `test2`.`suggestion` (
  `s_id` INT NOT NULL AUTO_INCREMENT,
  `f_id` INT NOT NULL,
  `p_id` INT NOT NULL,
  `s_money` INT NOT NULL,
  `s_desc` VARCHAR(255) NOT NULL,
  `s_create_time` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `s_modify_time` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`s_id`),
  INDEX `FK_apply_form_TO_suggestion_1` (`f_id` ASC) VISIBLE,
  INDEX `FK_members_TO_suggestion_1` (`p_id` ASC) VISIBLE,
  CONSTRAINT `FK_apply_form_TO_suggestion_1`
    FOREIGN KEY (`f_id`)
    REFERENCES `test2`.`apply_form` (`f_id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `FK_members_TO_suggestion_1`
    FOREIGN KEY (`p_id`)
    REFERENCES `test2`.`members` (`m_id`) ON DELETE CASCADE ON UPDATE CASCADE)
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8mb4
COLLATE = utf8mb4_0900_ai_ci;


INSERT INTO `sido` VALUES (0,'전체'),(1,'서울'),(2,'인천'),(3,'대전'),(4,'대구'),(5,'광주'),(6,'부산'),(7,'울산'),(8,'세종특별자치시'),(31,'경기도'),(32,'강원도'),(33,'충청북도'),(34,'충청남도'),(35,'경상북도'),(36,'경상남도'),(37,'전라북도'),(38,'전라남도'),(39,'제주도');
INSERT INTO `gu` VALUES (0,0,'전체'),(1,1,'강남구'),(1,2,'강화군'),(1,3,'대덕구'),(1,4,'남구'),(1,5,'광산구'),(1,6,'강서구'),(1,7,'중구'),(1,8,'세종특별자치시'),(1,31,'가평군'),(1,32,'강릉시'),(1,33,'괴산군'),(1,34,'공주시'),(1,35,'경산시'),(1,36,'거제시'),(1,37,'고창군'),(1,38,'강진군'),(1,39,'남제주군'),(2,1,'강동구'),(2,2,'계양구'),(2,3,'동구'),(2,4,'달서구'),(2,5,'남구'),(2,6,'금정구'),(2,7,'남구'),(2,31,'고양시'),(2,32,'고성군'),(2,33,'단양군'),(2,34,'금산군'),(2,35,'경주시'),(2,36,'거창군'),(2,37,'군산시'),(2,38,'고흥군'),(2,39,'북제주군'),(3,1,'강북구'),(3,2,'미추홀구'),(3,3,'서구'),(3,4,'달성군'),(3,5,'동구'),(3,6,'기장군'),(3,7,'동구'),(3,31,'과천시'),(3,32,'동해시'),(3,33,'보은군'),(3,34,'논산시'),(3,35,'고령군'),(3,36,'고성군'),(3,37,'김제시'),(3,38,'곡성군'),(3,39,'서귀포시'),(4,1,'강서구'),(4,2,'남동구'),(4,3,'유성구'),(4,4,'동구'),(4,5,'북구'),(4,6,'남구'),(4,7,'북구'),(4,31,'광명시'),(4,32,'삼척시'),(4,33,'영동군'),(4,34,'당진시'),(4,35,'구미시'),(4,36,'김해시'),(4,37,'남원시'),(4,38,'광양시'),(4,39,'제주시'),(5,1,'관악구'),(5,2,'동구'),(5,3,'중구'),(5,4,'북구'),(5,5,'서구'),(5,6,'동구'),(5,7,'울주군'),(5,31,'광주시'),(5,32,'속초시'),(5,33,'옥천군'),(5,34,'보령시'),(5,35,'군위군'),(5,36,'남해군'),(5,37,'무주군'),(5,38,'구례군'),(6,1,'광진구'),(6,2,'부평구'),(6,4,'서구'),(6,6,'동래구'),(6,31,'구리시'),(6,32,'양구군'),(6,33,'음성군'),(6,34,'부여군'),(6,35,'김천시'),(6,36,'마산시'),(6,37,'부안군'),(6,38,'나주시'),(7,1,'구로구'),(7,2,'서구'),(7,4,'수성구'),(7,6,'부산진구'),(7,31,'군포시'),(7,32,'양양군'),(7,33,'제천시'),(7,34,'서산시'),(7,35,'문경시'),(7,36,'밀양시'),(7,37,'순창군'),(7,38,'담양군'),(8,1,'금천구'),(8,2,'연수구'),(8,4,'중구'),(8,6,'북구'),(8,31,'김포시'),(8,32,'영월군'),(8,33,'진천군'),(8,34,'서천군'),(8,35,'봉화군'),(8,36,'사천시'),(8,37,'완주군'),(8,38,'목포시'),(9,1,'노원구'),(9,2,'옹진군'),(9,6,'사상구'),(9,31,'남양주시'),(9,32,'원주시'),(9,33,'청원군'),(9,34,'아산시'),(9,35,'상주시'),(9,36,'산청군'),(9,37,'익산시'),(9,38,'무안군'),(10,1,'도봉구'),(10,2,'중구'),(10,6,'사하구'),(10,31,'동두천시'),(10,32,'인제군'),(10,33,'청주시'),(10,35,'성주군'),(10,36,'양산시'),(10,37,'임실군'),(10,38,'보성군'),(11,1,'동대문구'),(11,6,'서구'),(11,31,'부천시'),(11,32,'정선군'),(11,33,'충주시'),(11,34,'예산군'),(11,35,'안동시'),(11,37,'장수군'),(11,38,'순천시'),(12,1,'동작구'),(12,6,'수영구'),(12,31,'성남시'),(12,32,'철원군'),(12,33,'증평군'),(12,34,'천안시'),(12,35,'영덕군'),(12,36,'의령군'),(12,37,'전주시'),(12,38,'신안군'),(13,1,'마포구'),(13,6,'연제구'),(13,31,'수원시'),(13,32,'춘천시'),(13,34,'청양군'),(13,35,'영양군'),(13,36,'진주시'),(13,37,'정읍시'),(13,38,'여수시'),(14,1,'서대문구'),(14,6,'영도구'),(14,31,'시흥시'),(14,32,'태백시'),(14,34,'태안군'),(14,35,'영주시'),(14,36,'진해시'),(14,37,'진안군'),(15,1,'서초구'),(15,6,'중구'),(15,31,'안산시'),(15,32,'평창군'),(15,34,'홍성군'),(15,35,'영천시'),(15,36,'창녕군'),(16,1,'성동구'),(16,6,'해운대구'),(16,31,'안성시'),(16,32,'홍천군'),(16,34,'계룡시'),(16,35,'예천군'),(16,36,'창원시'),(16,38,'영광군'),(17,1,'성북구'),(17,31,'안양시'),(17,32,'화천군'),(17,35,'울릉군'),(17,36,'통영시'),(17,38,'영암군'),(18,1,'송파구'),(18,31,'양주시'),(18,32,'횡성군'),(18,35,'울진군'),(18,36,'하동군'),(18,38,'완도군'),(19,1,'양천구'),(19,31,'양평군'),(19,35,'의성군'),(19,36,'함안군'),(19,38,'장성군'),(20,1,'영등포구'),(20,31,'여주시'),(20,35,'청도군'),(20,36,'함양군'),(20,38,'장흥군'),(21,1,'용산구'),(21,31,'연천군'),(21,35,'청송군'),(21,36,'합천군'),(21,38,'진도군'),(22,1,'은평구'),(22,31,'오산시'),(22,35,'칠곡군'),(22,38,'함평군'),(23,1,'종로구'),(23,31,'용인시'),(23,35,'포항시'),(23,38,'해남군'),(24,1,'중구'),(24,31,'의왕시'),(24,38,'화순군'),(25,1,'중랑구'),(25,31,'의정부시'),(26,31,'이천시'),(27,31,'파주시'),(28,31,'평택시'),(29,31,'포천시'),(30,31,'하남시'),(31,31,'화성시');

insert into form_status values (1,'입찰');
insert into form_status values (2,'확정');
insert into form_status values (3,'완료');

insert into move_category values (1, "포장이사");
insert into move_category values (2, "일반이사");


SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS;
SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS;
