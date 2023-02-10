USE [master]

IF db_id('ChuckleBucket') IS NULL
  CREATE DATABASE [ChuckleBucket]
GO

USE [ChuckleBucket]
GO

DROP TABLE IF EXISTS [JokeTag];
DROP TABLE IF EXISTS [Laugh];
DROP TABLE IF EXISTS [Tag];
DROP TABLE IF EXISTS [Joke];
DROP TABLE IF EXISTS [UserProfile];
DROP TABLE IF EXISTS [UserRole];
DROP TABLE IF EXISTS [Category];



GO


CREATE TABLE [Joke] (
  [Id] int PRIMARY KEY IDENTITY(1, 1),
  [Text] nvarchar(4000) NOT NULL,
  [UserProfileId] int NOT NULL,
  [CategoryId] int NOT NULL,
  [DateCreated] datetime NOT NULL
)
GO

CREATE TABLE [UserProfile] (
  [Id] int PRIMARY KEY IDENTITY(1, 1),
  [FirebaseUserId] nvarchar(255) UNIQUE NOT NULL,
  [DisplayName] nvarchar(255) NOT NULL,
  [FirstName] nvarchar(255) NOT NULL,
  [LastName] nvarchar(255) NOT NULL,
  [Email] nvarchar(255) NOT NULL,
  [ImageLocation] nvarchar(255),
  [UserRoleId] int NOT NULL,
  [Activated] bit NOT NULL DEFAULT (1)
)
GO

CREATE TABLE [UserRole] (
  [Id] int PRIMARY KEY IDENTITY(1, 1),
  [Name] nvarchar(255) NOT NULL
)
GO

CREATE TABLE [Category] (
  [Id] int PRIMARY KEY IDENTITY(1, 1),
  [Name] nvarchar(255) NOT NULL
)
GO

CREATE TABLE [Tag] (
  [Id] int PRIMARY KEY IDENTITY(1, 1),
  [Name] nvarchar(255) NOT NULL
)
GO

CREATE TABLE [JokeTag] (
  [Id] int PRIMARY KEY IDENTITY(1, 1),
  [JokeId] int NOT NULL,
  [TagId] int NOT NULL
)
GO

CREATE TABLE [Laugh] (
  [Id] int PRIMARY KEY IDENTITY(1, 1),
  [JokeId] int NOT NULL,
  [UserProfileId] int NOT NULL
)
GO

ALTER TABLE [Joke] ADD FOREIGN KEY ([UserProfileId]) REFERENCES [UserProfile] ([Id])
GO

ALTER TABLE [Joke] ADD FOREIGN KEY ([CategoryId]) REFERENCES [Category] ([Id])
GO

ALTER TABLE [JokeTag] ADD FOREIGN KEY ([JokeId]) REFERENCES [Joke] ([Id]) ON DELETE CASCADE
GO

ALTER TABLE [JokeTag] ADD FOREIGN KEY ([TagId]) REFERENCES [Tag] ([Id]) ON DELETE CASCADE
GO

ALTER TABLE [UserProfile] ADD FOREIGN KEY ([UserRoleId]) REFERENCES [UserRole] ([Id])
GO

ALTER TABLE [Laugh] ADD FOREIGN KEY ([UserProfileId]) REFERENCES [UserProfile] ([Id]) ON DELETE CASCADE
GO

ALTER TABLE [Laugh] ADD FOREIGN KEY ([JokeId]) REFERENCES [Joke] ([Id]) ON DELETE CASCADE
GO

ALTER TABLE [Laugh] ADD CONSTRAINT UC_Laugh UNIQUE (JokeId, UserProfileId)
GO
