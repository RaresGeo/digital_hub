package postgres

import (
	"context"

	"auth/internal/domain/model"
	"auth/internal/domain/repository"

	"github.com/jackc/pgx"
	"github.com/jackc/pgx/v5/pgxpool"
)

// userRepository is an implementation of UserRepository using PostgreSQL.
type userRepository struct {
	db *pgxpool.Pool
}

// NewUserRepository creates a new instance of userRepository.
func NewUserRepository(db *pgxpool.Pool) repository.UserRepository {
	return &userRepository{db: db}
}

// FindByEmail finds a user by email address.
func (r *userRepository) FindByEmail(email model.EmailAddress) (*model.User, error) {
	user := &model.User{}
	err := r.db.QueryRow(context.Background(), "SELECT id, email, name, profile_picture_url FROM users WHERE email = $1", email).Scan(&user.ID, &user.Email, &user.Name, &user.ProfilePictureUrl)
	if err != nil {
		if err == pgx.ErrNoRows {
			return nil, nil // No user found is not an error
		}
		return nil, err
	}
	return user, nil
}

// Save inserts or updates a user in the database.
func (r *userRepository) Save(user *model.User) error {
	_, err := r.db.Exec(context.Background(), "INSERT INTO users (id, email, name, profile_picture_url) VALUES ($1, $2, $3, $4) ON CONFLICT (email) DO UPDATE SET name = EXCLUDED.name, profile_picture_url = EXCLUDED.profile_picture_url", user.ID, user.Email, user.Name, user.ProfilePictureUrl)
	return err
}
