- Experience - todo o processo de multi-step (antigo "form")
- Step - passo de uma experience
- Flow - caminho da experiência que o lead está seguindo (antigo "track")
- Session - documento salvo no storage que contem todos os dados preenchidos pelo lead de acordo com o step, ultimo step visualizado, flow atual e etc
- Consumer - ambiente que está utilizando o StepperEngine (pode ser o front, back e etc)
- experienceMetadata - infos extras sobre a experiência que o usuário está tendo
  atualmente (antigo formMetadata)
- additionalData - dados extras que podem ser enviados durante a transição de passos (token de Recaptcha, fbp, fbc, ids e etc) (antigo requestMetadata/metadata)
- storage - local onde uma session de firebolt deve ser guardada, como a engine não se baseia em nenhum ambiente em especifico, o storage pode ser um banco de dados, localStorage, sessionStorage e etc

- experienceId - parametro utilizado para buscar um json em alguma fonte remota
- a numeração dos passos não é zero indexada

* currentStep - passo que esta sendo tratado no handler (start, proceed, goback e debug)

* lastStepCompleted - state guardado no storage do ultimo passo salvo
* nextStep - passo a ser devolvido apos modificação do storage

// ideia de nomenclatura de transição

- receivingStep - passo que o proceed está recebendo para salvar na storage
- lastCompletedStep - ultimo passo completado e salvo pelo lead
- returningStep - passo seguinte a ser completado pelo lead apos o envio do receinvingStep
