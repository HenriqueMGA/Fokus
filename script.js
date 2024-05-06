const html = document.querySelector('html')
const focoBt = document.querySelector('.app__card-button--foco')
const curtoBt = document.querySelector('.app__card-button--curto')
const longoBt = document.querySelector('.app__card-button--longo')
const timer = document.getElementById('timer')
const banner = document.querySelector('.app__image')
const titulo = document.querySelector('.app__title')
const iniciarBt = document.querySelector('.app__card-primary-button')
//const duracaoFoco = 1500;
//const duracaoDescansoCurto = 300;
//const duracaoDescansoLongo = 900;
const botoes = document.querySelectorAll('.app__card-button')
const startPauseBt = document.querySelector('#start-pause')
const startPause = document.querySelector('#start-pause span')
const startPauseImagem = document.querySelector('.app__card-primary-butto-icon')

const musicaFocoInput = document.querySelector('#alternar-musica')
const musica = new Audio('./sons/luna-rise-part-one.mp3')
musica.loop = true
const startSom = new Audio('./sons/play.wav')
const pauseSom = new Audio('./sons/pause.mp3')
const beepSom = new Audio('./sons/beep.mp3')

let tempoDecorridoEmSegundos = 1500
let intervaloId = null

function alterarContexto(contexto) {
    mostrarTempoNaTela()
    botoes.forEach(function (contexto) {
        contexto.classList.remove('active')});
    html.setAttribute('data-contexto', contexto);
    banner.setAttribute('src', `./imagens/${contexto}.png`);
    switch (contexto) {
        case "foco":
            titulo.innerHTML = `
            Otimize sua produtividade,<br> <strong class="app__title-strong">mergulhe no que importa.</strong>
            `
            break;
        case "descanso-curto":
            titulo.innerHTML = `
            Que tal dar uma respirada? <strong class="app__title-strong">Faça uma pausa curta!</strong>
            `
            break;
        case "descanso-longo":
            titulo.innerHTML = `
            Hora de voltar à superfície.<strong class="app__title-strong">Faça uma pausa longa.</strong>
            `
    
        default:
            break;
    }
}

musicaFocoInput.addEventListener('change', function() {
    if (musica.paused) {
        musica.play()
    } else {
        musica.pause()
    }
})

focoBt.addEventListener('click', function() {
    tempoDecorridoEmSegundos = 1500
    alterarContexto('foco')
    focoBt.classList.add('active')
});

curtoBt.addEventListener('click', function() {
    tempoDecorridoEmSegundos = 300
    alterarContexto('descanso-curto')
    curtoBt.classList.add('active')
});

longoBt.addEventListener('click', function() {
    tempoDecorridoEmSegundos = 900
    alterarContexto('descanso-longo')
    longoBt.classList.add('active')
});

function iniciarOuPausar() {
    if(intervaloId){
        pauseSom.play()
        zerar()
        return
    }
    startSom.play()
    intervaloId = setInterval(contagemRegressiva, 1000)
    startPause.textContent = "Pausar"
    startPauseImagem.setAttribute('src', './imagens/pause.png')
}

function zerar() {
    clearInterval(intervaloId) 
    intervaloId = null
    startPause.textContent = "Começar"
    startPauseImagem.setAttribute('src', './imagens/play_arrow.png')
}

const contagemRegressiva = () => {
    if(tempoDecorridoEmSegundos <= 0){
        beepSom.play()
        alert('Tempo finalizado!')
        zerar()
        return
    }
    tempoDecorridoEmSegundos -= 1
    mostrarTempoNaTela()
}

startPauseBt.addEventListener ('click', iniciarOuPausar)

function mostrarTempoNaTela() {
    const tempo = new Date(tempoDecorridoEmSegundos * 1000)
    const tempoFormatado = tempo.toLocaleTimeString('pt-Br', {minute: '2-digit', second: '2-digit'})
    timer.innerHTML = `${tempoFormatado}`
}

mostrarTempoNaTela()
