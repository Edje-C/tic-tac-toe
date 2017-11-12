cells = document.querySelectorAll(".cell")
btn = document.querySelector("button")
p = document.querySelector("p")
x = ""
o = ""


let winningCells;

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

function winScreen(player){
    p.style.color = "#EAF0CE"
    if(player){
         p.innerText = "Player " + player + " wins!"
         cells.forEach(function(v){
             if(!winningCells.includes(v.dataset.cell)){
                v.style.color = "#787882"
            }
         })

    }else{
        p.innerText = "Draw!"
    }
}


let swt = true
let playerWin;
let clicks = 0

btn.addEventListener("click", function(){
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

cells.forEach(function(v, i) {
    v.addEventListener("click", function(e){
        if(v.innerText === "" && !playerWin){
            if (swt) { 
                v.innerText = "X"
                clicks +=1
                x += e.target.dataset.cell
                x = x.split("").sort(function(a,b){return a-b}).join("")
                if(win(x)){
                    winScreen("X")
                }
                playerWin = win(x) || win(o)
            } else { 
                v.innerText = "O"
                clicks +=1
                o += e.target.dataset.cell
                o = o.split("").sort(function(a,b){return a-b}).join("")
                console.log(win(o))
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