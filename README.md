💪 WOD App - Seu Companion de CrossFit
Transforme seu treino em progresso mensurável.

<p align="center">
<img src="https://img.shields.io/badge/React%20Native-Expo-61DAFB?style=for-the-badge&logo=expo" alt="React Native - Expo">
<img src="https://img.shields.io/badge/TypeScript-3178C6?style=for-the-badge&logo=typescript" alt="TypeScript">
<img src="https://img.shields.io/badge/State%20Management-Zustand-8A2BE2?style=for-the-badge" alt="Zustand">
</p>

<p align="center">
<a href="#-sobre-o-projeto">Sobre</a> •
<a href="#-features">Features</a> •
<a href="#-tech-stack">Tecnologias</a> •
<a href="#-instalação">Instalação</a> •
<a href="#-como-usar">Como Usar</a> •
<a href="#-contribuindo">Contribuindo</a>
</p>

🌟 Sobre o Projeto
O WOD App é um aplicativo mobile completo para entusiastas de CrossFit e functional fitness que desejam acompanhar seus treinos, progresso e recordes pessoais de forma intuitiva e motivadora.

🎯 Objetivo

Democratizar o acesso ao acompanhamento de treinos de alta intensidade, proporcionando uma experiência similar a ter um coach pessoal no seu bolso.

✨ Features
Categoria	Funcionalidade	Descrição
🏋️‍♂️ Treinos Diários	WOD do Dia	Treino aleatório diário com variedade garantida.
+50 Workouts	Biblioteca com workouts variados (AMRAP, For Time, EMOM, Tabata).
Dificuldade Progressiva	Workouts para todos os níveis (Beginner to Elite).
📊 Acompanhamento	Histórico Completo	Todos os seus treinos realizados em um único lugar.
Recordes Pessoais (PRs)	Acompanhe seus PRs, que são atualizados automaticamente.
Estatísticas Detalhadas	Métricas de desempenho e consistência para visualizar sua evolução.
⏰ Timer Inteligente	Timer Integrado	Contagem regressiva e cronômetro com alertas sonoros e visuais.
Score Automático	Cálculo de performance baseado no tempo e no tipo de treino.
Finalização Inteligente	Registro automático do score ao completar o treino.
🎨 Experiência do Usuário	Design Intuitivo	Interface limpa e focada na performance durante o treino.
Animações Suaves	Feedback visual gratificante para uma experiência fluida.
Modo Escuro	Conforto visual para treinar em qualquer ambiente ou horário.
🔐 Gestão de Conta	Autenticação Segura	Login e registro com validações para proteger seus dados.
Conta Demo	Experimente todas as funcionalidades do app sem compromisso.
Dados Locais	Seus dados ficam armazenados de forma segura no seu dispositivo.
🛠️ Tech Stack
Abaixo estão as principais tecnologias e ferramentas utilizadas no desenvolvimento do WOD App:

Frontend:

React Native + Expo - Framework de desenvolvimento mobile.

TypeScript - Tipagem estática para um código mais robusto.

Zustand - Gerenciamento de estado simples e poderoso.

React Navigation - Solução completa para navegação.

Animações e Ícones:

React Native Reanimated - Criação de animações fluidas e de alto desempenho.

Lucide React Native - Biblioteca de ícones open-source.

Armazenamento Local:

Async Storage - Persistência de dados no dispositivo.

Zustand Persist Middleware - Persistência automática do estado global.

Roteamento e Estilização:

Expo Router - Roteamento baseado em arquivos (file-based routing).

StyleSheet API - Estilização nativa para máxima performance.

📦 Instalação
Para rodar o projeto localmente, siga os passos abaixo.

Pré-requisitos

Node.js (versão 16 ou superior)

npm ou yarn

Expo CLI (npm install -g expo-cli)

Passo a Passo

Clone o repositório:

Bash
git clone https://github.com/seu-usuario/wod-app.git
cd wod-app
Instale as dependências:

Bash
npm install
# ou
yarn install
Execute o projeto:

Bash
npx expo start
Acesse o app:

Escaneie o QR code gerado com o app Expo Go no seu celular (Android/iOS).

Ou execute em um emulador Android/iOS no seu computador.

🏗️ Estrutura do Projeto
O projeto utiliza uma estrutura modular para facilitar a manutenção e escalabilidade.

src/
├── app/          # Rotas do Expo Router
│   ├── (auth)/   # Rotas de autenticação
│   ├── (tabs)/   # Rotas principais com Tab Navigation
│   ├── workout/  # Detalhes e listagem de workouts
│   └── timer/    # Tela do timer para o workout
├── components/   # Componentes reutilizáveis
├── constants/    # Constantes e configurações (cores, fontes)
├── data/         # Dados estáticos (biblioteca de workouts)
├── store/        # Gerenciamento de estado com Zustand
├── types/        # Definições de tipos do TypeScript
└── utils/        # Funções utilitárias
🚀 Como Usar
Primeiros Passos:

Crie sua conta ou utilize a Conta Demo para explorar.

Navegue pela biblioteca de workouts e conheça as opções.

Inicie seu primeiro WOD na tela do Timer.

Acompanhe sua evolução na aba "Progresso".

Dicas de Uso:

💡 Use a conta demo para testar todas as features sem precisar se cadastrar.

⭐ Favorite seus workouts preferidos para acessá-los rapidamente.

📊 Revise seu histórico para identificar padrões e pontos de melhoria.

🏆 Desafie-se constantemente tentando bater seus recordes pessoais (PRs).

🤝 Contribuindo
Contribuições são muito bem-vindas! Se você tem alguma ideia para melhorar o app, siga os passos:

Faça um Fork do projeto.

Crie uma nova branch para sua feature (git checkout -b feature/AmazingFeature).

Faça o commit das suas alterações (git commit -m 'Add some AmazingFeature').

Faça o push para a sua branch (git push origin feature/AmazingFeature).

Abra um Pull Request.

📝 Próximas Features
[ ] Sincronização de dados em nuvem.

[ ] Compartilhamento de resultados nas redes sociais.

[ ] Criação de workouts personalizados.

[ ] Agendamento de treinos (programação semanal/mensal).

[ ] Integração com wearables (Apple Watch, Galaxy Watch).

🐛 Reportar Bugs
Encontrou um bug? Abra uma issue no GitHub detalhando:

A descrição do problema.

Os passos para reproduzi-lo.

Screenshots, se aplicável.

📄 Licença
Este projeto está sob a licença MIT. Veja o arquivo LICENSE para mais detalhes.

🙏 Agradecimentos
À comunidade CrossFit por inspirar o projeto.

Ao time do Expo por tornar o desenvolvimento mobile mais acessível.

A todos os contribuidores que ajudam a melhorar o app.

<p align="center">
Desenvolvido por <b>dev-guirocha</b> para a comunidade fitness.
</p>

<p align="center">
<a href="https://twitter.com/wodapp" target="_blank">
<img src="https://img.shields.io/badge/Twitter-@wodapp-1DA1F2?style=for-the-badge&logo=twitter" alt="Twitter">
</a>
<a href="https://instagram.com/wodapp" target="_blank">
<img src="https://img.shields.io/badge/Instagram-@wodapp-E4405F?style=for-the-badge&logo=instagram" alt="Instagram">
</a>
</p>

<p align="center">
<b>⭐ Deixe uma estrela no GitHub se você gostou do projeto! ⭐</b>
</p>
