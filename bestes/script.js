// 1. Controle de Navegação das Abas (sem recarregar a página)
function alterarAba(event, idAba) {
    // Esconde todos os painéis
    const paineis = document.querySelectorAll('.tab-panel');
    paineis.forEach(painel => painel.classList.remove('active'));

    // Remove a classe ativa de todos os botões
    const botoes = document.querySelectorAll('.tab-btn');
    botoes.forEach(botao => botao.classList.remove('active'));

    // Ativa o painel e o botão correspondente
    document.getElementById(idAba).classList.add('active');
    event.currentTarget.classList.add('active');
}

// 2. Lógica Global dos Cronômetros
function atualizarCronometros() {
    const cronometros = document.querySelectorAll('.cronometro');

    cronometros.forEach(cronometro => {
        // Pega a string de data salva no atributo 'data-prazo'
        const dataPrazoString = cronometro.getAttribute('data-prazo');
        const dataAlvo = new Date(dataPrazoString).getTime();
        const dataAgora = new Date().getTime();
        
        const diferenca = dataAlvo - dataAgora;

        // Mapeia os elementos internos desta aba específica
        const elDias = cronometro.querySelector('.dias');
        const elHoras = cronometro.querySelector('.horas');
        const elMinutos = cronometro.querySelector('.minutos');
        const elSegundos = cronometro.querySelector('.segundos');

        if (diferenca > 0) {
            // Conversões matemáticas de milissegundos para dias, horas, minutos e segundos
            const dias = Math.floor(diferenca / (1000 * 60 * 60 * 24));
            const horas = Math.floor((diferenca % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
            const minutos = Math.floor((diferenca % (1000 * 60 * 60)) / (1000 * 60));
            const segundos = Math.floor((diferenca % (1000 * 60)) / 1000);

            // Adiciona o '0' na frente se o número for menor que 10
            elDias.textContent = dias < 10 ? '0' + dias : dias;
            elHoras.textContent = horas < 10 ? '0' + horas : horas;
            elMinutos.textContent = minutos < 10 ? '0' + minutos : minutos;
            elSegundos.textContent = segundos < 10 ? '0' + segundos : segundos;
        } else {
            // Caso o prazo tenha chegado ao fim ou expirado
            elDias.textContent = '00';
            elHoras.textContent = '00';
            elMinutos.textContent = '00';
            elSegundos.textContent = '00';
        }
    });
}

// Roda a função imediatamente para evitar delay visual de 1s
atualizarCronometros();

// Atualiza o script a cada 1 segundo (1000 milissegundos)
setInterval(atualizarCronometros, 1000);