# Domain Events - Customer

Projeto demonstrando a implementacao do padrao Domain Events (DDD) para o agregado Customer.

## Estrutura

```
src/
└── domain/
    ├── @shared/
    │   └── event/
    │       ├── event.interface.ts            # Interface base de eventos
    │       ├── event-handler.interface.ts    # Interface base de handlers
    │       ├── event-dispatcher.interface.ts # Interface do dispatcher
    │       └── event-dispatcher.ts           # Implementacao do dispatcher
    └── customer/
        ├── entity/
        │   ├── customer.ts                   # Agregado Customer
        │   └── customer.spec.ts              # Testes unitarios do Customer
        ├── value-object/
        │   └── address.ts                    # Value Object Address
        └── event/
            ├── customer-created.event.ts     # Evento CustomerCreated
            ├── customer-address-changed.event.ts  # Evento CustomerAddressChanged
            ├── customer-domain-events.spec.ts     # Testes dos eventos
            └── handler/
                ├── envia-console-log1.handler.ts  # Handler 1 do CustomerCreated
                ├── envia-console-log2.handler.ts  # Handler 2 do CustomerCreated
                └── envia-console-log.handler.ts   # Handler do CustomerAddressChanged
```

## Eventos de Dominio

### CustomerCreated
Disparado na criacao de um novo Customer. Executa dois handlers independentes:
- **EnviaConsoleLog1Handler**: imprime `"Esse e o primeiro console.log do evento: CustomerCreated"`
- **EnviaConsoleLog2Handler**: imprime `"Esse e o segundo console.log do evento: CustomerCreated"`

### CustomerAddressChanged
Disparado quando o endereco do Customer e alterado. Transporta `id`, `name` e novo `address`.
- **EnviaConsoleLogHandler**: imprime `"Endereco do cliente: {id}, {nome} alterado para: {endereco}"`

## Como rodar os testes

### Pre-requisitos
- Node.js 18+ instalado

### Instalacao e execucao

```bash
npm install
npm test
```

O comando `npm test` executa todos os testes unitarios com Jest.

## Tecnologias

- TypeScript
- Jest (testes unitarios)
- SWC (transpilador)
# fc-ddd-domain-events
