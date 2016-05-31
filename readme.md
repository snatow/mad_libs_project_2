## Mad Libs With Pictures

[Mad Libs With Pictures](http://mad-libs-pics.herokuapp.com/mad-libs)

### Description
Mad Libs is a template word game where one player prompts others for a list of words to substitute for blanks in a story, before reading the – often comical or nonsensical – story aloud. This web app rendition of the game populates the story for the players and decorates the page with four images pulled at random from Flickr that are thematically related to the content of the story. 

### Tech Used
- HTML
- CSS
- EJS
- Node.js
- Express.js
- Flickr API

### Features
- Users are given a choice of four different mad libs from which they can choose by clicking on their titles
- Once clicked, these links will route the User to a form with inputs for all of the missing words labeled with their parts of speech. Once the form is completed, the user will click the Submit button to add their version of the mad lib to the database. This will bring the user to the index page - they will be able to find their newly created mad lib in the list of Previously Created Mad Libs by title, time and date.
- Users can view previously created and saved mad libs from the index page of the app, edit those mad libs from their show pages and save those edits, and delete them from the database on the individual page's edit page. 

### Initial Approach
- First, I built a test application to establish a working connection with the Flickr API
- Next, I built a working CRUD application to mimic the activities of mad libs
- Finally, I integrated the Flickr API into the create route to add random images to the page

### Future Implementations, Issues I would like to address if given more time
- I am currently using the id number of the specific record in my database in the URI, which is preventing me from directing the user to the show page for that mad lib right off of the bat. As I am not currently aware of a unique identifier that is available in the req.body object prior to saving it to the database, I cannot redirect the user to the show page initially. This would be the ideal user experience.
- I would also like to add a user log in to segregate mad libs created by each individual user from one another. Presently, anyone who visits the site has full crud capabilities for any record that exists in the database.

