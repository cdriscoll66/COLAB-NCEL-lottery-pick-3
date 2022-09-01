import { defineStore } from "pinia";

export const gamesStore = defineStore("games", {
  state: () => ({
    count: 0,
    iseighteen: false,
    showfireball: false,
    showresults: false,
    fireballselected: false,
    picks: [null, null, null],
    fireball: null,
    presentgame: null,
    presentrules: null,
    prizemoney: 0,
    gamerules: [
      {
        id: 0,
        instructions1: "Select Your Numbers,",
        instructions2: "one per row.",
        gamenote:
          "Explainer text about not being able to select the same number more than once...",
      },
      {
        id: 1,
        instructions1: "Select Your Numbers,",
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
    increment() {
      this.count++;
    },
    confirmEighteen() {
      this.iseighteen = true;
    },
    setPresentGame(game) {
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
    },
    noFireball() {
      this.fireballselected = false;
    },
    resetPicksAndFireball() {
      this.picks = [null, null, null];
      this.fireball = null;
      this.showresults = false;
      this.presentrules = null;
      this.presentgame = null;
      this.showfireball = false;
      this.prizemoney = 0;

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
      if (this.presentgame === "exact") {
        this.prizemoney = 180;
      } else if (this.presentgame === "any" && rules == 0) {
        this.prizemoney = 30;
      } else if (this.presentgame === "any" && rules == 2) {
        this.prizemoney = 60;
      } else if (this.presentgame === "fifty" && rules == 0) {
        this.prizemoney = 15;
      } else if (this.presentgame === "fifty" && rules == 2) {
        this.prizemoney = 30;
      }
    },
  },
});
