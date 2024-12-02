// document.getElementById('cardHolderNumber').addEventListener('input', function (e) {
//     let inputValue = e.target.value.replace(/\D/g, '').substring(0, 16); // Remove non-numeric characters and limit to 16 digits

//     // Add hyphens every four digits
//     inputValue = inputValue.replace(/(\d{4})(?=\d)/g, '$1-');

//     e.target.value = inputValue;

//     if (!isValidFormat(inputValue)) {
//         // Display error message or take appropriate action
//         console.log("Please match the requested format");
//     }
// });


var cardNumberError = document.getElementById('cardNumberError');
var cardNumberlabel = document.getElementById('cardNumberLabel');
var cardNumberfield = document.getElementById('cardHolderNumber');

var cardNameError = document.getElementById('cardNameError');
var cardNamelabel = document.getElementById('cardNameLabel');
var cardNamefield = document.getElementById('cardHolderName');

var num = 0;

function validateCardNumber() {
    cardNumberlabel.style.bottom = '60px';

    if (!cardNumberfield.value.match(/[0-9]{16}/) || !isValidCardNumber(cardNumberfield.value)) {
        cardNumberError.innerHTML = 'Please enter a valid number';
        // cardNumberfield.style.borderBottomColor = 'red';
        cardNumberlabel.style.color = 'red';
        cardNumberError.style.bottom = '0px';
        return false;
    }
    cardNumberError.innerHTML = '';
    cardNumberError.style.bottom = '5px';
    cardNumberlabel.style.color = 'limegreen';
    num += 1;
    // cardNumberfield.style.borderBottomColor = 'limegreen';
    return true;
}

function validateCardName() {
    cardNamelabel.style.bottom = '50px';

    if (!cardNamefield.value.match(/[A-Z]{4,}/)) {
        cardNameError.innerHTML = 'Please enter a valid name and at least 4 characters';
        // cardNumberfield.style.borderBottomColor = 'red';
        cardNamelabel.style.color = 'red';
        cardNameError.style.bottom = '0px';
        return false;
    }
    cardNameError.innerHTML = '';
    cardNameError.style.bottom = '5px';
    cardNamelabel.style.color = 'limegreen';
    num += 1;
    // cardNumberfield.style.borderBottomColor = 'limegreen';
    return true;
}

function isValidCardNumber(cardNumber) {
    // Luhn algorithm
    let creditCardInt = cardNumber.split('').map(Number);
    for (let i = creditCardInt.length - 2; i >= 0; i -= 2) {
        let temp = creditCardInt[i];
        temp *= 2;
        if (temp > 9) {
            temp = temp % 10 + 1;
        }
        creditCardInt[i] = temp;
    }
    let total = 0;
    for (let i = 0; i < creditCardInt.length; i++) {
        total += creditCardInt[i];
    }
    return total % 10 == 0;
}


document.querySelector('.loginBtn').onmouseenter = () => {
    if (num = 1) {
        document.querySelector('.front-face').style.transform = 'perspective(1000px) rotateY(180deg)';
        document.querySelector('.back-face').style.transform = 'perspective(1000px) rotateY(0deg)';
    }
};

document.querySelector('.loginBtn').onmouseleave = () => {
    // if (num = 1) {
    //     document.querySelector('.front-face').style.transform = 'perspective(1000px) rotateY(0deg)';
    //     document.querySelector('.back-face').style.transform = 'perspective(1000px) rotateY(180deg)';
    // }
};


