## NCEL - '**Pick 3 with Fireball'** learning App.

This application, is a restricted-width education platform to teach users how to play Pick 3 with Fireball. It is divided into two main features: a video player with motion graphic videos that walk players through the rules and requirements for Pick 3 with Fireball, and a  tutorial example play system, that allows players to simulate gameplay. 

---

### Technical details

This application is built in Vue 3 with Vite.

#### Recommended IDE Setup

[VSCode](https://code.visualstudio.com/) + [Volar](https://marketplace.visualstudio.com/items?itemName=Vue.volar) (and disable Vetur) + [TypeScript Vue Plugin (Volar)](https://marketplace.visualstudio.com/items?itemName=Vue.vscode-typescript-vue-plugin).

## Customize configuration

See [Vite Configuration Reference](https://vitejs.dev/config/).

## Project Setup

```css
npm install
```

### Compile and Hot-Reload for Development

```css
npm run dev
```

### Compile and Minify for Production

```css
npm run build
```

---

## App Systems

Router - [Vue Router](https://router.vuejs.org/)

State Management - [Pinia](https://pinia.vuejs.org/)

Animation Engine - [Green Sock Animation Platform](https://greensock.com/)

Particle Emitter - [TsParticles](https://particles.js.org/)

---

#### App.vue - 

Sound Effects are loaded as mp3s and triggered using the SFX composable for management. Background music is handled in App.vue along with the controls for play/pause, etc. 

Animations are primarily loaded in the individual components - triggered by onMount calls for the most part. 

The Aspect ratio is to stay the same regardless of screen size. this is controlled by a function located in App.vue. 

---
#### views/Tutorial.vue

The Tutorials system all uses State on this page to run the system. You will see the entire library saved here in state.tuts array. This is where a majority of the controls for this system are written. 

One interesting piece of this has a second video loader along with the one that is being shown, The purpose of this is to work around the slow load, and have the next video in line be preloaded. This video is never shown or played, it's just a load system.

---
#### views/GameDemo.vue

The Game Demo system relies heavily on the Pinia state storage to control the variables that decide the outcome. 

#### store>GameStore.js

you will see most of the variables that the different components use to determine the functionality. here is a list and a quick definition of these store variables. 

*   **showtoc** - This is a store that controls the video tutorial portion of the app. It shows/hides the table of contents of the different videos.
*   **isquickpick** - a boolean that determines if quick pick has been selected so that the checkboxes can be checked or unchecked based on the selection
*   **ismuted** - a sound controller to turn on and off global sound
*   **iseighteen** - a boolean that is set to true when the user confirms they are eighteen - asked and answered once per session
*   **showfireball** - During gameplay, this shows the fireball selection screen - ask of the person wants to add fireball.
*   **showresults** - This boolean switches over when the results after the gameplay had been selected and it now shows the result animations
*   **fireballselected** - if 'fireball' is part of this gameplay
*   **picks** - an array of numbers that are selected by the user - or by quick pick. (the player's numbers)
*   **fireball** - the fireball number
*   **fbchecked** - boolean to show if fireball has been selected
*   loser - in the case that the player loses the game - this is a number selected at random that is not the fireball or the select played a number that can be used to illustrate it's a loss.
*   **presentgame** - this is the selection of either 'exact' or 'any' based on the user's choice.
*   **presentrules** - this is a selection of 'different', 'same', or '2 and 1' that allow for the rules of what is selected - example: are all the same numbers chosen?
*   **prizemoney** - money that's won based on the gameplay.
*   **fireprizemoney** - money prize won by hitting a fireball.
*   **playedexact** & **playedany** - a count of how many times these games have been played. - this exists so we can guarantee the first play of each of these systems is a win.
*   **winpercentage** - this is a randomly generated number between 1 - 100 that represents the chance of the player winning, winning fireball, winning both, or losing. 
*   **fireballwinners** - this is an array of the 'drawn' numbers. randomly generated on 
*   **gamerules** - an array of objects that was originally used to load on the strings of instructions.


### CalcWinners Composable

The CalcWinner composable is a centerpiece of the game in that: it runs the winning percentage action, and generates the numbers associated with it based on the random numbers that have been generated based on the selected rules. It's a series of conditionals that have been built out as the rules complications grew. It can most definitely be refactored into a cleaner system but right now works as intended. 

### Components and definitions 

#### Misc Components

*   **BgStars -** Scrolling animation stars background. it accepts color differences and shows what color based on that.
*   **Sphere** - Opening sphere animation.  

#### Tutorial system

*   **VideoPlayer -** Component which holds the video player structure and pulls in the variables to show the video.
*   ProgressBar - This displays the progress bars for the videos and how much is shown per. 

#### Game Play Select System

*   **EighteenModal -** This is the view that asks for age verification.
*   **GameFrame** -  Game Frame is the view that loads on the questions of gameplay rules, loads on modals, and popups, and walks thru the game play system
*   **GameBoard** - This is the reactive game board, and allows selections based on rules selected. 
*   **PrizeModal** & **Protip Modal** - These are the views that are selectable with the pro tip and prize buttons - and what is shown based on what step the player is on.

---
#### Game Play Results System

*   **PlayResults -** This is a final step view before moving thru the results pattern
*   **Winner -** This is probably one of the more complicated pieces - based on the winpercentage - 
    *   This is the primary animation system for the balls being drawn.
    *   The calculation of numbers and win percentage happens on mount
    *   Based on these numbers the full win / lose and fireball systems are set and then animate based on the selections. 
    *   After this shows, and depending on what was the result -> the final screen system is shown. These are held in individual components.
        *   **WinnerFlourish** - This is the animated winner with trumpet view
        *   **RewardScreen** - this shows the amount won
        *   **BetterLuck** - this shows a missed value screen
        *   **LoseFireball** - this shows if the fireball was a loss
        *   **FireballReward** - this shows if fireball was a won with a money amount
        *   **Total Reward** - this animates the addition of the two winning numbers together
        *   **Final Screen** \- is a 'next step' screen with three options.