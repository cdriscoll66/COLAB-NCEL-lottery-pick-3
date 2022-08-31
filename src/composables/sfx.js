const click = new Audio('../audio/sprite/button_click.mp3');


export function ClickSound() {
    click.currentTime = 0;
    click.play();
}

