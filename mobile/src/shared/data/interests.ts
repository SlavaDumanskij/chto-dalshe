export const interests = [
  { id: 'movies', label: 'кино,\nсериалы' },
  { id: 'video-games', label: 'видеоигры' },
  { id: 'board-games', label: 'настольные\nигры' },
  { id: 'sport', label: 'спорт' },
  { id: 'walks', label: 'прогулки' },
  { id: 'music', label: 'музыка' },
  { id: 'creativity', label: 'творчество' },
  { id: 'cooking', label: 'кулинария' },
  { id: 'reading', label: 'чтение' },
  { id: 'culture', label: 'культура и\nмероприятия' },
  { id: 'social', label: 'общение' },
  { id: 'crafts', label: 'рукоделие' },
  { id: 'museums', label: 'музеи\nи выставки' },
  { id: 'drawing', label: 'рисование' },
  { id: 'architecture', label: 'архитектура' },
] as const;

export type Interest = (typeof interests)[number];
