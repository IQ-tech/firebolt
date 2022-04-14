// quando o resolver de sessão não encontrar os dados da sessão em um handleNextStep

/**
 * Errors
 *  payload vir sem sessionId em um step que não seja o primeiro
 *
 */

/**
 * o consumer deve passar ou somente o experienceJSONSchema ou passar o experienceId em conjunto com o resolver de json
 * Se não passar resolvers jogar erro
 * json não tem default flow
 *  passo não encontrado no json (slug no flow não corresponde a nenhum passo definido no json)
 */

/**
 * Warnings:
 */

/**
 * quando for passado o argumento formJSONSchema e também um resolver de getJSONSchema
 * jogar um alerta falando que o formJSONSchema vai tomar precedência para a resolução dos
 * passos seguintes.
 */

/**
 * Resolvers
 *  - algum dos resolvers não implementado
 *  - JSONSchema not found, ou não passado no construtor ou sem resolver
 *  - Caso de erro gerado dentro do resolver ou retorno diferente do esperado
 *
 * JSON
 *  - não possuir o flow 'default'
 *  - flow não encontrado no schema (changeFlow - decision callback)
 *  - stepSlug na lista do flow não existe na lista de steps
 *
 * Custom error
 *  - erro criado pelo decision callback
 *      // pode ser fields error
 *      // decisão que não tratamos (caso não use ts?)
 *
 *
 */

{
}
