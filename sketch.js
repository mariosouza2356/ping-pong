//variáveis da bolinha
let xBolinha = 300;
let yBolinha = 200;
let diametro = 20;
let raio = diametro / 2 ;

//velocidade da bolinha
let velocidadeXBolinha = 5;
let velocidadeYBolinha = 5;


//variáveis da raquete
let xRaquete = 0;
let yRaquete = 150;
let raqueteComprimento = 10;
let raqueteAltura = 90;

//raquete oponente
let xRaqueteOponente = 790;
let yRaqueteOponente = 150;
let velocidadeYOponente; 

let colidiu = false;

//placar
let meusPontos = 0;
let pontosDoOponente = 0;

//sons do jogo
let trilha;
let ponto;
let raquetada;

function preload(){
  trilha = loadSound("trilha.mp3");
  ponto = loadSound("ponto.mp3");
  raquetada = loadSound("raquetada.mp3");
}

function setup() {
  createCanvas(800, 400);
  trilha.loop();
}

function draw() {
  background(0);
  mostraBolinha();
  movimentaBolinha();
  verificaColisaoBorda();
  mostraRaquete(xRaquete, yRaquete);
  movimentaMinhaRaquete();
  //verificaColisaoRaquete();
  colisaoRaqueteBiblioteca(xRaquete, yRaquete);
  mostraRaquete(xRaqueteOponente, yRaqueteOponente);
  movimentaRaqueteOponente();
  colisaoRaqueteBiblioteca(xRaqueteOponente, yRaqueteOponente);
  mostraPlacar();
  marcaPonto();
  bolinhaNaoFicaPresa();
}
function mostraBolinha(){
  circle(xBolinha, yBolinha, diametro);
}

function movimentaBolinha(){
  xBolinha += velocidadeXBolinha;
  yBolinha += velocidadeYBolinha;
}

function verificaColisaoBorda(){
  if (xBolinha + raio> width ||
     xBolinha - raio< 0){
    velocidadeXBolinha *= -1;
  }
  if (yBolinha + raio> height ||
     yBolinha - raio < 0){
    velocidadeYBolinha *= -1;
  }
}

function mostraRaquete(x, y){
  rect(x, y, raqueteComprimento, 
      raqueteAltura);
}
function mostraRaqueteOponente(){
  rect(xRaqueteOponente, yRaqueteOponente, raqueteComprimento, 
      raqueteAltura);
}

function movimentaMinhaRaquete(){
  if (keyIsDown(87)){
    if (yRaquete < -40){
      return yRaquete < -40;
    }
    yRaquete -= 10;
  }
  if (keyIsDown(83)){
      if (yRaquete > 350){
      return yRaquete > 350;
    }
    yRaquete += 10;
  }
}

function verificaColisaoRaquete(){
  if (xBolinha - raio < xRaquete + raqueteComprimento && 
      yBolinha - raio < yRaquete + raqueteAltura && 
      yBolinha + raio > yRaquete){
    velocidadeXBolinha *= -1;
    raquetada.play();
  }
}
function colisaoRaqueteBiblioteca(x, y){
 colidiu = collideRectCircle(x, y, raqueteComprimento, raqueteAltura, xBolinha, yBolinha, raio);
  if(colidiu){
  velocidadeXBolinha *= -1;
    raquetada.play();
  }
}
function movimentaRaqueteOponente(){
  if (keyIsDown(UP_ARROW)){
    if (yRaqueteOponente < -40){
      return yRaqueteOponente < -40;
    }
    yRaqueteOponente -= 10;
  }
  if (keyIsDown(DOWN_ARROW)){
     if (yRaqueteOponente > 350){
      return yRaqueteOponente > 350;
    }
    yRaqueteOponente += 10;
  }
}
 function mostraPlacar(){
   stroke(255)
   textAlign(CENTER);
   textSize(16);
   fill(color(255, 140, 0));
   rect(130, 10, 40, 20);
   fill(255);
   text(meusPontos, 150, 26);
   fill(color(255, 140, 0));
   rect(630, 10, 40, 20);
   fill(255);
   text(pontosDoOponente, 650, 26);
 }
function marcaPonto(){
  if(xBolinha > 790){
    meusPontos += 1;
    ponto.play();
  }
  if(xBolinha < 10){
    pontosDoOponente += 1;
     ponto.play();
  }
}

function bolinhaNaoFicaPresa(){
    if ((xBolinha - raio < 0) && (xBolinha - raio > 599)){
    xBolinha = 15;
    }
}
