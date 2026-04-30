import { isMacOS, isWindowsOrLinux } from './platform.helpers';

describe('isMacOS', () => {
  let originalUserAgent: string;

  beforeEach(() => {
    originalUserAgent = navigator.userAgent;
  });

  afterEach(() => {
    Object.defineProperty(navigator, 'userAgent', {
      value: originalUserAgent,
      configurable: true,
    });
  });

  it.each`
    userAgent      | expectedResult
    ${'Windows'}   | ${false}
    ${'Linux'}     | ${false}
    ${'Macintosh'} | ${true}
  `(
    'should return $expectedResult if the platform is $userAgent',
    ({ userAgent, expectedResult }) => {
      Object.defineProperty(navigator, 'userAgent', {
        value: userAgent,
        configurable: true,
      });

      expect(isMacOS()).toBe(expectedResult);
    }
  );
});

describe('isWindowsOrLinux', () => {
  let originalUserAgent: string;

  beforeEach(() => {
    originalUserAgent = navigator.userAgent;
  });

  afterEach(() => {
    Object.defineProperty(navigator, 'userAgent', {
      value: originalUserAgent,
      configurable: true,
    });
  });

  it.each`
    userAgent      | expectedResult
    ${'Windows'}   | ${true}
    ${'Linux'}     | ${true}
    ${'Macintosh'} | ${false}
  `(
    'should return $expectedResult if the platform is $userAgent',
    ({ userAgent, expectedResult }) => {
      Object.defineProperty(navigator, 'userAgent', {
        value: userAgent,
        configurable: true,
      });

      expect(isWindowsOrLinux()).toBe(expectedResult);
    }
  );
});
