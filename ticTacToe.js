cells = document.querySelectorAll(".cell")
playAgain = document.querySelector("#play-again")
friend = document.querySelector("#friend")
computer = document.querySelector("#computer")
p = document.querySelector("p")
x = ""
o = ""


let winningCells;

document.querySelector("footer").addEventListener("click", (e) => {
    if(document.querySelector("span").innerText === "computer"){
        playAgain.click()
        // cells.forEach(v => v.removeEventListener('click', document.querySelector("footer").click(), ))
        computerGame()
    }else{
        playAgain.click()
        // cells.forEach(v => v.removeEventListener('click', document.querySelector("footer").click(), ))
        friendGame()
    }
})

function checkForWin(str, winningNums){
    matches = str.split("").filter(function(v){
        return winningNums.includes(v)
    })

    if(winningNums === matches.join("")){
        winningCells = matches.join("")
        return true
    }

    return false
}

function findWinningNums(index, num){
    index = index
    num = num
    return (index).toString() + (index+num) + (index+num*2)
}

function returnWin(str, index, nums){
    var swt = false
    nums.forEach(function(v){
        if(checkForWin(str, findWinningNums(index, v)) === true){
            swt = true
        }
    })

    return swt
}

function win(str){
    if (str.includes("0")) {
       if(returnWin(str, 0, [1, 3, 4]) === true){
           return true
       }
    }

    if (str.includes("1")) {
        if(returnWin(str, 1, [3]) === true){
            return true
        }
    }

    if (str.includes("2")) {
        if(returnWin(str, 2, [2, 3]) === true){
            return true
        }
    }

    if (str.includes("3")) {
        if(returnWin(str, 3, [1]) === true){
            return true
        }
    }

    if (str.includes("6")) {
        if(returnWin(str, 6, [1]) === true){
            return true
        }
    }

    return false

}

// winScreen = 

function winScreen(player){
    if(player){
         p.innerText = "Player " + player + " wins!"
         setTimeout(() => cells.forEach(function(v){
            if(!winningCells.includes(v.id)){
               v.style.color = "#787882"
           }
        }), 500)
    }else{
        p.innerText = "Draw!"
    }
    setTimeout(() => p.style.color = "#EAF0CE", 500)
}


let swt = true;
let playerWin;
let clicks = 0;

playAgain.addEventListener("click", function(){
    p.style.color = "#2C2B3C"
    x = ""
    o = ""
    clicks = 0
    playerWin = false;

    cells.forEach(function(v) {
        v.innerText = ""
        v.style.color = "#EAF0CE"
    });
})

friendGame = () => {
    friend.style.visibility = "hidden";
    computer.style.visibility = "hidden";
    document.querySelector("span").innerText = "computer"
    document.querySelector("footer").style.visibility = "inherit";
    document.querySelector("#choose").style.height = "0";
    document.querySelector("#choose").style.margin = "0";

    document.querySelector("#box").style.display = "inherit";
    playAgain.style.display = "inherit";

    cells.forEach(function(v, i) {
        v.addEventListener("click", function(e){
            if(v.innerText === "" && !playerWin){
                if (swt) { 
                    v.innerText = "X"
                    clicks +=1
                    x += e.target.id
                    x = x.split("").sort(function(a,b){return a-b}).join("")
                    if(win(x)){
                        winScreen("X")
                    }
                    playerWin = win(x) || win(o)
                } else { 
                    v.innerText = "O"
                    clicks +=1
                    o += e.target.id
                    o = o.split("").sort(function(a,b){return a-b}).join("")
                    if(win(o)){
                        winScreen("O")
                    }
                    playerWin = win(x) || win(o)
                }
                swt = !swt
            }
            if(clicks === 9 && !playerWin) {
                winScreen()
            }
        })
    });
}   


computerGame = () => {
    friend.style.visibility = "hidden";
    computer.style.visibility = "hidden";
    document.querySelector("span").innerText = "friend"
    document.querySelector("footer").style.visibility = "inherit";
    document.querySelector("#choose").style.height = "0";
    document.querySelector("#choose").style.margin = "0";

    document.querySelector("#box").style.display = "inherit";
    playAgain.style.display = "inherit";

    function makeMove(move){
        setTimeout(function(){
            document.getElementById(move).innerText = "O"
        }, 500)
        o+=move;
        swt = !swt
    }

    function possibleWins(arr){
        posWinsArr = [];
        arr.forEach(function(v){
            let i = v.i
            let win = v.wins
            win.forEach(function(v){
                posWinsArr.push(findWinningNums(i, v))
            })
        })
        return posWinsArr
    }

    function getNumbers(str){
        
        let nums = []

        if(str.includes("0")){
            nums = nums.concat(possibleWins([{i: 0, wins: [1,3,4]}]))
        }
        if(str.includes("1")){
            nums = nums.concat(possibleWins([{i: 1, wins: [3]}]))
        }
        if(str.includes("2")){
            nums = nums.concat(possibleWins([{i: 2, wins: [2,3]}, {i: 0, wins: [1]}]))
        }
        if(str.includes("3")){
            nums = nums.concat(possibleWins([{i: 3, wins: [1]},{i: 0, wins: [1]}]))
        }
        if(str.includes("4")){
            nums = nums.concat(possibleWins([{i: 1, wins: [3]}, {i: 2, wins: [2]}, {i: 3, wins: [1]}]))
        }
        if(str.includes("5")){
            nums = nums.concat(possibleWins([{i: 2, wins: [3]}, {i: 3, wins: [1]}]))
        }
        if(str.includes("6")){
            nums = nums.concat(possibleWins([{i: 6, wins: [1]}, {i: 0, wins: [3]}, {i: 2, wins: [2]}]))
        }
        if(str.includes("7")){
        nums = nums.concat (possibleWins([{i: 1, wins: [3]}]))
        }
        if(str.includes("8")){
            nums = nums.concat(possibleWins([{i: 0, wins: [4]}, {i: 2, wins: [3]}, {i: 6, wins: [1]}]))
        }

        nums = nums.filter(function(item, pos, self) {
            return self.indexOf(item) == pos;
        })
        return nums 
    }
    
    function block(arr, x){
        let num;
        arr.forEach(function(v){
            v = v.split("")
            let nums = v.filter((val) => {
                return !x.includes(val)
            })
            if(nums.length === 1 && document.getElementById(nums[0]).innerText === ""){
                num = nums
            }
        })
        return num
    }

    function AIMove(arr){
        cells.forEach(v => {
            arr.filter(val => {
                
            })
        })
    }

    cells.forEach(function(v, i) {
        v.addEventListener("click", function(e){
            if(v.innerText === "" && !playerWin){
                if (swt) { 
                    v.innerText = "X"
                    clicks +=1;
                    x += e.target.id
                    x = x.split("").sort(function(a,b){return a-b}).join("")
                    if(win(x)){
                        winScreen("X")
                    }
                    playerWin = win(x) || win(o)

                    if(x.length === 1){
                        if(cells[4].innerText === ""){
                            makeMove(4)
                        }else{
                            makeMove(0)
                        }
                        clicks +=1;
                    }else{
                        blockMove = block(getNumbers(x), x)
                        if(blockMove){
                            makeMove(blockMove)
                        }else{
                            console.log(getNumbers(o))
                        }
                        clicks +=1;
                        o = o.split("").sort(function(a,b){return a-b}).join("")
                        if(win(o)){
                            winScreen("O")
                        }
                        playerWin = win(x) || win(o)
                    }
                }

            swt = !swt
        }

            if(clicks >= 9 && !playerWin) {
                winScreen()
            }
        })
    });
}

friend.addEventListener("click", friendGame)

computer.addEventListener("click", computerGame)
    