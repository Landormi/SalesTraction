CREATE TABLE language_(
   language_ VARCHAR(255)  	,
   PRIMARY KEY(language_)
);

CREATE TABLE document_type(
   type_document VARCHAR(255)  	,
   PRIMARY KEY(type_document)
);

CREATE TABLE status_startup(
   status_startup VARCHAR(9)  	,
   PRIMARY KEY(status_startup)
);

CREATE TABLE target_customer(
   target_customer VARCHAR(50) ,
   description TinyText 	 NOT NULL,
   PRIMARY KEY(target_customer)
);

CREATE TABLE document_category(
   document_category VARCHAR(255)  	,
   PRIMARY KEY(document_category)
);

CREATE TABLE user_type(
   user_type VARCHAR(48)  	,
   PRIMARY KEY(user_type)
);

CREATE TABLE candidate_status(
   status VARCHAR(255) ,
   PRIMARY KEY(status)
);

CREATE TABLE status_offre(
   status_offre VARCHAR(9)  	,
   PRIMARY KEY(status_offre)
);

CREATE TABLE type_commision(
   type_commision VARCHAR(50) ,
   PRIMARY KEY(type_commision)
);

CREATE TABLE user_(
   id_user INT AUTO_INCREMENT Auto_increment,
   email VARCHAR(320)  NOT NULL,
   password_hash VARCHAR(48)  NOT NULL COMMENT "(stocké dans Cognito, ici uniquement référence éventuelle)",
   user_type VARCHAR(48)  NOT NULL,
   PRIMARY KEY(id_user),
   FOREIGN KEY(user_type) REFERENCES user_type(user_type)
);

CREATE TABLE startup(
   id_user INT,
   linkedin_url VARCHAR(255) ,
   name VARCHAR(255)  NOT NULL,
   siret VARCHAR(14)  NOT NULL,
   created_at DATETIME NOT NULL,
   status_startup VARCHAR(9)  NOT NULL,
   PRIMARY KEY(id_user),
   FOREIGN KEY(id_user) REFERENCES user_(id_user),
   FOREIGN KEY(status_startup) REFERENCES status_startup(status_startup)
);

CREATE TABLE offre(
   id_offre INT AUTO_INCREMENT Auto_increment,
   title VARCHAR(255)  NOT NULL,
   description TEXT NOT NULL,
   price_range VARCHAR(50)  NOT NULL,
   comission INT NOT NULL,
   created_at DATETIME NOT NULL,
   id_user INT NOT NULL,
   status_offre VARCHAR(9)  NOT NULL,
   PRIMARY KEY(id_offre),
   FOREIGN KEY(id_user) REFERENCES startup(id_user),
   FOREIGN KEY(status_offre) REFERENCES status_offre(status_offre)
);

CREATE TABLE Document(
   id_document INT AUTO_INCREMENT Auto_increment,
   name VARCHAR(255)  NOT NULL,
   path VARCHAR(255)  NOT NULL,
   upload_date DATETIME NOT NULL,
   id_user INT,
   document_category VARCHAR(255)  NOT NULL,
   type_document VARCHAR(255)  NOT NULL,
   id_offre INT,
   PRIMARY KEY(id_document),
   FOREIGN KEY(id_user) REFERENCES startup(id_user),
   FOREIGN KEY(document_category) REFERENCES document_category(document_category),
   FOREIGN KEY(type_document) REFERENCES document_type(type_document),
   FOREIGN KEY(id_offre) REFERENCES offre(id_offre)
);

CREATE TABLE conversation(
   id_conversation INT AUTO_INCREMENT Auto_increment,
   id_user_user2 INT NOT NULL,
   id_user INT NOT NULL,
   PRIMARY KEY(id_conversation),
   FOREIGN KEY(id_user_user2) REFERENCES user_(id_user),
   FOREIGN KEY(id_user) REFERENCES user_(id_user)
);

CREATE TABLE message(
   id_message INT AUTO_INCREMENT Auto_increment,
   send_at DATETIME NOT NULL,
   content TEXT NOT NULL,
   id_user INT NOT NULL,
   id_conversation INT NOT NULL,
   PRIMARY KEY(id_message),
   FOREIGN KEY(id_user) REFERENCES user_(id_user),
   FOREIGN KEY(id_conversation) REFERENCES conversation(id_conversation)
);

CREATE TABLE studiant(
   id_user INT,
   linkedin_url VARCHAR(255) ,
   birthday DATE NOT NULL,
   university VARCHAR(255) ,
   created_at DATETIME NOT NULL,
   description TEXT,
   id_document INT,
   PRIMARY KEY(id_user),
   UNIQUE(id_document),
   FOREIGN KEY(id_user) REFERENCES user_(id_user),
   FOREIGN KEY(id_document) REFERENCES Document(id_document)
);

CREATE TABLE candidate(
   id_offre INT,
   id_user INT,
   commissions_amount INT 	,
   status VARCHAR(255)  NOT NULL,
   PRIMARY KEY(id_offre, id_user),
   FOREIGN KEY(id_offre) REFERENCES offre(id_offre),
   FOREIGN KEY(id_user) REFERENCES studiant(id_user),
   FOREIGN KEY(status) REFERENCES candidate_status(status)
);

CREATE TABLE language_studiant(
   id_user INT,
   language_ VARCHAR(255) ,
   PRIMARY KEY(id_user, language_),
   FOREIGN KEY(id_user) REFERENCES studiant(id_user),
   FOREIGN KEY(language_) REFERENCES language_(language_)
);

CREATE TABLE target_offre(
   id_offre INT,
   target_customer VARCHAR(50) ,
   PRIMARY KEY(id_offre, target_customer),
   FOREIGN KEY(id_offre) REFERENCES offre(id_offre),
   FOREIGN KEY(target_customer) REFERENCES target_customer(target_customer)
);

CREATE TABLE target_studiant(
   id_user INT,
   target_customer VARCHAR(50) ,
   PRIMARY KEY(id_user, target_customer),
   FOREIGN KEY(id_user) REFERENCES studiant(id_user),
   FOREIGN KEY(target_customer) REFERENCES target_customer(target_customer)
);

CREATE TABLE type_commision_link(
   id_offre INT,
   type_commision VARCHAR(50) ,
   PRIMARY KEY(id_offre, type_commision),
   FOREIGN KEY(id_offre) REFERENCES offre(id_offre),
   FOREIGN KEY(type_commision) REFERENCES type_commision(type_commision)
);