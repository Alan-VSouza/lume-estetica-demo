import { useEffect } from 'react'
import Chat, { focarChat } from './Chat'
import { CLINICA } from '../shared/clinica'

function irParaChat(e?: React.MouseEvent) {
  e?.preventDefault()
  document.getElementById('atendimento')?.scrollIntoView({ behavior: 'smooth', block: 'center' })
  setTimeout(focarChat, 450)
}

const s = (id: string) => CLINICA.servicos.find((x) => x.id === id)!
const MENU = [
  { titulo: 'Facial', ids: ['limpeza', 'hidratacao', 'peeling', 'microagulhamento'] },
  { titulo: 'Corpo, laser e olhar', ids: ['drenagem', 'modeladora', 'laser', 'sobrancelha'] },
]

export default function App() {
  useEffect(() => {
    const alvo = document.getElementById('atendimento')
    if (!alvo || !('IntersectionObserver' in window)) return
    const obs = new IntersectionObserver(([e]) => document.body.classList.toggle('chat-visivel', e.isIntersecting), { threshold: 0.15 })
    obs.observe(alvo)
    return () => obs.disconnect()
  }, [])

  return (
    <>
      <p className="aviso-demo">
        Site de demonstração: a Lume Estética não existe. A assistente de IA é real. <a href="#para-empresas">Entenda</a>
      </p>

      <header className="topo">
        <a className="marca" href="/" aria-label="Lume Estética, início">
          <span className="marca-nome">Lume</span>
          <span className="marca-sub">estética<br />São Carlos</span>
        </a>
        <nav aria-label="Seções">
          <a href="#protocolos">Protocolos</a>
          <a href="#como-funciona">Como funciona</a>
          <a href="#equipe">Equipe</a>
          <a href="#visite">Visite</a>
        </nav>
        <a className="btn" href="#atendimento" onClick={irParaChat}>Agendar horário</a>
      </header>

      <section className="hero">
        <div className="hero-texto">
          <p className="rotulo">Estética facial e corporal</p>
          <h1>
            Pele cuidada
            <br />
            com <em>calma</em>
            <br />e método.
          </h1>
          <p className="lead">Conte para a Lia o que você quer cuidar. Ela indica o protocolo, passa os valores e reserva seu horário, a qualquer hora.</p>
          <dl className="fatos">
            <div><dt>Avaliação</dt><dd>sem custo</dd></div>
            <div><dt>Aberto até</dt><dd>20h</dd></div>
            <div><dt>Pacotes</dt><dd>em até 10x</dd></div>
          </dl>
        </div>
        <figure className="hero-arco">
          <img src="/img/hero.jpg" alt="Esteticista fazendo massagem facial em uma cliente deitada" width="900" height="1350" />
        </figure>
        <div className="hero-chat" id="atendimento">
          <Chat />
        </div>
      </section>

      <section id="protocolos" className="cardapio">
        <div className="cardapio-dentro">
          <div className="cardapio-cabeca">
            <p className="rotulo claro">Protocolos</p>
            <h2>O cardápio<br /><em>da casa.</em></h2>
            <p>Valores de referência. Peeling, microagulhamento e laser começam sempre por uma avaliação, sem custo.</p>
            <img src="/img/vela.jpg" alt="Mãos massageando o rosto de uma cliente em sala com luz de vela" loading="lazy" />
          </div>
          <div className="cardapio-colunas">
            {MENU.map((col) => (
              <div key={col.titulo}>
                <h3>{col.titulo}</h3>
                <ul>
                  {col.ids.map((id) => (
                    <li key={id}>
                      <p className="item-linha">
                        <span className="item-nome">{s(id).nome}</span>
                        <span className="pontos" aria-hidden="true" />
                        <span className="item-preco">{s(id).menu}</span>
                      </p>
                      <p className="item-desc">{s(id).descricao} <span>{s(id).duracao} min</span></p>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
            <a className="btn claro" href="#atendimento" onClick={irParaChat}>Perguntar à Lia qual combina comigo</a>
          </div>
        </div>
      </section>

      <main>
        <section id="como-funciona" className="bloco passos-bloco">
          <img src="/img/mascara.jpg" alt="Aplicação de máscara facial com pincel" loading="lazy" />
          <div>
            <p className="rotulo">Como funciona</p>
            <h2>Do primeiro contato<br />ao resultado.</h2>
            <ol className="passos">
              <li><span>i.</span><div><strong>Conversa e avaliação</strong><p>Você conta sua queixa para a Lia ou na recepção e faz a avaliação sem custo, com análise da pele ou do corpo.</p></div></li>
              <li><span>ii.</span><div><strong>Protocolo sob medida</strong><p>A esteticista indica os procedimentos, o número de sessões e o investimento, por escrito.</p></div></li>
              <li><span>iii.</span><div><strong>Sessões e acompanhamento</strong><p>Fotos de evolução a cada etapa e lembretes de horário pelo WhatsApp.</p></div></li>
            </ol>
          </div>
        </section>

        <section id="equipe" className="bloco tres">
          <div>
            <p className="rotulo">Equipe</p>
            <h2>Quem cuida de você.</h2>
            <ul className="equipe">
              {CLINICA.equipe.map((e) => (
                <li key={e.nome}><strong>{e.nome}</strong><span>{e.area}</span></li>
              ))}
            </ul>
            <p className="nota">Profissionais fictícias desta demonstração.</p>
          </div>
          <div>
            <p className="rotulo">Pagamento</p>
            <h2>Sem surpresa.</h2>
            <p>{CLINICA.pagamento}</p>
            <p className="nota">Atendimento particular, sem convênios.</p>
          </div>
          <div>
            <p className="rotulo">Cuidados</p>
            <h2>Antes de agendar.</h2>
            <p className="nota">{CLINICA.urgencia}</p>
          </div>
        </section>

        <section id="visite" className="bloco visite">
          <div>
            <p className="rotulo">Visite</p>
            <h2>Um espaço pensado<br />para desacelerar.</h2>
            <p className="endereco">{CLINICA.endereco}</p>
            <p className="nota">{CLINICA.estacionamento}</p>
            <dl className="horas">
              <div><dt>Segunda a sexta</dt><dd>9h às 20h</dd></div>
              <div><dt>Sábado</dt><dd>9h às 14h</dd></div>
              <div><dt>Domingo e feriados</dt><dd>Fechado</dd></div>
            </dl>
            <a className="btn" href="#atendimento" onClick={irParaChat}>Ver horários livres</a>
          </div>
          <img src="/img/pincel.jpg" alt="Aplicação de creme no rosto com pincel" loading="lazy" />
        </section>
      </main>

      <section id="para-empresas" className="empresas">
        <div className="empresas-dentro">
          <p className="rotulo claro">Para donas e donos de espaços de estética, clínicas e salões</p>
          <h2>Este espaço não existe.<br /><em>A Lia, sim.</em></h2>
          <p className="lead">
            Uma assistente de IA feita sob medida para o seu negócio. Atende no site e no WhatsApp a qualquer hora, responde com os seus procedimentos e valores e reserva horários conferindo a agenda de verdade.
          </p>
          <ul className="empresas-lista">
            <li><strong>Responde na hora.</strong>Mensagem das 23h não fica sem resposta até o dia seguinte. A cliente já sai com horário marcado.</li>
            <li><strong>Não inventa.</strong>Valor, número de sessões e cuidados vêm do seu cadastro. Se não souber, passa para a recepção.</li>
            <li><strong>Você no controle.</strong>Horários marcados e pedidos de atendimento humano chegam num painel. <a href="/painel">Veja o painel desta demo</a>.</li>
          </ul>
          <a className="btn claro" href="https://alansouza.netlify.app" target="_blank" rel="noreferrer">Quero uma assistente assim</a>
          <p className="assinatura">Projeto de Alan Souza, desenvolvedor de IA em São Carlos.</p>
        </div>
      </section>

      <footer className="rodape">Lume Estética é um negócio fictício criado para demonstração. Fotos: Unsplash.</footer>

      <a className="flutuante" href="#atendimento" onClick={irParaChat}>Conversar com a Lia</a>
    </>
  )
}
