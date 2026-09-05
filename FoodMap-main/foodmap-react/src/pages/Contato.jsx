import { useState } from 'react'
import emailjs from '@emailjs/browser'
import '../css/contato.css'

const initialForm = { name: '', email: '', telefone: '', natureza: '', mdetalhada: '', lgpd: false }
const emailConfig = { serviceId: 'service_u4ney8j', templateId: 'template_k2wne6f', publicKey: 'nv3s-_Yg4znxbqFdX' }

function formatPhone(value) {
  const numbers = value.replace(/\D/g, '').slice(0, 11)
  if (!numbers) return ''
  if (numbers.length <= 2) return `(${numbers}`
  if (numbers.length <= 6) return `(${numbers.slice(0, 2)}) ${numbers.slice(2)}`
  return `(${numbers.slice(0, 2)}) ${numbers.slice(2, 7)}-${numbers.slice(7)}`
}

function validateForm(form) {
  const errors = {}
  const nameParts = form.name.trim().split(/\s+/).filter(Boolean)
  if (!form.name.trim()) errors.name = 'Por favor, preencha seu nome completo.'
  else if (nameParts.length < 2) errors.name = 'Digite o nome e o sobrenome.'
  else if (nameParts.some((part) => part.length < 2)) errors.name = 'Nome e sobrenome devem ter ao menos 2 letras cada.'
  if (!form.email.trim()) errors.email = 'Por favor, preencha seu e-mail.'
  else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email.trim())) errors.email = 'Digite um e-mail válido (exemplo: nome@provedor.com).'
  if (!form.natureza) errors.natureza = 'Selecione a natureza do contato.'
  if (!form.mdetalhada.trim()) errors.mdetalhada = 'Por favor, escreva sua mensagem.'
  else if (form.mdetalhada.trim().length > 500) errors.mdetalhada = 'A mensagem deve ter no máximo 500 caracteres.'
  if (!form.lgpd) errors.lgpd = 'É necessário aceitar a Política de Privacidade.'
  return errors
}

export default function Contato() {
  const [form, setForm] = useState(initialForm)
  const [errors, setErrors] = useState({})
  const [status, setStatus] = useState('')
  const [enviando, setEnviando] = useState(false)

  function atualizarCampo(event) {
    const { name, value, type, checked } = event.target
    const nextValue = type === 'checkbox' ? checked : name === 'telefone' ? formatPhone(value) : value
    setForm((current) => ({ ...current, [name]: nextValue }))
    setErrors((current) => ({ ...current, [name]: '' }))
    setStatus('')
  }

  async function enviarFormulario(event) {
    event.preventDefault()
    const nextErrors = validateForm(form)
    setErrors(nextErrors)
    if (Object.keys(nextErrors).length > 0) return
    setEnviando(true)
    setStatus('')
    try {
      await emailjs.send(emailConfig.serviceId, emailConfig.templateId, {
        from_name: form.name, from_email: form.email, telefone: form.telefone || 'Não informado', natureza: form.natureza, mensagem: form.mdetalhada,
      }, emailConfig.publicKey)
      setForm(initialForm)
      setStatus('success')
    } catch (error) {
      console.error('Erro EmailJS:', error)
      setStatus('error')
    } finally { setEnviando(false) }
  }

  return (
    <>
      <section className="contato-section"><div className="container contato-grid">
        <div className="first">
          <div><h1 className="first-title">Fale Conosco</h1><p className="first-description">Estamos aqui para ajudar. Entre em contato para tirar dúvidas, propor parcerias ou compartilhar sua experiência com o FoodMap.</p></div>
          <address className="contatos-lista">
            <div className="contatos"><h3 className="contatos-title">E-mail Institucional</h3><p className="contatos-email"><a href="mailto:contatofoodmap@gmail.com">contatofoodmap@gmail.com</a></p><p className="contatos-information">Retornamos em até 24h úteis.</p></div>
            <div className="contatos"><h3 className="contatos-title">Sede Operacional</h3><p className="contatos-email">São Paulo, SP - Brasil</p><p className="contatos-information">Atendimento presencial apenas com agendamento.</p></div>
            <div className="contatos"><h3 className="contatos-title">Horário de Atendimento</h3><p className="contatos-email">Segunda a Sexta, 9h às 18h (BRT)</p><p className="contatos-information">Fechado em feriados nacionais.</p></div>
          </address>
          <div className="compromisso"><p className="compromisso-subtitle">ODS 2 - Fome Zero</p><h2 className="compromisso-title">Nosso Compromisso</h2><p className="compromisso-description">Cada mensagem recebida nos ajuda a fortalecer a rede de combate ao desperdício e promover a segurança alimentar.</p></div>
        </div>

        <div className="forms"><h2>Envie sua solicitação</h2><form onSubmit={enviarFormulario} noValidate>
          <div className="form-group"><label htmlFor="name">Nome Completo <span className="obrigatorio">*</span></label><input className={errors.name ? 'campo-invalido' : ''} type="text" name="name" id="name" placeholder="Insira seu nome completo" autoComplete="name" value={form.name} onChange={atualizarCampo} aria-invalid={Boolean(errors.name)} /><small>Conforme documento oficial de identificação.</small>{errors.name && <span className="mensagem-erro">{errors.name}</span>}</div>
          <div className="form-row">
            <div className="form-group"><label htmlFor="email">E-mail de Contato <span className="obrigatorio">*</span></label><input className={errors.email ? 'campo-invalido' : ''} type="email" name="email" id="email" placeholder="nome@provedor.com.br" autoComplete="email" value={form.email} onChange={atualizarCampo} aria-invalid={Boolean(errors.email)} /><small>Endereço para retorno oficial.</small>{errors.email && <span className="mensagem-erro">{errors.email}</span>}</div>
            <div className="form-group"><label htmlFor="telefone">Telefone Celular (Opcional)</label><input type="tel" name="telefone" id="telefone" placeholder="(11) 90000-0000" inputMode="numeric" autoComplete="tel" value={form.telefone} onChange={atualizarCampo} /><small>Inclua o DDD antes do número.</small></div>
          </div>
          <div className="form-group"><label htmlFor="natureza">Natureza do Contato <span className="obrigatorio">*</span></label><div className="select-wrapper"><select className={errors.natureza ? 'campo-invalido' : ''} name="natureza" id="natureza" value={form.natureza} onChange={atualizarCampo} aria-invalid={Boolean(errors.natureza)}><option value="">Selecione a categoria apropriada</option><option value="duvida">Dúvida</option><option value="parceria">Parceria</option><option value="doacao">Doação</option><option value="outro">Outro</option></select><span className="select-arrow" aria-hidden="true">▼</span></div><small>Ajuda a direcionar sua mensagem para a equipe correta.</small>{errors.natureza && <span className="mensagem-erro">{errors.natureza}</span>}</div>
          <div className="form-group"><label htmlFor="mdetalhada">Mensagem Detalhada <span className="obrigatorio">*</span></label><textarea className={errors.mdetalhada ? 'campo-invalido' : ''} name="mdetalhada" id="mdetalhada" placeholder="Descreva sua solicitação com o maior número de detalhes possível." maxLength="500" value={form.mdetalhada} onChange={atualizarCampo} aria-invalid={Boolean(errors.mdetalhada)} /><small className={`contador ${form.mdetalhada.length >= 490 ? 'limite-perigo' : form.mdetalhada.length >= 450 ? 'limite-aviso' : ''}`}>{form.mdetalhada.length} / 500</small>{errors.mdetalhada && <span className="mensagem-erro">{errors.mdetalhada}</span>}</div>
          <div className="form-group checkbox-group"><label className="checkbox-label"><input type="checkbox" name="lgpd" id="lgpd" checked={form.lgpd} onChange={atualizarCampo} /><span>Declaro que li e concordo com a <a href="https://www.gov.br/mdh/pt-br/acesso-a-informacao/politica-de-privacidade" target="_blank" rel="noopener noreferrer">Política de Privacidade</a> e consinto com o tratamento dos meus dados para fins de atendimento, em conformidade com a LGPD.</span></label>{errors.lgpd && <span className="mensagem-erro">{errors.lgpd}</span>}</div>
          {status === 'success' && <p className="form-status form-status-success" role="status">Mensagem enviada! Entraremos em contato em até 24h úteis.</p>}{status === 'error' && <p className="form-status form-status-error" role="alert">Não foi possível enviar agora. Tente novamente em instantes.</p>}
          <button type="submit" disabled={enviando}>{enviando ? 'Enviando...' : 'Enviar Solicitação Oficial'}</button>
        </form></div>
      </div></section>

      <section className="faq-section"><div className="container"><h2 className="faq-title">Perguntas Frequentes (FAQ)</h2>
        <details className="question"><summary className="question-title">Como as doações são validadas?</summary><div className="question-description"><p>Ao cadastrar uma doação, o doador informa o tipo de alimento, quantidade e validade. A plataforma verifica automaticamente a compatibilidade com receptores próximos. Alimentos devem estar dentro da validade e adequadamente armazenados para garantir a segurança alimentar do receptor.</p></div></details>
        <details className="question"><summary className="question-title">Quem pode receber as doações?</summary><div className="question-description"><p>Qualquer pessoa física em situação de vulnerabilidade alimentar, bem como ONGs, CRAS e instituições sociais cadastradas na plataforma podem receber doações. O cadastro é simples, gratuito e acessível para todos.</p></div></details>
        <details className="question"><summary className="question-title">Como me cadastrar como doador?</summary><div className="question-description"><p>Pessoas físicas, restaurantes, mercados e empresas podem se cadastrar como doadores diretamente pela plataforma. Basta informar o tipo e quantidade do alimento disponível e a janela de horário para retirada. O sistema cuida do matching com o receptor mais próximo automaticamente.</p></div></details>
        <details className="question"><summary className="question-title">Como minha empresa pode se tornar parceira oficial?</summary><div className="question-description"><p>Empresas interessadas em parcerias de longo prazo podem entrar em contato pelo e-mail parcerias@foodmap.org. Nossa equipe retornará em até 48 horas úteis para agendar uma reunião de alinhamento.</p></div></details>
      </div></section>
    </>
  )
}
