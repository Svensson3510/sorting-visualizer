let myArray = []
let itemAmount = 50
let i = 0
let j = 0
let interval
let currentP = document.getElementById('currentP')
let audio = null

function complete() {
    setTimeout(() => {
        document.getElementById('div' + i).style.backgroundColor = 'black'
        playNote(200 + myArray[i] * 2)
        i++
        if (i < myArray.length) {
            return complete()
        }
        else {
            i = 0
            console.log("Sorted: " + myArray.join(" "))
        }
    }, 50)
}

function playNote(freq) {
    if (audio == null) {
        audio = new(AudioContext || webkitAudioContext || window.webkitAudioContext)()
    }
    const dur = 0.1
    const osc = audio.createOscillator()
    osc.frequency.value = freq
    osc.start()
    osc.stop(audio.currentTime + dur)
    const node = audio.createGain()
    node.gain.value = 0.1
    node.gain.linearRampToValueAtTime(0, audio.currentTime + dur)
    osc.connect(node)
    node.connect(audio.destination)
}

for (let k = 0; k < itemAmount; k++) {
    myArray[k] = Math.floor(Math.random() * 300)
    let newDiv = document.createElement('div')
    newDiv.id = 'div' + k
    newDiv.style.height = myArray[k] + 'px'
    document.body.insertBefore(newDiv, currentP)
}

console.log(myArray.join(" "))
//console.log(i, myArray.length - 1 - j)

function algorithm() {
    playNote(200 + myArray[i] * 2)
    //playNote(200 + myArray[myArray.length - 1 - j] * 1.5)
    document.getElementById('div' + i).style.backgroundColor = 'orange'
    document.getElementById('div' + (myArray.length - 1 - j)).style.backgroundColor = 'skyblue'
    if (myArray.length - 1 - j < 1) {
        i = 0
        j = 0
        document.getElementById('div' + i).style.backgroundColor = 'white'
        clearInterval(interval)
        //console.log("End")
        //console.log("")
        setTimeout(() => {
            complete()
        }, 25)
    }
    else if (i >= myArray.length - 1 - j) {
        document.getElementById('div' + i).style.backgroundColor = 'black'
        i = 0
        document.getElementById('div' + i).style.backgroundColor = 'orange'
        document.getElementById('div' + (myArray.length - 1 - j)).style.backgroundColor = 'white'
        j++
        //console.log("New iteration")
    }
    else if (myArray[i] > myArray[myArray.length - 1 - j]) {
        let temp = myArray[i]
        myArray[i] = myArray[myArray.length - 1 - j]
        myArray[myArray.length - 1 - j] = temp
        document.getElementById('div' + i).style.height = myArray[i] + 'px'
        document.getElementById('div' + (myArray.length - 1 - j)).style.height = myArray[myArray.length - 1 - j] + 'px'
        document.getElementById('div' + i).style.backgroundColor = 'black'
        i++
        document.getElementById('div' + i).style.backgroundColor = 'orange'
        //console.log(myArray.join(" "))
    }
    else if (myArray[i] <= myArray[myArray.length - 1 - j]) {
        document.getElementById('div' + i).style.backgroundColor = 'black'
        i++
        document.getElementById('div' + i).style.backgroundColor = 'orange'
        //console.log("No swap")
    }
    else {
        //console.log("Null")
    }
    //console.log(i, myArray.length - 1 - j)
}

function sort() {
    interval = setInterval(algorithm, 10)
}