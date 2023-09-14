let label = document.getElementById('guessLabel');
let input = document.getElementById('guessInput');
let button = document.getElementById('btn');
let resetBtn = document.getElementById('resetBtn');
let low = 1, high = 10;
let num = Math.floor(Math.random() * high) + low;
label.innerHTML = `Guess a Number in between ${low} and ${high}`;

// event listener 
let tried = 0;
button.addEventListener('click', checker);
resetBtn.addEventListener('click', restart);


// function declaration 
function checker() {
    console.log(num);
    let inp = parseInt(input.value);
    if (document.querySelector('.alert') !== null) document.querySelector('.alert').remove();
    if (isNaN(inp)||inp<1||inp>10) {
        showAlert('Please insert correct value', 'error',tried);
    }
    else {
        if (tried == 3) {
            showAlert('Game Over!You lose the Game!', 'loss',tried)
            disableGame();
        }
        else if (inp === num) {
            showAlert('You won the game!','win',tried);
            disableGame();
        }
        else if (inp > num) {
            showAlert('Think a little bit smaller number','notice',tried);
        }
        else {
            showAlert('Think a litter bit greater number','notice',tried);
        }
        tried++;
    }
}

function disableGame() {
    input.disabled = true;
    button.disabled = true;
    setTimeout(() => {
        document.querySelector('.alert').remove();
        showAlert('reset the game if you want to play again', 'notice')
        resetBtn.style.display = "block";
        button.style.display = "none";
    },3000)
}

function restart(e) {
    num = Math.floor(Math.random() * high) + low;
    setTimeout(() => {
        document.querySelector('.alert').remove();
        input.disabled = false;
        button.disabled = false;
        button.style.display = 'block';
        resetBtn.style.display = 'none';
        tried = 0;
        inp = 0;
        input.value = '';
    }, 1000);
}


function showAlert(message,className,tried=undefined) {
    let div = document.createElement('div');
    let container = document.querySelector('.container');
    let label = document.getElementById('guessLabel');
    div.className = `alert ${className}`;
    if (tried === undefined) {
        div.appendChild(document.createTextNode(message));
    }
    else div.appendChild(document.createTextNode(message+`  (Attempted:${tried} Left:${3-tried})`));
    container.insertBefore(div, label);
}