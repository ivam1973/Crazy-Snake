alert("ola");

window.onload = function(){
	
	canvas = document.getElementById('canvas');
	contexto  = canvas.getContext("2d");
	document.addEventListener("keydown", controleDeTeclas);
	setInterval(jogo, 160);

	const controleQuantasCasaCobrinhaAnda = 1;

	velocidadeX = velocidadeY = 0;
	cabecaCobrinhaX = 10;
	posicaoYInicialCobrinha = 15;
	tamanhoPecas = 30;
	quantidadePecasDentroDoCanvasXY = 20;
	macaX = macaY = 15;

	rastroDaCobrinha = [];
	tamanhoDaCaudaCobrinha = 1;

	vidas = 2;
	colidindocobrinha: false


	//maximoPulos = 4, //limite de pulos do cobrinha
	//VELOCIDADE = 6, //VELOCIDADE dos obstaculoes, 6 é proporcional ao canvas desse game: 600px
	///tem que ser 6, pros cálculos de VELOCIDADE ser múltiplo de 600
	//estadoAtualDoJogo = 0,            
	//record,
	//valor, // eu criei essa var para ver se consigo resolver a inconsistência localStorage
	//itemStorage,//idem acima
	//valorItemStorage,//idem acima
	//img,


	/*
	estado = {//pra gente não ficar se orientado por números para saber o estado atual do jogo,
		//criamos as strings abaixo:
		jogar: 0,
		jogando: 1,
		perdeu: 2
	},
	
	*/

/*

	cobrinha = {
		//x: 50,
		//y: 0,
		//altura: spriteBoneco.altura,
		//largura: spriteBoneco.largura,
		//cor: "#FF8C00",//dark orange //engine do game
		//gravidade: 1.5,//quanto amior, a gravidade é mais pesada, ou seja, o cobrinha fica mais pesado e com
		//os devidos cálculos, posso simular o peso real de qualquer objeto em relação a altura real
		//da Terra, daí precisa saber a fórmula da força da gravidade:
		//a gravidade aumenta a VELOCIDADE de um corpo, com o tempo:
		//10 metros por segundo ao quadrado, se no primeiro segundo: vale 10, no segundo segundo: vLW 20
		//, no terceiro segundo vale 30....
		//VELOCIDADE: 0,
		//forcaDoPulo: 15,// quanto maior, maior é a altura do pulo
		//quantidadePulos: 0,
		score: 0,
		//rotacaoBoneco: 0,
		vidas: 2, 
		
		/*
		atualiza: function () {
			//esses dois this abaixo, fazem o cobrinha descer por gravidade até o chão
			this.VELOCIDADE += this.gravidade;//==> em física: a gravidade incrementa a VELOCIDADE
			this.y += this.VELOCIDADE;//muda a posição do quadrante y do cobrinha
			
			//igual a 1º (um grau, pra rotacionar de um em um)
			//mas pra criar a ilusão de rotação depende tbm da trecho abaixo,
			//que está na aqui no método desenha, do cobrinha, que é nosso boneco
			//trasnladar o contexto pro x,y/2 do boneco, cria a ilusão da rotação do boneco
			//   PI dividido por 180 = um grau
			this.rotacaoBoneco += Math.PI / 180 * VELOCIDADE;//rotação sentido horário
			
			//&& estadoAtualDoJogo != estado.perdeu+> essa partinha: faz o cobrinha cair pra baixo do chão
			if (this.y > chao.y - this.altura && estadoAtualDoJogo != estado.perdeu) {// y é a linha de cima do cobrinha. 
				this.y = chao.y - this.altura;//aqui faz o cobrinha ficar na superfície do chão, "desliga a gravidade"
				this.quantidadePulos = 0;//quando o cobrinha cai no chão, a quantidade de pulos volta pra 
				//zero e não permite mais pulos, por isso aqui zera de novo a quantidade de pulos volta
				//pro cobrinha poder voltar a pular, já que ele so pula se tiver
				//os 3 pulos disponíveis, e a cada clique: 3, 2, 1, zero pulos
				
				//quando o bloquinho está no chão, a VELOCIDADE do cobrinha precisa ser zero,
				//pra parar de incrementar a VELOCIDADE: 
				this.VELOCIDADE = 0;
			}
		},*/
		/*
		pulo_do_cobrinha: function () {
			if (this.quantidadePulos < maximoPulos) {// so pula se a quantPulos for menor que o máximoPulos
				this.VELOCIDADE = -this.forcaDoPulo;//para o cobrinha pular, ele vai atuar no sentido contrário a gravidade
				this.quantidadePulos++;//quando o cobrinha pular, incremento
			}
		},*/

		/*
		reset: function () {//quando perde, reseta o cobrinha pro estado inicial do jogo
			this.VELOCIDADE = 0;
			this.y = 0;    

			//vamos criar o registro do recorde 
			//se a pontuação for maior do que o record atual:
			if (this.score > record){
				valor = document.strings['record'].dadovalue.value;
				itemStorage = localStorage.setItem('dataStorage', record);
				valorItemStorage = localStorage.getItem('dataStorage');						
				//localStorage.setItem("record", this.score);//guardamos o recorde no localStorage
				record = this.score;//aqui muda a variável do recorde no jogo,
							//ao continuar o jogo, esse registro de localStorage
							//guarda na memoria do computador, mesmo que caia a energia,
							//sessionStorage só guarda a variavel na sessao do site aberta, fechou, apaga automaticamente
			}
			
			this.score = 0;//quando perder, score = 0
			//a linha acima não fumcionou, tive que fazer gambitech pra
			//consertar, na linha 209: cobrinha.score = 0;//quando perder, score = 0
			this.vidas = 3;
		},	


		*/

/*

	obstaculos = {/*
		_obstaculos: [],
		cores: ["#708090", "#EECBAD", "#FF8C69", "#CD9B9B", "#EE7942"],//stategray, peachpuff2, salmon1, rosybrwn3, sienna2
		tempoAutoInserirObstaculo: 0,//controle de tempo aleatório para inserção dos obstáculos
		
		insere: function() {
			this._obstaculos.push({//push adiciona um elemento ao array
				x: LARGURA,//queremos que esses cobrinhas de obstaculos comecem na direita da tela
				//intervalo de 30 a 20 pixels gerado randomicamente
				//floor só "pega" o inteiro do random
				//(no random o intervalo de tempo vai até zero decimal = 0.0000000001 até 0.1, pelo que entendi
				
				//abaixo: se quiser usar largura de obstáculo aleatoria
				//largura: 30 + Math.floor(21 * Math.random()),//largura inicial do obstáculo
				largura: 50,
				
				altura: 10 + Math.floor(71 * Math.random()),//altura inicial do obstáculo
				cor: this.cores[Math.floor(5 * Math.random())]//atribuindo aleatoriamente as cores definidas no vetor cores
			});
			// esse 50 é a distância entre um cobrinha e outro
			this.tempoAutoInserirObstaculo = 50 + Math.floor(21 * Math.random());

		},*/
		/*
		atualiza: function () {
			if (this.tempoAutoInserirObstaculo == 0)//se o tempo=50...acima, => insere
			this.insere();
			//só que o tempo vai zerar: por isso decrementa abaixo: quando zera, 
			//volta pro 50 e insere e assim infinitamente
			else this.tempoAutoInserirObstaculo--;//aqui faz inserir automaticamente 

			for (var i = 0,  tam = this._obstaculos.length; i < tam; i++){
				var obstaculo = this._obstaculos[i];
				
				obstaculo.x -= VELOCIDADE;//decremento do obstaculo, como x está na direita da tela
				//vai andando para a  esquerda(decremento), criando a ilusão de movimento
				
				//verifica se o boneco não está colidindo com o cobrinha
				if (!cobrinha.colidindocobrinha && obstaculo.x <= cobrinha.x + cobrinha.largura && cobrinha.x <= obstaculo.x + obstaculo.largura && 
					 chao.y - obstaculo.altura <= cobrinha.y + cobrinha.altura){//chao.y - obstaculo.altura=>isso é o y do obstaculo
					
					cobrinha.colidindocobrinha = true;
					setTimeout(function() {
						cobrinha.colidindocobrinha = false;//volta pra false depois de 500 milissegundos
					}, 500);
					//verifica se tem vidas
						if (cobrinha.vidas >= 1)
						cobrinha.vidas--;
						else
						estadoAtualDoJogo = estado.perdeu;       
						
					} 
					
				//se o x do obstaculo = zero
				else if (obstaculo.x == 0)
					cobrinha.score++; //aqui é pra somar de 1 em 1 a cada obstaculo ultrapassado
											
				else if (obstaculo.x <= -obstaculo.largura) {//splice remove elemento do array,
					this._obstaculos.splice(i, 1); // que é o x do obstaculo, aqui, remove 1 elemento       
					tam--;//aqui é pro for não tentar acessar um elemento que foi removido(splice acima)
					i--;//aqui também
				}
			}
		},
		//quando a gente perder, precisamos limpar o array, para começar de novo a iteração,
		//se não limpae, fica atualizando o array infinitamente, e o jogo não pode ser reiniciado,
		//porque fica preso nesse loop de atualizar os obstaculos, por isso
		//precisamos limpar o array, "apagar os atuais obstaculos e começar do zero"
		limparObstaculosAoPerderOJogo: function () {
			this._obstaculos = [];
		},

		desenha: function () {
			//esse for é para chamar todas as cores, cobrinhas ao mesmo tempo, 
			//pois eles vão ficar correndo na tela          
			for (var i = 0, tam = this._obstaculos.length; i < tam; i++){
				var obstaculo = this._obstaculos[i];
				contexto.fillStyle = obstaculo.cor;
				contexto.fillRect(obstaculo.x, chao.y - obstaculo.altura, obstaculo.largura, obstaculo.altura);
			} 
		}    
	}
	*/


	
/*

	function desenha() {//depois que atualiza: desenha na tela (primeiro atualiza, depois desenha, graças a função requestAnimationFrame)
		//contexto.fillStyle = "#50beff";
		//contexto.fillRect(0, 0, LARGURA, ALTURA); //topo esquerdo da tela para baixo a direita

		//bg.desenha(0,0);     //spriteCeu.desenha(0,50);     //spriteCeu.desenha(0,50);    //spriteBoneco.desenha(50,70);
		//desenhando o score do jogador  
		contexto.fillStyle = "#FFF";
		contexto.font = "58px Arial";
		//contexto.fillText(cobrinha.score, 20, 280);//score na cor branca a esquerda da tela
		contexto.fillText(cobrinha.vidas, 550, 280);//score na cor branca a esquerda da tela

		/*
		if (estadoAtualDoJogo == estado.jogar && estadoAtualDoJogo != estado.jogando 
			&& estadoAtualDoJogo != estado.perdeu){
			obstaculos.desenha();                            
			ceu.desenha();                
			cobrinha.desenha();
		}
		else if (estadoAtualDoJogo == estado.jogando) {
			montanhaFundo1.desenha();
			obstaculos.desenha();                            
			ceu.desenha();                
			cobrinha.desenha();                
			chao.desenha();
		}

		else                 
			ceu.desenha();                
							
		//desenhando o botao player (Jogar)
		if (estadoAtualDoJogo == estado.jogar) 
			jogar.desenha(LARGURA / 2 - jogar.largura / 2, ALTURA / 2 - jogar.altura / 2);
			
		//desenhando o botao score
		if (estadoAtualDoJogo == estado.perdeu) {// - spriteBoneco.altura / 2, esse trecho, coloca o perdeu um pouco pra cima do centro do contexto
			perdeu.desenha(LARGURA / 2 - perdeu.largura / 2, ALTURA / 2 - perdeu.altura / 2 - spriteBoneco.altura / 2);
			
			//desenhar sprite record
			contexto.fillStyle = "orange";
			spriteRecord.desenha(LARGURA / 2 - spriteRecord.largura / 2 - 20, ALTURA / 2 + perdeu.altura / 2 - spriteRecord.altura / 2 - 16);
		   
			//desenhar os pontos (score) pontuação que o jogador fez na partida
			contexto.fillStyle = "black";
			contexto.fillText(cobrinha.score, 347, 406);
			
			//desenhar os novo record, se for o caso
			if (cobrinha.score > record) {
				contexto.fillStyle = "#0000CD";
				spriteNovoRec.desenha(LARGURA / 2 - 110, ALTURA / 2 + 64);                
				contexto.fillText(cobrinha.score, 385, 448);
			}   
			
			else
				contexto.fillText(cobrinha.record, 385, 448);

		}   
	}	*/

		



	
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
			// por isso a var x e y foram declaradas aqui
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

			function desenha() {//depois que atualiza: desenha na tela (primeiro atualiza, depois desenha, graças a função requestAnimationFrame)
				//contexto.fillStyle = "#50beff";
				//contexto.fillRect(0, 0, LARGURA, ALTURA); //topo esquerdo da tela para baixo a direita
		
				//bg.desenha(0,0);     //spriteCeu.desenha(0,50);     //spriteCeu.desenha(0,50);    //spriteBoneco.desenha(50,70);
				//desenhando o score do jogador  
				contexto.fillStyle = "black";
				contexto.font = "55px Arial";
				//contexto.fillText(cobrinha.score, 20, 280);//score na cor branca a esquerda da tela
				contexto.fillText(vidas, 500, 180);//score na cor branca a esquerda da tela

			}

				contexto.fillStyle = "white";
				contexto.font = "45px Arial";
				//contexto.fillText(cobrinha.score, 20, 280);//score na cor branca a esquerda da tela
				contexto.fillText(vidas, 500, 80);//score na cor branca a esquerda da tela

		desenha();
				
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

