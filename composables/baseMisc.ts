export function useToastSuccess(title = 'Success', description = '') {
  const toast = useToast()
  toast.add({
    title: title,
    description: description,
    icon: 'i-heroicons-check-badge-20-solid',
    duration: 3000,
    color: 'primary'
  })
}
export function useToastFailure(title = 'Oops!!', description = 'Something unexpected occurred') {
  const toast = useToast()
  toast.add({
    title: title,
    description: description,
    icon: 'i-heroicons-exclamation-triangle-20-solid',
    duration: 3000,
    color: 'warning'
  })
}