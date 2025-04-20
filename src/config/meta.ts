export const META = {
  initial: 'initial', // Процесс не начат
  loading: 'loading', // В процессе загрузки
  error: 'error', // Завершилось с ошибкой
  success: 'success', // Завершилось успешно
} as const;

export type MetaKey = keyof typeof META;
export type MetaValue = (typeof META)[MetaKey];
