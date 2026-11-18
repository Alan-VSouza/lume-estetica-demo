# Lia · assistente de IA para estética (demo)

Site de um espaço de estética **fictício** (Lume Estética, São Carlos-SP) com uma assistente de IA que explica procedimentos, passa valores, indica o protocolo para cada queixa e reserva horários sozinha.

**Teste ao vivo:** https://lume-estetica-demo-alan.vercel.app

## O que ela faz

- Responde sobre procedimentos, valores, duração, pacotes e cuidados usando **apenas** os dados cadastrados do espaço.
- Recebe a queixa ("tenho manchas", "quero tirar os pelos") e sugere o procedimento da lista, recomendando a avaliação, sem prometer resultado.
- Sabe que peeling, microagulhamento e laser exigem avaliação antes.
- Consulta horários livres (manhã, tarde ou noite) e reserva o horário, **validado no servidor**.
- Passa para a recepção quando a cliente pede, reclama ou o assunto foge do roteiro, e mostra tudo num **painel** (`/painel`).

## Como funciona

A IA (Google Gemini, com *function calling*) só interpreta e redige. Agenda, preços e regras ficam no código (`shared/`).

- **Front-end:** React 18 + TypeScript + Vite, CSS próprio, responsivo.
- **Back-end:** função serverless na Vercel (`api/chat.ts`).
- **Dados do negócio:** `shared/clinica.ts` (trocar esse arquivo adapta a demo para outro espaço).

---

Feito por **Alan Souza**, desenvolvedor full-stack e de IA em São Carlos-SP · [alansouza.netlify.app](https://alansouza.netlify.app)

A Lume Estética não existe. Fotos: Unsplash.
