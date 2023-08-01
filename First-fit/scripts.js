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

function allocateMemory() {
  //ADICIONANDO OS VALORES EM UM ARRAY

  const blocks = [
    parseInt(document.getElementById("block1").value),
    parseInt(document.getElementById("block2").value),
    parseInt(document.getElementById("block3").value),
    parseInt(document.getElementById("block4").value),
    parseInt(document.getElementById("block5").value),
    parseInt(document.getElementById("block6").value),
  ];

  //RECEBENDO O VALOR DO TAMANHO NECESSÁRIO

  const requiredSize = parseInt(document.getElementById("requiredSize").value);

  let allocatedBlockIndex = -1;

  for (let i = 0; i < blocks.length; i++) {
    if (blocks[i] >= requiredSize) {
      allocatedBlockIndex = i;
      break;
    }
  }

  const resultElement = document.getElementById("result");

  if (allocatedBlockIndex !== -1) {
    //SE O FOR DIFERENTE DO VALOR DO "allocatedBlockIndex".
    resultElement.textContent = `Alocado no Bloco ${allocatedBlockIndex + 1}.`;
    console.log(allocatedBlockIndex + 1);
  } else {
    //SE O FOR IGUAL AO VALOR DO "allocatedBlockIndex" NENHUM BLOCO FOI ALOCADO
    resultElement.textContent = "Nenhum bloco adequado foi encontrado.";
    console.log("Nenhum bloco adequado foi encontrado.");
  }
}
