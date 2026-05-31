# @langlayer-sdk/core

## 0.4.0

### Minor Changes

- 262f852: - Added getSupportedLanguages() method
  - Rename getLanguage to getCurrentLanguage
  - Expose getSupportedLanguages() method
  - Maintain selected/initial language in sessionStorage
  - Introduce a language selector to allow switching languages

## 0.3.1

### Patch Changes

- 837f898: - Rename 'change' event to 'translationChange'
  - Maintain a list of listeners instead of just one listener per event
  - Add 'off' method for removing listeners
  - Rename 'change' event to 'translationChange'

## 0.3.0

### Minor Changes

- 44ea235: - Remove TranslationTree and instead maintain Translations in the state
  - Add a getter method to get translations by language
  - Update translation message immutably
  - Remove TranslationTree and instead use Translation type instead

## 0.2.2

### Patch Changes

- 2781888: Use provenance for publishing

## 0.2.1

### Patch Changes

- 8c7a39d: Set build target to ES2015

## 0.2.0

### Minor Changes

- 544ea71: Updated organization name from @langlayer/_ to @langlayer-sdk/_

## 0.1.0

### Minor Changes

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
