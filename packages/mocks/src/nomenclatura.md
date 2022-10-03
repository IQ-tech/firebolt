lib composta por
factories - funções que criam partes da configuração ou estados da experiencia
presets - experiencias completas com alguns casos de performance de experiencia pre-definidos
data - dados pré definidos + libs como faker

preset - experiencia de firebolt composta por
1 json de configuração
varios casos de estado (session states)
varios payloads de dados por passo (corretos e incorretos)

um preset deve permitir sua modificacão?

sampleMock().experienceConfig

todo
// passo 1 - criar classes que mapeiam um json de configuração de experiencia (entities)
// passo 2 - criar o mock sample usando as classes (shapers)

??????

```js
// Passar os parametros na construção da classe para os shapers trabalharem em cima?
const mock = new ExperienceMock({ steps: 3, flows: 2 })
const firstStep = mock.getStep(1)
firstStep.changeFields([
  {
    slug: "name",
    validation: [
      { "rule": "core:wordsCount", "properties": { "minWords": 1 } },
    ],
  },
])
```
