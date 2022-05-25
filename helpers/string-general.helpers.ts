export const camelCaseToPresentational = (val: string): string => {
  const candidate = val || '';

  return candidate
    .split(/(?=[A-Z])/)
    .map((x) => {
      const [first, ...rest] = x.split('');
      return `${first.toUpperCase()}${rest.join('')}`;
    })
    .join(' ');
};
