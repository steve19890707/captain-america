let type = "WebGL"
if(!PIXI.utils.isWebGLSupported()){type = "canvas";}
PIXI.utils.sayHello(type);

// start
let app = new PIXI.Application({
    width: 1000,
    height: 400,
    backgroundColor: 0x061639,
});
document.getElementById("canvas").appendChild(app.view);

let stage = app.stage
let renderer = app.renderer;

// characterLive
let CALife = 10;

let su = new SpriteUtilities(PIXI);
let allCA,CA,CAX,CAY;
let CAimgURL = "images/CA.png";
let shield,shieldX,shieldY;
let shieldimgURL = "images/shield.png";
let isThorw
let isStart = false;
let isAtack = false;
let background;
let BGimgURL = "images/background.png";
let enemy1,allenemy1,enemyBullet1,enemy1Life,enemy1Step;
let enemy2,allenemy2,enemyBullet2,enemy2Life,enemy2Step;
let enemy3,allenemy3,enemyBullet3,enemy3Life,enemy3Step;
let enemymgURL = "images/enemy.png";
PIXI.loader.add(CAimgURL).add(shieldimgURL).add(BGimgURL).add(enemymgURL).load(setup);

function cachePosition(){
    CAX = allCA.position.x;
    CAY = allCA.position.y;
    shieldX = shield.position.x;
    shieldY = shield.position.y;
    // move
    if(CAX < 0){
        allCA.position.x = 0;
    }else if (CAX > 800){
        allCA.position.x = 800;
    }
    if(CAY < 200){
        allCA.position.y = 200;
    }else if (CAY > 290){
        allCA.position.y = 290;
    }
    // zindex
    if(CAY > 280){
        stage.setChildIndex(allCA,4);
    }else if (CAY < 280 && CAY > 250) {
        stage.setChildIndex(allCA,3);
    }else if (CAY < 250 && CAY > 220) {
        stage.setChildIndex(allCA,2);
    }else if (CAY < 220) {
        stage.setChildIndex(allCA,1);
    }
    // attack
    if(isAtack){
        // enemy1
        if(
            CAX > allenemy1.position.x - 50 && CAX < allenemy1.position.x &&
            CAY < allenemy1.position.y + 10 && CAY > allenemy1.position.y - 10
            ||
            CAX+shieldX > allenemy1.position.x - 50 && CAX+shieldX < allenemy1.position.x &&
            CAY < allenemy1.position.y + 20 && CAY > allenemy1.position.y - 20
        ){  
            if(enemy1Life <= 0){
                stage.removeChild(allenemy1);
                createEnemy1();
            }else if (enemy1Life > 0){
                enemy1Life -= 1;
                allenemy1.alpha = 0.8;
                setTimeout(()=>{
                    allenemy1.alpha = 1;
                },1000);
            }
        };
        // enemy2
        if(
            CAX > allenemy2.position.x - 50 && CAX < allenemy2.position.x &&
            CAY < allenemy2.position.y + 10 && CAY > allenemy2.position.y - 10
            ||
            CAX+shieldX > allenemy2.position.x - 50 && CAX+shieldX < allenemy2.position.x &&
            CAY < allenemy2.position.y + 20 && CAY > allenemy2.position.y - 20
        ){
            if(enemy2Life <= 0){
                stage.removeChild(allenemy2);
                createEnemy2();
            }else if (enemy2Life > 0){
                enemy2Life -= 1;
                allenemy2.alpha = 0.8;
                setTimeout(()=>{
                    allenemy2.alpha = 1;
                },1000);
            }
        };
        // enemy3
        if(
            CAX > allenemy3.position.x - 50 && CAX < allenemy3.position.x &&
            CAY < allenemy3.position.y + 10 && CAY > allenemy3.position.y - 10
            ||
            CAX+shieldX > allenemy3.position.x - 50 && CAX+shieldX < allenemy3.position.x &&
            CAY < allenemy3.position.y + 20 && CAY > allenemy3.position.y - 20
        ){
            if(enemy3Life <= 0){
                stage.removeChild(allenemy3);
                createEnemy3();
            }else if (enemy3Life > 0){
                enemy3Life -= 1;
                allenemy3.alpha = 0.8;
                setTimeout(()=>{
                    allenemy3.alpha = 1;
                },1000);
            }
        };
    }
    return CAX,CAY,shieldX,shieldY;
};

// otherCharacter
function createEnemy1(){
    enemy1Life = 300;
    let enemyframes = su.filmstrip(enemymgURL, 70, 110);
    let random = Math.random() * 150;
    enemy1 = su.sprite(enemyframes);
    enemy1.fps = 12;
    enemy1.states ={
        stand: 0,
        move:[0,9],
    };
    allenemy1 = new PIXI.Container();
    allenemy1.addChildAt(enemy1, 0);
    stage.addChild(allenemy1);
    stage.setChildIndex(allenemy1,1);
    allenemy1.position.set(1000,220);
    enemy1.playAnimation(enemy1.states.move);
    TweenLite.to(allenemy1, 5, {x:600 - random,ease:Linear.easeNone});
    enemy1Step = false;
    setInterval(()=>{
        if(enemy1Step){
            TweenLite.to(allenemy1, 5, {x:600 - random,ease:Linear.easeNone});
            enemy1Step = false;
        }else if(!enemy1Step){
            TweenLite.to(allenemy1, 5, {x:800 - random,ease:Linear.easeNone});
            enemy1Step = true;
        }
    },5100 + random * 100);
    return enemy1Life;
}

function createEnemy2(){
    enemy2Life = 300;
    let enemyframes = su.filmstrip(enemymgURL, 70, 110);
    let random = Math.random() * 150;
    enemy2 = su.sprite(enemyframes);
    enemy2.fps = 12;
    enemy2.states ={
        stand: 0,
        move:[0,9],
    };
    allenemy2 = new PIXI.Container();
    allenemy2.addChildAt(enemy2, 0);
    stage.addChild(allenemy2);
    stage.setChildIndex(allenemy2,2);
    allenemy2.position.set(1000,250);
    enemy2.playAnimation(enemy2.states.move);
    TweenLite.to(allenemy2, 5, {x:600 - random,ease:Linear.easeNone});
    enemy2Step = false;
    setInterval(()=>{
        if(enemy2Step){
            TweenLite.to(allenemy2, 5, {x:600 - random,ease:Linear.easeNone});
            enemy2Step = false;
        }else if(!enemy2Step){
            TweenLite.to(allenemy2, 5, {x:800 - random,ease:Linear.easeNone});
            enemy2Step = true;
        }
    },5100 + random * 100);
    return enemy2Life;
}

function createEnemy3(){
    enemy3Life = 300;
    let enemyframes = su.filmstrip(enemymgURL, 70, 110);
    let random = Math.random() * 150;
    enemy3 = su.sprite(enemyframes);
    enemy3.fps = 12;
    enemy3.states ={
        stand: 0,
        move:[0,9],
    };
    allenemy3 = new PIXI.Container();
    allenemy3.addChildAt(enemy3, 0);
    stage.addChild(allenemy3);
    stage.setChildIndex(allenemy2,3);
    allenemy3.position.set(1000,280);
    enemy3.playAnimation(enemy3.states.move);
    TweenLite.to(allenemy3, 5, {x:600 - random,ease:Linear.easeNone});
    enemy3Step = false;
    setInterval(()=>{
        if(enemy3Step){
            TweenLite.to(allenemy3, 5, {x:600 - random,ease:Linear.easeNone});
            enemy3Step = false;
        }else if(!enemy3Step){
            TweenLite.to(allenemy3, 5, {x:800 - random,ease:Linear.easeNone});
            enemy3Step = true;
        }
    },5100 + random * 100);
    return enemy3Life;
}

function setup() {
    // background
    let BGframes = su.filmstrip(BGimgURL, 2000, 400);
    background = su.sprite(BGframes);
    background.fps = 12;
    background.states = { stand: 0 }
    stage.addChild(background);
    stage.setChildIndex(background,0);
    background.position.set(0,0);

    // CA
    let CAframes = su.filmstrip(CAimgURL, 70, 110);
    CA = su.sprite(CAframes);
    CA.fps = 12;
    CA.states = {
        stand: [0,7],
        walkDown: [8, 16],
        walkLeft: [8, 16],
        walkRight: [8, 16],
        walkUp: [8, 16],
        attack: [17,25],
        thorw: 21,
    };
    // shield
    let shieldframes = su.filmstrip(shieldimgURL, 45, 45);
    shield = su.sprite(shieldframes);
    shield.fps = 24;
    shield.position.set(2,35);
    shield.states = {
        stand: 0,
        thorw: [1,2],
    };

    allCA = new PIXI.Container();
    allCA.addChildAt(shield, 0);
    allCA.addChildAt(CA, 1);
    stage.addChild(allCA);
    stage.setChildIndex(allCA,1);
    allCA.position.set(50,250);
    allCA.vx = 0;
    allCA.vy = 0;

    let left = keyboard(65),
        up = keyboard(87),
        right = keyboard(68),
        down = keyboard(83);
        attack = keyboard(32);
        thorw = keyboard(69);
        enter = keyboard(13);
    CA.playAnimation(CA.states.stand);

    // enter start
    enter.press = () => {
        if(isStart){
            return;
        };
        document.getElementById("logo").style.display = 'none';
        document.getElementById("designer").style.display = 'none';
        document.getElementById("start").style.display = 'none';
        gameStart();
    };

    // left
    left.press = () => {
        if(!isStart){
            return;
        };
        CA.playAnimation(CA.states.walkLeft);
        allCA.vx = -2;
        allCA.vy = 0;
    };
    left.release = () => { 
        if(!isStart){
            return;
        };
        if (!right.isDown && allCA.vy === 0) {
            allCA.vx = 0;
            CA.playAnimation(CA.states.stand);
        };
    };
    //Up
    up.press = () => {
        if(!isStart){
            return;
        };
        CA.playAnimation(CA.states.walkUp);
        allCA.vy = -2;
        allCA.vx = 0;
    };
    up.release = () => {
        if(!isStart){
            return;
        };
        if (!down.isDown && allCA.vx === 0) {
            allCA.vy = 0;
            CA.playAnimation(CA.states.stand);
        };
    };
    //Right
    right.press = () => {
        if(!isStart){
            return;
        };
        CA.playAnimation(CA.states.walkRight);
        allCA.vx = 2;
        allCA.vy = 0;
    };
    right.release = () => { 
        if(!isStart){
            return;
        };
        if (!left.isDown && allCA.vy === 0) {
            allCA.vx = 0;
            CA.playAnimation(CA.states.stand);
        }
    };
    //Down
    down.press = () => {
        if(!isStart){
            return;
        };
        CA.playAnimation(CA.states.walkDown);
        allCA.vy = 2;
        allCA.vx = 0;
    };
    down.release = () => {
        if(!isStart){
            return;
        };
        if (!up.isDown && allCA.vx === 0) {
            allCA.vy = 0;
            CA.playAnimation(CA.states.stand);
        };
    };
    // attack
    attack.press = () => {
        if(!isStart){
            return;
        };
        if(allCA.vx === 0 && allCA.vy === 0){
            isAtack = true;
            CA.playAnimation(CA.states.attack);
        };
    };
    attack.release = () => {
        if(!isStart){
            return;
        };
        isAtack = false;
        if(!up.isDown && allCA.vx === 0 && allCA.vy === 0) {
            CA.playAnimation(CA.states.stand);
        };
    };
    // thorw
    thorw.press = () => {
        if(!isStart){
            return;
        };
        if(allCA.vx === 0 && allCA.vy === 0 && !isThorw){
            isAtack = true;
            isThorw = true
            CA.show(CA.states.thorw);
            shield.playAnimation(shield.states.thorw);
            TweenLite.to(shield, 1, {x:300,ease:Linear.easeNone})
            setTimeout(() =>{
                TweenLite.to(shield, 1, {x:2,ease:Linear.easeNone})
                setTimeout(() =>{
                    shield.position.set(2,35);
                    shield.show(shield.states.stand);
                    if(allCA.vx === 0 && allCA.vy === 0){
                        CA.playAnimation(CA.states.stand);
                    }
                    isAtack = false;
                    isThorw = false;
                },1000)
            },1000)
        }else {
            return;
        }
    };
    gameLoop();
};
//使精灵移动的函数
function move() {
    allCA.x += allCA.vx;
    allCA.y += allCA.vy;
    // background
    background.x -= allCA.vx;
    if(background.x < -1000){
        background.x = 0;
    }
    if(background.x > 0){
        background.x = -1000;
    }
}
function gameLoop() {
    // 循环调用gameLoop
    requestAnimationFrame(gameLoop);
    // 更新当前的游戏状态
    move();
    // 渲染舞台
    renderer.render(stage);
}

function keyboard(keyCode) {
    let key = {};
    key.code = keyCode;
    key.isDown = false;
    key.isUp = true;
    key.press = undefined;
    key.release = undefined;
    // 按下按键时的处理程序
    key.downHandler = event => { 
        if (event.keyCode === key.code) {
            if (key.isUp && key.press) key.press();
            key.isDown = true;
            key.isUp = false;
        }
        event.preventDefault();
    };
    // 按键被松开时的处理程序
    key.upHandler = event => {
        if (event.keyCode === key.code) {
            if (key.isDown && key.release) key.release();
            key.isDown = false;
            key.isUp = true;
        }
        event.preventDefault();
    };
    // 添加事件监听器
    window.addEventListener("keydown", key.downHandler.bind(key), false);
    window.addEventListener("keyup", key.upHandler.bind(key), false);
    // 返回key对象
    return key;
}

// gameStart
function gameStart(){
    isStart = true;
    createEnemy1();
    createEnemy2();
    createEnemy3();
    setInterval(()=>{
        cachePosition();
    })
}
