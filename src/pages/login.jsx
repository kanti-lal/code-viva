import Meta from '@/components/generic/Meta'
import { NEXT_PUBLIC_BASE_URL } from '@/utils/config'
import React from 'react'

const login = () => {
  return (
    <div>
        <Meta 
        title="User Login"
        keyword="login, user login, authentication, codeviva"
        description="Login to your account to access the platform."
        canonicalUrl={NEXT_PUBLIC_BASE_URL}
      />
    </div>
  )
}

export default login