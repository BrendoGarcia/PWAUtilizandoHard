// app.js

// Evento de submit do formulário de login
document.getElementById('login-form').addEventListener('submit', function(event) {
    event.preventDefault();
    
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;

    

    // Mostrar seção de foto
    document.getElementById('photo-section').style.display = 'block';

    // Obter geolocalização
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(showLocation, showError);
    } else {
        document.getElementById('location').innerText = "Geolocalização não é suportada por este navegador.";
    }
});

function showLocation(position) {
    const latitude = position.coords.latitude;
    const longitude = position.coords.longitude;
    document.getElementById('location').innerText = `Sua localização: ${latitude}, ${longitude}`;
}

// Função para tratar erros de geolocalização
function showError(error) {
    switch(error.code) {
        case error.PERMISSION_DENIED:
            document.getElementById('location').innerText = "Usuário negou a solicitação de Geolocalização.";
            break;
        case error.POSITION_UNAVAILABLE:
            document.getElementById('location').innerText = "Informação de localização indisponível.";
            break;
        case error.TIMEOUT:
            document.getElementById('location').innerText = "A requisição de localização expirou.";
            break;
        case error.UNKNOWN_ERROR:
            document.getElementById('location').innerText = "Um erro desconhecido ocorreu.";
            break;
    }
}

// Captura de foto
const video = document.getElementById('video');
const captureButton = document.getElementById('capture');
const canvas = document.getElementById('canvas');
const context = canvas.getContext('2d');

// Acesso à câmera
navigator.mediaDevices.getUserMedia({ video: true })
    .then(stream => {
        video.srcObject = stream;
    })
    .catch(err => {
        console.error("Erro ao acessar a câmera: ", err);
    });

captureButton.addEventListener('click', () => {
    context.drawImage(video, 0, 0, canvas.width, canvas.height);
    const imageData = canvas.toDataURL('image/png');
    
    // Capturar localização e armazenar o registro
    navigator.geolocation.getCurrentPosition(position => {
        const latitude = position.coords.latitude;
        const longitude = position.coords.longitude;
        const dataHora = new Date().toLocaleString();
        
        const registro = {
            foto: imageData,
            latitude: latitude,
            longitude: longitude,
            dataHora: dataHora
        };

        salvarRegistro(registro);
        mostrarRegistros();
    });
});

// Função para salvar o registro no localStorage
function salvarRegistro(registro) {
    let registros = JSON.parse(localStorage.getItem('registros')) || [];
    registros.push(registro);
    localStorage.setItem('registros', JSON.stringify(registros));
}

// Função para mostrar os registros
function mostrarRegistros() {
    const registros = JSON.parse(localStorage.getItem('registros')) || [];
    const locationDiv = document.getElementById('location');
    locationDiv.innerHTML += registros.map(registro => `
        <div>
            <img src="${registro.foto}" width="100" alt="Registro de Presença">
             <p><strong>Data/Hora:</strong> ${registro.dataHora}</p>
            <p><strong>Localização:</strong> ${registro.latitude}, ${registro.longitude}</p>
        </div>
    `).join('');
}

document.getElementById('confirmepresneca').addEventListener('click', () => {
    // Exibir a caixa de confirmação
    exibirConfirmacao();
});

function exibirConfirmacao() {
    const confirmacao = document.createElement('div');
    confirmacao.className = 'confirmacao';
    confirmacao.innerText = 'Presença Confirmada!';
    document.body.appendChild(confirmacao);

    // Remover a caixa após alguns segundos
    setTimeout(() => {
        confirmacao.remove();
    }, 3000);
}
