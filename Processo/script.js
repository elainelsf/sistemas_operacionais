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


// Definição da classe para representar um processo
class Process {
  constructor(id, memorySize, executionTime) {
    this.id = id; // Identificador único do processo
    this.memorySize = memorySize; // Tamanho de memória necessário pelo processo
    this.executionTime = executionTime; // Tempo de execução do processo
  }
}

// Definição da classe para representar um bloco de memória
class MemoryBlock {
  constructor(startAddress, size) {
    this.startAddress = startAddress; // Endereço inicial do bloco de memória
    this.size = size; // Tamanho do bloco de memória
    this.processId = null; // Identificador do processo alocado no bloco (null se não estiver alocado)
  }
}

// Função que implementa o algoritmo de alocação dinâmica Best-Fit
function bestFit(memoryBlocks, process) {
  let bestFitIndex = -1;
  let minFragmentation = Infinity;

  for (let i = 0; i < memoryBlocks.length; i++) {
    const block = memoryBlocks[i];
    if (block.processId === null && block.size >= process.memorySize) {
      const fragmentation = block.size - process.memorySize;
      if (fragmentation < minFragmentation) {
        bestFitIndex = i;
        minFragmentation = fragmentation;
      }
    }
  }

  if (bestFitIndex !== -1) {
    const bestFitBlock = memoryBlocks[bestFitIndex];
    bestFitBlock.processId = process.id;
    return bestFitBlock;
  }

  return null; // Não foi possível encontrar um bloco adequado para alocar o processo
}

// Função que implementa o escalonamento Round Robin
function roundRobin(processes, quantum) {
  const executionOrder = [];
  let remainingProcesses = [...processes];
  let currentTime = 0;

  while (remainingProcesses.length > 0) {
    const currentProcess = remainingProcesses.shift();
    const executionTime = Math.min(currentProcess.executionTime, quantum);

    // Simula a execução do processo pelo tempo do quantum ou pelo tempo restante de execução
    currentTime += executionTime;
    currentProcess.executionTime -= executionTime;

    // Adiciona o processo à ordem de execução
    executionOrder.push({
      processId: currentProcess.id,
      startTime: currentTime - executionTime,
      endTime: currentTime,
    });

    // Se o processo ainda tem tempo de execução, coloca-o novamente na lista de processos
    if (currentProcess.executionTime > 0) {
      remainingProcesses.push(currentProcess);
    }
  }

  return executionOrder;
}

// Função principal do agendador de processos
function agendador_processos(processes, totalMemorySize, quantum) {
  // Ordena os processos pelo tamanho de memória necessário em ordem crescente
  processes.sort((a, b) => a.memorySize - b.memorySize);

  // Cria os blocos de memória com o tamanho total disponível
  const memoryBlocks = [new MemoryBlock(0, totalMemorySize)];

  const executionOrder = [];

  for (const process of processes) {
    const allocatedBlock = bestFit(memoryBlocks, process);

    if (allocatedBlock !== null) {
      executionOrder.push({
        processId: process.id,
        memoryAllocation: {
          startAddress: allocatedBlock.startAddress,
          endAddress: allocatedBlock.startAddress + process.memorySize,
        },
      });
    } else {
      // Caso não encontre um bloco adequado para alocar o processo, o mesmo não será executado
      executionOrder.push({
        processId: process.id,
        memoryAllocation: null,
      });
    }
  }

  // Executa os processos na ordem determinada pelo escalonamento Round Robin
  const processExecutionOrder = roundRobin(processes, quantum);

  // Atualiza a ordem de execução dos processos com os tempos de início e fim
  for (const execution of processExecutionOrder) {
    const { processId, startTime, endTime } = execution;
    const processEntry = executionOrder.find((entry) => entry.processId === processId);
    if (processEntry) {
      processEntry.startTime = startTime;
      processEntry.endTime = endTime;
    }
  }

  return executionOrder;
}










// Função que é chamada quando o formulário é submetido
function handleSubmit(event) {
  event.preventDefault();

  // Obtém os valores inseridos pelo usuário
  const processesInput = document.getElementById('processes').value;
  const totalMemorySizeInput = parseInt(document.getElementById('totalMemorySize').value, 10);
  const quantumInput = parseInt(document.getElementById('quantum').value, 10);

  // Converte a string de processos para um array de objetos Process
  const processes = processesInput.split(';').map((processStr) => {
    const [id, memorySize, executionTime] = processStr.split(',').map((item) => parseInt(item.trim(), 10));
    return new Process(id, memorySize, executionTime);
  });

  // Chama a função agendador_processos para obter o resultado
  const executionOrder = agendador_processos(processes, totalMemorySizeInput, quantumInput);

  // Exibe o resultado na tela
  displayExecutionOrder(executionOrder);
}

// Função para exibir o resultado da execução na tela
function displayExecutionOrder(executionOrder) {

  const executionOrderDiv = document.getElementById('executionOrder');
  
  executionOrderDiv.innerHTML = '';

  for (const execution of executionOrder) {
  
    const processId = execution.processId;
    const memoryAllocation = execution.memoryAllocation;
    const startTime = execution.startTime;
    const endTime = execution.endTime;

    const entryDiv = document.createElement('div');
    
    entryDiv.textContent = `Processo ${processId}:`;

    if (memoryAllocation) {
    
      const { startAddress, endAddress } = memoryAllocation;
      entryDiv.textContent += ` Alocado na memória (endereço ${startAddress}-${endAddress}),`;
      
    } else {
      entryDiv.textContent += ' Não foi possível alocar na memória,';
    }

    entryDiv.textContent += ` Início: ${startTime}, Fim: ${endTime}`;
    executionOrderDiv.appendChild(entryDiv);
  }
}

// Registra o evento de submissão do formulário
document.getElementById('processForm').addEventListener('submit', handleSubmit);
