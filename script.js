function smoothstep(x)
{
    return 6 * x * (1 - x)
}

var ANIMATION_TIME = 20;

var digits, ticks, interval = 0;
var timeInput, playButton;

var n;

function main()
{
    timeInput = document.getElementById('timeInput');
    playButton = document.getElementById('playButton');
    digits = document.querySelectorAll('#yearContainer td');
    for(let digit of digits)
    {
        digit.innerText = "0\n1\n2\n3\n4\n5\n6\n7\n8\n9\n0\n1\n2";
        digit.pos = digit.speed = 0;
        setInterval(() => {
            digit.pos += digit.speed
            digit.scrollTo(0, digit.pos);
            if(digit.pos >= 1840)
            {
                digit.pos -= 1840;
                digits[2].speed = 9.2;
                setTimeout(() => (digits[2].speed = 0, digits[2].pos = 184 * ++n), 200);
            }
        }, 10);
    }

    reset();

    timeInput.onchange = function() {
        ANIMATION_TIME = this.value;
    }
}

function reset() {
    n = 2;
    digits[0].pos = digits[2].pos = digits[3].pos = 368;
    for(let digit of digits)
        digit.speed = 0;
    ticks = 0;
    clearInterval(interval);

    playButton.disabled = timeInput.disabled = false;
}

function play() {
    reset();
    playButton.disabled = timeInput.disabled = true;
    interval = setInterval(() => {
        ticks++;
        digits[3].speed = smoothstep(ticks / 100 / ANIMATION_TIME) * 110.45 / ANIMATION_TIME;
        if(ticks >= ANIMATION_TIME * 100)
        {
            timeInput.disabled = false;
            clearInterval(interval);
        }
    }, 10);
}