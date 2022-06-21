# Capstone-Proj (Plan-A-Trip) 

This web application allows users to create custom itineraries for their trips! 

Front-end is built using React.js and Material UI Back-end is built using mongoDB, mongoose, express, and node.js 

This app uses the Google Maps API. Users can search for places using the search bar to add stops to their itineraries. These stops can be organized into dates that are determined by the user. The drag and drop feature makes it easy to reorder the stops on their itineraries! 

Places that are added to the itineraries appear as cards containing important information such as: hours of operation, the website for the place if available, and an image which can be cycled through by clicking on it. 

Added places will also appear on the map as markers which can be clicked to populate more information about the place. 

Although an itinerary can be made without the user logging in, the itinerary will not be saved without a user logged in. The user can choose to save their itinerary at any point by logging in or creating a new account. A user can have multiple itineraries saved once logged in. 

# Features for the future 
- Reduce the amount of times the backend communicates with the database. 
- Allow users to add custom comments to each place 
- Make autocomplete search results catered to initial location information