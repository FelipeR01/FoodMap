/* =====================================================
   FOODMAP — Contato
   Responsável por: contador de caracteres,
   filtro do telefone e envio de e-mail via EmailJS
   ===================================================== */


/* ─────────────────────────────────────────────────────
   CONFIGURAÇÃO DO EMAILJS
   Substitua os três valores abaixo pelos seus.

   Como obter cada ID:
   1. Crie conta gratuita em https://www.emailjs.com
   2. Email Services → Add Service → Gmail
      → conecte contatofoodmap@gmail.com
      → copie o "Service ID" gerado
   3. Email Templates → Create Template
      → monte o template (veja o modelo abaixo)
      → copie o "Template ID"
   4. Account → API Keys → copie a "Public Key"
   ───────────────────────────────────────────────────── */
const EMAILJS_SERVICE_ID  = 'service_u4ney8j';   /* ex: 'service_abc123'  */
const EMAILJS_TEMPLATE_ID = 'template_k2wne6f';  /* ex: 'template_xyz789' */
const EMAILJS_PUBLIC_KEY  = 'nv3s-_Yg4znxbqFdX';   /* ex: 'AbCdEfGhIjKlMn'  */


/* ─────────────────────────────────────────────────────
   Aguarda a página carregar completamente antes
   de executar qualquer código JavaScript
   ───────────────────────────────────────────────────── */
document.addEventListener('DOMContentLoaded', function () {


    /* -------------------------------------------------
       1. FILTRO DO CAMPO TELEFONE
       Remove letras em tempo real conforme o usuário digita.
       Só deixa passar: números, espaços, ( ) e -
       ------------------------------------------------- */
    const campoTelefone = document.getElementById('telefone');

    if (campoTelefone) {
        campoTelefone.addEventListener('input', function () {
            /* Tudo que NÃO for dígito, espaço, parêntese ou hífen é apagado */
            campoTelefone.value = campoTelefone.value.replace(/[^\d\s()\-]/g, '');
        });
    }


    /* -------------------------------------------------
       2. CONTADOR DE CARACTERES DA MENSAGEM
       Atualiza "0 / 500" enquanto o usuário digita.
       Muda de cor verde (aviso) e vermelho (limite).
       ------------------------------------------------- */
    const campoMensagem = document.getElementById('mdetalhada');
    const textoContador = document.querySelector('.contador');

    if (campoMensagem && textoContador) {
        campoMensagem.addEventListener('input', function () {
            const total = campoMensagem.value.length;

            textoContador.textContent = total + ' / 500';

            if (total >= 490) {
                textoContador.style.color = 'var(--color-error)';    /* vermelho */
            } else if (total >= 450) {
                textoContador.style.color = 'var(--color-primary)';  /* verde    */
            } else {
                textoContador.style.color = 'var(--color-outline)';  /* cinza    */
            }
        });
    }


    /* -------------------------------------------------
       3. ENVIO DO FORMULÁRIO VIA EMAILJS
       Intercepta o clique em "Enviar Solicitação Oficial",
       coleta os dados e manda para contatofoodmap@gmail.com
       sem precisar de nenhum servidor próprio.
       ------------------------------------------------- */
    const formulario  = document.querySelector('.forms form');
    const botaoEnviar = document.querySelector('button[type="submit"]');

    if (formulario && botaoEnviar) {

        formulario.addEventListener('submit', function (evento) {

            /* Impede o navegador de recarregar a página ao clicar em enviar */
            evento.preventDefault();

            /* Desativa o botão para evitar envios duplicados enquanto aguarda */
            botaoEnviar.disabled    = true;
            botaoEnviar.textContent = 'Enviando…';

            /* Coleta o valor de cada campo.
               Os nomes das chaves (from_name, from_email…) precisam ser
               EXATAMENTE iguais às variáveis do seu template no EmailJS.
               Ex: no template escreva {{from_name}}, {{from_email}}, etc. */
            const dadosDoEmail = {
                from_name  : document.getElementById('name').value,
                from_email : document.getElementById('email').value,
                telefone   : document.getElementById('telefone').value || 'Não informado',
                natureza   : document.getElementById('natureza').value,
                mensagem   : document.getElementById('mdetalhada').value,
            };

            /* Chama o EmailJS para fazer o envio.
               .then() roda se der certo, .catch() roda se der erro. */
            emailjs.send(EMAILJS_SERVICE_ID, EMAILJS_TEMPLATE_ID, dadosDoEmail, EMAILJS_PUBLIC_KEY)

                .then(function () {
                    /* ✅ Envio bem-sucedido */
                    botaoEnviar.textContent           = '✓ Mensagem enviada com sucesso!';
                    botaoEnviar.style.backgroundColor = 'var(--color-primary-container)';
                    botaoEnviar.style.color           = 'var(--color-on-primary-container)';

                    /* Limpa o formulário e o contador */
                    formulario.reset();
                    if (textoContador) {
                        textoContador.textContent = '0 / 500';
                        textoContador.style.color = 'var(--color-outline)';
                    }

                    /* Após 4 segundos volta o botão ao estado original */
                    setTimeout(function () {
                        botaoEnviar.disabled              = false;
                        botaoEnviar.textContent           = 'Enviar Solicitação Oficial ➤';
                        botaoEnviar.style.backgroundColor = '';
                        botaoEnviar.style.color           = '';
                    }, 4000);
                })

                .catch(function (erro) {
                    /* ❌ Algo deu errado (sem internet, IDs errados, etc.) */
                    console.error('Erro EmailJS:', erro);

                    botaoEnviar.textContent           = '✗ Erro ao enviar. Tente novamente.';
                    botaoEnviar.style.backgroundColor = 'var(--color-error)';
                    botaoEnviar.style.color           = '#fff';

                    /* Reativa o botão após 4 segundos */
                    setTimeout(function () {
                        botaoEnviar.disabled              = false;
                        botaoEnviar.textContent           = 'Enviar Solicitação Oficial ➤';
                        botaoEnviar.style.backgroundColor = '';
                        botaoEnviar.style.color           = '';
                    }, 4000);
                });
        });
    }


}); /* fim do DOMContentLoaded */