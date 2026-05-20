/* =====================================================
   FOODMAP — Contato
   Responsável por: contador de caracteres,
   filtro de telefone com DDD automático e envio via EmailJS
   ===================================================== */

/* ─────────────────────────────────────────────────────
   CONFIGURAÇÃO DO EMAILJS
   Substitua os três valores abaixo pelos seus.
   ───────────────────────────────────────────────────── */
const EMAILJS_SERVICE_ID  = 'service_u4ney8j';   /* ex: 'service_abc123'  */
const EMAILJS_TEMPLATE_ID = 'template_k2wne6f';  /* ex: 'template_xyz789' */
const EMAILJS_PUBLIC_KEY  = 'nv3s-_Yg4znxbqFdX';   /* ex: 'AbCdEfGhIjKlMn'  */

/* ─────────────────────────────────────────────────────
   Aguarda a página carregar completamente antes de rodar
   ───────────────────────────────────────────────────── */
document.addEventListener('DOMContentLoaded', function () {

    // Inicializa o EmailJS com sua chave pública. ESSENCIAL PARA FUNCIONAR.
    if (typeof emailjs !== 'undefined') {
        emailjs.init(EMAILJS_PUBLIC_KEY);
    }

    /* -------------------------------------------------
       1. FILTRO E MÁSCARA AUTOMÁTICA DO TELEFONE
       Formata como (XX) XXXXX-XXXX dinamicamente
       ------------------------------------------------- */
    const campoTelefone = document.getElementById('telefone');
    if (campoTelefone) {
        campoTelefone.addEventListener('input', function (e) {
            let valor = e.target.value.replace(/\D/g, ''); // Remove tudo que não for número
            
            valor = valor.substring(0, 11); // Limita ao máximo de 11 dígitos

            // Aplica a formatação do DDD com parênteses e hífen conforme digita
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

    /* -------------------------------------------------
       2. CONTADOR DE CARACTERES DA MENSAGEM
       Adiciona classes para controle de cor via CSS externo
       ------------------------------------------------- */
    const campoMensagem = document.getElementById('mdetalhada');
    const textoContador = document.querySelector('.contador');
    if (campoMensagem && textoContador) {
        campoMensagem.addEventListener('input', function () {
            const total = campoMensagem.value.length;
            textoContador.textContent = total + ' / 500';

            // Remove classes anteriores para atualizar o estado
            textoContador.classList.remove('limite-aviso', 'limite-perigo');

            if (total >= 490) {
                textoContador.classList.add('limite-perigo'); // Adiciona classe que pode ser estilizada no seu CSS
            } else if (total >= 450) {
                textoContador.classList.add('limite-aviso');  // Adiciona classe que pode ser estilizada no seu CSS
            }
        });
    }

    /* -------------------------------------------------
       3. ENVIO DO FORMULÁRIO VIA EMAILJS USANDO SWEETALERT2
       ------------------------------------------------- */
    const formulario  = document.querySelector('.forms form');
    const botaoEnviar = document.querySelector('button[type="submit"]');

    if (formulario && botaoEnviar) {
        formulario.addEventListener('submit', function (evento) {
            evento.preventDefault();

            // Desativa o botão para evitar cliques duplicados
            botaoEnviar.disabled = true;
            botaoEnviar.textContent = 'Enviando…';

            // Coleta os dados do form
            const dadosDoEmail = {
                from_name  : document.getElementById('name').value,
                from_email : document.getElementById('email').value,
                telefone   : document.getElementById('telefone').value || 'Não informado',
                natureza   : document.getElementById('natureza').value,
                mensagem   : document.getElementById('mdetalhada').value,
            };

            // Envia via EmailJS
            emailjs.send(EMAILJS_SERVICE_ID, EMAILJS_TEMPLATE_ID, dadosDoEmail)
                .then(function () {
                    /* ✅ Envio bem-sucedido - Dispara Alerta do SweetAlert2 */
                    Swal.fire({
                        title: 'Mensagem Enviada!',
                        text: 'Sua solicitação oficial foi enviada. Entraremos em contato em até 24h úteis.',
                        icon: 'success',
                        confirmButtonText: 'Ok'
                    });

                    // Limpa o formulário e reseta o contador
                    formulario.reset();
                    if (textoContador) {
                        textoContador.textContent = '0 / 500';
                        textoContador.className = 'contador';
                    }

                    // Restaura o botão imediatamente
                    botaoEnviar.disabled = false;
                    botaoEnviar.textContent = 'Enviar Solicitação Oficial ➤';
                })
                .catch(function (erro) {
                    /* ❌ Erro no envio - Dispara Alerta de Erro do SweetAlert2 */
                    console.error('Erro EmailJS:', erro);
                    
                    Swal.fire({
                        title: 'Erro ao Enviar',
                        text: 'Não foi possível completar o envio. Por favor, tente novamente.',
                        icon: 'error',
                        confirmButtonText: 'Tentar Novamente'
                    });

                    // Restaura o botão para nova tentativa
                    botaoEnviar.disabled = false;
                    botaoEnviar.textContent = 'Enviar Solicitação Oficial ➤';
                });
        });
    }
}); /* fim do DOMContentLoaded */
