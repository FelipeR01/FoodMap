/* =====================================================
   FOODMAP — Contato (interações do formulário)
   ===================================================== */

document.addEventListener('DOMContentLoaded', function () {

    // ── 1. Contador de caracteres do textarea ──
    const textarea = document.getElementById('mdetalhada');
    const contador = document.querySelector('.contador');

    if (textarea && contador) {
        textarea.addEventListener('input', () => {
            const len = textarea.value.length;
            contador.textContent = `${len} / 500`;

            // Feedback visual quando próximo do limite
            if (len >= 450) {
                contador.style.color = len >= 490 ?
                    'var(--color-error)' :
                    'var(--color-primary)';
            } else {
                contador.style.color = 'var(--color-on-surface-variant)';
            }
        });
    }

    // ── 2. Máscara/Validação simples para o campo de telefone ──
    const telefone = document.getElementById('telefone');

    if (telefone) {
        telefone.addEventListener('input', (e) => {
            // Remove qualquer caractere que não seja número
            let value = e.target.value.replace(/\D/g, '');
            
            // Aplica a máscara (XX) XXXXX-XXXX
            if (value.length > 11) {
                value = value.substring(0, 11);
            }

            if (value.length > 6) {
                value = `(${value.substring(0, 2)}) ${value.substring(2, 7)}-${value.substring(7)}`;
            } else if (value.length > 2) {
                value = `(${value.substring(0, 2)}) ${value.substring(2)}`;
            } else if (value.length > 0) {
                value = `(${value}`;
            }

            e.target.value = value;
        });
    }

    // ── 3. Feedback visual de envio do formulário ──
    const form = document.querySelector('.forms form');
    const btn = form?.querySelector('button[type="submit"]');

    if (form && btn) {
        form.addEventListener('submit', function (e) {
            e.preventDefault(); // Impede o envio real do formulário para simulação

            // Validação customizada para o select
            const naturezaSelect = document.getElementById('natureza');
            if (naturezaSelect.value === "") {
                Swal.fire({
                    title: 'Campo obrigatório',
                    text: 'Por favor, selecione a natureza do contato.',
                    icon: 'warning',
                    confirmButtonText: 'Entendi',
                    confirmButtonColor: 'var(--color-primary)'
                });
                return; // Interrompe o envio
            }

            // Desativa botão e mostra feedback de "enviando"
            btn.disabled = true;
            btn.textContent = 'Enviando…';

            // Simula uma espera de resposta do servidor (ex: 1.2 segundos)
            setTimeout(() => {
                // EXIBE O ALERTA PERSONALIZADO (NOVO)
                Swal.fire({
                    title: 'Mensagem enviada!',
                    text: 'Sua solicitação foi recebida com sucesso. Entraremos em contato em breve.',
                    icon: 'success',
                    timer: 3000, // Fecha automaticamente após 3 segundos
                    timerProgressBar: true,
                    showConfirmButton: false, // Esconde o botão "OK"
                });

                // Altera o estilo do botão para indicar sucesso
                btn.textContent = 'Mensagem enviada! ✓';
                btn.style.backgroundColor = '#218544'; // Um tom de verde sucesso

                // Reseta o formulário e o botão após 3 segundos
                setTimeout(() => {
                    form.reset(); // Limpa todos os campos do formulário
                    btn.disabled = false;
                    btn.textContent = 'Enviar Solicitação Oficial ➤';
                    btn.style.backgroundColor = ''; // Volta à cor original
                    if (contador) {
                        contador.textContent = '0 / 500'; // Reseta o contador
                        contador.style.color = 'var(--color-on-surface-variant)';
                    }
                }, 4000);

            }, 1200);
        });
    }
});
