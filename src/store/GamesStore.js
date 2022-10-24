import { defineStore } from "pinia";

export const gamesStore = defineStore("games", {
  state: () => ({
    showtoc: false,
    isquickpick: false,
    ismuted: false,
    iseighteen: false,
    showfireball: false,
    showresults: false,
    fireballselected: false, // true if fireball is selected
    picks: [null, null, null],
    fireball: null,
    fbchecked: false, 
    loser: null,
    presentgame: null, // exact or any
    presentrules: null, // diff, same, 2 or 1
    prizemoney: 0,
    fireprizemoney: 0,
    playedexact: 0,
    playedany: 0,
    winpercentage: null,
    finalwinners: [null, null, null],
    finalfireball: null,
    gamerules: [
      {
        id: 0,
        instructions1: "Select your numbers,",
        instructions2: "one per row.",
        gamenote:
          "Explainer text about not being able to select the same number more than once...",
      },
      {
        id: 1,
        instructions1: "Select your numbers,",
        instructions2: "All three numbers should be the same.",
        gamenote:
          "Explainer text about having to select the exact same number across the board...",
      },
      {
        id: 2,
        instructions1: "For this game,",
        instructions2: "choose two of the same and one that is different.",
        gamenote:
          "Explainer text about having different numbers across the board...",
      },
    ],
  }),
  actions: {
    toggleTOC() {
      this.showtoc = !this.showtoc
    },
    confirmEighteen() {
      this.iseighteen = true;
    },
    setPresentGame(game) {
      this.resetPicksAndFireball();
      this.presentgame = game;
    },
    showFireball() {
      this.showfireball = true;
    },
    hideFireball() {
      this.showfireball = false;
    },
    useFireball() {
      this.fireballselected = true;
      if (this.presentgame === "exact" && this.presentrules == 0) {
        this.fireprizemoney = 180;
      } else if (this.presentgame === "exact" && this.presentrules == 1) {
        this.fireprizemoney = 540;      
      } else if (this.presentgame === "any" && this.presentrules == 0) {
        this.fireprizemoney = 30;
      } else if (this.presentgame === "any" && this.presentrules == 2) {
        this.fireprizemoney = 60;
      } 
    },
    noFireball() {
      this.fireballselected = false;
    },
    resetPicksAndFireball() {
      this.picks = [null, null, null];
      this.fireball = null;
      this.loser = null;
      this.showresults = false;
      this.presentrules = null;
      this.presentgame = null;
      this.showfireball = false;
      this.prizemoney = 0;      
      this.fireprizemoney = 0;
      this.winpercentage = null;
      this.finalwinners = [null, null, null];
      this.finalfireball = null;
      this.isquickpick = false; 
      this.fbchecked = false;
    },
    selectNum(num, slot) {
      this.picks[slot] = num;
    },
    setSame(num) {
      this.picks = [num, num, num];
    },
    genFireball() {
      let num = Math.floor(Math.random() * 10);
      if (this.picks.includes(num)) {
        this.genFireball();
      } else {
        this.fireball = num;
      }
    },
    randomNums() {
      const random = () => {
        return Math.floor(Math.random() * 10);
      };
      const randomArray = () => {
        const arr = [];
        for (let i = 0; i < 3; i++) {
          let num = random();
          while (arr.includes(num)) {
            num = random();
          }
          arr.push(num);
        }
        return arr;
      };
      const arr = randomArray();
      this.picks = arr;
    },
    randomTwoNums() {
      const random = () => {
        return Math.floor(Math.random() * 10);
      };
      const randomArray = () => {
        const arr = [];
        for (let i = 0; i < 2; i++) {
          let num = random();
          while (arr.includes(num)) {
            num = random();
          }
          arr.push(num);
        }
        return arr;
      };
      let arr = randomArray();
      arr.unshift(arr[0]);
      this.picks = arr;
    },
    showResults() {
      this.showresults = true;
    },
    hideResults() {
      this.showresults = false;
    },
    setPresentRules(rules) {
      this.presentrules = rules;
      //set prize money
      if (this.presentgame === "exact" && rules == 0) {
        this.prizemoney = 500;
      } else if (this.presentgame === "exact" && rules == 1) {
        this.prizemoney = 500;      
      } else if (this.presentgame === "any" && rules == 0) {
        this.prizemoney = 80;
      } else if (this.presentgame === "any" && rules == 2) {
        this.prizemoney = 160;
      } 
    },
    exactIncrement() {
      this.playedexact++;
    },
    anyIncrement() {
      this.playedany++;
    },
    setWinPercentage() {
      if (this.presentgame === "exact" && this.playedexact == 0) {
        this.winpercentage = 20;
        this.playedexact++;
      } else if (this.presentgame === "any" && this.playedany == 0) {
        this.winpercentage = 20;
        this.playedany++;
      } else {
        this.winpercentage = Math.floor(Math.random() * 100)
      }
      // this.winpercentage = 24
    },
    genLoser() {
      let num = Math.floor(Math.random() * 10) + 1;
      if (this.picks.includes(num) || this.fireball === num) {
        this.genLoser();
      } else {
        this.loser = num;
      }
    },
    changeWinnerToFireball(num) {
      this.finalwinners[num] = this.finalfireball;
    },
    toggleMute() {
      this.ismuted = !this.ismuted;
    },
    isQuickPick() {
      this.isquickpick = true;
    },
    isNotQuickPick() {
      this.isquickpick = false;
    },
    fbCheckedToggle() {
      this.fbchecked = !this.fbchecked;
    }
  },
});
