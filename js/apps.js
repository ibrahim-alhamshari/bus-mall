'use strict';

let firstImage = document.getElementById('first-Image');
let secondImage = document.getElementById('second-Image');
let thirdImage = document.getElementById('third-Image');
let container = document.getElementById('Images');
let firstIndex;
let secondIndex;
let thirdIndex;
let compareIndex = [firstIndex, secondIndex, thirdIndex];


let arrOfnames = [];
BusMall.allElements = [];


function BusMall(name, path) {
    this.name = name;
    this.path = path;
    this.imageTimes = 0;
    this.votes = 0;
    BusMall.allElements.push(this);
    arrOfnames.push(this.name);

}

new BusMall('bag', '../Images/bag.jpg');
new BusMall('banana', '../Images/banana.jpg');
new BusMall('bathroom', '../Images/bathroom.jpg');
new BusMall('boots', '../Images/boots.jpg');
new BusMall('breakfast', '../Images/breakfast.jpg');
new BusMall('bubblegum', '../Images/bubblegum.jpg');
new BusMall('chair', '../Images/chair.jpg');
new BusMall('cthulhu', '../Images/cthulhu.jpg');
new BusMall('dog-duck', '../Images/dog-duck.jpg');
new BusMall('dragon', '../Images/dragon.jpg');
new BusMall('pen', '../Images/pen.jpg');
new BusMall('pet-sweep', '../Images/pet-sweep.jpg');
new BusMall('scissors', '../Images/scissors.jpg');
new BusMall('shark', '../Images/shark.jpg');
new BusMall('sweep', '../Images/sweep.png');
new BusMall('tauntaun', '../Images/tauntaun.jpg');
new BusMall('unicorn', '../Images/unicorn.jpg');
new BusMall('usb', '../Images/usb.gif');
new BusMall('water-can', '../Images/water-can.jpg');
new BusMall('wine-glass', '../Images/wine-glass.jpg');


function generatRandomIndex() {
    return Math.floor(Math.random() * BusMall.allElements.length);

}


function renderThreeImages() {
    firstIndex = generatRandomIndex();
    secondIndex = generatRandomIndex();
    thirdIndex = generatRandomIndex();

    while (firstIndex === secondIndex || firstIndex === thirdIndex || secondIndex === thirdIndex || compareIndex.includes(firstIndex) || compareIndex.includes(secondIndex) || compareIndex.includes(thirdIndex)) {
        firstIndex = generatRandomIndex();
        secondIndex = generatRandomIndex();
        thirdIndex = generatRandomIndex();
    }


    compareIndex = [firstIndex, secondIndex, thirdIndex];
    // console.log(compareIndex);

    firstImage.src = BusMall.allElements[firstIndex].path;
    secondImage.src = BusMall.allElements[secondIndex].path;
    thirdImage.src = BusMall.allElements[thirdIndex].path;
    BusMall.allElements[firstIndex].imageTimes++;
    BusMall.allElements[secondIndex].imageTimes++;
    BusMall.allElements[thirdIndex].imageTimes++;
}


renderThreeImages();

// firstImage.addEventListener('click', handleClicking);
// secondImage.addEventListener('click', handleClicking);
// thirdImage.addEventListener('click', handleClicking);
container.addEventListener('click', handleClicking)


let maxAttempts = 25;
let count = 0;
let button = null;

function handleClicking(event) {
    if (maxAttempts > count) {

        if (event.target.id === 'first-Image') {
            BusMall.allElements[firstIndex].votes++;

        } else if (event.target.id === 'second-Image') {
            BusMall.allElements[secondIndex].votes++;

        } else if (event.target.id === 'third-Image') {
            BusMall.allElements[thirdIndex].votes++;
        } else {
            alert('you should click on the image');
            count--;
        }
        count++;
        renderThreeImages();
    } else {

        let Section = document.getElementById('section');
        button = document.createElement('button');
        Section.appendChild(button);
        button.textContent = 'View Results';
        button.addEventListener('click', reportResults);
        container.removeEventListener('click', handleClicking);
        saveToLs();
        gettingLocalStorage();
    }
}


let arrOfVotes = [];
let arrOfShown = [];
function reportResults() {
    let ul = document.getElementById('list');
    for (let i = 0; i < BusMall.allElements.length; i++) {
        arrOfVotes.push(BusMall.allElements[i].votes);
        arrOfShown.push(BusMall.allElements[i].imageTimes);
        let li = document.createElement('li');
        ul.appendChild(li);
        li.textContent = `${BusMall.allElements[i].name} had ${BusMall.allElements[i].votes} votes, and was seen ${BusMall.allElements[i].imageTimes} times.`;
    }
    chart();


    button.removeEventListener('click', reportResults);
}
gettingLocalStorage();
console.log(BusMall.allElements);



function chart() {
    let ctx = document.getElementById('myChart')
    let myChart = new Chart(ctx, {
        type: 'bar',
        data: {
            labels: arrOfnames,
            datasets: [{
                label: 'Number Of votes',
                data: arrOfVotes,
                backgroundColor: [
                    'rgba(155, 9, 13,0.7)',
                ],
                borderWidth: 1
            }, {
                label: 'Number of Shown',
                data: arrOfShown,
                backgroundColor: [
                    "rgb(192,192,192)"
                ],
                borderWidth: 1
            }]
        }
    })
}


function saveToLs() {

    let arrStr = JSON.stringify(BusMall.allElements);

    localStorage.setItem('coffeeSaved', arrStr);

    console.log(arrStr);
}


function gettingLocalStorage() {
    let data = localStorage.getItem('coffeeSaved');
    if (data) {
        BusMall.allElements = JSON.parse(data);
    }
// localStorage.removeItem('imageTimes');
}
