package service

import (
	"auth/internal/domain/model"
	"auth/internal/domain/repository"
	"auth/internal/infrastructure/google"
)

type UserAuthenticator struct {
	userRepo repository.UserRepository
}

// NewUserAuthenticator creates a new instance of UserAuthenticator.
func NewUserAuthenticator(repo repository.UserRepository) *UserAuthenticator {
	return &UserAuthenticator{
		userRepo: repo,
	}
}

// Authenticate processes the user authentication and updates or creates a user in the repository.
func (ua *UserAuthenticator) Authenticate(userInfo google.UserInfoDTO) (*model.User, error) {
	emailAddress, err := model.NewEmailAddress(userInfo.Email)
	if err != nil {
		return nil, err
	}
	user, err := ua.userRepo.FindByEmail(emailAddress)
	if err != nil {
		return nil, err
	}

	if user == nil {
		user, err = model.NewUser(model.UserId(userInfo.ID), emailAddress, userInfo.Name, userInfo.Picture)
		if err != nil {
			return nil, err
		}
		err = ua.userRepo.Save(user)
		if err != nil {
			return nil, err
		}
	}

	return user, nil
}
