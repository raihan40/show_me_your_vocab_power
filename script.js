var buffer = [];
var try_flag = 0;
var current = 0;
var current_word = []
var temp_word = [];
var guess = [];
var flag = 0;
var score = 0;
var chance = 5;

function fetch(h) {
    if (h > 0) {
        let x = new XMLHttpRequest();
        x.onreadystatechange = function() {
            if (x.readyState == 4 && x.status == 200) {
                buffer = process(x.responseXML).split("\n");
                buffer.pop();
                hypen_genarate();
            }
        }
        x.open("GET", "words.xml", true);
        x.send(null);
    }
}

function process(xmlDoc) {
    let str = "";
    let words = xmlDoc.getElementsByTagName("words")[0];
    let word = words.getElementsByTagName("word");
    let max = Number(word.length);
    let min = 0;

    for (let i = 0; i < 5; i++) {
        // Get random index
        let randomNum = Math.floor(Math.random() * (max - min)) + min;
        str += word[randomNum].childNodes[0].nodeValue + "\n";
    }
    return str;
} // End of process()

function hypen_genarate() {
    // console.log(buffer)
    if (buffer.length > 0 && buffer.length <= 5) {
        current_word = buffer.pop();
        //console.log("current word is " + current_word)
        for (let i = 0; i < current_word.length; i++)
            document.getElementById("game").appendChild(document.createTextNode("_ "));
    } else {
        fetch(5)
    }

}

function user_try() {

    let key = document.getElementById('key_value').value;
    let pattern = /^[A-Za-z]+$/;
    if (!pattern.test(key)) {
        alert("only alphabet allowed !");
        document.getElementById('key_value').value = "";

    } else {
        document.getElementById('key_value').value = "";
        //  console.log("in1")
        // console.log("current word = " + current_word)
        if (current_word.includes(key.charAt(0))) {
            //console.log("in2")
            for (let i = 0; i < current_word.length; i++) {
                if (current_word[i] == key) {
                    temp_word[i] = key
                }
            }
            // console.log(temp_word)
            document.getElementById("game").innerHTML = ""
            for (let i = 0; i < current_word.length; i++) {
                if (temp_word[i] >= 'a' || temp_word[i] >= 'A' || temp_word[i] <= 'z' || temp_word[i] <= 'Z') {
                    document.getElementById("game").appendChild(document.createTextNode(temp_word[i] + " "));
                } else {
                    document.getElementById("game").appendChild(document.createTextNode("_ "));
                }
            }
        } else {
            try_flag++;
            chance--;
            document.getElementById("try-id").innerHTML = chance
            alert("Worng Guess!")
            setTimeout(function() {
                if (try_flag == 5) {
                    var userChoice = confirm("You lose ! Press OK to continue or Cancel to stop.");
                    if (userChoice == true) {
                        // document.getElementById("disp").innerHTML = buffer;
                        flussh()
                    } else {
                        alert("You chose to stop.");
                        window.location.href = "thank.html"
                    }
                }
            }, 50);
        }
        if (guess.includes(key)) {
            alert("you already guessed " + key)
        } else {
            guess.push(key)
            document.getElementById("guess").appendChild(document.createTextNode(key + " "));
            //console.log(key);
        }

        if (equals(current_word, temp_word)) {
            score++;
            document.getElementById("win-id").innerHTML = score;
            setTimeout(function() {
                if (flag == 1) {
                    flag = 1;
                    flash();
                }
                var userChoice = confirm("Press OK to continue or Cancel to stop.");
                if (userChoice == true) {
                    // document.getElementById("disp").innerHTML = buffer;
                    flussh()
                } else {
                    alert("You chose to stop.");
                    window.location.href = "thank.html"
                }
            }, 50);
        }

    }
}

function flussh() {
    // console.log("inside flush")
    flag = 0;
    document.getElementById("guess").innerHTML = ""
    document.getElementById("game").innerHTML = ""
    current_word = []
    temp_word = []
    guess = []
    try_flag = 0
    chance = 5
    document.getElementById("try-id").innerHTML = chance
    hypen_genarate()
}

function exit() {
    window.location.href = "thank.html"
}

function equals(a, b) {
    if (a.length == b.length) {
        for (let i = 0; i < a.length; i++) {
            if (a[i] != b[i]) {
                return false;
            }
        }
        return true;
    } else {
        return false;
    }
}

function answer() {
    let x = ""
    for (let i = 0; i < current_word.length; i++) {
        x += current_word[i];
    }
    alert(x)
    flussh();
}