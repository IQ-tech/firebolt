## Fluxo de Versionamento e Publicação

Baseline atual: 0.10.0

### Eventos

| Evento                   | Workflow                 | Ação                       | Resultado          |
| ------------------------ | ------------------------ | -------------------------- | ------------------ |
| PR aberto/sync para main | canary-main.yml          | prerelease (próximo patch) | v0.10.(N+1)-next.X |
| Merge PR em main         | patch-release-main.yml   | patch                      | v0.10.(N+1)        |
| Merge PR main -> latest  | minor-release-latest.yml | minor                      | v0.(M+1).0         |

### Regras

1. Apenas `main` pode abrir PR para `latest` (validado por `protect-latest.yml`).
2. Canaries usam dist-tag `next` e criam tag git.
3. Cada ciclo de canary reinicia sufixo `-next.0` após release estável.

### Scripts Principais

| Script              | Uso                                     |
| ------------------- | --------------------------------------- |
| yarn publish:canary | gera prerelease + publish dist-tag next |
| yarn publish:patch  | patch estável                           |
| yarn publish:minor  | minor estável                           |

### Edge Cases

| Caso                                         | Ação                                                        |
| -------------------------------------------- | ----------------------------------------------------------- |
| Canary falhou depois do version              | Rodar novamente `yarn publish:from-package --dist-tag next` |
| Tag criada mas publish falhou em patch/minor | Reexecutar `yarn publish:from-package`                      |
| PR fechado sem merge                         | Nada é publicado                                            |
| Rebase reescreveu histórico                  | Próximo canary recalcula e segue contador da nova base      |
| Necessário rollback                          | Publicar patch corretivo (não remover versão no npm)        |

### Convenção de Tags

- Estáveis: `vX.Y.Z`
- Prerelease: `vX.Y.Z-next.N` (sempre apontando para próxima versão patch)

### Diferenças entre Fluxo Novo e Antigo

- Removido uso de `--no-git-tag-version` (continuidade de tags garantida).
- Publicações agora sempre geram tag git correspondente.

### Baseline 0.10.0

Salto proposital de 0.8.x para 0.10.x para marcar início do ciclo estruturado.
