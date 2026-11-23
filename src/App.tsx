import { useEffect, useMemo } from 'react'
import Chat from './Chat'
import { CLINICA, horariosLivres } from '../shared/clinica'

const s = (id: string) => CLINICA.servicos.find((x) => x.id === id)!
const PROTOCOLOS = ['limpeza', 'hidratacao', 'peeling', 'microagulhamento', 'drenagem', 'modeladora', 'laser', 'sobrancelha']

const ARROW = (
  <svg className="m-arrow" viewBox="0 0 12 12" aria-hidden="true"><path className="m-arrow__stem" d="M1 6h8" /><path className="m-arrow__head" d="M4.5 2.5 8 6l-3.5 3.5" /></svg>
)

const KIT = ['/assets/system.js', '/assets/motion/motion.js', '/assets/layout/layout.js']

function usarKit() {
  useEffect(() => {
    if (document.querySelector('script[data-kit]')) return
    for (const src of KIT) {
      const el = document.createElement('script')
      el.type = 'module'
      el.src = src
      el.dataset.kit = ''
      document.head.appendChild(el)
    }
  }, [])
}

function proximoHorario() {
  const h = horariosLivres()[0]
  if (!h) return null
  const hoje = new Intl.DateTimeFormat('en-CA', { timeZone: 'America/Sao_Paulo' }).format(new Date())
  const amanha = new Intl.DateTimeFormat('en-CA', { timeZone: 'America/Sao_Paulo' }).format(new Date(Date.now() + 86400000))
  const dia = h.data === hoje ? 'Hoje' : h.data === amanha ? 'Amanhã' : h.diaSemana[0].toUpperCase() + h.diaSemana.slice(1)
  return { dia, hora: String(Number(h.hora.slice(0, 2))) + 'h' }
}

export default function App() {
  usarKit()
  const proximo = useMemo(proximoHorario, [])

  return (
    <>
      <header className="nav">
        <div className="wrap nav__bar">
          <a className="skip-link" href="#top">Pular para o conteúdo</a>
          <a className="nav__logo" href="#top">Lume Estética</a>
          <nav className="nav__links" aria-label="Principal">
            <div className="nav__item">
              <a className="nav__link" href="#protocolos">Protocolos <svg className="chev" viewBox="0 0 12 12" aria-hidden="true"><path d="M3 4.5l3 3 3-3" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" /></svg></a>
              <div className="nav__menu">
                <div className="wrap grid">
                  <div className="menu-col span-3">
                    <p className="t-label">Facial</p>
                    <a href="#protocolos">Limpeza de pele<span>Extração e máscara, 60 min</span></a>
                    <a href="#protocolos">Peeling químico<span>Manchas leves e textura</span></a>
                    <a href="#protocolos">Microagulhamento<span>Marcas de acne e poros</span></a>
                  </div>
                  <div className="menu-col span-3">
                    <p className="t-label">Corpo e laser</p>
                    <a href="#protocolos">Drenagem linfática<span>Pacote de 10 sessões</span></a>
                    <a href="#protocolos">Depilação a laser<span>Laser de diodo</span></a>
                    <a href="#protocolos">Sobrancelhas<span>Design com henna</span></a>
                  </div>
                  <a className="menu-card span-3 start-10" href="#agendar">
                    <div className="panel"><img className="frame__img" src="/img/vela.jpg" alt="Mãos massageando o rosto de uma cliente à luz de vela" /></div>
                    <span className="t-card">Avaliação sem custo</span>
                    <span className="t-small muted">30 minutos, facial ou corporal</span>
                  </a>
                </div>
              </div>
            </div>
            <div className="nav__item"><a className="nav__link" href="#etapas">Etapas</a></div>
            <div className="nav__item"><a className="nav__link" href="#visite">Endereço</a></div>
            <div className="nav__item"><a className="nav__link" href="#para-empresas">Empresas</a></div>
          </nav>
          <div className="nav__actions">
            <a className="btn btn--primary" href="#agendar">Agendar com a Lia{ARROW}</a>
          </div>
          <button className="nav__toggle" type="button" aria-expanded="false" aria-label="Menu">
            <svg width="18" height="18" viewBox="0 0 18 18" aria-hidden="true"><path d="M2 5h14M2 13h14" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" /></svg>
          </button>
        </div>
      </header>

      <main id="top">
        <section className="hero hero--split" data-enter aria-labelledby="hero-h">
          <div className="wrap"><div className="hero-text grid hero__grid">
            <div className="hero__text span-5">
              <p className="hero__kicker"><span className="dot" aria-hidden="true" />Demonstração: a clínica é fictícia, a Lia responde de verdade</p>
              <h1 id="hero-h">Estética facial e corporal em São Carlos</h1>
              <p className="hero__lead">Converse com a Lia, a assistente da Lume: ela indica o protocolo, passa o valor e reserva seu horário. A avaliação é sem custo.</p>
              <div className="btn-row">
                <a className="btn btn--primary" href="#agendar">Agendar com a Lia{ARROW}</a>
                <a className="btn btn--secondary" href="#protocolos">Ver protocolos e preços</a>
              </div>
            </div>
            <div className="hero__media span-6 start-7">
              <img src="/img/hero.jpg" alt="Esteticista fazendo massagem facial em uma cliente deitada" style={{ ['--ly-pos' as string]: '50% 40%' }} {...{ fetchpriority: "high" }} />
              {proximo && (
                <div className="ly-float">
                  <div className="ly-float__row"><span className="ly-live">{proximo.dia}</span><span>{proximo.hora}</span></div>
                  <div className="ly-float__title">Próximo horário livre para avaliação</div>
                </div>
              )}
            </div>
          </div></div>
        </section>

        <section className="section" id="agendar" aria-labelledby="agendar-h" style={{ ['--hm' as string]: 2 }}>
          <div className="wrap">
            <div className="grid fill">
              <div className="span-5 stack-4">
                <h2 id="agendar-h">Agendamento pelo chat da Lume</h2>
                <p className="t-lead">Pergunte como falaria com a recepção: o preço da limpeza de pele, o que serve para manchas ou o primeiro horário de sábado.</p>
                <p>A Lia confere a agenda antes de reservar e manda o pedido de atendente para a recepção. Os valores e as durações saem da tabela da clínica.</p>
              </div>
              <div className="span-6 start-7 chat-frame" id="atendimento" data-visual data-ui="lia">
                <Chat />
              </div>
            </div>
          </div>
        </section>

        <section className="section" id="protocolos" aria-labelledby="protocolos-h" style={{ ['--hm' as string]: 2 }}>
          <div className="wrap">
            <div className="grid grid--top fill">
              <div className="span-5 stack-4">
                <h2 id="protocolos-h">Protocolos de estética e preços</h2>
                <p>Pacotes em até 10x sem juros. Peeling, microagulhamento e laser começam pela avaliação.</p>
                <ul className="rows">
                  {PROTOCOLOS.map((id) => (
                    <li key={id}>
                      <span className="rows__name">{s(id).nome}</span>
                      <span className="rows__value">{s(id).menu.replace('a partir de', 'desde')}</span>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="frame frame--photo frame--fill span-6 start-7">
                <img className="frame__img" src="/img/aparelho.jpg" alt="Esteticista de luvas passando um aparelho de limpeza na testa de uma cliente" loading="lazy" />
              </div>
            </div>
          </div>
        </section>

        <section className="section" id="etapas" aria-labelledby="etapas-h" style={{ ['--hm' as string]: 2 }}>
          <div className="wrap">
            <div className="section-head"><h2 id="etapas-h">Seu tratamento em 3 etapas</h2></div>
            <div className="grid">
              <article className="card card--row span-4">
                <span className="step-num">1</span>
                <h3>Avaliação de 30 minutos</h3>
                <p>Conte sua queixa à Lia ou na recepção. A esteticista analisa a pele ou o corpo, sem custo.</p>
                <div className="panel"><img className="frame__img" src="/img/extracao.jpg" alt="Esteticista examinando a pele do rosto de uma cliente" loading="lazy" /></div>
              </article>
              <article className="card card--row span-4">
                <span className="step-num">2</span>
                <h3>Protocolo de estética por escrito</h3>
                <p>Procedimentos, número de sessões e investimento, antes de fechar qualquer pacote.</p>
                <div className="panel"><img className="frame__img" src="/img/produtos.jpg" alt="Frasco de creme, toalha enrolada e tulipas sobre uma mesa clara" loading="lazy" /></div>
              </article>
              <article className="card card--row span-4">
                <span className="step-num">3</span>
                <h3>Sessões com fotos de evolução</h3>
                <p>Fotos de evolução a cada etapa e lembrete do horário pelo WhatsApp.</p>
                <div className="panel"><img className="frame__img" src="/img/mascara.jpg" alt="Aplicação de máscara facial com pincel" loading="lazy" /></div>
              </article>
            </div>
          </div>
        </section>

        <section className="section" id="visite" aria-labelledby="visite-h" style={{ ['--hm' as string]: 2 }}>
          <div className="wrap">
            <div className="grid grid--top fill">
              <div className="span-5 stack-4">
                <h2 id="visite-h">Endereço e horários da clínica</h2>
                <address className="visit__address">Jardim Lutfalla<br />São Carlos</address>
                <a className="link" href="https://www.openstreetmap.org/search?query=Jardim%20Lutfalla%20S%C3%A3o%20Carlos">Ver a região no mapa</a>
                <dl className="hours" data-tz="America/Sao_Paulo" data-assumed="">
                  <dt data-days="mon-fri">Segunda a sexta</dt><dd>9h às 20h</dd>
                  <dt data-days="sat">Sábado</dt><dd>9h às 14h</dd>
                  <dt data-days="sun">Domingo e feriados</dt><dd>Fechado</dd>
                </dl>
                <p>{CLINICA.estacionamento}</p>
                <p>Gestantes, lactantes e quem usa ácidos ou isotretinoína avisam antes de agendar peeling, laser ou microagulhamento.</p>
              </div>
              <div className="frame frame--photo span-6 start-7" style={{ aspectRatio: '1 / 1' }}>
                <img className="frame__img" src="/img/sala.jpg" alt="Sala de atendimento com maca forrada e pia de cerâmica" loading="lazy" />
              </div>
            </div>
          </div>
        </section>

        <section className="section statement" id="para-empresas" data-moment="word-highlight" aria-label="Para empresas">
          <div className="wrap">
            <p className="t-label">Para donas e donos de clínicas, salões e espaços de estética</p>
            <p className="mo-wh__text">A Lume é fictícia, mas a Lia funciona: ela atende no site e no WhatsApp, responde com os seus valores e marca horários conferindo <strong>a sua agenda</strong>. Uma assistente assim fica pronta em poucos dias.</p>
          </div>
        </section>

        <section className="section" id="sua-clinica" aria-labelledby="sua-clinica-h" style={{ ['--hm' as string]: 2 }}>
          <div className="wrap">
            <div className="grid grid--top fill">
              <div className="span-5 stack-4">
                <h2 id="sua-clinica-h">Uma Lia para a sua clínica</h2>
                <ul className="rows">
                  <li><span className="rows__name">Seus procedimentos e preços</span><p>Ela só diz o que está no seu cadastro. Se não souber, chama a recepção.</p></li>
                  <li><span className="rows__name">Sua agenda de verdade</span><p>Reserva só horários livres e avisa a recepção de cada um.</p></li>
                  <li><span className="rows__name">Painel para a recepção</span><p>Horários marcados e pedidos de atendente num só lugar. <a className="link" href="/painel">Abrir o painel desta demo</a></p></li>
                </ul>
                <div className="btn-row"><a className="btn btn--primary" href="https://wa.me/5519994450160?text=Oi%2C%20Alan%21%20Vi%20a%20demonstra%C3%A7%C3%A3o%20da%20Lia%20e%20quero%20uma%20assistente%20assim%20para%20a%20minha%20cl%C3%ADnica%20de%20est%C3%A9tica." target="_blank" rel="noreferrer">Quero uma Lia na minha clínica</a></div>
                <p className="t-small muted">Fala direto com o Alan Souza, desenvolvedor de IA em São Carlos, pelo WhatsApp. <a className="link" href="https://alansouza.netlify.app" target="_blank" rel="noreferrer">Ver o portfólio</a></p>
              </div>
              <div className="frame frame--photo frame--fill span-6 start-7">
                <img className="frame__img" src="/img/massagem-facial.jpg" alt="Massagem facial com as pontas dos dedos" loading="lazy" />
              </div>
            </div>
          </div>
        </section>
      </main>

      <footer className="footer closing footer--dark ground-inverse" id="contact" aria-labelledby="close-h">
        <div className="wrap">
          <div className="closing__cta close--type">
            <div className="section-head">
              <h2 id="close-h">Avaliação facial ou corporal sem custo</h2>
              <p>Segunda a sexta, 9h às 20h. Sábado, 9h às 14h.</p>
            </div>
            <a className="btn btn--primary btn--xl btn--wide" href="#agendar">Agendar com a Lia{ARROW}</a>
          </div>
          <div className="closing__links">
            <div className="grid">
              <div className="span-4 stack-4">
                <a className="nav__logo" href="#top">Lume Estética</a>
                <p className="footer__lede">Clínica fictícia de estética facial e corporal, criada para demonstrar uma assistente de IA.</p>
              </div>
              <div className="span-2 footer__col"><h3>Protocolos</h3><ul><li><a href="#protocolos">Facial</a></li><li><a href="#protocolos">Corpo e laser</a></li></ul></div>
              <div className="span-2 footer__col"><h3>Clínica</h3><ul><li><a href="#etapas">Etapas</a></li><li><a href="#visite">Endereço</a></li></ul></div>
              <div className="span-2 footer__col"><h3>Agenda</h3><ul><li><a href="#atendimento">Chat com a Lia</a></li><li><a href="/painel">Painel</a></li></ul></div>
              <div className="span-2 footer__col"><h3>Empresas</h3><ul><li><a href="#para-empresas">Como funciona</a></li><li><a href="#sua-clinica">Contratar</a></li></ul></div>
            </div>
            <div className="footer__legal">
              <span>&copy; 2026 Lume Estética, negócio fictício</span>
              <div className="socials" />
              <span className="credits">Fotos via Unsplash</span>
            </div>
          </div>
        </div>
      </footer>

      <nav className="actionbar" aria-label="Ações rápidas">
        <a className="btn btn--primary" href="#agendar">Agendar com a Lia</a>
      </nav>
    </>
  )
}
