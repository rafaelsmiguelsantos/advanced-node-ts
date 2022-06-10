import { AccessToken } from '@/domain/models/access-token'
import { AuthenticationError } from '@/domain/errors/authentication-error'

export interface FacebookAuthentication {
  perform: (token: FacebookAuthentication.Params) => AccessToken | AuthenticationError
}

namespace FacebookAuthentication {
  export type Params = {
    token: string
  }
}

export type Result = AccessToken | AuthenticationError
