import { useSelector } from 'react-redux'
import { useLocation } from 'react-router-dom'
import { AppState } from '../data/store'

export function useAppState<TSelected = unknown>(
  selector: (state: AppState) => TSelected,
  equalityFn?: (left: TSelected, right: TSelected) => boolean
): TSelected {
  return useSelector<AppState, TSelected>(selector, equalityFn)
}
export const useQuery = (query: string[]): string[] => {

  const params = new URLSearchParams(useLocation().search)
  const res: string[] = []
  query.forEach(q => res.push(params.get(q) ?? ''))
  return res
}
export const useIsLogin: () => boolean = () => useAppState(s => s.main.isLogin)
export const useIsLoading: () => boolean = () => useAppState(s => s.main.isLoading)