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
        contador.style.color = len >= 490
          ? 'var(--color-error)'
          : 'var(--color-primary)';
      } else {
        contador.style.color = 'var(--color-outline)';
      }
    });
  }

  // ── 2. Acordeão do FAQ (caso use <div> em vez de <details>) ──
  document.querySelectorAll('.question').forEach(question => {
    // Só aplica se NÃO for um <details> nativo
    if (question.tagName === 'DETAILS') return;

    const title = question.querySelector('.question-title');
    const desc  = question.querySelector('.question-description');

    if (!title || !desc) return;

    // Estado inicial
    desc.style.display = 'none';
    title.style.cursor = 'pointer';

    title.addEventListener('click', () => {
      const isOpen = question.classList.toggle('open');
      desc.style.display = isOpen ? 'block' : 'none';
    });
  });

  // ── 3. Feedback visual de envio do formulário ──
  const form   = document.querySelector('.forms form');
  const btn    = form?.querySelector('button[type="submit"]');

  if (form && btn) {
    form.addEventListener('submit', function (e) {
      e.preventDefault();

      // Desativa botão durante "envio"
      btn.disabled = true;
      btn.textContent = 'Enviando…';

      // Simula resposta (substituir por fetch real futuramente)
      setTimeout(() => {
        btn.textContent  = 'Mensagem enviada! ✓';
        btn.style.backgroundColor = '#218544';

        const telefone = document.getElementById('telefone');
if (telefone) {
    telefone.addEventListener('input', () => {
        telefone.value = telefone.value.replace(/[^\d\s()\-]/g, '');
    });
}

        // Reseta após 3s
        setTimeout(() => {
          form.reset();
          btn.disabled = false;
          btn.textContent = 'Enviar Solicitação Oficial ➤';
          btn.style.backgroundColor = '';
          if (contador) contador.textContent = '0 / 500';
        }, 3000);
      }, 1200);
    });
  }

});