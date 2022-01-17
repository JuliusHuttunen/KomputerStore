//Basic global variables
let balance = 0;
let loan = 0;
let pay = 0;
let hasLoan = false;
let hasInteracted = false;
let price = 0;

//Format amounts to NOK
const formatNumbers = new Intl.NumberFormat('no-NO', { style: 'currency', currency: 'NOK' });

//Get pay, loan, bank elements and initialize 
const payElement = document.getElementById("pay");
const balanceElement = document.getElementById("balance");
const loanElement = document.getElementById("loan");

const onLoad = () => {
    console.log("DOM content loaded")
    payElement.innerHTML = formatNumbers.format(pay);
    balanceElement.innerHTML = formatNumbers.format(balance);
    loanElement.innerHTML = formatNumbers.format(loan);
}

//Laptop display elements
const laptopsElement = document.getElementById("laptops");
const specsElement = document.getElementById("specs");
const laptopNameElement = document.getElementById("name");
const laptopDescElement = document.getElementById("description");
const laptopPriceElement = document.getElementById("price");
let laptops = [];

//Pay loan button starts hidden
let x = document.getElementById("payloan");
x.style.display = "none";

function updateValues() {
    document.getElementById("balance").innerHTML = formatNumbers.format(balance);
    document.getElementById("loan").innerHTML = formatNumbers.format(loan);
    document.getElementById("pay").innerHTML = formatNumbers.format(pay);
}

//BANK

//Get loan. It is approved if it is not over twice the bank amount
function getLoan() {
    const request = Number(window.prompt("Request the amount for loan:", ""));
    if (request > balance * 2) {
        window.alert("Loan amount too high!");
    }
    else if (request <= 0 || !Number.isInteger(request)) {
        window.alert("Enter a valid loan amount!")
    }
    else if (hasLoan) {
        window.alert("You have an unpaid loan!");
    }
    else {
        window.alert("Your loan was approved!")
        balance += request;
        loan += request;
        hasLoan = true;
        //Show pay loan button
        let x = document.getElementById("payloan");
        x.style.display = "block";
        //Update the page
        updateValues();
    }
}

//WORK
function moveToBank() {
    if (hasLoan) {
        if (loan > pay * 0.1) {
            //Pay loan (10%)
            loan -= pay * 0.1;
            //Rest to bank balance
            balance += pay * 0.9;
            pay = 0;
        }
        else {
            loan -= pay * 0.1;
            balance += pay * 0.9;
            //If the loan goes to minus, add that to bank
            if (loan < 0) {
                balance -= loan;
            }
            //Loan paid in full
            loan = 0;
            pay = 0;
            hasLoan = false;
            //Hide pay loan button
            let x = document.getElementById("payloan");
            x.style.display = "none";
        }
        //Update!
        updateValues();
    }
    else {
        //All to bank balance
        balance += pay;
        pay = 0;
        //Update!
        updateValues();
    }
}

//Add pay of 100
function addPay() {
    pay += 100;
    //Update!
    updateValues();
}

//Pay loan
function payLoan() {
    if (pay >= loan) {
        pay -= loan;
        loan = 0;
        hasLoan = false;
        //Hide pay loan button
        let x = document.getElementById("payloan");
        x.style.display = "none";
    }
    else {
        loan -= pay;
        pay = 0;
    }
    //Update!
    updateValues();
}

//LAPTOPS

//Fetch laptop information
fetch("https://noroff-komputer-store-api.herokuapp.com/computers")
    .then(response => response.json())
    .then(data => laptops = data)
    .then(laptops => addLaptops(laptops));

//Loop the laptops array and feed them to dropdown options
const addLaptops = (laptops) => {
    laptops.forEach(i => addLaptop(i));

    //SHOW THE INFORMATION OF THE FIRST LAPTOP ON LOAD
    //Specs
    const laptopSpecifications = laptops[0].specs;
    //For each specification, add a <li> element to list
    laptopSpecifications.forEach(function (item, index) {
        laptopSpecElement = document.createElement("li");
        laptopSpecElement.appendChild(document.createTextNode(item, index));
        specsElement.appendChild(laptopSpecElement);
    });
    const laptopImage = 'https://noroff-komputer-store-api.herokuapp.com/' + laptops[0].image;
    //Assign images
    document.getElementById("laptopimage").setAttribute("src", laptopImage);
    document.getElementById("laptopimage").setAttribute("alt", "laptopImage");
    //Name
    const laptopName = laptops[0].title;
    laptopNameElement.appendChild(document.createTextNode(laptopName));

    //Description
    const laptopDesc = laptops[0].description;
    laptopDescElement.appendChild(document.createTextNode(laptopDesc));

    //Price
    const laptopPrice = laptops[0].price;
    laptopPriceElement.appendChild(document.createTextNode(formatNumbers.format(laptopPrice)));
}

//Add laptops to option list for the dropdown
const addLaptop = (laptop) => {
    const laptopElement = document.createElement("option");
    laptopElement.value = laptop.id;
    laptopElement.appendChild(document.createTextNode(laptop.title));
    laptopsElement.appendChild(laptopElement);
}

const handleLaptopMenuChange = e => {
    hasInteracted = true;
    //Flush the previous information on every change
    specsElement.innerHTML = "";
    laptopNameElement.innerHTML = "";
    laptopDescElement.innerHTML = "";
    laptopPriceElement.innerHTML = "";

    //selectedLaptop omits const or let, so is a global variable (can be accessed later)
    selectedLaptop = laptops[e.target.selectedIndex];

    //Specs
    const laptopSpecifications = selectedLaptop.specs;
    //For each specification, add a <li> element to list
    laptopSpecifications.forEach(function (item, index) {
        laptopSpecElement = document.createElement("li");
        laptopSpecElement.appendChild(document.createTextNode(item, index));
        specsElement.appendChild(laptopSpecElement);
    });

    //Image
    const laptopImage = 'https://noroff-komputer-store-api.herokuapp.com/' + selectedLaptop.image;
    //Assign images
    document.getElementById("laptopimage").setAttribute("src", laptopImage);
    document.getElementById("laptopimage").setAttribute("alt", "laptopImage");
    //Correcting the image error
    if (selectedLaptop.id == 5) {
        document.getElementById("laptopimage").setAttribute("onerror", "this.onerror=null;this.src='https://noroff-komputer-store-api.herokuapp.com/assets/images/5.png';");
    }

    //Name
    const laptopName = selectedLaptop.title;
    laptopNameElement.appendChild(document.createTextNode(laptopName));

    //Description
    const laptopDesc = selectedLaptop.description;
    laptopDescElement.appendChild(document.createTextNode(laptopDesc));

    //Price
    const laptopPrice = selectedLaptop.price;
    laptopPriceElement.appendChild(document.createTextNode(formatNumbers.format(laptopPrice)));
}

function payForLaptop() {

    if (hasInteracted) {
        //selectedLaptop is a global variable from the previous function
        price = selectedLaptop.price;
    }
    //If the user has enough balance, pay for laptop
    if (price <= balance) {
        balance -= price;
        //Update!
        updateValues();
        window.alert("Congrats! You are now the owner of this laptop!");
    }
    else {
        window.alert("You don't have enough balance to afford this laptop.");
    }
}

//Handle the option change
laptopsElement.addEventListener("change", handleLaptopMenuChange);
document.addEventListener("DOMContentLoaded", onLoad);
