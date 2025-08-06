import React from 'react'
import type { ApiError } from '../../../utils/handleErrorMessage';

const ErrorView = ({error}: {error: ApiError}) => {
  console.warn('error', error.status);
  return (
    <div className="flex h-full items-center justify-center">
      <div className="text-2xl font-bold text-error">Ha ocurrido un error: {error.userMessage}</div>
    </div>
  )
}

export default ErrorView