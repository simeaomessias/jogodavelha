// --------------------------------------------------------------------
// VARIÁVEL GLOBAL (objeto com informação do jogo)

var jogo = {
    tipo: "",
    lance: 0,
    jogadorAtual: "1",
    tabuleiro: [
        ["-", "-", "-", "-", "-"],
        ["-", "-", "-", "-", "-"],
        ["-", "-", "-", "-", "-"],
        ["-", "-", "-", "-", "-"],
        ["-", "-", "-", "-", "-"]                
    ],
    sequenciaVitoria5x5: ["0","0","0"],
    sequenciaVitoria5x5: ["0","0","0","0","0"],
    ganhador: "0"
}

// *****************************************************************
//                      CONTROLE DE TELA
// *****************************************************************

// ONCLICK DO BOTÃO INFERIOR
gerenciaBotoes = function (evento) {
    inicializarJogo();
    switch (evento.target.id) {
        case "btn-3x3": jogo.tipo="3x3"; telaJogo(); break;
        case "btn-5x5": jogo.tipo="5x5"; telaJogo(); break;
        case "btn-encerrar": encerrarTelaJogo(); break;
    }
}

// TELA DO JOGO
telaJogo = function () {
    // Opções de tabuleiro
    document.getElementById('opcao-tabuleiro').style.display="none"
    // Mensagem inferior
    document.getElementById('mensagem').style.display="none"
    // Display
    document.getElementById('display').style.background="rgb(0,200,255)"
    // Apontadores
    document.getElementById('apontadores').style.display="flex"
    document.getElementById('apontador-jogador-1').style.visibility="visible";
    document.getElementById('apontador-jogador-1').innerHTML="&uArr;&uArr;&uArr;</span>"
    document.getElementById('apontador-jogador-2').style.visibility="visible";
    document.getElementById('apontador-jogador-2').innerHTML="<span>&uArr;&uArr;&uArr;</span>"
    document.getElementById('apontador-jogador-2').style.visibility="hidden"
    // Legenda
    document.getElementById('legenda').style.display="flex"
    document.getElementById('jogador-1').style.visibility="visible";
    document.getElementById('nome-jogador-1').style.visibility="visible";
    document.getElementById('jogador-2').style.visibility="visible";
    document.getElementById('nome-jogador-2').style.visibility="visible";
   // Tabuleiro
    switch (jogo.tipo) {
        case "3x3": document.getElementById('tabuleiro3x3').style.display="grid"; break;
        case "5x5": document.getElementById('tabuleiro5x5').style.display="grid"; break;
    }
    // Inicialização dos campos do tabuleiro 3x3
    var campos = []
    campos = [...document.getElementsByClassName('campo3x3')]
    campos.forEach(item => {
        item.addEventListener('click',atualizarCampoTela)
        item.innerHTML = "<div></div>"
        item.style.background = "rgb(0,200,255)";
        item.setAttribute('jogador','')
    });
    // Inicialização dos campos do tabuleiro 5x5
    var campos = []
    campos = [...document.getElementsByClassName('campo5x5')]
    campos.forEach(item => {
        item.addEventListener('click',atualizarCampoTela)
        item.innerHTML = "<div></div>"
        item.style.background = "rgb(0,200,255)";
        item.setAttribute('jogador','')
    });
    // Exibição do rodapé com o botão
    document.getElementById('rodape').style.display="flex"
    document.getElementById('rodape').style.background="rgb(0,200,255)"
    document.getElementById('rodape').style.border="0"
    document.getElementById('btn-encerrar').style.display = "block"
    document.getElementById('btn-encerrar').value="Encerrar"
}

// ATUALIZAÇÃO DOS CAMPOS APÓS SEREM CLICADOS
atualizarCampoTela = function (evento) {
    // 1 - Inserção da <div> com o símbolo do jogador atual
    // 2 - Alteração do valor atributo 'situação' para 'ocupado'
    if (evento.target.getAttribute('jogador') == '') {
        switch (jogo.jogadorAtual) {
            case "1":
                evento.target.innerHTML = "<div class='jogador-1'></div>";
                document.getElementById('apontador-jogador-1').style.visibility="hidden";
                document.getElementById('apontador-jogador-2').style.visibility="visible";
                evento.target.setAttribute('jogador', '1'); break;
            case "2":
                evento.target.innerHTML = "<div class='jogador-2'></div>";
                document.getElementById('apontador-jogador-1').style.visibility="visible";
                document.getElementById('apontador-jogador-2').style.visibility="hidden";
                evento.target.setAttribute('jogador', '2'); break;
        }
    }
    controleJogo()
}

// RETORNO PARA A TELA DE ABERTURA DO TABULEIRO
encerrarTelaJogo = function () {
    // Organização da tela inicial
    document.getElementById('tabuleiro3x3').style.display="none"
    document.getElementById('tabuleiro5x5').style.display="none"
    document.getElementById('legenda').style.display="none"
    document.getElementById('apontadores').style.display="none"
    document.getElementById('rodape').style.borderTop="1px solid black"
    document.getElementById('rodape').style.background="rgb(255,200,0)"
    document.getElementById('opcao-tabuleiro').style.display="flex"
    document.getElementById('btn-encerrar').style.display="none"
    document.getElementById('mensagem').style.display="flex"
}

// TELA DE RESULTADO
telaResultado = function () {
    if (jogo.ganhador != "0") {
        // Organização da informação do vencedor
        switch (jogo.ganhador) {
            case "1":
                document.getElementById('apontador-jogador-1').style.visibility="visible";
                document.getElementById('apontador-jogador-1').innerHTML="<span>VENCEU!</span>";
                document.getElementById('jogador-2').style.visibility="hidden";
                document.getElementById('nome-jogador-2').style.visibility="hidden";
                document.getElementById('apontador-jogador-2').style.visibility="hidden";
                break;
            case "2":
                document.getElementById('apontador-jogador-2').style.visibility="visible";
                document.getElementById('apontador-jogador-2').innerHTML="<span>&nbsp;VENCEU!</span>";
                document.getElementById('jogador-1').style.visibility="hidden";
                document.getElementById('nome-jogador-1').style.visibility="hidden";
                document.getElementById('apontador-jogador-1').style.visibility="hidden"; break;
        }
        // document.getElementById('display').style.background="rgb(255,200,0)"
        // document.getElementById('legenda').style.background="rgb(255,200,0)"
        // document.getElementById('apontadores').style.background="rgb(255,200,0)"
        // Marcação da sequência vencedora no tabuleiro
        switch (jogo.tipo) {
            case "3x3":
                var campos = [...document.getElementsByClassName('campo3x3')]
                jogo.sequenciaVitoria5x5.forEach(posicao => {
                    campos[posicao-1].style.background="rgb(255,255,255)"
                })
                break;
            case "5x5":
                var campos = [...document.getElementsByClassName('campo5x5')]
                jogo.sequenciaVitoria5x5.forEach(posicao => {
                    campos[posicao-1].style.background="rgb(255,255,255)"
                })
                break;
        }
    } else if ((jogo.tipo == "3x3" && jogo.lance == 9) || (jogo.tipo == "5x5" && jogo.lance == 25)) {
        document.getElementById('apontador-jogador-1').style.visibility="visible";
        document.getElementById('apontador-jogador-2').style.visibility="visible";
        document.getElementById('apontador-jogador-1').innerHTML="<span>EMPATE!</span>";
        document.getElementById('apontador-jogador-2').innerHTML="<span>EMPATE!</span>";
    }
    // Alteração do texto do botão
    document.getElementById('btn-encerrar').value="Novo jogo"
}

document.getElementById('btn-3x3').addEventListener('click', gerenciaBotoes)
document.getElementById('btn-5x5').addEventListener('click', gerenciaBotoes)
document.getElementById('btn-encerrar').addEventListener('click',gerenciaBotoes)

// *****************************************************************
//                        REGRAS DO JOGO
// *****************************************************************

// INICIALIZAR NOVO JOGO
inicializarJogo = function () {
    jogo.tipo = ""
    jogo.lance = 0
    jogo.jogadorAtual = "1"
    jogo.tabuleiro = [
        ["-", "-", "-", "-", "-"],
        ["-", "-", "-", "-", "-"],
        ["-", "-", "-", "-", "-"],
        ["-", "-", "-", "-", "-"],
        ["-", "-", "-", "-", "-"]
    ]
    jogo.sequenciaVitoria5x5 = ["0","0","0"]
    jogo.sequenciaVitoria5x5 = ["0","0","0","0","0"]
    jogo.ganhador = "0"
}

// MONTAGEM DA MATRIZ DO TABULEIRO APÓS CADA CLIQUE do USUÁRIO
montarTabuleiro = function () {
    
    // Inicialização
    var matriz = new Array(5)
    for (let i=0; i<5; i++) {matriz[i] = new Array(5)}
    
    // Varredura no campos e montagem da matriz
    switch (jogo.tipo) {
        case "3x3":
            var campos = []
            campos = [...document.getElementsByClassName('campo3x3')]
            campos.forEach((item, indice) => {
                if (indice <= 2) {
                    matriz[0][indice] = item.getAttribute('jogador')
                } else if (indice > 2 && indice <=5) {
                    matriz[1][indice-3] = item.getAttribute('jogador')
                } else if (indice > 5) {
                    matriz[2][indice-6] = item.getAttribute('jogador')
                }
            })            
            break;
        case "5x5":
            var campos = []    
            campos = [...document.getElementsByClassName('campo5x5')]
            campos.forEach((item, indice) => {
                if (indice <= 4) {
                    matriz[0][indice] = item.getAttribute('jogador')
                } else if (indice > 4 && indice <=9) {
                    matriz[1][indice-5] = item.getAttribute('jogador')
                } else if (indice > 9 && indice <=14) {
                    matriz[2][indice-10] = item.getAttribute('jogador')
                } else if (indice > 14 && indice <=19) {
                    matriz[3][indice-15] = item.getAttribute('jogador')
                } else if (indice > 19) {
                    matriz[4][indice-20] = item.getAttribute('jogador')
                }
            })                        
            break;
    }
    return matriz
}

// CONTROLE DO JOGO
controleJogo = function () {
    // Atualização do lance do jogo
    ++jogo.lance
    
    // Matriz atual do tabuleiro
    jogo.tabuleiro = montarTabuleiro()
    
    // Verificação da existência de sequência ganhadora
    var linhas = ["", "", "", "", ""]
    var colunas = ["", "", "", "", ""]
    var diagonais = []
    switch (jogo.tipo) {
        case "3x3":
            for (let i=0; i<3; i++) {
                for (let j=0; j<3; j++) {
                    linhas[i] += jogo.tabuleiro[i][j]
                    colunas[i] += jogo.tabuleiro[j][i]
                }
            }
            diagonais[0] = jogo.tabuleiro[0][0] + jogo.tabuleiro[1][1] + jogo.tabuleiro[2][2]
            diagonais[1] = jogo.tabuleiro[0][2] + jogo.tabuleiro[1][1] + jogo.tabuleiro[2][0]
            var posicaoLinha = -1;
            var posicaoColuna = -1;
            var posicaoDiagonal = -1;
            linhas.forEach((item,indice) => {
                if (item == "111" || item == "222") {
                    posicaoLinha = indice
                    jogo.ganhador = item[0]
                    switch (posicaoLinha) {
                        case 0: jogo.sequenciaVitoria5x5=["1","2","3"]; break;
                        case 1: jogo.sequenciaVitoria5x5=["4","5","6"]; break;
                        case 2: jogo.sequenciaVitoria5x5=["7","8","9"]; break;
                    }
                }
            })
            colunas.forEach((item,indice) => {
                if (item == "111" || item == "222") {
                    posicaoColuna = indice
                    jogo.ganhador = item[0]
                    switch (posicaoColuna) {
                        case 0: jogo.sequenciaVitoria5x5=["1","4","7"]; break;
                        case 1: jogo.sequenciaVitoria5x5=["2","5","8"]; break;
                        case 2: jogo.sequenciaVitoria5x5=["3","6","9"]; break;
                    }
                }
            })
            diagonais.forEach((item,indice) => {
                if (item == "111" || item == "222") {
                    posicaoDiagonal = indice
                    jogo.ganhador = item[0]
                    switch (posicaoDiagonal) {
                        case 0: jogo.sequenciaVitoria5x5=["1","5","9"]; break;
                        case 1: jogo.sequenciaVitoria5x5=["3","5","7"]; break;
                    }
                }
            })
            break;
        case "5x5": 
            for (let i=0; i<5; i++) {
                for (let j=0; j<5; j++) {
                    linhas[i] += jogo.tabuleiro[i][j]
                    colunas[i] += jogo.tabuleiro[j][i]
                }
            }
            diagonais[0] = jogo.tabuleiro[0][0] + jogo.tabuleiro[1][1] + jogo.tabuleiro[2][2] + jogo.tabuleiro[3][3] + jogo.tabuleiro[4][4]
            diagonais[1] = jogo.tabuleiro[0][4] + jogo.tabuleiro[1][3] + jogo.tabuleiro[2][2] + jogo.tabuleiro[3][1] + jogo.tabuleiro[4][0]
            var posicaoLinha = -1;
            var posicaoColuna = -1;
            var posicaoDiagonal = -1;
            linhas.forEach((item,indice) => {
                if (item == "11111" || item == "22222") {
                    posicaoLinha = indice
                    jogo.ganhador = item[0]
                    switch (posicaoLinha) {
                        case 0: jogo.sequenciaVitoria5x5=["1","2","3","4","5"]; break;
                        case 1: jogo.sequenciaVitoria5x5=["6","7","8","9","10"]; break;
                        case 2: jogo.sequenciaVitoria5x5=["11","12","13","14","15"]; break;
                        case 3: jogo.sequenciaVitoria5x5=["16","17","18","19","20"]; break;
                        case 4: jogo.sequenciaVitoria5x5=["21","22","23","24","25"]; break;
                    }
                }
            })
            colunas.forEach((item,indice) => {
                if (item == "11111" || item == "22222") {
                    posicaoColuna = indice
                    jogo.ganhador = item[0]
                    switch (posicaoColuna) {
                        case 0: jogo.sequenciaVitoria5x5=["1","6","11","16","21"]; break;
                        case 1: jogo.sequenciaVitoria5x5=["2","7","12","17","22"]; break;
                        case 2: jogo.sequenciaVitoria5x5=["3","8","13","18","23"]; break;
                        case 3: jogo.sequenciaVitoria5x5=["4","9","14","19","24"]; break;
                        case 4: jogo.sequenciaVitoria5x5=["5","10","15","20","25"]; break;
                    }
                }
            })
            diagonais.forEach((item,indice) => {
                if (item == "11111" || item == "22222") {
                    posicaoDiagonal = indice
                    jogo.ganhador = item[0]
                    switch (posicaoDiagonal) {
                        case 0: jogo.sequenciaVitoria5x5=["1","7","13","19","25"]; break;
                        case 1: jogo.sequenciaVitoria5x5=["5","9","13","17","21"]; break;
                    }
                }
            })
            break;
    }
    // Verificação se houve ganhador ou empate na partida
    if (jogo.ganhador != '0' || (jogo.tipo == "3x3" && jogo.lance == 9) || (jogo.tipo == "5x5" && jogo.lance == 25)) {
        // Se sim, remove a função atualizaCampo() de todos os espaços do tabuleiro
        switch (jogo.tipo) {
            case "3x3": var campos = [...document.getElementsByClassName('campo3x3')]; break;
            case "5x5": var campos = [...document.getElementsByClassName('campo5x5')]; break;
        }
        campos.forEach(item => {
            item.removeEventListener('click',atualizarCampoTela)
        })
        telaResultado()  
    }
    // Alteração do jogador para o próximo lance
    switch (jogo.jogadorAtual) {
        case '1': jogo.jogadorAtual = '2'; break;
        case '2': jogo.jogadorAtual = '1'; break;
    }
}