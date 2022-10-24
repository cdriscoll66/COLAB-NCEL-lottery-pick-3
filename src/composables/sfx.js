// const click = new Audio('../audio/sprite/button_click.mp3');
// const bubble = new Audio('../audio/sprite/bubble-pop.mp3');
// const jackpot = new Audio('../audio/sprite/jackpot.mp3');
// const failsound = new Audio('../audio/sprite/gamefail.mp3');
// const triumph = new Audio('../audio/sprite/triumph.mp3');


let loaded = false;
export function ClickSound() {
    if (loaded) {
        const click = new Audio('../audio/sprite/button_click.mp3');
        click.currentTime = 0;
        click.play();
    }
    loaded = true;
}


export function Bubble() {
    const bubble = new Audio('../audio/sprite/bubble-pop.mp3');
        bubble.currentTime = 0;
            bubble.play();
}
  
export function Jackpot() {
    const jackpot = new Audio('../audio/sprite/jackpot.mp3');
    jackpot.currentTime = 0;
        jackpot.play();
}

export function FailSound() {
    const failsound = new Audio('../audio/sprite/gamefail.mp3');
    failsound.currentTime = 0;
        failsound.play();
}

export function Triumph() {
    const triumph = new Audio('../audio/sprite/triumph.mp3');
    triumph.currentTime = 0;
        triumph.play();
}
