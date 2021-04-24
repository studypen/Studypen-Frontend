import { } from 'react'
import { useSelector } from 'react-redux'
import { AppState } from '../data/store'

export function useAppState<TSelected = unknown>(
  selector: (state: AppState) => TSelected,
  equalityFn?: (left: TSelected, right: TSelected) => boolean
): TSelected {
  return useSelector<AppState, TSelected>(selector, equalityFn)
}
export const useForm = (): void => {
  // something will do

}