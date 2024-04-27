<h1 align="center">Facilita.ai API</h1>

<p align="center">
  A API do Facilita.ai é responsável pela conversão precisa de áudio e vídeo em texto, potencializada pela tecnologia de inteligência artificial da OpenAI.
</p>

<p align="center">
  <a href="#tecnologias-utilizadas">Tecnologias Utilizadas</a> |
  <a href="#instalação">Instalação</a> |
  <a href="#configuração">Configuração</a> |
  <a href="#uso">Uso</a> |
  <a href="#deploy">Deploy</a> |
  <a href="#licença">Licença</a>
</p>

<p align="center">
  <img alt="License" src="https://img.shields.io/static/v1?label=license&message=MIT&color=49AA26&labelColor=000000">
</p>

## Tecnologias Utilizadas 🛠️

- Node.js
- TypeScript
- Fastify
- @fastify/cors
- @fastify/multipart
- Prisma
- OpenAI
- Dotenv
- ai
- zod
- pm2

## Instalação ⚙️
Siga os passos abaixo para instalar e configurar o projeto:

1. Clone o repositório: <br>
 ```
  $ git clone https://github.com/viniciuspra/facilita-ai-api.git
 ```

2. Acesse o diretório do projeto:
 ```
  $ cd [DIRETÓRIO_DO_PROJETO]
 ```

3. Instale as dependências:
 ```
  $ npm install
 ```

## Configuração 🔧
Antes de executar o projeto, é necessário configurar as variáveis de ambiente. Siga as etapas abaixo:

1. Renomeie o arquivo `.env.example` para `.env`.
2. Abra o arquivo `.env` e preencha as seguintes variáveis de ambiente:
- `OPENAI_API_KEY` - a chave de API da OpenAI para utilizar a tecnologia de inteligência artificial.
- `DATABASE_URL` -  a URL de conexão com o banco de dados (geralmente, o arquivo dev.db).

## Uso 🚀
Para iniciar o servidor em modo de desenvolvimento, execute o seguinte comando:

```
 $ npm run dev
```

## Licença 📄:

Este projeto está licenciado sob a Licença MIT. Consulte o arquivo [LICENSE](LICENSE) para obter mais informações.

 
