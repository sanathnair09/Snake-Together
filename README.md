# Snake-Together
Hack for the Snakes and Hackers MLH Hackathon

## Inspiration

The biggest inspiration for our game was the original javascript snake game where users would control a “snake” and eat “apples” to grow longer while not hitting the edges or dying. We wanted our game to have a similar core idea but add additional features that would make the game more interesting and fun to play. We decided that we wanted to make a multiplayer game capture the flag style game with powerups since most games nowadays are multiplayer and have abilities that allow the game to dynamically change based on user interaction.

## What it does

Snake Together is a multiplayer game capture the flag game that allows groups of 6 people to play in two teams of 3. Users are first entered into a lobby where they can wait for other players to join. Once 6 people join the game automatically starts for everyone. Users start by spawning near their base and use the WASD keys to control their snake. They can then move to collect normal apples or special powerups that give the users special abilities. The four power ups currently available are shield, growth, speed, and wall breaking. If they collect any of the powerups the ability is automatically activated and players can then use the ability to their advantage either by stopping enemies or getting their flag to end the game. To make the game even more challenging we added obstacles that players have to avoid or else they will die and respawn. In addition if an enemy collides with your body then they will die and respawn near their base causing players to be aware about the location of their enemies and walls at the same time. The first team that is successfully able to get their enemies flags into their own base will win the game. 

## How we built it

We built the game using **nodejs**, **express**, **socket.io**, and **phaser** a javascript game library. The web server was created using **express** which allows anyone with the link to connect to our game. We used **nodejs** for the backend logic where we would manage concurrent games, realtime updates, and other various checks for our game to make sure that all players are getting the same information. We used **socket.io** to create websockets and separate rooms for each game where users could join in. We also used websockets to establish a connection between the client and the server that allows for a real time multiplayer experience. The client side was built with **phaser** where we would display the map, different players, obstacles, and other information like collisions that were received from the backend server.  

## Challenges we ran into

We ran into multiple challenges while developing Snake Together, the biggest one being implementing the multiplayer aspect of the game. We started our game by making it work for one player and then added multiplayer functionality however, when we did this much of our code broke because we needed to do various additional checks like collisions with other players and updating the placement of objects on the board. After lots of debugging we were slowly able to get each feature working for the multiplayer game. Another challenge that we faced was establishing what tasks the server should take care of and what should be done on the client. We eventually decided to do all collisions and updatingBoard positions on the server side since we needed to share that data among all the players in the game and also to prevent any player from manipulating the code to their advantage. 

## Accomplishments that we are proud of

Our greatest accomplishment is making the multiplayer work with up to 6 players and having multiple games work concurrently. Our first multiplayer game was only between two people and would only load one game at a time. We challenged ourselves to design our code so that multiple people could simultaneously play our game and include more people so that the game experience is more enjoyable. 

## What we learned

We learned alot about nodejs and how to create web servers and websockets to establish connections with multiple clients. This was our first time working with nodejs and express so it was difficult at first establishing a server client connection but once we got that working we were able to quickly get the websockets up and running and eventually the multiplayer game. We also learned a lot more about phaserjs and the different capabilities that it has.

## Whats next for Snake Together

The next step for Snake Together is to increase the amount of people in one game so that bigger groups can play. We would also want to add a feature that would allow people to create a custom room for themselves and share that code with others so that they don’t have to wait for other people to join. In addition we would want to create different maps that people could choose from and other powerups that would make the gameplay even more interesting. Possibly deploying the game to a proper server to allow for even more people to connect while not sacrificing on the quality.
