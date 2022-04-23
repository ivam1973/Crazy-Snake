alert("ola");

window.onload = function(){
	
	var canvas = document.getElementById('canvas');
	var contexto  = canvas.getContext("2d");
	document.addEventListener("keydown", controleDeTeclas);
	setInterval(jogo, 160);

	const controleQuantasCasaCobrinhaAnda = 1;

	var velocidadeX = velocidadeY = 0;
	var cabecaCobrinhaX = 10;
	var posicaoYInicialCobrinha = 15;
	var tamanhoPecas = 30;
	var quantidadePecasDentroDoCanvasXY = 20;
	var macaX = macaY = 15;

	var rastroDaCobrinha = [];
	tamanhoDaCaudaCobrinha = 1;

	
		function jogo(){

			cabecaCobrinhaX += velocidadeX;
			posicaoYInicialCobrinha += velocidadeY;
			if (cabecaCobrinhaX < 0) { //se a cabeça é menor do que zero, ela chegou no fim do canvas
				cabecaCobrinhaX = quantidadePecasDentroDoCanvasXY-1;// menos 1 => posiciona a cabeca um pixel pra fora do canvas
			}
			if (cabecaCobrinhaX > quantidadePecasDentroDoCanvasXY-1) {
				cabecaCobrinhaX = 0;
			}
			if (posicaoYInicialCobrinha < 0) {
				posicaoYInicialCobrinha = quantidadePecasDentroDoCanvasXY-1;
			}
			if (posicaoYInicialCobrinha > quantidadePecasDentroDoCanvasXY-1) {
				posicaoYInicialCobrinha = 0;
			}
			// canvas
			contexto .fillStyle = "#00FF00";//verde
			contexto .fillRect(0,0, canvas.width, canvas.height);
			// maçã
			contexto .fillStyle = "red";
			//local inicial onde a maçã é desenhada
			contexto .fillRect(macaY*tamanhoPecas, macaY*tamanhoPecas, tamanhoPecas,tamanhoPecas);
			// cobrinha
			contexto .fillStyle = "#FFA500";//orange 1
			for (var i = 0; i < rastroDaCobrinha.length; i++) {
				// tamanhoPecas-1,tamanhoPecas-1 => serve para colocar 1px entre um quadradinho e outro da cobrinha
				// se não tiver esse MENOS 1, a cobrinha fica inteiriça, sem emenda
				contexto .fillRect(rastroDaCobrinha[i].x*tamanhoPecas, rastroDaCobrinha[i].y*tamanhoPecas, tamanhoPecas-1,tamanhoPecas-1);
				if (rastroDaCobrinha[i].x == cabecaCobrinhaX && rastroDaCobrinha[i].y == posicaoYInicialCobrinha)
				{	// fim do jogo, pois velocidade é igual a zero
					velocidadeX = velocidadeY=0;
					// tamanho da cauda volta ao tamanho original
					tamanhoDaCaudaCobrinha =5;
				}
			}
			// push posiciona o elemento na última posição
			// shift deleta o primeiro elemento
			// criando a ilusão do movimento				
			// motivo de estar entre chaves: criação de um, objeto POO
			// por isso a var x e y foram declaradasa aqui
			rastroDaCobrinha.push({ x:cabecaCobrinhaX, y:posicaoYInicialCobrinha })
			while (rastroDaCobrinha.length > tamanhoDaCaudaCobrinha) {
				rastroDaCobrinha.shift();
			}
			// condição para aumentar a cauda
			if (macaY == cabecaCobrinhaX && macaY == posicaoYInicialCobrinha){
				tamanhoDaCaudaCobrinha++;
				macaY = Math.floor(Math.random()*quantidadePecasDentroDoCanvasXY);
				macaY = Math.floor(Math.random()*quantidadePecasDentroDoCanvasXY);
			}
		}

		function controleDeTeclas(evento){

			switch (evento.keyCode) {
				case 37: // esquerda
					velocidadeX = -controleQuantasCasaCobrinhaAnda;
					velocidadeY = 0;
					break;
				case 38: // cima
					velocidadeX = 0;
					velocidadeY = -controleQuantasCasaCobrinhaAnda;
					break;
				case 39: // direita
					velocidadeX = controleQuantasCasaCobrinhaAnda;
					velocidadeY = 0;
					break;
				case 40: // baixo
					velocidadeX = 0;
					velocidadeY = controleQuantasCasaCobrinhaAnda;
					break;			
				default:					
					break;
			}
		}
	}
