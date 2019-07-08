Sanar code challenge
====================

<!--ts-->
Table of Contents
-----------------
* [Instalação](#instalacao)
* [API](#api)
* [Desafio](#desafio)
  * [Caso 1](#caso-1)
  * [Caso 2](#caso-2)
  * [Caso 3](#caso-3)
  * [Caso 4](#caso-4)
  * [Caso 5](#caso-5)
  * [Caso 6](#caso-6)
<!--te-->

Instalação
==========
Pré-requisitos:
- [Git](https://git-scm.com/book/pt-br/v1/Primeiros-passos-Instalando-Git)
- [Node](https://nodejs.org/en/download/)
- [Mongodb](https://www.mongodb.com/what-is-mongodb)

Para executar o projeto, primeiramente é preciso clonar o repositório para a máquinda local:
```bash
git clone https://github.com/thalesbruno/sanar-codechallenge
```
Em seguida, na raiz do diretório criado, deve-se executar a instalação das dependências do projeto:
```bash
npm install
```
Também será necessária a instalação do MongoDB para criação da base de dados do projeto. Após instalado, rodamos o sistema de banco de dados passando um diretório para guarda dos arquivos gerados:
```bash
mongod --dbpath=/home/usuario/data
```
Se tudo der certo, o banco estará rodando e aguardando conexões na porta 27017 na rede localhost  
`[initandlisten] waiting for connections on port 27017`

Com isso, a infraestrutura de execução do projeto estará pronta.

API
===

Com o ambiente pronto, no diretório raiz da aplicação basta rodar:
```bash
node app.js
```
Com isso nossa API deverá estar rodando em http://localhost:3001:  

`Server up on port 3001`

Desafio
=======

Para execução dos testes do desafio, basta utilizar seu software favorito e rodar as requisições HTTP conforme detalhamento abaixo (Casos 1 a 6).

Planos criados para o desafio e seus respectivos IDs:
```
Plano Sanarflix - Mensal: plan_Z3DL1lnSDySeRlVb
Sanarflix - Mensal - Trial 7 dias: plan_XxA9B28S6tPe92YO
Sanarflix - Trimestral: plan_bAm29oqS0f5y4gep
Sanarflix - Promoção - Mensal + Livro Yellowbook: plan_BMo02rNsMPFW0dGe
```

Caso 1
------
_Mario é um novo cliente que acabou de assinar o Sanarflix_

>`POST` /clientes  

Body:
```json
{
	"cliente": {
		"nome": "Mario Lago",
		"email": "mariolago@testesanar.com"
	},
	"cartao": {
		"numero": "4000000000000010",
		"expiracao_mes": 1,
		"expiracao_ano": 2020,
		"cvv": "351"
	},
	"produtos": 
	[ 
		{
			"tipo": "plano",
			"plano_id": "plan_Z3DL1lnSDySeRlVb"
		}
	]
}
```

Caso 2
------
_Juliana assinou para testar o Sanarflix por 7 dias grátis, antes da primeira cobrança_

>`POST` /clientes

Body:
```json
{
	"cliente": {
		"nome": "Juliana Heinz",
		"email": "julianajeinz@testesanar.com"
	},
	"cartao": {
		"numero": "4000000000000010",
		"expiracao_mes": 1,
		"expiracao_ano": 2020,
		"cvv": "351"
	},
	"produtos": 
	[ 
		{
			"tipo": "plano",
			"plano_id": "plan_XxA9B28S6tPe92YO"
		}
	]
}
```

Caso 3
------
_Pedro assinou o Sanarflix Trimestral, por R$69,90_

>`POST` /clientes

Body:
```json
{
	"cliente": {
		"nome": "Pedro Souza",
		"email": "pedrosouza@testesanar.com"
	},
	"cartao": {
		"numero": "4000000000000010",
		"expiracao_mes": 1,
		"expiracao_ano": 2020,
		"cvv": "351"
	},
	"produtos": 
	[ 
		{
			"tipo": "plano",
			"plano_id": "plan_bAm29oqS0f5y4gep"
		}
	]
}
```

Caso 4
------
_Marcos teve um problema com o cartão de crédito e gostaria de alterar o cartão para
a próxima cobrança_

>`PUT` /clientes/:_id/cartao

Body:
```json
{
	"cliente_id": "cus_xxxx",
	"cartao": {
		"numero": "5425019448107793",
		"nome": "Marcos Gomes",
		"expiracao_mes": 1,
		"expiracao_ano": 2020,
		"cvv": "351"
	}
}
```


Caso 5
------
_Luiz fez a assinatura na promoção do Sanarflix + Livro Yellowbook, por um valor de
R$164,40 no primeiro mês e depois a assinatura normal de R$24,50_

>`POST` /clientes

Body:
```json
{
	"cliente": {
		"nome": "Luiz Guimaraes",
		"email": "luiz@testesanar.com"
	},
	"cartao": {
		"numero": "4000000000000010",
		"expiracao_mes": 1,
		"expiracao_ano": 2020,
		"cvv": "351"
	},
	"produtos": 
	[ 
		{
			"tipo": "plano",
			"plano_id": "plan_BMo02rNsMPFW0dGe"
		}
	]
}
```


Caso 6
------

>`PUT` /clientes/:_id

Body:
```json
{
	"assinatura_ativa": false
}
```