import { StepForm } from "@iq-firebolt/client/src"

import Theme from "../../../../../../aurora-theme/index"
import {
  Button,
  Container,
  ProgressBar,
  Text,
} from "@consumidor-positivo/aurora"
import "./styles.css"

const DefaultTemplate = ({ fireboltStep }) => {
  return (
    <Container>
      <div className="default-template-container">
        <ProgressBar
          currentStep={Number(fireboltStep.position)}
          totalSteps={Number(fireboltStep.formflowMetadata.steps.length)}
          stepName={String(fireboltStep?.stepName)}
        />
        <br />
        <Text variant="heading-medium" weight="semibold">
          {fireboltStep?.friendlyName}
        </Text>
        <br />
        <StepForm
          theme={Theme}
          onSubmit={(payload) => fireboltStep.goNextStep(payload)}
          onGoBack={fireboltStep.goPreviousStep}
          customActionsChild={({ formData }) => (
            <div className="default-template-actions">
              <Button
                expand="x"
                type="outlined"
                onClick={fireboltStep.goPreviousStep}
              >
                Voltar
              </Button>
              <Button
                expand="x"
                onClick={formData?.handleSubmit}
                disabled={!formData?.isFormValid}
              >
                Continuar
              </Button>
            </div>
          )}
        ></StepForm>
      </div>
    </Container>
  )
}

export default DefaultTemplate
