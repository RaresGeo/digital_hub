package usecase

import (
	"auth/internal/domain/model"
	"auth/internal/domain/service"
	"auth/internal/infrastructure/google"
)

type UserAuthUseCase struct {
	userAuthenticator service.UserAuthenticator
	googleService     google.OAuthService
}

func NewUserAuthUseCase(userAuthenticator service.UserAuthenticator, googleService google.OAuthService) *UserAuthUseCase {
	return &UserAuthUseCase{
		userAuthenticator: userAuthenticator,
		googleService:     googleService,
	}
}

func (uc *UserAuthUseCase) AuthenticateUser(token string) (*model.User, error) {
	userInfo, err := uc.googleService.VerifyToken(token)
	if err != nil {
		return nil, err
	}

	return uc.userAuthenticator.Authenticate(*userInfo)
}
