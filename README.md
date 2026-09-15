# FORMA — Personal Fit

> Seu treino, do seu jeito.

O FORMA é uma aplicação web voltada para organização e acompanhamento de treinos de musculação.

A proposta é oferecer uma experiência simples e visual para consultar exercícios, organizar treinos personalizados e acompanhar a consistência da rotina.

## ✨ Funcionalidades

- Cadastro e personalização do nome da usuária
- Organização de treinos por grupos musculares
- Biblioteca de exercícios
- Visualização de exercícios com GIFs demonstrativos
- Criação de novos treinos
- Edição de treinos existentes
- Adição, remoção e reordenação de exercícios
- Armazenamento local dos dados com `localStorage`
- Visão semanal de acompanhamento dos treinos
- Painel de progresso no perfil

## 🛠️ Tecnologias

- React
- TypeScript
- Vite
- TanStack Router
- Tailwind CSS
- Lucide React
- Git
- GitHub

## 📱 Sobre o projeto

O FORMA foi desenvolvido com foco em uma experiência simples, responsiva e adaptada para uso em dispositivos móveis.

A aplicação não depende de backend, banco de dados ou APIs externas para suas funcionalidades atuais. Os dados dos treinos e informações de acompanhamento são armazenados localmente no navegador.

Os GIFs dos exercícios também são utilizados como arquivos locais dentro do projeto.

## 📂 Estrutura principal

```text
src/
├── assets/
│   └── exercises/
│       ├── biceps/
│       ├── costas/
│       ├── gluteos/
│       ├── ombro/
│       ├── panturrilha/
│       ├── posterior/
│       ├── quadriceps/
│       └── triceps/
│
├── data/
│   ├── exercises.ts
│   ├── workouts.ts
│   ├── workoutStore.ts
│   └── checkinStore.ts
│
├── routes/
│   ├── index.tsx
│   ├── perfil.tsx
│   ├── exercicios.index.tsx
│   ├── exercicios.$exerciseId.tsx
│   ├── treinos.index.tsx
│   └── treinos.$workoutId.tsx
│
└── styles.css
