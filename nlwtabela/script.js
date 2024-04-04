let participantes = [
  {
    nome: "Emily Cardoso",
    email: "Emily@gmail.com",
    dataInscricao: new Date(2024, 2, 22, 19, 20),
    dataCheckIn: new Date(2024, 2, 25, 22, 0o0),
  },
  {
    nome: "Alice Santos",
    email: "Alice@gmail.com",
    dataInscricao: new Date(2024, 4, 26, 13, 29),
    dataCheckIn: new Date(2024, 5, 24, 21, 22),
  },
  {
    nome: "João Almeida",
    email: "joao@gmail.com",
    dataInscricao: new Date(2024, 1, 15, 10, 45),
    dataCheckIn: null,
  },
  {
    nome: "Maria Lima",
    email: "maria@gmail.com",
    dataInscricao: new Date(2024, 3, 5, 14, 10),
    dataCheckIn: new Date(2024, 3, 8, 8, 45),
  },
  {
    nome: "Pedro Augusto",
    email: "pedro@gmail.com",
    dataInscricao: new Date(2024, 2, 10, 9, 0),
    dataCheckIn: new Date(2024, 2, 15, 12, 20),
  },
  {
    nome: "Ana Souza",
    email: "ana@gmail.com",
    dataInscricao: new Date(2024, 0, 28, 16, 20),
    dataCheckIn: new Date(2024, 1, 3, 18, 10),
  },
  {
    nome: "Carlos Ramos",
    email: "carlos@gmail.com",
    dataInscricao: new Date(2024, 1, 8, 11, 30),
    dataCheckIn: null,
  },
  {
    nome: "Mariana Silva",
    email: "mariana@gmail.com",
    dataInscricao: new Date(2024, 2, 3, 8, 15),
    dataCheckIn: new Date(2024, 2, 7, 13, 45),
  },
  {
    nome: "Lucas Oliveira",
    email: "lucas@gmail.com",
    dataInscricao: new Date(2024, 4, 18, 12, 50),
    dataCheckIn: new Date(2024, 4, 22, 9, 20),
  },
  {
    nome: "Juliana Martins",
    email: "juliana@gmail.com",
    dataInscricao: new Date(2024, 3, 30, 19, 15),
    dataCheckIn: null,
  },
];

const criarNovoParticipante = (participante) => {
  const dataInscricao = dayjs(Date.now()).to(participante.dataInscricao);

  let dataCheckIn = dayjs(Date.now()).to(participante.dataCheckIn);

  if (participante.dataCheckIn == null) {
    dataCheckIn = `
      <button data-email="${participante.email}"
      onclick="fazerCheckIn(event)"
      >
        Confirmar check-in
      </button>
    `;
  }

  return `
    <tr>
          <td>
          <strong>
           ${participante.nome}
           </strong>
           <br />
            <small>${participante.email}</small>
          </td>


          <td>${dataInscricao}</td>
          <td>${dataCheckIn}</td>
        </tr>
    `;
};

const atualizarLista = (participantes) => {
  let output = "";

  for (let participante of participantes) {
    output = output + criarNovoParticipante(participante);
  }

  document.querySelector("tbody").innerHTML = output;
};

atualizarLista(participantes);

const adicionarParticipante = (event) => {
  event.preventDefault();

  const formData = new FormData(event.target);

  const participante = {
    nome: formData.get("nome"),
    email: formData.get("email"),
    dataInscricao: new Date(),
    dataCheckIn: null,
  };

  const partcipanteExiste = participantes.find((p) => {
    return p.email == participante.email;
  });

  if (partcipanteExiste) {
    alert("Email já cadastrado");
    return;
  }

  participantes = [participante, ...participantes];
  atualizarLista(participantes);

  event.target.querySelector('[name="nome"]').value = "";
  event.target.querySelector('[name="email"]').value = "";
};

const fazerCheckIn = (event) => {
  const mensagemConfirmacao = "Tem certeza que deseja fazer o check-in?";
  if (confirm(mensagemConfirmacao) == false) {
    return;
  }

  const partcipante = participantes.find((p) => {
    return p.email == event.target.dataset.email;
  });

  partcipante.dataCheckIn = new Date();

  atualizarLista(participantes);
};
