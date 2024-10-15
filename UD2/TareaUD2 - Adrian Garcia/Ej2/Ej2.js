function throwDice() {
    let times = parseInt(inputNum.value);
    let timesRolled = [0, 0, 0, 0, 0, 0];

    if (times > parseInt(inputNum.max) || times < parseInt(inputNum.min)) {
        console.log(`Input ${times} out of bounds, max ${inputNum.max}, min ${inputNum.min}`);
        return;
    }
    
    for (let i = 0; i < times; i++) {
        let dice = Math.floor(Math.random() * 6);
        timesRolled[dice]++;
    }

    for (let i = 0; i < timesRolled.length; i++) {
        document.getElementById("face" + i).innerText = timesRolled[i];
    }
}
