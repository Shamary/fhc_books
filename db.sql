CREATE DATABASE IF NOT EXISTS books_db;
use books_db;

CREATE TABLE IF NOT EXISTS books
(
    week int(2) NOT NULL,
    bdate Date NOT NULL,
    day int NOT NULL,
    loans float(9,2) NOT NULL,
    deposits int NOT NULL,
    debit_cards int NOT NULL,
    membership int NOT NULL,
    iTransact int NOT NULL,
    FIP int NOT NULL
);

CREATE TABLE IF NOT EXISTS books_weekly
(
    ftype_week ENUM('loans','deposits','debit_cards','membership','iTransact','FIP') NOT NULL,
    week int NOT NULL,
    weekly_actual float(11,2),
    weekly_target float(11,2),
    weekly_difference float(11,2)
);

CREATE TABLE IF NOT EXISTS books_ytd
(
    ftype_ytd ENUM('loans','deposits','debit_cards','membership','iTransact','FIP') NOT NULL,
    week int NOT NULL,
    ytd_actual float(11,2),
    ytd_target float(11,2),
    ytd_difference float(11,2)
)
/*
INSERT INTO books VALUES(1,"2018-01-02",1,22434.0,234234,1,9,3,0);
INSERT INTO books VALUES(1,"2018-01-03",2,3434.0,56565,3,9,9,0);
INSERT INTO books VALUES(1,"2018-01-04",3,2026131.0,4354,7,4,0,0);
INSERT INTO books VALUES(1,"2018-01-05",4,3434.0,34534,8,3,0,0);
INSERT INTO books VALUES(1,"2018-01-06",5,1008850.0,435545,8,3,10,0);*/