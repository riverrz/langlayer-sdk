# react-intl-ts-example

## 0.1.0

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
  - @langlayer-sdk/react@0.2.0
