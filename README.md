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

API
===

```
Plano Sanarflix - Mensal: plan_Z3DL1lnSDySeRlVb
Sanarflix - Mensal - Trial 7 dias: plan_XxA9B28S6tPe92YO
Sanarflix - Trimestral: plan_bAm29oqS0f5y4gep
```

Desafio
=======

Caso 1
------
_Mario é um novo cliente que acabou de assinar o Sanarflix_

`POST` /clientes
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

`POST` /clientes
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

`POST` /clientes
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

Caso 5
------

Caso 6
------

`PUT` /clientes/cus_xxxxx
```json
{
	"assinatura_ativa": false
}
```