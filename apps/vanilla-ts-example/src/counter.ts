import ll from "./library/langlayer.ts";

export function setupCounter(element: HTMLButtonElement) {
  let counter = 0
  const setCounter = (count: number) => {
    counter = count
    element.innerHTML = ll.t('homepage.dynamic_count', { count: counter })
  }
  element.addEventListener('click', () => setCounter(counter + 1))
  setCounter(0)
}
