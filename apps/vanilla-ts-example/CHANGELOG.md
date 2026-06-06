# vanilla-ts-example

## 1.3.0

### Minor Changes

- ecdb124: - Allow passing abortController to getSupportLanguages method for cleanup.
  - Add direction in SupportLanguage type
  - Export SupportedLanguage, LangLayerEvent, LangLayerEventListeners types
  - Re-export SupportedLanguage type from core
  - Set textContent in applyBindings only if translated value
  - Move language switcher into app div
  - Add "Change language:" label with llKey
  - Refactor how language is persisted
  - Correctly set documentation lang and direction
  - Create useMessage hook and export it
  - Remove boilerplate, add createLangLayer method to initialize SDK
  - Add logic for initializing SDK and expose listenToEvent and getSnapshotOfEvent methods
  - Added Vite + React + TypeScript example project with react-intl
  - Demonstrate SDK usage in real application
  - Show initialization, language switch flow, usage with react-intl
  - Serves as reference implementation for integration with react

### Patch Changes

- Updated dependencies [ecdb124]
  - @langlayer-sdk/vanilla@0.6.0

## 1.2.0

### Minor Changes

- 262f852: - Added getSupportedLanguages() method
  - Rename getLanguage to getCurrentLanguage
  - Expose getSupportedLanguages() method
  - Maintain selected/initial language in sessionStorage
  - Introduce a language selector to allow switching languages

### Patch Changes

- Updated dependencies [262f852]
  - @langlayer-sdk/vanilla@0.5.0

## 1.1.5

### Patch Changes

- Updated dependencies [837f898]
  - @langlayer-sdk/vanilla@0.4.1

## 1.1.4

### Patch Changes

- Updated dependencies [44ea235]
  - @langlayer-sdk/vanilla@0.4.0

## 1.1.3

### Patch Changes

- 2781888: Use provenance for publishing
- Updated dependencies [2781888]
  - @langlayer-sdk/vanilla@0.3.2

## 1.1.2

### Patch Changes

- Updated dependencies [8c7a39d]
  - @langlayer-sdk/vanilla@0.3.1

## 1.1.1

### Patch Changes

- Updated dependencies [e9fd2b7]
  - @langlayer-sdk/vanilla@0.3.0

## 1.1.0

### Minor Changes

- 544ea71: Updated organization name from @langlayer/_ to @langlayer-sdk/_

### Patch Changes

- Updated dependencies [544ea71]
  - @langlayer-sdk/vanilla@0.2.0

## 1.0.0

### Major Changes

- 4b6cbac: Changes:

  @langlayer-sdk/core
  - Added LangLayer initialization flow with init method
  - Implemented manifest and language JSON fetching logic
  - Added setLanguage for runtime language switching
  - Introduced t() method for translation resolution with placeholder interpolation
  - Integrated DevTools initialization for live key updates in development mode

  @langlayer-sdk/vanilla
  - Added wrapper over @langlayer-sdk/core for browser usage
  - Exposed simplified init and setLanguage APIs
  - Added conditional DevTools dynamic loader (enableDevtools flag)
  - Implemented applyBindings() to bind DOM elements using data-llKey
  - Auto-updates DOM content using core t() method

  @langlayer-sdk/vanilla-ts-example
  - Added Vite + TypeScript example project
  - Demonstrates usage of @langlayer-sdk/vanilla SDK
  - Shows initialization, bindings, and language switching
  - Serves as reference implementation for integration

### Patch Changes

- Updated dependencies [4b6cbac]
  - @langlayer-sdk/vanilla@0.1.0
