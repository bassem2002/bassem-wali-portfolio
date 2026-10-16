export interface FilterRow {
  id: string;
  categories: readonly string[];
  technologies: readonly string[];
  text: string;
}
export interface ProjectFilter { category: string; technology: string; q: string }
export const normalizeSearch = (text: string) => text.normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLowerCase().trim();
export function readFilters(params: URLSearchParams, rows: readonly FilterRow[]): ProjectFilter {
  const category = params.get('category') ?? '';
  const technology = params.get('technology') ?? '';
  return {
    category: rows.some(row => row.categories.includes(category)) ? category : '',
    technology: rows.some(row => row.technologies.includes(technology)) ? technology : '',
    q: (params.get('q') ?? '').trim().slice(0, 160),
  };
}
export function matchesProject(row: FilterRow, filter: ProjectFilter) {
  return (!filter.category || row.categories.includes(filter.category))
    && (!filter.technology || row.technologies.includes(filter.technology))
    && normalizeSearch(filter.q).split(/\s+/).every(term => normalizeSearch(row.text).includes(term));
}
export function writeFilters(filter: ProjectFilter) {
  const params = new URLSearchParams();
  if (filter.category) params.set('category', filter.category);
  if (filter.technology) params.set('technology', filter.technology);
  if (filter.q) params.set('q', filter.q);
  return params.toString();
}
