#Forum-Project-NestJs.
 
Projeto de um Fórum usando o NestJS.

____________________________________________________________________________________________________________________________________________________________________________________________________________________
____________________________________________________________________________________________________________________________________________________________________________________________________________________
-------> Fundamentos do NestJs:

  ----------| Configurações: |-----------

- NestJS, um framework opinado do ecossistema do Node.js.
- Decorators: como @Get e @Post para definir os métodos HTTP que serão utilizados.
- Configuração do banco de dados Postgres usando o Docker Compose e algumas variáveis de ambiente, como usuário, senha e nome do banco de dados.
- Configurado o Prisma, um ORM que será usado para trabalhar com o banco de dados.
- Estender a classe Prisma Client para a classe Prisma Service: permite acessar a conexão com o banco de dados de forma mais simples, sem a necessidade de criar uma variável client separada.
- Configurado o PrismaService como um provider no app module para que ele possa ser injetado em outros serviços e controllers da aplicação.

  
  ----------| Senhas, Tokens e Validações: |-----------
  
- Usado o bcrypt.js para fazer o hash da senha antes de salvá-la no banco de dados.
- Validação de dados usando o Zod no NestJS: ZodValidationError -> pode ser usada para formatar os erros de validação de uma maneira mais legível.
- Usado o REST Client, uma extensão do VS Code, para testar as rotas HTTP da aplicação.
- Configurado a autenticação JWT e utilizando Passport que é uma biblioteca popular para autenticação no Node.js. O JWT é uma estratégia de autenticação.
- Convertendo o conteúdo de um arquivo para base64 e usar essa conversão para gerar chaves privadas e públicas para autenticação JWT.
- Implementado a geração de um token de autenticação usando a chave privada e validando a assinatura do token usando a chave pública.
- Buscar os dados do usuário autenticado a partir do token dentro do controller.
  
  ----------| Controllers: |-----------

- Controllers no Nest.js: são responsáveis por expor as funcionalidades da nossa aplicação na camada HTTP. Eles são identificados pelo decorator @Controller e podem conter métodos que representam as rotas da nossa aplicação.
- Criação um controller específico para cada rota, facilitando a organização.
- Controller de criação de perguntas, adicionando a validação dos campos utilizando o ZodValidationPipe para validar o corpo da requisição.
- Criação de uma rota de listagem de perguntas recentes. Dentro desse controller, terá uma chamada ao banco de dados para buscar as perguntas mais recentes, ordenadas por data de criação.
  
----------| Testes E2E: |-----------

- Configurado o Vitest para realizar testes end-to-end.
- Configurado o SWC como compilador do TypeScript no Vitest, pois ele suporta decorators.
- Feito um ambiente isolado para executar testes em um banco de dados.
- Criação de testes para a criação de usuários e autenticação.
- Criação de testes para a criação de perguntas.

____________________________________________________________________________________________________________________________________________________________________________________________________________________
____________________________________________________________________________________________________________________________________________________________________________________________________________________
-------> Desacoplando camadas no NestJs:

----------| Camadas: |-----------

- Criação da camada de infraestrutura: essa camada será responsável por lidar com o framework Nest, o banco de dados e outras partes externas que não podem ser testadas unitariamente.
- Implementação dos repositórios.
- Implementação dos Mappers: que são responsáveis por converter uma entidade de um formato para outro, permitindo que diferentes camadas da aplicação trabalhem com representações diferentes da mesma entidade.
- Continuação da alimentação do Prisma do projeto: adicionado um campo de "role" na tabela de usuários para definir se são alunos ou instrutores.
- Alterações nos relacionamentos entre as tabelas de perguntas e respostas.

----------| Fluxos: |-----------

- listagem das perguntas.
- Presenter na camada HTTP: é responsável por converter informações de um formato para outro.
- criação do QuestionPresenter, que possui um método estático chamado toHTTP. Esse método recebe uma pergunta do domínio e retorna as informações no formato desejado para serem enviadas para o front-end.
- Criação do cadastro e a autenticação de usuários, verificando se já existe um aluno com o mesmo email cadastrado.

----------| Criptografias, Testes e Refatorações: |-----------

- Uso do Bcrypt para comparar senhas de usuários e a criação de tokens encriptados usando uma chave privada.
- a criptografia foi tratada na camada mais externa, utilizando uma classe Encrypter como um gateway entre os casos de uso e as funções de criptografia.
- comparação da senha informada com a senha armazenada no banco de dados.
- stubs para a parte de criptografia: é uma implementação fictícia de um contrato, usado para testes.
- tratamento de erros específicos para cada situação. Por exemplo, ao cadastrar um aluno com um e-mail já existente, podemos retornar um erro de "aluno já existe".
- Substituição do config.service do Nest, para um próprio serviço chamado env.service, facilitando a busca de variáveis ambientes.

____________________________________________________________________________________________________________________________________________________________________________________________________________________
____________________________________________________________________________________________________________________________________________________________________________________________________________________


Tecnologias: JAVASCRIPT. TYPESCRIPT. NODEJS.




 
 
