var imagemDaTorre, torre;
var imagemDaPorta, porta, grupoDePortas;
var imagemDeEscalador, escalador, grupoDeEscaladores;
var fantasma, imagemDoFantasma;
var grupoDeBlocoInvisivel, blocoInvisivel;
var estadoJogo = "JOGAR"

function preload(){
  imagemDaTorre = loadImage("tower.png");
  imagemDaPorta = loadImage("door.png");
  imagemDeEscalador = loadImage("climber.png");
  imagemDoFantasma = loadImage("ghost-standing.png");
  somAssustador = loadSound("spooky.wav");
  grupoDePortas = new Group();
  grupoDeEscaladores = new Group();
  grupoDeBlocoInvisivel = new Group();
}

function setup(){
  createCanvas(600,400);
  
  fantasma = createSprite(300, 300, 10, 10);
  fantasma.addImage("fantasma", imagemDoFantasma);
  fantasma.velocityY = 2;
  fantasma.scale = 0.3;
  
  torre = createSprite(300,300);
  torre.addImage("tower",imagemDaTorre);
  torre.velocityY = 1;
  }


function draw(){
  background(0);
  
  if (estadoJogo === "JOGAR"){
  
  if(torre.y > 400){
      torre.y = 300
    }
 
  criarjanelas();
    
  if(keyDown("right_arrow")){
  fantasma.x += 5;  
  }
  if(keyDown("left_arrow")){
  fantasma.x -= 5;  
  }
  
  fantasma.depth = torre.depth + 3;
  
  if(fantasma.isTouching(grupoDeEscaladores)){
   fantasma.velocityY =0; 
  }
  
  if(keyDown("space")){
    fantasma.velocityY = - 10;
  }
  fantasma.velocityY = fantasma.velocityY + 0.4;
  
  if(fantasma.y > 430||fantasma.isTouching(grupoDeBlocoInvisivel)){
     fantasma.destroy();
  estadoJogo = "FIM";
}
  }
 if(estadoJogo === "FIM"){
   stroke("yellow"); fill("yellow"); 
   textSize(30); 
   text("Game Over", 230,250);
   torre.velocityY = 1000;
 } 
  drawSprites();
}

function criarjanelas(){
  if(frameCount%200 === 0){
    porta = createSprite(random(150, 450), -80);
    porta.addImage("porta",imagemDaPorta);
    porta.velocityY = 1;
    porta.lifetime = 600;
    porta.depth = torre.depth + 1;
    
    escalador = createSprite(porta.x, -10);
    escalador.addImage("escalador", imagemDeEscalador);
    escalador.velocityY = 1;
    escalador.lifetime = 600;
    escalador.depth = porta.depth + 1;
    
    blocoInvisivel = createSprite(escalador.x,escalador.y -5,30,2); 
    blocoInvisivel.width = escalador.width; 
    blocoInvisivel.height = 2;
    blocoInvisivel.lifetime = 600;
    blocoInvisivel.velocityY = 1;

  grupoDeEscaladores.add(escalador);
  grupoDePortas.add(porta);
  grupoDeBlocoInvisivel.add(blocoInvisivel);  
  }
}