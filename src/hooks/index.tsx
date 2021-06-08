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

export const useClassId: (id: string) => Classes | undefined = (id: string) => {
  const classes = useAppState(s => s.classState.classes ?? [])
  const [cls] = classes.filter(c => c.id === id)
  return cls
}
export const useUser = () => useAppState(s => s.auth.user)
export const useIsClassOwner: (cls: Classes | undefined) => boolean = (cls) => {
  const user = useUser()
  if(user && cls){
    return user.username === cls.teacher.username
  } else return false
}
