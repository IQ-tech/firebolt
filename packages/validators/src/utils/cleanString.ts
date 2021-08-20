function cleanString(text: string): string {
  const safeStr = !!text && typeof text === 'string' ? text : '';
  const withoutAccents = safeStr
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '');
  return withoutAccents.toLowerCase();
}

export default cleanString;
