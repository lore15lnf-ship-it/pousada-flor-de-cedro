import app from './index.js';

const PORT = 3000;
app.listen(PORT, () => {
    console.log('Servidor da Pousada Flor de Cedro rodando em http://localhost:${PORT}');
});