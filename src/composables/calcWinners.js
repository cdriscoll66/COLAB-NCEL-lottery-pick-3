import { gamesStore } from "@/store/GamesStore";

const store = gamesStore();

export function calcWinners() {
  store.setWinPercentage();
  store.genLoser();
  console.log(store.winpercentage);
  if (store.fireballselected === false) {
    if (store.presentgame === "exact") {
      if (store.winpercentage < 75) {
        store.finalwinners = store.picks;
      } else {
        store.finalwinners = [store.picks[0], store.picks[1], store.fireball];
      }
    } else {
      if (store.winpercentage < 75) {
        store.finalwinners = [store.picks[2], store.picks[0], store.picks[1]];
      } else {
        store.finalwinners = [store.picks[2], store.picks[0], store.fireball];
      }
    }
  } else {
    if (store.presentgame === "exact") {
      if (store.winpercentage < 25) {
        store.finalwinners = store.picks;
        store.finalfireball = store.picks[2];
      } else if (store.winpercentage < 50) {
        store.finalwinners = [store.picks[0], store.picks[1], store.fireball];
        store.finalfireball = store.picks[2];
      } else if (store.winpercentage < 75) {
        store.finalwinners = store.picks;
        store.finalfireball = store.fireball;
      } else {
        store.finalwinners = [store.picks[0], store.picks[1], store.loser];
        store.finalfireball = store.fireball;
      }
    } else if (store.presentgame === "any") {
      if (store.winpercentage < 25) {
        store.finalwinners = [store.picks[2], store.picks[0], store.picks[1]];
        store.finalfireball = store.picks[1];
      } else if (store.winpercentage < 50) {
        store.finalwinners = [store.picks[2], store.picks[0], store.fireball ];
        store.finalfireball = store.picks[1];
      } else if (store.winpercentage < 75) {
        store.finalwinners = [store.picks[2], store.picks[0], store.picks[1]];
        store.finalfireball = store.fireball;
      } else {
        store.finalwinners = [store.picks[2], store.picks[0], store.loser];
        store.finalfireball = store.fireball;
      }
    }
  }
}
