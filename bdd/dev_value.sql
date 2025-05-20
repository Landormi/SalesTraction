-- This file is used to populate the database with initial data for development purposes.
INSERT INTO user_type (user_type) VALUES 
('admin'), 
('studiant'), 
('startup');

INSERT INTO user_ (email, password_hash, user_type) VALUES
-- Admin user
('admin@example.com', 'hashed_password_admin', 'admin'),

-- 15 Students
('student1@example.com', 'hashed_password_student1', 'studiant'),
('student2@example.com', 'hashed_password_student2', 'studiant'),
('student3@example.com', 'hashed_password_student3', 'studiant'),
('student4@example.com', 'hashed_password_student4', 'studiant'),
('student5@example.com', 'hashed_password_student5', 'studiant'),
('student6@example.com', 'hashed_password_student6', 'studiant'),
('student7@example.com', 'hashed_password_student7', 'studiant'),
('student8@example.com', 'hashed_password_student8', 'studiant'),
('student9@example.com', 'hashed_password_student9', 'studiant'),
('student10@example.com', 'hashed_password_student10', 'studiant'),
('student11@example.com', 'hashed_password_student11', 'studiant'),
('student12@example.com', 'hashed_password_student12', 'studiant'),
('student13@example.com', 'hashed_password_student13', 'studiant'),
('student14@example.com', 'hashed_password_student14', 'studiant'),
('student15@example.com', 'hashed_password_student15', 'studiant'),

-- 4 Startups
('startup1@example.com', 'hashed_password_startup1', 'startup'),
('startup2@example.com', 'hashed_password_startup2', 'startup'),
('startup3@example.com', 'hashed_password_startup3', 'startup'),
('startup4@example.com', 'hashed_password_startup4', 'startup');

-- Ajout des étudiants liés à user_
INSERT INTO studiant (linkedin_url, birthday, university, created_at, description, id_user)
VALUES
(NULL, '2000-01-01', 'Université A', '2023-09-01 00:00:00', 'Description étudiant 1', 2),
('https://linkedin.com/in/student2', '2000-02-01', NULL, '2023-09-01 00:00:00', 'Description étudiant 2', 3),
('https://linkedin.com/in/student3', '2000-03-01', 'Université A', '2023-09-01 00:00:00', 'Description étudiant 3', 4),
(NULL, '2000-04-01', NULL, '2023-09-01 00:00:00', 'Description étudiant 4', 5),
('https://linkedin.com/in/student5', '2000-05-01', 'Université A', '2023-09-01 00:00:00', 'Description étudiant 5', 6),
('https://linkedin.com/in/student6', '2000-06-01', NULL, '2023-09-01 00:00:00', 'Description étudiant 6', 7),
(NULL, '2000-07-01', 'Université A', '2023-09-01 00:00:00', 'Description étudiant 7', 8),
('https://linkedin.com/in/student8', '2000-08-01', 'Université A', '2023-09-01 00:00:00', 'Description étudiant 8', 9),
('https://linkedin.com/in/student9', '2000-09-01', NULL, '2023-09-01 00:00:00', 'Description étudiant 9', 10),
(NULL, '2000-10-01', 'Université A', '2023-09-01 00:00:00', 'Description étudiant 10', 11),
('https://linkedin.com/in/student11', '2000-11-01', 'Université A', '2023-09-01 00:00:00', 'Description étudiant 11', 12),
(NULL, '2000-12-01', NULL, '2023-09-01 00:00:00', 'Description étudiant 12', 13),
('https://linkedin.com/in/student13', '2001-01-01', 'Université A', '2023-09-01 00:00:00', 'Description étudiant 13', 14),
(NULL, '2001-02-01', 'Université A', '2023-09-01 00:00:00', 'Description étudiant 14', 15),
('https://linkedin.com/in/student15', '2001-03-01', NULL, '2023-09-01 00:00:00', 'Description étudiant 15', 16);

-- Ajout des startups liées à user_
INSERT INTO startup (linkedin_url, name, siret, created_at, status, id_user)
VALUES
(NULL, 'Startup 1', '12345678901234', '2023-01-01 00:00:00', 'active', 17),
('https://linkedin.com/company/startup2', 'Startup 2', '22345678901234', '2023-01-01 00:00:00', 'active', 18),
(NULL, 'Startup 3', '32345678901234', '2023-01-01 00:00:00', 'active', 19),
('https://linkedin.com/company/startup4', 'Startup 4', '42345678901234', '2023-01-01 00:00:00', 'active', 20);
