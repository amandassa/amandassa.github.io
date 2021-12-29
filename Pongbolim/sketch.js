/**
 * Este código apresenta uma versão digital do 
 * tradicional jogo de tabuleiro Pebolim, com ambientação de 
 * estádio de futebol e raquetes no lugar de bonecos.
 * 
 * Feito por Amanda Silva Santos seguindo o material dos 
 * cursos Alura iniciante em programação.
 */

// definições da bolinha
let yBola = 200;
let xBola = 300;
let diametro = 18;
let raio = diametro / 2;

// velocidade da bolinha
let velocidadeXBola = 5;
let velocidadeYBola = 5;

// definições da raquete
let xRaquete1 = [75, 400];
let yRaquete1 = 180;
let comprimentoRaquete = 10;
let alturaRaquete = 50;

// definições raquete 2
let xRaquete2 = [525, 200];
let yRaquete2 = 150;
let velocidadeYRaquete;

// placar
let meusPontos = 0;
let pontosOponente = 0;

// collide 2d
let colidiu = false;

// sons do jogo
let raquetada;
let ponto;
let trilha;

// variaveis pongbolim
let larguraGol = 5;
let alturaGol = 90;
let corTime1 = [0, 255, 0];
let corTime2 = [255, 0, 0];
let xGolEsq = 0
let xGolDir = 595;
let yGols = 400/2-alturaGol/2;

function preload(){
  trilha = loadSound('estadio.mp3');
  ponto = loadSound('gol.mp3');
  raquetada = loadSound('chute.mp3');
}

function setup() {
  createCanvas(600, 400);
  trilha.loop();
}

function draw() {
  background('#2E8B57');
  desenhaCampo();
  desenhaBolinha();
  movimentaBolinha()
  verificarColisaoBorda();

  movimentarRaquete1();
  colisaoRaqueteLib(xRaquete1[0], yRaquete1);
  colisaoRaqueteLib(xRaquete1[1], yRaquete1)

  movimentarRaquete2();
  colisaoRaqueteLib(xRaquete2[0], yRaquete2);
  colisaoRaqueteLib(xRaquete2[1], yRaquete2);
  placar();
  
  // pongbolim
  desenharGol(xGolDir);
  desenharGol(xGolEsq);
  desenharTime(xRaquete1, yRaquete1, corTime1);
  desenharTime(xRaquete2, yRaquete2, corTime2);
  marcaGol(xGolDir);
  marcaGol(xGolEsq);
}

function desenhaCampo(){
  stroke(255);
  strokeWeight(5);
  fill('#2E8B57');
  // semicirculos dos cantos
  arc(0, 0, 50, 50, 0, HALF_PI); //Conferido
  arc(600, 0, 50, 50, HALF_PI, PI);
  arc(600, 400, 50, 50, PI, PI+HALF_PI);
  arc(0, 400, 50, 50,  PI + HALF_PI, TWO_PI);
  // linhas externas
  line(0, 0, 600, 0);
  line(0, 0, 0, 400);
  line(0, 400, 600, 400);
  line(600, 400, 600, 0);
  // circulos das areas
  arc(120, 200, 100, 100, TWO_PI, 0);
  arc(600-120, 200, 100, 100, TWO_PI, 0);
  arc(300, 200, 150, 150, TWO_PI, 0);
  // linhas internas
  line(300, 0, 300, 400);
  // area do gol esquerdo
  rect(0, 75, 130, 250);  // retangulo maior
  rect(0, 125, 55, 150);
  // area do gol direito
  rect(600-130, 75, 130, 250);  // retangulo maior
  rect(600-55, 125, 55, 150);
  // circulos de chute
  fill(255)
  circle(300, 200, 10);
  circle(100, 200, 10);
  circle(500, 200, 10);
  
  strokeWeight(0);
}

function desenhaBolinha(){
  stroke('#FF69B4')
  fill('#FF69B4');
  circle(xBola, yBola, diametro);
}

function movimentaBolinha(){
  xBola += velocidadeXBola;
  yBola += velocidadeYBola;
}

function verificarColisaoBorda(){
  if (xBola+raio > width || xBola-raio < 0){  
    velocidadeXBola *= -1;
  }
  if (yBola+raio > height || yBola-raio < 0){
    velocidadeYBola *= -1;
  }
}

function desenharRaquete(x, y){
  rect(x, y, comprimentoRaquete, alturaRaquete);
}

function desenharTime(x, y, cor){
  fill(color(cor[0], cor[1], cor[2]));
  // desenhar raquete adicional do time
  rect(x[0], y, comprimentoRaquete, alturaRaquete);
  rect(x[1], y, comprimentoRaquete, alturaRaquete);
}

function desenharGol(x){
  rect(x, yGols, larguraGol, alturaGol);
}

function movimentarRaquete1(){
  if (keyIsDown(UP_ARROW)) {
    yRaquete1 -= 10;
  }

  if (keyIsDown(DOWN_ARROW)) {
    yRaquete1 += 10;
  }
}

function movimentarRaquete2(){
  if (keyIsDown(87)) {
    yRaquete2 -= 10;
  }

  if (keyIsDown(83)) {
    yRaquete2 += 10;
  }
}

function colisaoRaqueteLib(x, y){
  colidiu = collideRectCircle(x, y, comprimentoRaquete+5, alturaRaquete, xBola, yBola, raio);
  
  if (colidiu){
    raquetada.play();
    velocidadeXBola *= -1;
  }
}

function marcaGol(x){
  fezGol = collideRectCircle(x, yGols, larguraGol, alturaGol, xBola, yBola, raio);
  if (fezGol){
    marcaPontos();
    xBola = 300;
  }
}

function placar(){
  textAlign(CENTER);
  textSize(16);
  fill('#FF69B4');
  rect(130, 10, 40, 20);
  rect(430, 10, 40, 20);
  fill(255);
  text(meusPontos, 150, 26);
  text(pontosOponente, 450, 26)
}

function marcaPontos(){
  if (xBola+raio > 590){
    meusPontos += 1;
    ponto.play();
  }
  if (xBola-raio < 10){
    pontosOponente += 1;
    ponto.play();
  }
}