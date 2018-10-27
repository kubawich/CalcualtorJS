//guziory
let buttons = document.getElementsByClassName(`button`)
//wartości guziorów
let buttons_sign = document.getElementsByTagName("h1")
//znaki specjalne
let buttons_special = document.getElementsByClassName(`sign`);
//tablica znaków specjalnych, nie wiem czemu ale tegó gówna pierdolonego nie można zamienić prosto przez array.from() bo się wysrywa przy innertexcie, a samych elementów nie chce tylko ich wartości!!!
let buttons_special_array = [];
//równa się am inne zadanie niz inne znaki specjalne wiec bedzie oddzielnie
let button_equal = document.getElementById("equal");
//guziory które wciskamny po kolei
let signs = [];
//wyświetlacz
let dispaly = document.getElementById("nums");
//padding wyświetlacza bo się przesuwał
var displayPaddingRight = parseInt(window.getComputedStyle(document.getElementById("nums")).paddingRight);

//Robi mi tablice wartości znaków specjalnych
for (let index = 0; index < buttons_special.length; index++) {
    buttons_special_array.push(buttons_special[index].innerText);    
}

//Robić jaki się kliknie guzior, jak sie nie kliknie to nie robić
for (let index = 0; index < buttons_sign.length; index++) {
    buttons[index].addEventListener('click', function (event) {
        //Sprawdza czy pierwsza jest cyfra, bo działan sie nie zaczyna od znaku specjalnego!
        if (checkIfSignIsNotFirst(buttons_special_array,buttons[index].innerText) == false) {
            signs.push(buttons_sign[index+1].innerText);
            display(signs);
        }
        else if (signs.length > 0) {
            signs.push(buttons_sign[index+1].innerText);
            display(signs);
        }
        //No a jeśli sięzaczyna to wyzerój wyświetlacz
        else {
            clear();
        }

        //Pierwszy znak nie zmienia paddingu bo też się coś jebało
        if (signs.length < 2) {
            dispaly.setAttribute("style", `padding-right: 20px`);
            displayPaddingRight="27px"
        } else {
            incrementPadidng();
        }

        if (signs.length == 9) {
            alert("Równanie jest za długie, rozważ kliknięcie '=' albo cssy się rozwalą na amen");
        }
    })
};

//Naprawia ten popierdolony padding z dodawaniem liczb do tablicy
function incrementPadidng() {
    dispaly.setAttribute("style", `padding-right: ${displayPaddingRight + 5}px`);
    displayPaddingRight = parseInt(window.getComputedStyle(document.getElementById("nums")).paddingRight);
}

//Sprawdź czy działanei zaczyna się od liczby
function checkIfSignIsNotFirst(button, sign) {
    if (button.includes(sign)) {
        return true;
        console.log(true);
    }
    else {
        return false;
        console.log(false);
    }        
};   

//wyczyść wyświetlacz i kolejkę cyfr
function clear() {
    signs = [];
    dispaly.innerText = "0";
}

//obsługa wyświetlacza i kolejko
function display(values) {
    var i = Object.assign({}, signs);
    var o = Object.values(i);
    var p = o.toString().split(',').join('')
    dispaly.innerText = p;
    //Czyszczenie guziorem klir(ang. Clear)
    if (values.includes(`C`)) {
        clear();
    }
    //potęgowanie przez 2
    if (values.includes(`^`)) {
        var ind = p.indexOf('^'); 
        var a = eval(p.substring(0, ind));
        displayCalc(eval(Math.pow(a,2)),document.querySelector('#nums'))
    }
}

//oblicznie, i robi obiekt z tablicy, o zamienia key/value na obiekt tablic value, p wycina wszytskie przecinki bo po co one, a potem sie juz liczy
function calculate() {
    var i = Object.assign({}, signs);
    var o = Object.values(i);
    var p = o.toString().split(',').join('')
    displayCalc(eval(p).toString(), document.querySelector('#nums'));
}

function displayCalc(eval, show) {
    show.innerText = eval;
    signs = [];
}