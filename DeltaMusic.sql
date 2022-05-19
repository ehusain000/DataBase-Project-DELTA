/* Authors: Thierno DIallo, Jinho (David) Seo, Leah Meza, and Eftekher Hussain.
*  Team Name: Team DELTA
*  Database: DeltaMusic
*/ 

CREATE DATABASE DeltaMusic;
USE DeltaMusic;

CREATE TABLE Users(
	userID INT AUTO_INCREMENT PRIMARY KEY,
	username VARCHAR(255) NOT NULL,
	password VARCHAR(255) NOT NULL,
	email VARCHAR(255),
	firstName VARCHAR(225),
	lastName VARCHAR(225)

);

CREATE TABLE Artists(
	artistID INT PRIMARY KEY,
	name VARCHAR(225)
);

CREATE TABLE Albums(
	albumID INT PRIMARY KEY,
	name VARCHAR(225),
	relYear INT
);

CREATE TABLE Genres(
	genreID INT PRIMARY KEY,
	name VARCHAR(255)
);

CREATE TABLE Tracks(
	trackID INT PRIMARY KEY,
	artistID INT NOT NULL,
	name VARCHAR(255) NOT NULL,
	albumID INT,
	genreID INT, 
	fileDir VARCHAR(255),
	FOREIGN KEY (artistID) REFERENCES Artists(artistID),
	FOREIGN KEY (albumID) REFERENCES Albums(albumID),
	FOREIGN KEY (genreID) REFERENCES Genres(genreID)
);
CREATE TABLE Libraries(
	libraryID INT NOT NULL PRIMARY KEY,
	userID INT NOT NULL,
	trackID INT NOT NULL,
	FOREIGN KEY (userID) REFERENCES Users(userID),
	FOREIGN KEY (trackID) REFERENCES Tracks(trackID)
);

CREATE TABLE Playlists(
	playlistID INT AUTO_INCREMENT PRIMARY KEY ,
	libraryID INT NOT NULL,
	name VARCHAR(255),
	FOREIGN KEY (libraryID) REFERENCES Libraries(libraryID)
);

CREATE TABLE Play_Tracks(
	playlistID INT NOT NULL,
	trackID INT NOT NULL,
	CONSTRAINT PT_PLAYTRACK PRIMARY KEY (playlistID, trackID),
	FOREIGN KEY (playlistID) REFERENCES Playlists(playlistID),
	FOREIGN KEY (trackID) REFERENCES Tracks(trackID)
);

/* Six Genres */
INSERT INTO Genres (genreID, name)
VALUES (01, 'Pop');
INSERT INTO Genres (genreID, name)
VALUES (02, 'Rock');
INSERT INTO Genres (genreID, name)
VALUES (03, 'Alternative');
INSERT INTO Genres (genreID, name)
VALUES (04, 'Hip Hop');
INSERT INTO Genres (genreID, name)
VALUES (05, 'Rap');
INSERT INTO Genres (genreID, name)
VALUES (06, 'R&B');

/* Two Users so far (different subscription levels) */
INSERT INTO Users (userID, username, password, firstName, lastName, email)
VALUES ('', 'deltaStand', 'delta1234', 'L', 'M', 'e@mail');
INSERT INTO Users (userID, username, password, firstName, lastName, email)
VALUES ('', 'deltaPrem', 'delta1234', 'D', 'S', 'e@mail');

/* Three Artists Added */
INSERT INTO Artists (artistID, name)
VALUES (1, 'Meek Mill');
INSERT INTO Albums (albumID, name, relYear)
VALUES (1, 'Championships', 2018);
INSERT INTO Tracks (trackID, artistID, albumID, genreID, fileDir, name)
VALUES (1, 1, 1, 04, 'file directory', 'Going Bad (feat. Drake)');

INSERT INTO Artists (artistID, name)
VALUES (2, 'Kehlani');
INSERT INTO Albums (albumID, name, relYear)
VALUES (2, 'While We Wait', 2019);
INSERT INTO Tracks (trackID, artistID, albumID, genreID, fileDir, name)
VALUES (2, 2, 2, 06, 'file directory', 'Nights Like This (feat. Ty Dolla Sign)');

INSERT INTO Artists (artistID, name)
VALUES (3, 'Miguel');
INSERT INTO Albums (albumID, name, relYear)
VALUES (3, 'War & Leisure', 2017);
INSERT INTO Tracks (trackID, artistID, albumID, genreID, fileDir, name)
VALUES (3, 3, 3, 06, 'file directory', 'Come Through and Chill (feat. J.Cole & Salaam Remi)');

/* Project tables so far */ 
SELECT * FROM Users;
SELECT * FROM Genres;
SELECT * FROM Artists;
SELECT * FROM Albums;

/* List all track names */
SELECT name FROM Tracks;

/* Insert (download) these two tracks into userID[1] library */
INSERT INTO Libraries (libraryID, trackID, userID)
VALUES (1, 2, 1);
INSERT INTO Libraries (libraryID, trackID, userID)
VALUES (2, 3, 1);

/* List all track names that are on userID[1] personal library */ 
SELECT name FROM Libraries 
	INNER JOIN Tracks ON Libraries.trackID=Tracks.trackID;

