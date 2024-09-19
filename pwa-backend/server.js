const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
const PORT = 3000;

// Middleware
app.use(cors());
app.use(bodyParser.json());

// Simulação de um banco de dados (em memória)
let users = [
    { email: 'user@example.com', password: 'password123' }
];

let loginRecords = [];

// Rota de login
app.post('/login', (req, res) => {
    const { email, password } = req.body;
    const user = users.find(u => u.email === email && u.password === password);
    
    if (user) {
        return res.status(200).json({ message: 'Login bem-sucedido!' });
    }
    return res.status(401).json({ message: 'Credenciais inválidas!' });
});

// Rota para registrar presença
app.post('/register-presence', (req, res) => {
    const { date, time, location, image } = req.body;
    loginRecords.push({ date, time, location, image });
    return res.status(201).json({ message: 'Presença registrada com sucesso!' });
});

// Rota para obter registros de presença
app.get('/records', (req, res) => {
    return res.status(200).json(loginRecords);
});

// Inicializa o servidor
app.listen(PORT, () => {
    console.log(`Servidor rodando em http://localhost:${PORT}`);
});
const corsOptions = {
    origin: '*', // Permitir todas as origens
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    preflightContinue: false,
    optionsSuccessStatus: 204
};

app.use(cors(corsOptions));
