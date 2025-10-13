# Change Log

All notable changes to this project will be documented in this file.
See [Conventional Commits](https://conventionalcommits.org) for commit guidelines.

## 0.10.0 (Baseline de Fluxo)

Esta versão estabelece um novo ciclo interno de versionamento e publicação.

### Resumo do Novo Fluxo

- PR aberto/sincronizado para `main`: publica canary `0.10.x-next.N` (dist-tag `next`) sempre apontando para a PRÓXIMA versão patch.
- Merge em `main`: gera release estável patch (`0.10.x`).
- Merge de `main` em `latest`: gera release estável minor (`0.x+1.0`).
- Apenas a branch `main` pode abrir PR para `latest`.

### Motivos do Salto (0.8.x → 0.10.0)

- Reset lógico do fluxo de distribuição após reestruturação interna.
- Eliminar herança de contagem inconsistente de canaries prévias.
- Padronizar baseline para iniciar sequência clara de patches e minors.

### Impactos

- Todas as libs mantêm versão sincronizada (mesmo que sem mudanças internas) para facilitar rastreabilidade.
- Canaries agora criam tags git e não usam mais `--no-git-tag-version`, garantindo continuidade previsível dos sufixos.

### Observações de Uso

- Canaries sempre representam a PRÓXIMA versão patch (ex: estável atual `0.10.3` ⇒ canary gera `0.10.4-next.0`).
- Ao publicar `0.10.4`, o próximo ciclo de canary recomeça em `0.10.5-next.0`.
- Rollbacks não removem publicações: emitir novo patch corretivo.

---

# [0.9.0](https://github.com/IQ-tech/firebolt/compare/v0.8.2...v0.9.0) (2022-10-19)

### Bug Fixes

- **types:** adding prop types ([5d7820e](https://github.com/IQ-tech/firebolt/commit/5d7820e5bfb0688e7593ce1e4a64e5eca3894b20))
- **validators:** :bug: fix CI ([1a6db61](https://github.com/IQ-tech/firebolt/commit/1a6db61093a68728532512f7070b05e6a1b4c342))
- **validators:** :bug: fix do fix kkkk ([99406c3](https://github.com/IQ-tech/firebolt/commit/99406c3b08a2eb56b3f0803127c56c25d839bb62))
- **validators:** :bug: fixed validators label ([dd18c66](https://github.com/IQ-tech/firebolt/commit/dd18c66fec11204c48c9310cb9f17a64d38d1d6a))
- **validators:** :sparkles: added backslash filter to name validator ([c1a32c3](https://github.com/IQ-tech/firebolt/commit/c1a32c3a3842dad985b68403be12a07fdeab9ba5))
- **validators:** 🩹 add accents validator on email ([701adba](https://github.com/IQ-tech/firebolt/commit/701adba3b38754c1bd7eb5b91b11db17b5f578f2))

### Features

- :sparkles: added new generic account number preset ([8cf6bd6](https://github.com/IQ-tech/firebolt/commit/8cf6bd613897f71be4f98497ded5c4958ae9b063))
- :sparkles: adding two news generic account preset ([291dc1d](https://github.com/IQ-tech/firebolt/commit/291dc1de0b25804da325e140c880c02d3e0c9237))
- **blueberry-theme:** :sparkles: added maxLength ([9b2d1bf](https://github.com/IQ-tech/firebolt/commit/9b2d1bfb878e84b84f4533af829a56850ff96644))
- **client:** :sparkles: added data attr to fireboltform ([9727ea9](https://github.com/IQ-tech/firebolt/commit/9727ea96570cb8e3b9c13094b0f6749759d9bd97))
- **client:** :sparkles: added new hook to wizard to run callback before request a new step ([15dfc69](https://github.com/IQ-tech/firebolt/commit/15dfc69f7a2e4ad682bbc6fe74b582d3a6adcd46))
- **client:** ✨ add unexpected error handler on api response ([7b2a119](https://github.com/IQ-tech/firebolt/commit/7b2a119293adaa62ce6d41c15c2ffca54ebd3309))
- **client:** added payload to new hook ([693fb12](https://github.com/IQ-tech/firebolt/commit/693fb123f279aa4dc5a2a77852dfbdaf7057b273))
- **fieds:** order fields by prop array value ([e806cae](https://github.com/IQ-tech/firebolt/commit/e806caef1bd422823777044983df0205a50bd0ed))
- **validators:** :sparkles: adding a parameter to ignore spaces to the nonRepeatedChars validator ([ed31f80](https://github.com/IQ-tech/firebolt/commit/ed31f803fdfa22f21ff4fa2900dff762de84d286))
- **validators:** :sparkles: email suggestion implementation ([5e2d372](https://github.com/IQ-tech/firebolt/commit/5e2d372e6c9b64dc68f735b817849b2cede27d39))
- **validators:** :sparkles: removing repeated spaces from the payload field ([184ba26](https://github.com/IQ-tech/firebolt/commit/184ba26ae973354857d53cfdd44eeadebc439ca2))

## [0.8.2](https://github.com/IQ-tech/firebolt/compare/v0.8.1...v0.8.2) (2022-07-04)

### Bug Fixes

- **client:** :bug: fixed bug with remote errors ([46df6c5](https://github.com/IQ-tech/firebolt/commit/46df6c53925f56b7376d4bde47754aaf323e34a1))
- **client:** :bug: removed console.log ([6673ad1](https://github.com/IQ-tech/firebolt/commit/6673ad1821b0706625bf61f4ab21519cdaef9b71))
- **client:** fixed autofill from api ([c18099b](https://github.com/IQ-tech/firebolt/commit/c18099b5795cd46d69991624c8bbbfdfb0e38273))
- **client:** fixed if decision ([e0c2119](https://github.com/IQ-tech/firebolt/commit/e0c2119cce6ef0cc53b72ef1eba1616fd968bc2c))
- **lab:** :art: add sample form to debug ([9109d99](https://github.com/IQ-tech/firebolt/commit/9109d99f4ba091b925fd6ce35b909deb7919039e))
- some name validators ([d8083e6](https://github.com/IQ-tech/firebolt/commit/d8083e6e652952828e178763d0071a626f76af49))

## [0.8.1](https://github.com/IQ-tech/firebolt/compare/v0.8.0...v0.8.1) (2022-06-23)

### Bug Fixes

- **client:** :bug: fixed autofill fields after validation error ([aadb3fd](https://github.com/IQ-tech/firebolt/commit/aadb3fd33bbb1e0214cfd96894dafebd0d4d59bf))
- **client:** :bug: trigger form validation when autofill and fill fields ([8d08764](https://github.com/IQ-tech/firebolt/commit/8d08764bdebd71efef6d4f059c1da7fa48d3a693))
- **client:** safe map ([cb48120](https://github.com/IQ-tech/firebolt/commit/cb48120410fdfdd4bd3fd9d4f0e084a66325ceff))

# [0.8.0](https://github.com/IQ-tech/firebolt/compare/v0.7.0...v0.8.0) (2022-06-08)

### Bug Fixes

- 🐛 import react at firebolt provider ([d3d873c](https://github.com/IQ-tech/firebolt/commit/d3d873c0c3b18db124979f14148928d6219533d1))
- **client:** :bug: fixed form cleaning error on onblur ([5c5593c](https://github.com/IQ-tech/firebolt/commit/5c5593ca62d76019e4bf55353dd7437c35612948))
- **material-theme:** :bug: added missing react import ([ecceef6](https://github.com/IQ-tech/firebolt/commit/ecceef6ef55142a1bd19ce34d7bc160f5945bcb9))

### Features

- **client:** :sparkles: add nationality preset to br-addon ([f7c4b20](https://github.com/IQ-tech/firebolt/commit/f7c4b201cbb8cd43e34923180a85645b8a4e7e10))
- **client:** :sparkles: allow FireboltForm to apply local props presets ([03522d7](https://github.com/IQ-tech/firebolt/commit/03522d7de16e73637b01999c06428c5a10317901))

# [0.7.0](https://github.com/IQ-tech/firebolt/compare/v0.6.0...v0.7.0) (2022-04-26)

### Bug Fixes

- 🐛 checkboxgroup widget missing columns prop ([4ade990](https://github.com/IQ-tech/firebolt/commit/4ade9900231a6010918d9218c06080e847715b10))
- **client-core:** :bug: fixed step debugger used on firebolt lab ([5c929c4](https://github.com/IQ-tech/firebolt/commit/5c929c4596999c01029d1f54ef515b5df563b780))
- **validators:** :bug: fixed number range validator with big numbers ([7703cf1](https://github.com/IQ-tech/firebolt/commit/7703cf1dbe962089525dcc6349defdc735c91bea))

### Features

- ✨ upload files to aws s3 ([1ac2c81](https://github.com/IQ-tech/firebolt/commit/1ac2c81c61148752ef5970cde0b45235ec5beff3))

# [0.6.0](https://github.com/IQ-tech/firebolt/compare/v0.5.0...v0.6.0) (2022-03-15)

### Bug Fixes

- :fire: removing jest config file from project root ([5304345](https://github.com/IQ-tech/firebolt/commit/5304345b524e0b79e319538bce70e515d79acb40))
- :green_heart: build github ([3220194](https://github.com/IQ-tech/firebolt/commit/32201946f6d221f800f552483a09c5dfd1efdc0f))
- :green_heart: moving interface to client-core to fix build error ([44f802c](https://github.com/IQ-tech/firebolt/commit/44f802c99b8131a42f3aabcb72de860ccb1873e4))
- :green_heart: moving interface to client-core to fix build error ([14b9c56](https://github.com/IQ-tech/firebolt/commit/14b9c561280e7e1579c8f6f82c99ac2afaeb8487))
- :white_check_mark: fit in a FireBoltForm test ([dae8cf1](https://github.com/IQ-tech/firebolt/commit/dae8cf15839c035eddfc70ddc135d040a0865597))
- **all:** :bug: generated new yarnLock ([0b3f286](https://github.com/IQ-tech/firebolt/commit/0b3f28626475763ddc6597922487cefb086c483b))
- **all:** :fire: unused codes removed ([2a1966a](https://github.com/IQ-tech/firebolt/commit/2a1966a69c6acce9520950687eff95c5d45325d4))

### Features

- :chart_with_upwards_trend: coverage script for client package ([bfa8edb](https://github.com/IQ-tech/firebolt/commit/bfa8edbaa427c6920857e8ba1aaed2fe9c999579))
- :construction: adding jest base config the package name based on package json ([d37140a](https://github.com/IQ-tech/firebolt/commit/d37140a17ab4054325ff45d307d5b927619392b8))
- :construction: client-core package types ([2c4a49c](https://github.com/IQ-tech/firebolt/commit/2c4a49c4198002c1e46a586df69e62e30fa5c4d5))
- :construction: jest base config init ([9560c37](https://github.com/IQ-tech/firebolt/commit/9560c37e754b50232fb9d5eb1d3070c80393d4f9))
- :construction: scripts to test all packages at once from project root ([5767e59](https://github.com/IQ-tech/firebolt/commit/5767e599a4333c0768868ae1901c897e8dafbbde))
- :heavy_plus_sign: added jest-transform-stub ([4b57e94](https://github.com/IQ-tech/firebolt/commit/4b57e940bce2b58e0d8bf0bfbc96cd1090a292e0))
- :recycle: added console.log form demo ([f27bb7f](https://github.com/IQ-tech/firebolt/commit/f27bb7f23ae204a41d4661c43f66418e8c90e5f9))
- :recycle: client-core package all converted to TS ([a24e12c](https://github.com/IQ-tech/firebolt/commit/a24e12c7b3c779b54ab2c9f21d0cfc6454e5d85b))
- :recycle: constants converted to ts ([b9d65d8](https://github.com/IQ-tech/firebolt/commit/b9d65d8b9a74f4d2078ed21448d6478c9cfb5c1a))
- :recycle: entities converted to ts ([5144504](https://github.com/IQ-tech/firebolt/commit/51445048c676ee74961744ed5473a42451d925c6))
- :recycle: formatters converted to ts ([9662ff0](https://github.com/IQ-tech/firebolt/commit/9662ff032eac3eb9fcd2c07fa29fa407097558aa))
- :recycle: helpers converted to ts ([3d4591f](https://github.com/IQ-tech/firebolt/commit/3d4591f8a727a6409ecb15dda25dd6e777d7b450))
- :recycle: lib converted to ts ([93ed548](https://github.com/IQ-tech/firebolt/commit/93ed548accf293f9f73a52e0baa86e80e6bad6ec))
- :recycle: lib/**mocks** converted to ts ([2a555ad](https://github.com/IQ-tech/firebolt/commit/2a555ada4c9ddf19244bc441688ca6c860ee779b))
- :recycle: requests converted to ts ([0e2aef6](https://github.com/IQ-tech/firebolt/commit/0e2aef66ce9bdf57d18d1b067131c8413e7cbf6f))
- :recycle: services converted to ts ([a380075](https://github.com/IQ-tech/firebolt/commit/a3800759b17fc5c2c32bab8284508c1f1fd9aeeb))
- commitlint config ([4222204](https://github.com/IQ-tech/firebolt/commit/42222045eb800b472fec3ef03816ec65d9b4c71b))
- console.log debug ([e02214d](https://github.com/IQ-tech/firebolt/commit/e02214d709fd43fa84ea4026181bffdf723d4fda))
- execute commitlint on commit message hook ([7191c9c](https://github.com/IQ-tech/firebolt/commit/7191c9c0c56f5dc6ffdc262294a1e06551a8cd58))

# [0.5.0](https://github.com/IQ-tech/firebolt/compare/v0.4.1...v0.5.0) (2022-03-08)

### Features

- ✨ feat to trigger ci added to firebolt client ([d95daff](https://github.com/IQ-tech/firebolt/commit/d95daffbeafafa7d7f11348a6f07e8c2cb98d849))
- ✨ mock feat to trigger ci added to firebolt client core ([3b09794](https://github.com/IQ-tech/firebolt/commit/3b09794a36aae6b17a4444d86fcf14ea306d106f))

## [0.4.1](https://github.com/IQ-tech/firebolt/compare/v0.4.0...v0.4.1) (2022-03-08)

### Bug Fixes

- 🐛 simple fix ([6302c2e](https://github.com/IQ-tech/firebolt/commit/6302c2e95af3088d21cd4d9633d615d4711209a7))
- 🐛 simple fix ([d58ebaf](https://github.com/IQ-tech/firebolt/commit/d58ebaf79c7d6a0aecb8806a0896f8e0f81ffb87))

# [0.4.0](https://github.com/IQ-tech/firebolt/compare/v0.3.5...v0.4.0) (2022-03-08)

### Features

- ✨ mock feature ([d1659d1](https://github.com/IQ-tech/firebolt/commit/d1659d17999d804f01b76369dbdee46aea4c8b1f))

## [0.3.5](https://github.com/IQ-tech/firebolt/compare/v0.3.3...v0.3.5) (2022-03-08)

### Features

- ✨ added missing value on publish ([d0c755f](https://github.com/IQ-tech/firebolt/commit/d0c755f8c2123a00867f9f413d3ee627bff26cf3))

## 0.3.4 (2022-03-08)

**Note:** Version bump only for package firebolt
