# Atividade Sockets

## Execução

1. Primeiro é necessário rodar o servidor, para isso, execute o comando:

    <b> npm run server </b>

2. Depois, rode o cliente com o seguinte comando:

    <b> npm run client </b>

### Observações

1. Execute os comandos no mesmo local onde se encontra o arquivo package.json da versão que deseja rodar.

2. A v1 foi feita para suportar apenas um cliente, porém a v2 suporta múltiplas conexões.

### Perguntas

1. Qual as principais dificuldades?

    <b>Resposta:</b> Trabalhar com pouco nível de abstração envolve diversas dificuldades, ter que imaginar cada cenário, de conexão, desconexão, envio de mensagem, identificação de usuário e tratamento para conexões ao mesmo tempo são as principais dificuldades encontradas.

2. Quais as principais diferenças entre a implementação da questão 1 e da questão 2?

    <b>Resposta:</b> A principal diferença, é a complexidade. Na questão 2, tive a necessidade de criar um array para manipular as conexões ativas, o que aumentou a necessidade de tratativas em código em comparação com uma comunicação 1:1.

3. Como gerenciar as conexões entre clientes na questão 2?

    <b>Resposta:</b> Armazenando num array a cada nova conexão reconhecida através da função server.on('connect'). Além de armazenar a conexão, também realizei o armazenando dos nome de cada cliente conectado. Formando assim um array de objects, onde cada object contém a conexão em sim e o nome do usuário conectado.

4. Como identificar as mensagens e os remetentes para seguir a formatação do exemplo?

    <b>Resposta:</b> A cada nova conexão, montei um objeto com a conexão e o nome do usuário da conexão, após isso, fiz o push no array de clients. Para deixar as mensagens no formato indicado, a cada nova mensagem recebida pelo servidor, era identificado qual nome de usuário estava associado com aquela conexão, para estão chamar a função broadcast() e propagar a mensagem já formatada com o nome e conteúdo.
