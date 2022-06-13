import { LoadFacebookUserApi } from '@/data/contracts/apis/facebook'
import { LoadUserAccountRepository, SaveFacebookAccountRepository } from '@/data/contracts/repos/user-account'
import { AuthenticationError } from '@/domain/errors/authentication-error'
import { FacebookAccount } from '@/domain/models/facebook-account'
import { FacebookAuthentication } from '@/domain/use-case/facebook-authentication'

export class FacebookAuthenticationService {
  constructor (
    private readonly facebookApi: LoadFacebookUserApi,
    private readonly userAccountRepository: LoadUserAccountRepository & SaveFacebookAccountRepository) { }

  async perform (params: FacebookAuthentication.Params): Promise<AuthenticationError> {
    const fbData = await this.facebookApi.loadUser(params)
    if (fbData !== undefined) {
      const accountData = await this.userAccountRepository.load({ email: fbData.email })
      const fbAccount = new FacebookAccount(fbData, accountData)
      await this.userAccountRepository.saveWithFacebook(fbAccount)
    }
    return new AuthenticationError()
  }
}
