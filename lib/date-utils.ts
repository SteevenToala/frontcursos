// Utility functions for consistent date formatting across SSR and client
export function formatDate(date: Date): string {
  // Use consistent formatting to avoid hydration mismatches
  return date.toLocaleDateString('es-ES', {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit'
  })
}

export function formatDateTime(date: Date): string {
  return date.toLocaleDateString('es-ES', {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit'
  })
}

export function formatDateRange(startDate: Date, endDate: Date): string {
  const start = formatDate(startDate)
  const end = formatDate(endDate)
  return `${start} - ${end}`
}
