# Introduction

Chuckle Bucket is an application that allows users to view, share, and rank jokes.



# Purpose and Motivation

Chuckle Bucket was made so that people could have a place to go whenever they feel
the need to use jokes, or just have a laugh.  The ability for users to "laugh" at
jokes and then sort jokes by the number of laughs makes it easier for users to 
find jokes that are actually funny.  It also provides a way for people to share	
their own jokes and guage how funny they actually are by how many laughs they get.



# How It Works

## Login

Once registered, a user logs in using their email and a password.


## Viewing Jokes

This is an application all about jokes, so there are many ways to view them. Upon
logging in, the first view is a list of all jokes by all authors, sorted by most
recent.  

By clicking on an author's name (listed on every joke), the user may view jokes
by that author alone.

By clicking on a category name (listed on every joke, and on the Categories view 
accesible from the navbar) the user can view all jokes for that category alone.  
Jokes may only have a single category. 

By clicking on the My Jokes link on the navbar, the user can view a list of only
the jokes they have posted. This view also has a button at the top called Favorites.
Clicking the favorites button will take the user to a view of all jokes they have
previously "laughed" at using the laugh button described below.

All jokes on all views can be sorted according to number of laughs rather than most
recent.  There is a toggle button at the top of the view which stated the method
of sorting being used.


## Laugh at Jokes

The "Laugh" feature is how jokes are evaluated by the sites users.  Every joke has
a button that says "Laugh".  By clicking this button, a user is both evaluating
the joke as funny and adding it to their favorites, which can be reached from the
"My Jokes" view as described above. The button also has a counter displaying the
total number of laughs it has received. 

Once a joke has been laughed at, the button will change color to ligh blue and the
button text will say "Laughed" instead.  By clicking this button again, the "Laugh"
is removed, thus lowering the laugh counter and removing the joke from Favorites.


## Creating a Joke

Users have the ability to create and post new jokes to the site.  This is done by
going to the My Jokes view and clicking the Create New button, filling out the 
fields and clicking "Submit".  


## Editing a Joke

Users can edit their own jokes.  A jokes edit button appears on the joke if it 
to the current user, no matter which view the user is currently on. Clicking
this button takes the user to the Edit Joke form.  They can make changes to the
joke text and category and then click "Submit" to save the changes.


## Deleting a Joke

From the above mentioned Edit Joke form, the user can click the Delete button to
delete the joke permanently. A confirmation will appear before completing this
action.


## User Profile

A user can view their own profile details by clicking the My Profile link in the
navbar.  They can make changes to their display name, first and last names, and
their profile picture by clicking the edit button below.



# How Chuckle Bucket was Developed

Chuckle Bucket was developed by me (Jacob Thomas) as a school project.

ERD
![](/ChuckleBucket.png)
***Please note that the Tag and JokeTag tables, as well as the UserRole table and
Activated property on UserProfile were all included for future development
purposes.


The front end was developed using React and React-router-dom, with Reactstrap for 
styling. The Login and Register components as well as the authManager module were
mostly borrowed code from Nashville Software School.  

Firebase was used for Authentication, using the borrowed code mentioned above to 
get it working.

The back end is a Web API developed using ASP.NET in C#.  For the database I used
SQL Server.  ADO.NET was used to communicate with the database.



# How to Install and Run

You will need to have SQL Server installed to run this application. You will also
need to setup your own Firebase project to use with this application as well.

After cloning the repository to your machine, go ahead and run the SQL create 
script found in ChuckleBucket/SQL, followed by the seed script.

After setting up your database, you will need to change some files.  First, in 
appsettings.json, make sure your default connection string is set up to connect
to your database.  Then add your Firebase project ID. Then move insided the client
directory and make sure you have a file named .env with the Web API key for your
Firebase project.

After this, navigate to the ChuckleBucket/ChuckleBucket/client directory in your 
terminal.  Then run the command "npm install".

With all of this setup out of the way, run the server, and then run the react
app using "npm start".

