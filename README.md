# Team 35 Project 1 - Event Handler!
This application grabs events from the Ticketmaster Discovery API. The user can select a country which they want to see events for and can click on an event to get more information about it. The user may also favourite an event which gives it a nifty star in the event list! 

The app's design is inspired by good old MS-DOS, Minecraft and Windows 95, now fully reimagined in a responsive React-based application! 

# User setup
## Adding environment variables

To use the app you need a ticketmaster API key. To get a key you need to go to the Ticketmaster Discovery API Explorer page. Then put the key into a `.env` file in the root folder of the project.

If you're unable to get a key of your own, you may use this one: 7elxdku9GGG5k8j0Xm8KWdANDgecHMV0

```
# file: .env

VITE_TICKETMASTER_KEY=your_api_key

```

## Completed user stories / issues
1. As a user I want to see all events for a given country to see what is happening

2. As a user I want to be able to mark an event as favourite to find it again later

3. As a user I want to be able to find all events I have marked as favourite to find the events that interest me

4. As a user I want to see information about a specific event to decide if it's worth going to

   6\. Add React Router

   7\. Add TanStack Query

   8\. Configure ESLint

## Uncompleted user story
5. As a user I want to find all events in a given radius around me to see what is nearby

We decided to prioritize other user stories / issues as they still fulfill the functional requirements for project 1 and we did not consider this feature essential.

# Testing
We decided to try out different types of tests in this project as suggested by the subject manager on Piazza.
Therefore our tests consist of a snapshot test, mock tests and a user interface test as well as a generic test to ensure Vitest is running properly. 

# Supported devices
We've tested the application on the following devices/browsers:
1. Windows PC (Acer Swift 3) running Google Chrome
2. iPhone 14 Pro Max running Google Chrome, Safari and Messenger Browser
3. iPhone XR running Google Chrome
4. Linux PC running Google Chrome
