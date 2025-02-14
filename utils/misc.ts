const toast = useToast()

export function toastSuccessful(title = 'Success', desc = '', icon = 'i-heroicons-check-badge', duration = 3000) {
  toast.add({
    title: title,
    description: desc,
    duration: duration,
    color: 'success'
  })
}

export function toastError(title = 'Oops!!!', desc = '', icon = 'i-heroicons-x-mark', duration = 3000) {
  toast.add({
    title: title,
    description: desc,
    duration: duration,
    color: 'error'
  })
}
