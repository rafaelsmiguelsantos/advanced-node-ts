import { LoadFacebookUserApi } from '@/data/contracts/apis/facebook'
import { AuthenticationError } from '@/domain/errors/authentication-error'
import { FacebookAuthentication } from '@/domain/features/facebook-authentication'

export class FacebookAuthenticationService {
  constructor (private readonly loadFacebookUserByTokenApi: LoadFacebookUserApi) { }
  async perform (params: FacebookAuthentication.Params): Promise<AuthenticationError> {
    await this.loadFacebookUserByTokenApi.loadUser(params)
    return new AuthenticationError()
  }
}
