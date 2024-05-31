package model

import (
	"errors"
	"net/mail"
)

type UserId string

type EmailAddress string

func NewEmailAddress(email string) (EmailAddress, error) {
	if _, err := mail.ParseAddress(email); err != nil {
		return "", errors.New("invalid email address")
	}
	return EmailAddress(email), nil
}

type User struct {
	ID                UserId
	Email             EmailAddress
	Name              string
	ProfilePictureUrl string
}

// NewUser creates a new user entity.
func NewUser(id UserId, email EmailAddress, name, profilePictureUrl string) (*User, error) {
	if email == "" {
		return nil, errors.New("email is required")
	}
	if name == "" {
		return nil, errors.New("name is required")
	}
	return &User{
		ID:                id,
		Email:             email,
		Name:              name,
		ProfilePictureUrl: profilePictureUrl,
	}, nil
}
