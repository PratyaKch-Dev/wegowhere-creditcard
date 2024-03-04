//CONFIG: This are examples errors, change it
export const API_ERRORS = [{ errorMessage: 'Missing authentication', translation: 'missing_auth' }]
export const getApiError = (errorMessage: string) => {
  const api_error = API_ERRORS.find((el) => el.errorMessage === errorMessage)
  return api_error
}
