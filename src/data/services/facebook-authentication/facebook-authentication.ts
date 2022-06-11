import { LoadFacebookUserApi } from '@/data/contracts/apis/facebook'
import { CreateFacebookAccountRepository, LoadUserAccountRepository } from '@/data/contracts/repos/user-account'
import { AuthenticationError } from '@/domain/errors/authentication-error'
import { FacebookAuthentication } from '@/domain/use-case/facebook-authentication'

export class FacebookAuthenticationService {
  constructor (
    private readonly facebookApi: LoadFacebookUserApi,
    private readonly userAccountRepository: LoadUserAccountRepository & CreateFacebookAccountRepository) { }

  async perform (params: FacebookAuthentication.Params): Promise<AuthenticationError> {
    const fbData = await this.facebookApi.loadUser(params)
    if (fbData !== undefined) {
      await this.userAccountRepository.load({ email: fbData.email })
      await this.userAccountRepository.createFromFacebook(fbData)
    }
    return new AuthenticationError()
  }
}
