USE [ChuckleBucket];
GO

set identity_insert [Category] on
insert into [Category] ([Id], [Name]) VALUES (1, 'Story'), (2, 'Chuck Norris'), (3, 'Knock Knock'), (4, 'Why?'), 
(5,'Yo Momma'),(6,'What do you get');
set identity_insert [Category] off

set identity_insert [UserRole] on
insert into [UserRole] ([Id], [Name]) VALUES (1, 'Admin'), (2, 'Author');
set identity_insert [UserRole] off

set identity_insert [UserProfile] on
insert into [UserProfile] ([Id], [FirebaseUserId], [DisplayName], [FirstName], [LastName], [Email], [ImageLocation], [UserRoleId], [Activated]) VALUES (1, 'uCSDrxDj3he1zFFxwWHg2rKVJmf1', 'JT', 'Jake', 'Thompson', 'jttest@email.com', NULL, 1, 1);
insert into [UserProfile] ([Id], [FirebaseUserId], [DisplayName], [FirstName], [LastName], [Email], [ImageLocation], [UserRoleId], [Activated]) VALUES (2, 'XPvL1ghhdeeoWayT7CFBxdjQt4i1', 'Bobbo9', 'Bob', 'Bobman', 'bobbo@email.com', NULL, 2, 1);
insert into [UserProfile] ([Id], [FirebaseUserId], [DisplayName], [FirstName], [LastName], [Email], [ImageLocation], [UserRoleId], [Activated]) VALUES (3, 'd;aloiuf89ghhdlkhlddslkhdlkl', 'durdur', 'Rachel', 'Smith', 'rgirl@email.com', NULL, 2, 1);
insert into [UserProfile] ([Id], [FirebaseUserId], [DisplayName], [FirstName], [LastName], [Email], [ImageLocation], [UserRoleId], [Activated]) VALUES (4, 'thtisjishfnotdjlrealkdfidkdl', 'pottyMouth', 'Henry', 'Porter', 'henria@email.com', NULL, 2, 1);
set identity_insert [UserProfile] off

set identity_insert [Joke] on
insert into [Joke] ([Id], [Text], [UserProfileId], [CategoryId], [DateCreated]) VALUES (1, 'This is a story joke about two guys.  One was a moron. The end.', 2, 1, '2019-08-16');
insert into [Joke] ([Id], [Text], [UserProfileId], [CategoryId], [DateCreated]) VALUES (2, 'Chuck Norris is so Chuck Norris he scares Chuck Norris.', 2, 2, '2019-12-16');
insert into [Joke] ([Id], [Text], [UserProfileId], [CategoryId], [DateCreated]) VALUES (3, 'Knock Knock.  Who is there? Bad joke.', 4, 3, '2019-08-16');
insert into [Joke] ([Id], [Text], [UserProfileId], [CategoryId], [DateCreated]) VALUES (4, 'Why did the chicken cross the road?  You already know this.', 3, 4, '2021-08-16');
insert into [Joke] ([Id], [Text], [UserProfileId], [CategoryId], [DateCreated]) VALUES (5, 'Yo momma so ugly, she makes this joke look good.', 2, 5, '2020-08-01');
insert into [Joke] ([Id], [Text], [UserProfileId], [CategoryId], [DateCreated]) VALUES (6, 'What do you get when you cross this with that? Something.', 3, 6, '2017-11-22');
insert into [Joke] ([Id], [Text], [UserProfileId], [CategoryId], [DateCreated]) VALUES (7, 'Knock knock this is a knock knock joke.  You lose.', 4, 3, '2019-08-16');
insert into [Joke] ([Id], [Text], [UserProfileId], [CategoryId], [DateCreated]) VALUES (8, 'How much Chuck could a Chuck Norris chuck if a Chuck Norris could chuck Chuck?', 3, 2, '2022-12-20');
insert into [Joke] ([Id], [Text], [UserProfileId], [CategoryId], [DateCreated]) VALUES (9, 'Yo momma... you get the idea.', 2, 5, '2020-03-07');
insert into [Joke] ([Id], [Text], [UserProfileId], [CategoryId], [DateCreated]) VALUES (10, 'This is a story joke bla bla bla a rabbit and a monkey the end.', 3, 1, '2021-09-30');
set identity_insert [Joke] off

set identity_insert [Tag] on
insert into [Tag] ([Id], [Name]) VALUES (1, 'political'), (2, 'dirty'), (3, 'dad joke');
set identity_insert [Tag] off

