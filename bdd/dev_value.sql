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
('https://linkedin.com/in/student13', '2001-01-01', 'Université A', '2023-09-01 00:00:00', NULL, 14),
(NULL, '2001-02-01', 'Université A', '2023-09-01 00:00:00', 'Description étudiant 14', 15),
('https://linkedin.com/in/student15', '2001-03-01', NULL, '2023-09-01 00:00:00', 'Description étudiant 15', 16);

-- Ajout des statuts nécessaires dans les tables de référence
INSERT IGNORE INTO status_startup (status_startup) VALUES
('active');

INSERT IGNORE INTO status_offre (status_offre) VALUES
('active'),
('close');

-- Ajout des startups liées à user_
INSERT INTO startup (linkedin_url, name, siret, created_at, status_startup, id_user)
VALUES
(NULL, 'Startup 1', '12345678901234', '2023-01-01 00:00:00', 'active', 17),
('https://linkedin.com/company/startup2', 'Startup 2', '22345678901234', '2023-01-01 00:00:00', 'active', 18),
(NULL, 'Startup 3', '32345678901234', '2023-01-01 00:00:00', 'active', 19),
('https://linkedin.com/company/startup4', 'Startup 4', '42345678901234', '2023-01-01 00:00:00', 'active', 20);

-- Ajout des offres pour chaque startup (1 à 2 offres par startup)
INSERT INTO offre (title, description, price_range, comission, created_at, id_user, status_offre) VALUES
-- Startup 1 (2 offres)
('Offre S1-1', 'Description offre 1 de Startup 1', '1000-2000', 10, '2023-02-01 00:00:00', 17, 'active'),
('Offre S1-2', 'Description offre 2 de Startup 1', '2000-3000', 15, '2023-02-02 00:00:00', 17, 'close'),
-- Startup 2 (1 offre)
('Offre S2-1', 'Description offre 1 de Startup 2', '1500-2500', 12, '2023-02-03 00:00:00', 18, 'active'),
-- Startup 3 (2 offres)
('Offre S3-1', 'Description offre 1 de Startup 3', '1200-2200', 11, '2023-02-04 00:00:00', 19, 'active'),
('Offre S3-2', 'Description offre 2 de Startup 3', '2500-3500', 18, '2023-02-05 00:00:00', 19, 'active'),
-- Startup 4 (1 offre)
('Offre S4-1', 'Description offre 1 de Startup 4', '1800-2800', 14, '2023-02-06 00:00:00', 20, 'active');

-- Ajout des statuts candidats si besoin (à adapter selon la table candidate_status)
INSERT IGNORE INTO candidate_status (status) VALUES
('en_attente'), ('accepte'), ('refuse');

-- Ajout des candidats pour chaque offre (entre 0 et 8 candidats)
-- Offre S1-1 (id_offre = 1) : 5 candidats
INSERT INTO candidate (id_offre, id_user, commissions_amount, status) VALUES
(1, 2, 100, 'en_attente'),
(1, 3, 120, 'accepte'),
(1, 4, 110, 'refuse'),
(1, 5, 130, 'en_attente'),
(1, 6, 140, 'accepte');

-- Offre S1-2 (id_offre = 2) : 2 candidats
INSERT INTO candidate (id_offre, id_user, commissions_amount, status) VALUES
(2, 7, 150, 'en_attente'),
(2, 8, 160, 'refuse');

-- Offre S2-1 (id_offre = 3) : 8 candidats
INSERT INTO candidate (id_offre, id_user, commissions_amount, status) VALUES
(3, 2, 110, 'accepte'),
(3, 3, 120, 'en_attente'),
(3, 4, 130, 'refuse'),
(3, 5, 140, 'en_attente'),
(3, 6, 150, 'accepte'),
(3, 7, 160, 'refuse'),
(3, 8, 170, 'en_attente'),
(3, 9, 180, 'accepte');

-- Offre S3-1 (id_offre = 4) : 0 candidat

-- Offre S3-2 (id_offre = 5) : 3 candidats
INSERT INTO candidate (id_offre, id_user, commissions_amount, status) VALUES
(5, 10, 200, 'en_attente'),
(5, 11, 210, 'accepte'),
(5, 12, 220, 'refuse');

-- Offre S4-1 (id_offre = 6) : 1 candidat
INSERT INTO candidate (id_offre, id_user, commissions_amount, status) VALUES
(6, 13, 230, 'en_attente');

-- Ajout des langues
INSERT INTO language_ (language_) VALUES
('français'),
('anglais'),
('espagnol'),
('allemand'),
('italien'),
('portugais');

-- Lier les langues aux étudiants (entre 1 et 3 langues par étudiant)
INSERT INTO language_studiant (id_user, language_) VALUES
(2, 'français'),
(3, 'français'), (3, 'anglais'),
(4, 'anglais'),
(5, 'français'), (5, 'espagnol'),
(6, 'français'),
(7, 'anglais'), (7, 'espagnol'),
(8, 'français'), (8, 'anglais'), (8, 'allemand'),
(9, 'français'),
(10, 'anglais'), (10, 'italien'),
(11, 'français'), (11, 'anglais'),
(12, 'français'),
(13, 'espagnol'),
(14, 'français'), (14, 'anglais'), (14, 'portugais'),
(15, 'français'), (15, 'allemand'),
(16, 'anglais');
