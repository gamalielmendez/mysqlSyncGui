import { writable } from 'svelte/store'

export const Host = writable('localhost')
export const User = writable('root')
export const Pass = writable('')
export const Port = writable(3306)
export const Db = writable("")
