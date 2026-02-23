let ismenuopen = "false"; //is the sliding menu open?
let lock = false; //is the sliding menu moving?
let timer = 0; //define 'timer'
let myInterval = null; //countdown once every second
let warmup = 30; // time for warmup
let cooldown = 30; // time for cooldown
let work = 30; // time for work
let rest = 30; // time for rest
let repeat = 1; // amount of repeats
let currentrepeat = 0;
let currentphase = "warmup";
let workorrest = "work";
let counter = 0;
let ding = null;


//make a dingy ding sound
function sound(src) {
    this.sound = document.createElement("audio");
    this.sound.src = src;
    this.sound.setAttribute("preload", "auto");
    this.sound.setAttribute("controls", "none");
    this.sound.style.display = "none";
    document.body.appendChild(this.sound);
    this.play = function(){
      this.sound.play();
    }
    this.stop = function(){
      this.sound.pause();
    }
  }

//Sliding box code
function menuOpen() {
    if(lock == false){
        lock = true;
        if(ismenuopen == "false"){
            document.getElementById("savesmenu").style.animation = "slidein .5s ease-out";
        }else if(ismenuopen == "true"){
            document.getElementById("savesmenu").style.animation = "slideout .5s ease-out";
        }
        setTimeout(delay, 480,);
    }
}
function delay() {
    if(ismenuopen == "false"){
        document.getElementById("savesmenu").style.transform = "translate(7%, -1000px)";
        ismenuopen = "true";
    }else if(ismenuopen == "true"){
        document.getElementById("savesmenu").style.transform = "translate(101%, -1000px)";
        ismenuopen = "false";
    }
    lock = false;
}
//end of sliding box code

//countdown code, time is number of seconds you wish to count down
function countDown(time){
    timer = time;
    //console.log(timer); //log to console current timer
    if(timer < 10){
        document.getElementById("timerbox").innerHTML = "0" + timer;
    }else if(timer > 9){
        document.getElementById("timerbox").innerHTML = timer;
    }
    myInterval = setInterval(minusOne, 1000);

}

function minusOne(){
    
    //document.getElementById("timerDisplay").innerHTML = timer;
    timer--;
    if(timer == 3 || timer == 2 || timer == 1){
        ding.play();
    }
    if(timer <= 0){
        clearInterval(myInterval);
        document.getElementById("timerbox").innerHTML = "00";
        //put here stuff that happens when the timer runs out
        if(currentphase == "warmup"){
            currentphase = "workcycle"
        }
        else if(currentphase == "workcycle"){
            
            if(workorrest == "work"){
                
                workorrest = "rest";
            }else if(workorrest == "rest"){
                workorrest = "work";
                currentrepeat++;
            if(currentrepeat == repeat){
                currentphase = "cooldown";
            }
            }
            
        }
        else if(currentphase == "cooldown"){
            currentphase = "done";
        }
        start();
    }else{
        //console.log(timer); //log to console current timer
        if(timer < 10){
            document.getElementById("timerbox").innerHTML = "0" + timer;
        }else if(timer > 9){
            document.getElementById("timerbox").innerHTML = timer;
        }
        //put stuff here that happens when the timer ticks down
    }
    
}
//end of countdown code

document.getElementById("warmupslider").oninput = function() {
    document.getElementById("warmupcounter").innerHTML = this.value + "s";
    warmup = this.value;
}
document.getElementById("workslider").oninput = function() {
    document.getElementById("workcounter").innerHTML = this.value + "s";
    work = this.value;
}
document.getElementById("restslider").oninput = function() {
    document.getElementById("restcounter").innerHTML = this.value + "s";
    rest = this.value;
}
document.getElementById("cooldownslider").oninput = function() {
    document.getElementById("cooldowncounter").innerHTML = this.value + "s";
    cooldown = this.value;
}
document.getElementById("repeatslider").oninput = function() {
    document.getElementById("repeatcounter").innerHTML = this.value + "x";
    repeat = this.value;
}

async function start() {
    ding = new sound("sfx/dingding.mp3");
    if(currentphase == "warmup"){
        countDown(warmup);
        //make the warmup colors -----------------------------------
        document.body.style.backgroundColor = "#118844"; //WARMUP COLORS!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
        document.getElementById("sliders").style.display = "none";
        document.getElementById("savesmenu").style.display = "none";
        console.log("warming up");
        document.getElementById("currentactivity").innerHTML = "Warmup";
        document.getElementById("currentactivity").style.display = "block";
    }
    else if(currentphase == "workcycle"){
            if(workorrest == "work"){
            countDown(work);
            counter++;
            document.getElementById("roundcounter").innerHTML = "Round: " + counter + "/" + repeat;
            console.log("working");
            document.getElementById("currentactivity").innerHTML = "Workout";
            //make the work colors ------------------------------------
            document.body.style.backgroundColor = "#991111";//WORKOUT COLOURS!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
            }else if(workorrest == "rest"){
            countDown(rest);
            console.log("resting");
            document.getElementById("currentactivity").innerHTML = "Rest";
            //make the rest colors ------------------------------------
            document.body.style.backgroundColor = "#AAAAAA";
            }
    }
    else if(currentphase == "cooldown"){
    countDown(cooldown);
    console.log("coolin down");
    counter = 0;
    document.getElementById("roundcounter").innerHTML = "";
    document.getElementById("currentactivity").innerHTML = "Cooldown";
    //make the cooldown colors --------------------------------------
    document.body.style.backgroundColor = "#008899";//COOOOL DOWN COLOURS!!!!!!!!!!!!!!!!!!!!
    }
    else if(currentphase == "done"){
        console.log("done workout");
        document.getElementById("sliders").style.display = "block";
        document.getElementById("savesmenu").style.display = "block";
        document.getElementById("currentactivity").style.display = "none";
        currentphase = "warmup";
        currentrepeat = 0;
        document.body.style.backgroundColor = "#FFFFFF";
        
    }
}

//all the saving code & variables
let save1 = {warmup: 0, work: 0, rest: 0, repeat: 1, cooldown: 0, name:""}
let save2 = {warmup: 0, work: 0, rest: 0, repeat: 1, cooldown: 0, name:""}
let save3 = {warmup: 0, work: 0, rest: 0, repeat: 1, cooldown: 0, name:""}
let save4 = {warmup: 0, work: 0, rest: 0, repeat: 1, cooldown: 0, name:""}
let save1string = "";
let save2string = "";
let save3string = "";
let save4string = "";

function savesave(number){
    if(number == 1){
        save1.warmup = warmup;
        save1.work = work;
        save1.rest = rest;
        save1.repeat = repeat;
        save1.cooldown = cooldown;
        save1.name = document.getElementById("save1name").value;
        document.getElementById("save1warmup").innerHTML = save1.warmup;
        document.getElementById("save1work").innerHTML = save1.work;
        document.getElementById("save1rest").innerHTML = save1.rest;
        document.getElementById("save1repeat").innerHTML = save1.repeat + "x";
        document.getElementById("save1cooldown").innerHTML = save1.cooldown;
        save1string = JSON.stringify(save1);
        localStorage.setItem(1, save1string);
    }else if(number == 2){
        save2.warmup = warmup;
        save2.work = work;
        save2.rest = rest;
        save2.repeat = repeat;
        save2.cooldown = cooldown;
        save2.name = document.getElementById("save2name").value;
        document.getElementById("save2warmup").innerHTML = save2.warmup;
        document.getElementById("save2work").innerHTML = save2.work;
        document.getElementById("save2rest").innerHTML = save2.rest;
        document.getElementById("save2repeat").innerHTML = save2.repeat + "x";
        document.getElementById("save2cooldown").innerHTML = save2.cooldown;
        save2string = JSON.stringify(save2);
        localStorage.setItem(2, save2string);
    }else if(number == 3){
        save3.warmup = warmup;
        save3.work = work;
        save3.rest = rest;
        save3.repeat = repeat;
        save3.cooldown = cooldown;
        save3.name = document.getElementById("save3name").value;
        document.getElementById("save3warmup").innerHTML = save3.warmup;
        document.getElementById("save3work").innerHTML = save3.work;
        document.getElementById("save3rest").innerHTML = save3.rest;
        document.getElementById("save3repeat").innerHTML = save3.repeat + "x";
        document.getElementById("save3cooldown").innerHTML = save3.cooldown;
        save3string = JSON.stringify(save3);
        localStorage.setItem(3, save3string);
    }else if(number == 4){ 
        save4.warmup = warmup;
        save4.work = work;
        save4.rest = rest;
        save4.repeat = repeat;
        save4.cooldown = cooldown;
        save4.name = document.getElementById("save4name").value;
        document.getElementById("save4warmup").innerHTML = save4.warmup;
        document.getElementById("save4work").innerHTML = save4.work;
        document.getElementById("save4rest").innerHTML = save4.rest;
        document.getElementById("save4repeat").innerHTML = save4.repeat + "x";
        document.getElementById("save4cooldown").innerHTML = save4.cooldown;
        save4string = JSON.stringify(save4);
        localStorage.setItem(4, save4string);
    }
}

function loadsave(number){
    if(number == 1){
        save1 = JSON.parse(localStorage.getItem(1));
        warmup = save1.warmup;
        work = save1.work;
        rest = save1.rest;
        repeat = save1.repeat;
        cooldown = save1.cooldown;
        document.getElementById("warmupcounter").innerHTML = save1.warmup;
        document.getElementById("workcounter").innerHTML = save1.work;
        document.getElementById("restcounter").innerHTML = save1.rest;
        document.getElementById("repeatcounter").innerHTML = save1.repeat + "x";
        document.getElementById("cooldowncounter").innerHTML = save1.cooldown;
        document.getElementById("warmupslider").value = save1.warmup;
        document.getElementById("workslider").value = save1.work;
        document.getElementById("restslider").value = save1.rest;
        document.getElementById("repeatslider").value = save1.repeat;
        document.getElementById("cooldownslider").value = save1.cooldown;
    }else if(number == 2){
        save2 = JSON.parse(localStorage.getItem(2));
        warmup = save2.warmup;
        work = save2.work;
        rest = save2.rest;
        repeat = save2.repeat;
        cooldown = save2.cooldown;
        document.getElementById("warmupcounter").innerHTML = save2.warmup;
        document.getElementById("workcounter").innerHTML = save2.work;
        document.getElementById("restcounter").innerHTML = save2.rest;
        document.getElementById("repeatcounter").innerHTML = save2.repeat + "x";
        document.getElementById("cooldowncounter").innerHTML = save2.cooldown;
        document.getElementById("warmupslider").value = save2.warmup;
        document.getElementById("workslider").value = save2.work;
        document.getElementById("restslider").value = save2.rest;
        document.getElementById("repeatslider").value = save2.repeat;
        document.getElementById("cooldownslider").value = save2.cooldown;
    }else if(number == 3){
        save3 = JSON.parse(localStorage.getItem(3));
        warmup = save3.warmup;
        work = save3.work;
        rest = save3.rest;
        repeat = save3.repeat;
        cooldown = save3.cooldown;
        document.getElementById("warmupcounter").innerHTML = save3.warmup;
        document.getElementById("workcounter").innerHTML = save3.work;
        document.getElementById("restcounter").innerHTML = save3.rest;
        document.getElementById("repeatcounter").innerHTML = save3.repeat + "x";
        document.getElementById("cooldowncounter").innerHTML = save3.cooldown;
        document.getElementById("warmupslider").value = save3.warmup;
        document.getElementById("workslider").value = save3.work;
        document.getElementById("restslider").value = save3.rest;
        document.getElementById("repeatslider").value = save3.repeat;
        document.getElementById("cooldownslider").value = save3.cooldown;
    }else if(number == 4){
        save4 = JSON.parse(localStorage.getItem(4));
        warmup = save4.warmup;
        work = save4.work;
        rest = save4.rest;
        repeat = save4.repeat;
        cooldown = save4.cooldown;
        document.getElementById("warmupcounter").innerHTML = save4.warmup;
        document.getElementById("workcounter").innerHTML = save4.work;
        document.getElementById("restcounter").innerHTML = save4.rest;
        document.getElementById("repeatcounter").innerHTML = save4.repeat + "x";
        document.getElementById("cooldowncounter").innerHTML = save4.cooldown;
        document.getElementById("warmupslider").value = save4.warmup;
        document.getElementById("workslider").value = save4.work;
        document.getElementById("restslider").value = save4.rest;
        document.getElementById("repeatslider").value = save4.repeat;
        document.getElementById("cooldownslider").value = save4.cooldown;
    }
}

window.onload = function () {
    //MAKE THE FUNCTIONS LOAD WHEN THE PAGE LOADS, SO YOU CAN SEE YOUR SAVED SAVES
}

