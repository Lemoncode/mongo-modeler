export const handleTabsInsideDialog = (
  e: KeyboardEvent,
  containerRef: React.RefObject<HTMLDivElement>
) => {
  const focusableElements = containerRef.current?.querySelectorAll(
    'a[href], button, textarea, input[type="text"], input[type="radio"], input[type="checkbox"], select, div[role="combobox"]'
  );
  const lastFocusableElement =
    focusableElements?.[focusableElements.length - 1];

  if (
    e.key === 'Tab' &&
    !e.shiftKey &&
    document.activeElement === lastFocusableElement
  ) {
    e.preventDefault();
    containerRef.current?.focus();
  }
};

export const handleEscapeKeyDown = (
  e: KeyboardEvent,
  closeModal: () => void
) => {
  e.key === 'Escape' && closeModal();
};

export const handleFocus = (
  previousFocusedElement: React.MutableRefObject<Element | null>,
  containerRef: React.RefObject<HTMLDivElement>
) => {
  previousFocusedElement.current = document.activeElement;
  containerRef.current?.focus();
  const focusableElements = document.querySelectorAll(
    'a[href], button, textarea, input[type="text"], input[type="radio"], input[type="checkbox"], select, div[role="combobox"]'
  );
  focusableElements.forEach((element: Element) => {
    element.setAttribute('tabindex', '-1');
  });
  const focusableElementsInside = containerRef.current?.querySelectorAll(
    'a[href], button, textarea, input[type="text"], input[type="radio"], input[type="checkbox"], select, div[role="combobox"]'
  );
  focusableElementsInside?.forEach((element: Element) => {
    if (element.ariaHidden !== 'true') {
      element.removeAttribute('tabindex');
    }
  });
};

export const handleNextFocus = (
  previousFocusedElement: React.MutableRefObject<Element | null>
) => {
  const focusableElements = document.querySelectorAll(
    'a[href], button, textarea, input[type="text"], input[type="radio"], input[type="checkbox"], select, div[role="combobox"]'
  );
  focusableElements.forEach((element: Element) => {
    element.removeAttribute('tabindex');
  });
  (previousFocusedElement.current as HTMLElement)?.focus();
};
