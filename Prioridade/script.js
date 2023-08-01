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

class Process {
    constructor(name, executionTime, priority) {
      this.name = name;
      this.executionTime = parseInt(executionTime);
      this.priority = parseInt(priority);
    }
  }

  const processes = [];

  function addProcess() {
    const nameInput = document.getElementById("name");
    const executionTimeInput = document.getElementById("executionTime");
    const priorityInput = document.getElementById("priority");

    const name = nameInput.value;
    const executionTime = parseInt(executionTimeInput.value);
    const priority = parseInt(priorityInput.value);

    const process = new Process(name, executionTime, priority);
    processes.push(process);

    nameInput.value = "";
    executionTimeInput.value = "";
    priorityInput.value = "";

    alert(`Processo "${name}" adicionado com sucesso!`);
  }

  function calculate() {
    if (processes.length === 0) {
      alert("Insira pelo menos um processo antes de calcular.");
      return;
    }

    const result = priorityScheduling(processes);

    const totalTimeResult = document.getElementById("totalTimeResult");
    const averageWaitingTimeResult = document.getElementById("averageWaitingTimeResult");

    totalTimeResult.textContent = result.totalTime;
    averageWaitingTimeResult.textContent = result.averageWaitingTime.toFixed(2);
  }

  function priorityScheduling(processes) {
    processes.sort((a, b) => a.priority - b.priority);

    let totalTime = 0;
    let totalWaitingTime = 0;
    let currentTime = 0;

    for (const process of processes) {
      if (process.priority <= currentTime) {
        process.waitingTime = currentTime - process.priority;
        totalWaitingTime += process.waitingTime;
        currentTime += process.executionTime;
      } else {
        process.waitingTime = 0;
        currentTime = process.priority + process.executionTime;
      }

      totalTime += process.executionTime;
    }

    const averageWaitingTime = totalWaitingTime / processes.length;
    return { totalTime, averageWaitingTime };
  }
