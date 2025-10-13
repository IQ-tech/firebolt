## Checklist Operacional de Release

### Inicial (Baseline já criada)

1. Garantir `main` sem alterações não commitadas.
2. Validar secrets: `NPM_TOKEN`, `GITHUB_TOKEN` presentes.

### Canary (PR para main)

1. Abrir PR.
2. Ver comentário do bot com versão `vX.Y.Z-next.N`.
3. Validar diff link.

### Patch (merge em main)

1. Fazer merge.
2. Conferir comentário com `vX.Y.(Z+1)`.
3. Instalar internamente se necessário.

### Minor (merge main -> latest)

1. Abrir PR de `main` para `latest`.
2. Checar proteção (apenas main permitido).
3. Merge gera `vX.(Y+1).0`.

### Falhas comuns

| Sintoma                      | Ação                                                     |
| ---------------------------- | -------------------------------------------------------- |
| Tag criada sem pacote no npm | Rodar `yarn publish:from-package` manualmente            |
| Canary não incrementou       | Confirmar que versão baseline estava estável (sem -next) |
| Patch não subiu              | Ver logs do step "Patch version & publish"               |

### Rollback

1. Criar fix branch.
2. Aplicar correção.
3. Abrir PR → patch normal (não remover versão anterior).

### Observações

- Não force push em tags publicadas.
- Evitar rebase após canaries se não necessário.
