export const handleFocus = (
  previousFocusedElement: React.MutableRefObject<Element | null>,
  containerRef: React.RefObject<HTMLUListElement>
) => {
  previousFocusedElement.current = document.activeElement;
  containerRef.current?.focus();

  if (containerRef.current) {
    containerRef.current.tabIndex = -1;
  }

  const focusableElementsInside =
    containerRef.current?.querySelectorAll('li[role="option"]');

  if (focusableElementsInside && focusableElementsInside.length > 0) {
    const firstElement = focusableElementsInside[0];
    if (firstElement instanceof HTMLElement) {
      firstElement.setAttribute('tabindex', '0');
      firstElement.focus();
    }

    focusableElementsInside.forEach((element: Element) => {
      if (element.getAttribute('aria-selected') === 'true') {
        const selectedElement = element;
        if (selectedElement instanceof HTMLElement) {
          selectedElement.setAttribute('tabindex', '0');
          selectedElement.focus();
        }
      }
    });
  }
};

export const handleNextFocus = (
  previousFocusedElement: React.MutableRefObject<Element | null>
) => {
  const focusableElements = document.querySelectorAll(
    'a[href], button, textarea, input[type="text"], input[type="radio"], input[type="checkbox"]'
  );
  focusableElements.forEach((element: Element) => {
    element.removeAttribute('tabindex');
  });
  const currentElement = previousFocusedElement.current as HTMLElement;
  if (currentElement) {
    currentElement.focus();
    currentElement.tabIndex = 0;
  }
};
