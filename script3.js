const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");
let start=false;

// Thông số khủng long
const dino = {
    x: 50,
    y: 200,
    width: 30,
    height: 50,
    dy: 0,
    gravity: 0.8,
    jumpForce: -12,//độ cao của bước nhảy
    isJumping: false, //kiểm tra nhảy hay chưa 
    score:0
};

// Thông số chướng ngại vật (Cây xương rồng)
const cactus = {
    x: 800,
    y: 210,
    width: 20,
    height: 40,
    speed: 6
   
};
 
// Xử lý sự kiện bấm phím
function sukienphim(){
    document.addEventListener("keydown", (e) => {
    if ((e.code === "Space" ) && !dino.isJumping) {
        dino.dy = dino.jumpForce; 
        dino.isJumping = true;

    }  
           
});
}

function tinhdiem(){
    if ((dino.x+dino.width===cactus.x) && (dino.y<cactus.y)) {
      dino.score=dino.score+1;  
       document.getElementById("score").innerText= dino.score; 
     }          
 }

function kiemtravacham(){
    if (
        dino.x < cactus.x + cactus.width &&
        dino.x + dino.width > cactus.x &&
        dino.y < cactus.y + cactus.height &&
        dino.y + dino.height > cactus.y
    ) {
        alert("Game Over!"+ dino.score );
        dino.score=0;
      
        // Reset lại vị trí xương rồng
        cactus.x = canvas.width;//đặt lại ví trí bên phải màn hình
    }
}


function ve(){
    // Vẽ lại màn hình
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Vẽ mặt đất
    ctx.fillStyle = "#000";
    ctx.fillRect(0, 250, canvas.width, 5);
    
    // Vẽ khủng long
    ctx.fillStyle = "#ff0000";
    ctx.fillRect(dino.x, dino.y, dino.width, dino.height);
//50, 200,chiều dài, chiều cao khung long

    // Vẽ xương rồng
    ctx.fillStyle = "#008000";
    ctx.fillRect(cactus.x, cactus.y, cactus.width, cactus.height);
//800, 210,rộng, cao
}

function dichuyenxuongrong(){
    cactus.x -= cactus.speed;//giảm x để chạy qua bên trái
    if (cactus.x + cactus.width < 0) {//nếu vị trí xương rồng qua khung trái, chạy hết khung trái
        cactus.x = canvas.width; // Đặt lại vị trí xương rồng ra bên phải khung game
    }
}

function khoakhunglong(){
     if (dino.y > 200) {
        dino.y = 200;       
        dino.isJumping = false;
    }
}
setInterval(function update() {
    // Cập nhật vị trí khủng long
    dino.dy += dino.gravity;
    dino.y += dino.dy; 
sukienphim();//nhảy
tinhdiem();
// Khóa khủng long đứng trên mặt đất ( y = 200)
khoakhunglong();   
// Di chuyển xương rồng
dichuyenxuongrong();
// Kiểm tra va chạm
kiemtravacham(); 
ve();
},16);
  
// requestAnimationFrame(update);//thay cho setInterVal chạy mượt hơn

   
    // setInterval(update(),16)   ;

// Vòng lặp game





 

   