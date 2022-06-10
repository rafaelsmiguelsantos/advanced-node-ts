import { LoadFacebookUserApi } from '@/data/contracts/apis/facebook'
import { LoadUserAccountRepository } from '@/data/contracts/repos/user-account'
import { FacebookAuthenticationService } from '@/data/services/facebook-authentication/facebook-authentication'
import { AuthenticationError } from '@/domain/errors/authentication-error'
import { mock, MockProxy } from 'jest-mock-extended'

describe('FacebookAuthenticationService', () => {
  let loadFacebookUserApi: MockProxy<LoadFacebookUserApi>
  let loadUserAccountRepository: MockProxy<LoadUserAccountRepository>
  let sut: FacebookAuthenticationService
  const token = 'any_token'

  beforeEach(() => {
    loadFacebookUserApi = mock()
    loadFacebookUserApi.loadUser.mockResolvedValue({
      name: 'any_name',
      email: 'any_email',
      facebookId: 'facebook_id'
    })
    loadUserAccountRepository = mock()
    sut = new FacebookAuthenticationService(loadFacebookUserApi, loadUserAccountRepository)
  })
  it('should call LoadFacebookUserApi with correct params', async () => {
    await sut.perform({ token })

    expect(loadFacebookUserApi.loadUser).toHaveBeenCalledWith({ token })
    expect(loadFacebookUserApi.loadUser).toHaveBeenCalledTimes(1)
  })

  it('should return AuthenticationError when LoadFacebookUserApi returns undefined', async () => {
    loadFacebookUserApi.loadUser.mockResolvedValueOnce(undefined)

    const authResult = await sut.perform({ token })

    expect(authResult).toEqual(new AuthenticationError())
  })

  it('should return LoadUserAccountRepository when LoadFacebookUserApi returns data', async () => {
    await sut.perform({ token })

    expect(loadUserAccountRepository.load).toHaveBeenCalledWith({ email: 'any_email' })
    expect(loadUserAccountRepository.load).toHaveBeenCalledTimes(1)
  })
})
