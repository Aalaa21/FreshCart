'use client'

import React from 'react'

export default function Error({error}:{error:Error}) {
  return (
    <div className="flex h-screen items-center justify-center text-red-600">
      <p>{error.message}</p>
    </div>
  )
}

