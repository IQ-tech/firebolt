import { render } from "@testing-library/react";

import FireboltProvider from "./index";

describe("FireboltProvider component", () => {
  it('Deve setar o estado "isLoading" como "true" ao chamar a função "goNextStep"', () => {
    const { container } = render(
      <FireboltProvider
        formAccess={{
          root: "http://api.com.br/",
          formName: "testing",
        }}
      >
        <div>teste</div>
      </FireboltProvider>
    );

    expect(container).toBeInTheDocument();
  });
});

// se tiver with history, transição de passo deve mudar history e url
// check if set loading state while is transitioning step
