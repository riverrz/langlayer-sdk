# @langlayer/core

## 0.1.0

### Minor Changes

- 4b6cbac: Changes:

  @langlayer/core
  - Added LangLayer initialization flow with init method
  - Implemented manifest and language JSON fetching logic
  - Added setLanguage for runtime language switching
  - Introduced t() method for translation resolution with placeholder interpolation
  - Integrated DevTools initialization for live key updates in development mode

  @langlayer/vanilla
  - Added wrapper over @langlayer/core for browser usage
  - Exposed simplified init and setLanguage APIs
  - Added conditional DevTools dynamic loader (enableDevtools flag)
  - Implemented applyBindings() to bind DOM elements using data-llKey
  - Auto-updates DOM content using core t() method

  @langlayer/vanilla-ts-example
  - Added Vite + TypeScript example project
  - Demonstrates usage of @langlayer/vanilla SDK
  - Shows initialization, bindings, and language switching
  - Serves as reference implementation for integration
