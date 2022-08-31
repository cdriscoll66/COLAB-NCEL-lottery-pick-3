const click = new Audio('../audio/sprite/button_click.mp3');

let loaded = false;
export function ClickSound() {


    if (loaded) {
        click.currentTime = 0;
        click.play();
    }
    loaded = true;
}

