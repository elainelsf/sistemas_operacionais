// JAVASCRIPT NOVO

function openNav() {
    document.getElementById("myNav").style.width = "35%";
    document.getElementById("myNav").style.display = "block";
  }
  
  function closeNav() {
    document.getElementById("myNav").style.width = "0%";
    document.getElementById("myNav").style.display = "none";
  
  }
  
  // FINAL JAVASCRIPT NOVO


function executarRoundRobin() {
    const processosInput = document.getElementById('processos').value;
    const temposExecucaoInput = document.getElementById('temposExecucao').value;
    const quantumInput = parseInt(document.getElementById('quantum').value);
    
    

    const processos = processosInput.split(',');
    const temposExecucao = temposExecucaoInput.split(',').map(Number);
    
    
    

    // Chama a função roundRobin e guarda o resultado em um objeto
   //const { tempoTotalExecucao, tempoMedioEspera } =
   
   roundRobin( processos, temposExecucao, quantumInput );

    // Exibe os resultados no console
    //console.log("Tempo total de execução:", tempoTotalExecucao);
    //console.log("Tempo médio de espera:", tempoMedioEspera);
}


function roundRobin(processos, temposExecucao, quantum) {

    const n = processos.length;
    const fila = [];
    let tempoTotal = 0;
    let tempoEsperaTotal = 0;
    const tempoRestante = [...temposExecucao];

    let tempoAtual = 0;
    let i = 0;
    while (true) {
        // Calcula o tempo que será executado neste ciclo (quantum ou tempo restante do processo)
        let tempoExecutado = Math.min(quantum, tempoRestante[i]);

        // Atualiza o tempo restante do processo
        tempoRestante[i] -= tempoExecutado;

        // Atualiza o tempo total de execução
        tempoAtual += tempoExecutado;
        tempoTotal += tempoExecutado;

        // Se o processo for concluído neste ciclo
        if (tempoRestante[i] === 0) {
            // Adiciona o processo à fila de execução
            fila.push(processos[i]);

            // Calcula o tempo de espera total para este processo e adiciona ao tempo de espera total
            tempoEsperaTotal += tempoAtual - temposExecucao[i];
        } else {
            // Caso contrário, apenas adiciona o processo à fila
            fila.push(processos[i]);
        }

        // Verifica o próximo processo a ser executado (circularmente)
        if (i === n - 1) {
            i = 0;
        } else if (tempoRestante[i + 1] > 0) {
            i++;
        } else {
            i = 0;
        }

        // Verifica se todos os processos foram concluídos
        let finalizado = true;
        for (let j = 0; j < n; j++) {
            if (tempoRestante[j] > 0) {
                finalizado = false;
                break;
            }
        }

        // Se todos os processos foram concluídos, encerra o loop
        if (finalizado) {
            break;
        }
    }

    // Calcula o tempo médio de espera
    const tempoMedioEspera = tempoEsperaTotal / n;

    // Exibe a fila de execução, o tempo total de execução e o tempo médio de espera no console
    const resultElementFilled = document.getElementById('result-fila');
    
    resultElementFilled.textContent = `Fila de execução: ${fila}`;
    
    const resultElementTempoTotal = document.getElementById('result-tempo');
    
    resultElementTempoTotal.textContent = `Tempo total de execução: ${tempoTotal}`;
    
    const resultElementTempoEspera = document.getElementById('result-tempo-espera');
    
    resultElementTempoEspera.textContent = `Tempo médio de espera: ${tempoMedioEspera}`;

    
    

    // Retorna os resultados como um objeto
    return {
        tempoTotalExecucao: tempoTotal,
        tempoMedioEspera: tempoMedioEspera
        
    };
    
    
}

//document.addEventListener('DOMContentLoaded', executarRoundRobin);

