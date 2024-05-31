package repository

import "auth/internal/domain/model"

type UserRepository interface {
	// FindByEmail retrieves a user by their email address. Returns nil if the user is not found.
	FindByEmail(email model.EmailAddress) (*model.User, error)

	// Save persists the user data. It should handle both new records and updates to existing records.
	Save(user *model.User) error
}
