# vanilla-ts-example

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
