# Forma Personal Fit

Crie um web app mobile-first chamado “FORMA”.

IMPORTANTE:

Este projeto NÃO precisa de IA.

Este projeto NÃO precisa de login.

Este projeto NÃO precisa de banco de dados.

Este projeto NÃO precisa de backend.

Este projeto NÃO precisa de API externa de exercícios.

Os exercícios e treinos serão definidos manualmente por mim posteriormente no código.

Os GIFs dos exercícios serão adicionados localmente ao projeto posteriormente.

OBJETIVO

Criar uma experiência de aplicativo de treino pessoal que funcione perfeitamente no celular e também no desktop.

A pessoa acessa o site, informa o próprio nome uma única vez e passa a ser tratada pelo nome dentro do aplicativo.

O app será usado principalmente como um atalho na tela inicial do celular, portanto a experiência mobile deve ser prioridade absoluta.

IDENTIDADE DA MARCA

Nome:

FORMA

Tagline:

“Seu treino, do seu jeito.”

IMPORTANTE:

O nome FORMA é o nome atual da interface, mas a experiência deve ser pessoal.

A pessoa deve informar o próprio nome na primeira utilização.

IDENTIDADE VISUAL

Criar uma identidade moderna, elegante, feminina e premium.

Não usar:

- verde;

- azul;

- azul-marinho;

- vermelho como cor principal;

- neon;

- estética de academia masculina;

- gradientes exagerados;

- visual gamer;

- excesso de elementos fitness.

PALETA:

Ameixa escuro:

#432933

Vinho:

#6B3E4B

Rosé:

#D8B9BE

Creme:

#F7F1EC

Taupe:

#B6A39D

Branco:

#FFFFFF

USO DAS CORES:

O fundo principal deve ser creme.

O ameixa escuro deve ser usado para textos principais e elementos de maior contraste.

O vinho deve ser a cor principal dos botões e elementos de ação.

O rosé deve aparecer em detalhes suaves, estados selecionados, pequenos destaques e fundos secundários.

O taupe deve ser usado em textos secundários e divisórias.

Os exercícios terão imagens/GIFs com fundo branco e músculos destacados em vermelho. Esse vermelho pertence apenas às ilustrações dos exercícios e NÃO deve ser incorporado à identidade visual da interface.

TIPOGRAFIA

Títulos:

Cormorant Garamond ou fonte serifada elegante semelhante.

Interface e textos:

Inter ou Montserrat.

Os títulos devem ser sofisticados, mas a interface deve ser extremamente fácil de ler.

ESTILO

Quero:

- muito espaço em branco;

- cards arredondados;

- bordas suaves;

- sombras muito discretas;

- ícones minimalistas;

- hierarquia visual clara;

- aparência de aplicativo premium;

- interface feminina sem parecer infantil;

- visual editorial e sofisticado.

Não criar uma landing page.

Criar uma interface de aplicativo.

RESPONSIVIDADE

Prioridade:

mobile-first.

O app deve funcionar perfeitamente em:

- celulares pequenos;

- celulares médios;

- celulares grandes;

- tablets;

- desktop.

No mobile:

- conteúdo deve ocupar a largura disponível;

- margens laterais confortáveis;

- botões grandes;

- textos legíveis;

- nenhum elemento deve ficar espremido;

- nenhum conteúdo deve ultrapassar a largura da tela;

- evitar textos muito pequenos;

- navegação simples.

ESTRUTURA DO APP

Criar as seguintes telas:

1. BOAS-VINDAS

2. INÍCIO

3. LISTA DE EXERCÍCIOS

4. DETALHE DO EXERCÍCIO

5. TREINO

6. CONFIGURAÇÕES / PERFIL SIMPLES

-----------------------------------

TELA 1 — BOAS-VINDAS

-----------------------------------

Criar uma tela inicial limpa e elegante.

Mostrar:

FORMA

Seu treino, do seu jeito.

Texto curto:

“Monte sua rotina, consulte seus exercícios e acompanhe seus treinos de forma simples.”

Depois:

“Como podemos chamar você?”

Campo:

[ Digite seu nome ]

Botão:

Continuar

Ao clicar em Continuar:

- validar que o nome não está vazio;

- salvar o nome no armazenamento local do navegador;

- encaminhar para a tela inicial.

Se o nome já existir no armazenamento local, não mostrar a tela de boas-vindas novamente e abrir diretamente a tela inicial.

Não usar login.

-----------------------------------

TELA 2 — INÍCIO

-----------------------------------

Mostrar:

“Olá, [NOME]”

e abaixo:

“O que vamos treinar hoje?”

Criar quatro grandes cards:

OMBRO + TRÍCEPS

COSTAS + BÍCEPS

GLÚTEO + POSTERIOR

QUADRÍCEPS + PANTURRILHA

Cada card deve ter:

- nome do treino;

- quantidade de exercícios como informação secundária;

- ícone ou detalhe visual discreto;

- aparência clicável.

As quantidades de exercícios devem ser estruturadas para serem facilmente alteradas no código depois.

Não inventar exercícios adicionais.

Adicionar também uma opção:

“Ver exercícios”

que leva para a biblioteca de exercícios.

-----------------------------------

TELA 3 — LISTA DE EXERCÍCIOS

-----------------------------------

Criar uma biblioteca de exercícios.

Organizar por grupos:

Ombro

Tríceps

Costas

Bíceps

Glúteos

Posterior

Quadríceps

Panturrilha

Cada exercício será futuramente associado a um GIF local.

IMPORTANTE:

Criar a estrutura de dados de forma organizada para que eu possa posteriormente adicionar exercícios e imagens manualmente.

Não buscar imagens na internet.

Não usar APIs.

Não usar imagens externas.

Preparar o código para que cada exercício possa receber:

- id

- nome

- grupo muscular

- imagem

- séries

- repetições

- descanso

- observação opcional

Exemplo conceitual:

{

  id: "desenvolvimento-halter",

  name: "Desenvolvimento com Halter",

  group: "Ombro",

  image: ...,

  sets: "3x12 ou 3x10",

  rest: "90s",

  note: ""

}

Não precisa adicionar esse exemplo como exercício real se não houver imagem. Apenas preparar a estrutura.

-----------------------------------

TELA 4 — DETALHE DO EXERCÍCIO

-----------------------------------

Criar uma tela visual para cada exercício.

Estrutura:

[ GIF / IMAGEM DO EXERCÍCIO ]

Nome do exercício

Grupo muscular

Séries

Repetições

Descanso

Observação

Botão:

“Voltar”

Os GIFs devem aparecer em destaque.

Criar um container branco e limpo para os GIFs.

Como os GIFs terão fundo branco, evitar colocar elementos visuais complexos atrás deles.

-----------------------------------

TELA 5 — TREINO

-----------------------------------

Ao selecionar um dos quatro treinos, mostrar:

Nome do treino

Exemplo:

OMBRO + TRÍCEPS

Depois mostrar os exercícios em sequência.

Cada exercício deve aparecer como card:

Número

Nome

[ GIF ]

Séries / repetições

Observação

Botão:

“Ver exercício”

Adicionar navegação:

“Anterior”

“Próximo”

No último exercício:

“Finalizar treino”

Não criar cronômetro automático ainda.

Não criar contador de carga ainda.

Não criar calendário ainda.

Não criar sistema de progresso ainda.

Apenas preparar uma estrutura simples e elegante para a navegação entre exercícios.

-----------------------------------

TREINOS

-----------------------------------

A estrutura deve estar preparada para receber EXATAMENTE estes quatro treinos:

1. Ombro + Tríceps

- Desenvolvimento com Halter — 3x12 ou 3x10

- Elevação lateral — 3x12 ou 3x10

- Tríceps na polia — 4x10 drop set

- Elevação frontal na polia — 3x10

- Tríceps na polia com barra reta — 3x10

- Tríceps martelo com halter — 3x15

- Cardio à sua escolha — 15 a 30 minutos

2. Costas + Bíceps

- Puxada Alta Aberta — 1x15, 1x12, 1x10, 1x8

- Remada baixa na polia ou com halter — 3x10

- Pull down — 3x10

- Face pull — 3x10

- Bíceps martelo com halter — 3x12

- Bíceps com barra W — 3x10

- Cardio à sua escolha — 15 a 30 minutos

3. Glúteo + Posterior

- Cadeira abdutora — 3x15

- Elevação pélvica — progressão de carga: 1x12, 1x10, 1x8, 1x6

- Búlgaro com halter — 3x12

- Stiff com barra — 3x10

- Coice na polia — 3x10

- Cadeira flexora — 3x15

- Cardio à vontade — 15 a 30 minutos

4. Quadríceps + Panturrilha

- Cadeira abdutora — 3x15

- Agachamento livre ou no Smith — progressão de carga: 1x12, 1x10, 1x8, 1x6

- Leg press — progressão de carga: 1x12, 1x10, 1x8, 1x6

- Cadeira extensora — 3x10, fazendo drop set

- Afundo passada ou no Smith — 3x10

- Panturrilha na máquina sentada — 3x15 a 20

- Panturrilha na máquina em pé — 3x15 a 20

- Cardio à vontade — 15 a 30 minutos

IMPORTANTE:

Não alterar os exercícios, séries ou repetições fornecidos acima.

Não adicionar exercícios por conta própria.

Não criar inteligência para modificar os treinos.

-----------------------------------

TELA 6 — PERFIL / CONFIGURAÇÕES

-----------------------------------

Criar uma tela simples.

Mostrar:

“Olá, [NOME]”

Opção:

“Alterar meu nome”

Ao alterar, atualizar o nome armazenado localmente.

Opção:

“Voltar ao início”

Não criar autenticação.

-----------------------------------

NAVEGAÇÃO

-----------------------------------

Criar uma navegação simples e intuitiva.

No desktop:

pode existir uma pequena barra lateral ou navegação superior.

No mobile:

usar navegação inferior fixa com no máximo quatro itens:

Início

Treinos

Exercícios

Perfil

A navegação deve ser discreta e elegante.

-----------------------------------

ARQUITETURA

-----------------------------------

Organizar o código de forma limpa e fácil de editar posteriormente.

Separar:

- componentes;

- dados dos exercícios;

- dados dos treinos;

- telas;

- estilos;

- assets.

Criar uma estrutura clara para que posteriormente eu possa colocar os GIFs em:

src/assets/exercises/

e organizar por grupo muscular:

src/assets/exercises/

  ombro/

  triceps/

  costas/

  biceps/

  gluteos/

  posterior/

  quadriceps/

  panturrilha/

Preparar o código para receber esses arquivos localmente.

NÃO criar dependência de API externa.

-----------------------------------

IMPORTANTE SOBRE OS GIFS

-----------------------------------

Os GIFs serão ilustrações anatômicas com:

- fundo branco;

- corpo humano em preto/cinza;

- músculo trabalhado destacado em vermelho.

O app deve tratar esses GIFs como conteúdo visual principal dos exercícios.

Não colocar filtros.

Não alterar as cores dos GIFs.

Não recortar as imagens automaticamente.

-----------------------------------

PWA / EXPERIÊNCIA DE APP

-----------------------------------

Preparar o projeto para funcionar muito bem como uma página adicionada à tela inicial do celular.

Quero aparência de app:

- sem aparência de site tradicional;

- navegação fluida;

- layout mobile-first;

- conteúdo ocupando a tela de forma confortável.

Não é necessário implementar notificações push agora.

Não é necessário implementar instalação PWA completa agora se isso exigir configuração adicional.

-----------------------------------

RESULTADO ESPERADO

-----------------------------------

Quero uma primeira versão funcional da interface, com dados estáticos e arquitetura preparada para eu terminar o projeto manualmente no VS Code.

Prioridade:

1. Visual

2. Responsividade

3. Navegação

4. Estrutura organizada

5. Facilidade de edição posterior

Não adicionar funcionalidades extras que não foram solicitadas.

Não adicionar IA.

Não adicionar banco de dados.

Não adicionar login.

Não adicionar pagamentos.

Não adicionar anúncios.

Não adicionar integração com serviços externos.

Criar uma experiência extremamente limpa, elegante e prática.

This project was built with [Lovable](https://lovable.dev).

## Build with Lovable

Continue developing this project in the [Lovable editor](https://lovable.dev/projects/c9782d67-ff04-41a6-afe5-6643a8adf150).

- **Ship faster**: describe what you want to build and Lovable handles the code.
- **Stay in sync**: every change made in Lovable is committed straight to this repository.
- **Full ownership**: this code is yours. Push to `main` on GitHub and your changes sync back into Lovable, ready for your next prompt.

## Development

Prefer working locally? You need Node.js and npm — [install with nvm](https://github.com/nvm-sh/nvm#installing-and-updating).

```sh
git clone <this-repository-url>
cd <repository-name>
npm i
npm run dev
```
