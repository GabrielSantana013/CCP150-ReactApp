🎮 Meme do Dia - Jogo de Adivinhação
<div align="center">

https://img.shields.io/badge/React_Native-61DAFB?style=for-the-badge&logo=react&logoColor=black
https://img.shields.io/badge/Expo-000020?style=for-the-badge&logo=expo&logoColor=white
https://img.shields.io/badge/Firebase-FFCA28?style=for-the-badge&logo=firebase&logoColor=black

Um jogo divertido e desafiador onde você precisa adivinhar o meme do dia!
</div>
📋 Visão Geral e Requisitos
🎯 Objetivo

Desenvolver um aplicativo mobile que apresenta um meme diferente a cada dia, onde o usuário deve adivinhar qual meme é baseado em uma imagem com zoom progressivo, dicas e sons característicos.
📱 Requisitos do Projeto

    ✅ Jogo diário com apenas uma tentativa por dia

    ✅ Sistema progressivo de dificuldade (zoom + dicas)

    ✅ Histórico local de jogos

    ✅ Feedback tátil e sonoro

    ✅ Interface moderna e intuitiva

    ✅ Funcionamento offline

🛠 Tecnologias Utilizadas
Plataforma & Framework

    React Native - Framework para desenvolvimento mobile

    Expo - Plataforma para desenvolvimento e build

    JavaScript/JSX - Linguagem de programação

Armazenamento & Backend

    Firebase Realtime Database - Banco de dados para memes

    AsyncStorage - Armazenamento local do dispositivo

Bibliotecas Principais

    Expo Haptics - Feedback tátil

    Expo AV - Reprodução de áudio

    React Navigation - Navegação entre telas

UI/UX

    React Native Stylesheet - Estilização

    TouchableOpacity - Componentes interativos

    Custom Hooks - Gerenciamento de estado

🎮 Funcionalidades
🖼 Sistema de Jogo Principal

    Meme Diário Único: Um meme diferente a cada dia para todos os usuários

    Zoom Progressivo: Imagem começa com 300% de zoom e reduz a cada erro

    Limite Diário: Apenas uma tentativa de acerto por dia

💡 Sistema de Ajuda Progressiva
Tentativas	Recurso Liberado	Descrição
1-2	Zoom Reduzido	Imagem vai ficando menos ampliada
3	Dica Textual	Descrição contextual do meme
5	Áudio	Som característico do meme
📊 Histórico e Progresso

    Histórico Local: Registro de todos os jogos realizados

    Estatísticas: Número de tentativas por jogo

    Persistência: Dados salvos localmente no dispositivo

🔊 Feedback Multissensorial

    Vibração Tátil: Feedback no erro (botão vibra)

    Sons de Feedback: Efeitos sonoros para acertos

    Áudios dos Memes: Sons característicos após 5 tentativas

🎨 Interface do Usuário

    Design Dark Theme: Interface escura moderna

    Navegação Intuitiva: Fluxo claro entre telas

    Indicadores Visuais: Barra de progresso do zoom

    Botões Estilizados: Design consistente em toda aplicação

🎥 Demonstração
📸 Telas do Aplicativo
Tela Inicial	Jogo em Andamento	Tela de Resultado
<img src="https://via.placeholder.com/200x400/121212/BB86FC?text=🏠+Home" width="200">	<img src="https://via.placeholder.com/200x400/121212/BB86FC?text=🎮+Jogo" width="200">	<img src="https://via.placeholder.com/200x400/121212/BB86FC?text=🎉+Resultado" width="200">
Histórico	Zoom Máximo	Zoom Mínimo
<img src="https://via.placeholder.com/200x400/121212/BB86FC?text=📊+Histórico" width="200">	<img src="https://via.placeholder.com/200x400/121212/BB86FC?text=🔍+300%25+Zoom" width="200">	<img src="https://via.placeholder.com/200x400/121212/BB86FC?text=👁+100%25+Zoom" width="200">
🎬 Fluxo do Usuário

    Home → Botão "Jogar Agora"

    Jogo → Adivinha com zoom progressivo

    Acerto → Tela de parabéns com estatísticas

    Histórico → Visualiza desempenho anterior

🚀 Instalação e Execução
📲 Pré-requisitos

    Node.js (versão 14 ou superior)

    Expo Go app no celular

    Conta no Expo (opcional)

⚡ Execução Rápida

    Baixe o projeto
    bash

# Ou baixe o ZIP pelo GitHub e extraia
git clone [url-do-repositorio]

Instale as dependências
bash

cd meme-do-dia
npm install

Execute no Expo
bash

npx expo start

    Escaneie o QR Code

        Abra o app Expo Go no celular

        Escaneie o QR code no terminal

        O app carregará automaticamente

🔧 Execução com Emulador
bash

# Para Android
npx expo start --android

# Para iOS (apenas Mac)
npx expo start --ios

📦 Build para Produção
bash

# Build para lojas
npx expo build:android
npx expo build:ios

💡 Aprendizados e Próximos Passos
🎓 Aprendizados Técnicos

    Gerenciamento de Estado: Uso eficiente de useState e useEffect

    Persistência Local: Implementação com AsyncStorage

    Integração Firebase: Conexão com banco de dados em tempo real

    UX Mobile: Design de experiências touch-friendly

    Multimídia: Manipulação de áudio e imagens no React Native

🎯 Desafios Superados

    Sincronização Diária: Garantir meme único por dia para todos

    Progressão de Dificuldade: Balanceamento do sistema de zoom

    Performance: Otimização de carregamento de mídia

    Usabilidade: Feedback claro para todas as interações

🚀 Próximos Passos Planejados
Melhorias Imediatas

    Sistema de ranking global

    Compartilhamento de resultados

    Mais categorias de memes

    Modo desafio sem limite diário

Funcionalidades Futuras

    Login social (Google, Apple)

    Sistema de conquistas

    Edição de perfil

    Notificações push diárias

Expansões Técnicas

    Migração para TypeScript

    Implementação de testes unitários

    Otimização de performance

    Internacionalização (i18n)

🌟 Reflexão Final

Este projeto demonstra como conceitos simples podem ser transformados em experiências engajadoras. A combinação de mecânicas de jogo progressivas com tecnologia moderna resultou em um aplicativo que equilibra diversão e desafio, mantendo os usuários engajados diariamente.
<div align="center">

Desenvolvido com ❤️ usando React Native e Expo

"Um meme por dia mantém o tédio longe!" 🎭
</div>
