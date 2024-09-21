import { ToastOptions } from 'react-hot-toast'

export type CustomToastType =
    | 'success'
    | 'error'
    | 'loading'
    | 'fire'
    | 'rocket'
    | 'thumbsDown'
    | 'thumbsUp'
    | 'sad'
    | 'happy'
    | 'angry'
    | 'star'
    | 'warning'
    | 'party'
    | 'confused'

export interface CustomToastOptions extends ToastOptions {
    icon?: CustomToastType
}
