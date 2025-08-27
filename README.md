# 💪 WOD App

> Seu companion de CrossFit para transformar treinos em progresso mensurável.

<p align="center">
  <img src="https://img.shields.io/badge/status-em%20desenvolvimento-yellow?style=for-the-badge" alt="Status do Projeto">
  <img src="https://img.shields.io/badge/React%20Native-Expo-61DAFB?style=for-the-badge&logo=expo" alt="React Native - Expo">
  <img src="https://img.shields.io/badge/TypeScript-3178C6?style=for-the-badge&logo=typescript" alt="TypeScript">
  <img src="https://img.shields.io/badge/State%20Management-Zustand-8A2BE2?style=for-the-badge" alt="Zustand">
</p>

<p align="center">
  <a href="#-sobre-o-projeto">Sobre</a> •
  <a href="#-principais-funcionalidades">Funcionalidades</a> •
  <a href="#-tecnologias-utilizadas">Tecnologias</a> •
  <a href="#-como-começar">Instalação</a> •
  <a href="#-como-contribuir">Contribuir</a>
</p>

## 🎯 Sobre o Projeto

O **WOD App** foi criado para entusiastas de CrossFit e fitness funcional que buscam uma ferramenta simples e poderosa para registrar treinos, monitorar o progresso e quebrar recordes pessoais (PRs). O objetivo é oferecer uma experiência fluida e motivadora, como ter um coach pessoal no bolso.

## ✨ Principais Funcionalidades

-   **🏋️‍♂️ Treinos Diários:**
    -   **WOD do Dia:** Receba um treino novo e desafiador todos os dias.
    -   **Biblioteca Extensa:** Mais de 50 workouts clássicos (AMRAP, For Time, EMOM, Tabata).
    -   **Níveis de Dificuldade:** Adapte os treinos para seu nível, do iniciante ao elite.

-   **📊 Acompanhamento de Progresso:**
    -   **Histórico Completo:** Visualize todos os treinos que você já realizou.
    -   **Recordes Pessoais (PRs):** O app detecta e salva seus recordes automaticamente.
    -   **Estatísticas Visuais:** Gráficos e métricas para acompanhar sua consistência e evolução.

-   **⏰ Timer Inteligente:**
    -   **Timer Integrado:** Cronômetro, contagem regressiva e Tabata com alertas sonoros.
    -   **Registro Automático:** Ao final do timer, seu score é calculado e salvo sem esforço.

-   **🎨 Experiência de Usuário:**
    -   **Design Limpo e Intuitivo:** Foco total no seu treino, sem distrações.
    -   **Animações Fluidas:** Interações suaves que tornam o uso do app gratificante.
    -   **Modo Escuro:** Conforto visual para treinar a qualquer hora do dia.

-   **🔐 Gestão de Conta:**
    -   **Autenticação Segura:** Proteja seus dados com login e senha.
    -   **Conta Demo:** Experimente o app por completo antes de se cadastrar.
    -   **Privacidade:** Todos os seus dados são armazenados localmente no seu dispositivo.

## 🚀 Tecnologias Utilizadas

Este projeto foi construído com ferramentas modernas do ecossistema JavaScript/TypeScript, focando em performance e escalabilidade.

-   **Core:** React Native, Expo, TypeScript
-   **Gerenciamento de Estado:** Zustand (com `persist` middleware)
-   **Navegação:** Expo Router (roteamento baseado em arquivos)
-   **UI & Animações:** React Native Reanimated, Lucide Icons, StyleSheet API
-   **Armazenamento Local:** Async Storage

## 🏁 Como Começar

Para executar o projeto em seu ambiente local, siga os passos abaixo.

### Pré-requisitos

-   [Node.js](https://nodejs.org/en/) (LTS)
-   [Yarn](https://yarnpkg.com/) ou npm
-   [Expo Go](https://expo.dev/go) (app para celular) ou um emulador (Android Studio / Xcode)

### Instalação e Execução

1.  **Clone o repositório:**
    ```bash
    git clone [https://github.com/seu-usuario/wod-app.git](https://github.com/seu-usuario/wod-app.git)
    cd wod-app
    ```

2.  **Instale as dependências:**
    ```bash
    yarn install
    # ou
    npm install
    ```

3.  **Inicie o servidor de desenvolvimento:**
    ```bash
    npx expo start
    ```

4.  **Abra o aplicativo:**
    -   Leia o QR Code com o app **Expo Go** no seu celular.
    -   Ou pressione `a` para abrir no emulador Android ou `i` para o emulador iOS.

## 📂 Estrutura de Pastas

A estrutura do projeto foi pensada para ser intuitiva e escalável.

src/
├── app/          # Rotas e telas (Expo Router)
├── assets/       # Fontes, imagens e outros arquivos estáticos
├── components/   # Componentes reutilizáveis (botões, inputs, cards)
├── constants/    # Constantes globais (cores, dimensões)
├── data/         # Mock data (lista de workouts)
├── store/        # Lógica de estado global (Zustand)
└── types/        # Definições de tipos do TypeScript


## 🤝 Como Contribuir

Contribuições são o que tornam a comunidade open-source um lugar incrível para aprender e criar. Qualquer contribuição que você fizer será **muito apreciada**.

1.  Faça um **Fork** do projeto.
2.  Crie uma **Branch** para sua feature (`git checkout -b feature/AmazingFeature`).
3.  Faça o **Commit** de suas alterações (`git commit -m 'Add some AmazingFeature'`).
4.  Faça o **Push** para a Branch (`git push origin feature/AmazingFeature`).
5.  Abra um **Pull Request**.

## 📄 Licença

Distribuído sob a licença MIT. Veja `LICENSE.txt` para mais informações.

---

<p align="center">
  Feito com ❤️ por <b>dev-guirocha</b>
</p>
