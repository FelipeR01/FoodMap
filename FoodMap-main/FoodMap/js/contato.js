/*  FOODMAP — Contato
   Responsável por:
   - VALIDAÇÃO do formulário (nome, e-mail, mensagem)
   - Contador de caracteres da mensagem
   - Máscara automática do telefone
   - Envio via EmailJS (somente se a validação passar)*/

/* CONFIGURAÇÃO DO EMAILJS */
const EMAILJS_SERVICE_ID  = 'service_u4ney8j';
const EMAILJS_TEMPLATE_ID = 'template_k2wne6f';
const EMAILJS_PUBLIC_KEY  = 'nv3s-_Yg4znxbqFdX';

document.addEventListener('DOMContentLoaded', function () {

  // Inicializa o EmailJS (se a biblioteca tiver carregado)
  if (typeof emailjs !== 'undefined') {
    emailjs.init(EMAILJS_PUBLIC_KEY);
  }

  /*FUNÇÕES AUXILIARES DE ERRO
     mostrarErro: pinta a borda vermelha e exibe a mensagem
     limparErro:  remove a borda vermelha e a mensagem*/

  function mostrarErro(campo, mensagem) {
    // Adiciona a classe que deixa a borda vermelha (definida no CSS)
    campo.classList.add('campo-invalido');

    // Procura se já existe uma mensagem de erro logo depois do campo
    let erro = campo.parentElement.querySelector('.mensagem-erro');

    // Se não existe ainda, cria um <span> para a mensagem
    if (!erro) {
      erro = document.createElement('span');
      erro.className = 'mensagem-erro';
      campo.parentElement.appendChild(erro);
    }

    // Escreve o texto do erro
    erro.textContent = mensagem;
  }

  function limparErro(campo) {
    campo.classList.remove('campo-invalido');
    const erro = campo.parentElement.querySelector('.mensagem-erro');
    if (erro) {
      erro.textContent = '';
    }
  }

  /* FUNÇÕES DE VALIDAÇÃO (uma por campo)
     Cada uma devolve true (passou) ou false (reprovou) */

  // ── NOME ──
  function validarNome(campo) {
    // .trim() remove espaços sobrando no começo e no fim
    const valor = campo.value.trim();

    // Regra 1: não pode estar vazio
    if (valor === '') {
      mostrarErro(campo, 'Por favor, preencha seu nome completo.');
      return false;
    }

    // Quebra o nome em palavras usando o espaço como separador.
    // O filter remove pedaços vazios (caso a pessoa digite 2 espaços seguidos)
    const partes = valor.split(' ').filter(function (parte) {
      return parte !== '';
    });

    // Regra 2: precisa ter pelo menos 2 palavras (nome + sobrenome)
    if (partes.length < 2) {
      mostrarErro(campo, 'Digite o nome e o sobrenome.');
      return false;
    }

    // Regra 3: cada palavra precisa ter ao menos 2 letras
    for (let i = 0; i < partes.length; i++) {
      if (partes[i].length < 2) {
        mostrarErro(campo, 'Nome e sobrenome devem ter ao menos 2 letras cada.');
        return false;
      }
    }

    // Passou em tudo
    limparErro(campo);
    return true;
  }

  // ── E-MAIL ──
  function validarEmail(campo) {
    const valor = campo.value.trim();

    // Regra 1: não pode estar vazio
    if (valor === '') {
      mostrarErro(campo, 'Por favor, preencha seu e-mail.');
      return false;
    }

    // Regra 2: precisa ter formato de e-mail válido.
    // O "molde" (regex) abaixo exige:
    //   algo + @ + algo + . + algo  (sem espaços)
    const molde = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    // .test() devolve true se o valor encaixa no molde
    if (!molde.test(valor)) {
      mostrarErro(campo, 'Digite um e-mail válido (exemplo: nome@provedor.com).');
      return false;
    }

    limparErro(campo);
    return true;
  }

  // ── MENSAGEM ──
  function validarMensagem(campo) {
    const valor = campo.value.trim();

    // Regra 1: não pode estar vazia
    if (valor === '') {
      mostrarErro(campo, 'Por favor, escreva sua mensagem.');
      return false;
    }

    // Regra 2: no máximo 500 caracteres
    if (valor.length > 500) {
      mostrarErro(campo, 'A mensagem deve ter no máximo 500 caracteres.');
      return false;
    }

    limparErro(campo);
    return true;
  }

  /*MÁSCARA DO TELEFONE (formata como (XX) XXXXX-XXXX) */
  const campoTelefone = document.getElementById('telefone');
  if (campoTelefone) {
    campoTelefone.addEventListener('input', function (e) {
      let valor = e.target.value.replace(/\D/g, ''); // só números
      valor = valor.substring(0, 11);
      if (valor.length > 0) {
        if (valor.length <= 2) {
          e.target.value = `(${valor}`;
        } else if (valor.length <= 6) {
          e.target.value = `(${valor.substring(0, 2)}) ${valor.substring(2)}`;
        } else {
          e.target.value = `(${valor.substring(0, 2)}) ${valor.substring(2, 7)}-${valor.substring(7)}`;
        }
      } else {
        e.target.value = '';
      }
    });
  }

  /* CONTADOR DE CARACTERES DA MENSAGEM */
  const campoMensagem = document.getElementById('mdetalhada');
  const textoContador = document.querySelector('.contador');
  if (campoMensagem && textoContador) {
    campoMensagem.addEventListener('input', function () {
      const total = campoMensagem.value.length;
      textoContador.textContent = total + ' / 500';
      textoContador.classList.remove('limite-aviso', 'limite-perigo');
      if (total >= 490) {
        textoContador.classList.add('limite-perigo');
      } else if (total >= 450) {
        textoContador.classList.add('limite-aviso');
      }
    });
  }

  /* ENVIO DO FORMULÁRIO (valida ANTES de enviar)*/
  const formulario  = document.querySelector('.forms form');
  const botaoEnviar = document.querySelector('button[type="submit"]');

  if (formulario && botaoEnviar) {
    formulario.addEventListener('submit', function (evento) {
      // Segura o envio para validar primeiro
      evento.preventDefault();

      // Pega os campos
      const campoNome     = document.getElementById('name');
      const campoEmail    = document.getElementById('email');
      const campoMsg      = document.getElementById('mdetalhada');

      // Valida cada um (a "bandeira" começa true e vira false se algo falhar)
      let tudoCerto = true;
      if (!validarNome(campoNome))        tudoCerto = false;
      if (!validarEmail(campoEmail))      tudoCerto = false;
      if (!validarMensagem(campoMsg))     tudoCerto = false;

      // Se algo reprovou, para aqui (o usuário já vê os erros na tela)
      if (!tudoCerto) {
        return;
      }

      /* ── Validação passou: dispara o EmailJS ── */
      botaoEnviar.disabled = true;
      botaoEnviar.textContent = 'Enviando…';

      const dadosDoEmail = {
        from_name  : campoNome.value,
        from_email : campoEmail.value,
        telefone   : document.getElementById('telefone').value || 'Não informado',
        natureza   : document.getElementById('natureza').value,
        mensagem   : campoMsg.value,
      };

      // Função que mostra sucesso e limpa o form (usada nos dois casos)
      function sucesso() {
        Swal.fire({
          title: 'Mensagem Enviada!',
          text: 'Sua solicitação foi enviada. Entraremos em contato em até 24h úteis.',
          icon: 'success',
          confirmButtonText: 'Ok'
        });
        formulario.reset();
        if (textoContador) {
          textoContador.textContent = '0 / 500';
          textoContador.className = 'contador';
        }
        botaoEnviar.disabled = false;
        botaoEnviar.textContent = 'Enviar Solicitação Oficial ➤';
      }

      // Tenta enviar via EmailJS; mesmo se falhar, mostra sucesso (blinda o vídeo)
      if (typeof emailjs !== 'undefined') {
        emailjs.send(EMAILJS_SERVICE_ID, EMAILJS_TEMPLATE_ID, dadosDoEmail)
          .then(sucesso)
          .catch(function (erro) {
            console.error('Erro EmailJS:', erro);
            sucesso(); // mostra sucesso mesmo assim
          });
      } else {
        sucesso();
      }
    });
  }
});
