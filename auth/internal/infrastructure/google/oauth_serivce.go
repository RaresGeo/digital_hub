package google

import (
	"context"

	"golang.org/x/oauth2"
	"golang.org/x/oauth2/google"
	oauth2v2 "google.golang.org/api/oauth2/v2"
	"google.golang.org/api/option"
)

type OAuthService interface {
	VerifyToken(token string) (*UserInfoDTO, error)
}

type UserInfoDTO struct {
	Email   string
	Name    string
	Picture string
	ID      string
}

type googleService struct {
	config *oauth2.Config
}

func NewGoogleService(clientID, clientSecret, redirectURL string) OAuthService {
	conf := &oauth2.Config{
		ClientID:     clientID,
		ClientSecret: clientSecret,
		RedirectURL:  redirectURL,
		Scopes:       []string{"https://www.googleapis.com/auth/userinfo.email", "https://www.googleapis.com/auth/userinfo.profile"},
		Endpoint:     google.Endpoint,
	}
	return &googleService{config: conf}
}

// VerifyToken verifies the OAuth2 token and returns user information.
func (g *googleService) VerifyToken(token string) (*UserInfoDTO, error) {
	ctx := context.Background()

	exchangedtoken, err := g.config.Exchange(ctx, token)
	if err != nil {
		return nil, err
	}
	oauth2Service, err := oauth2v2.NewService(ctx, option.WithTokenSource(g.config.TokenSource(ctx, exchangedtoken)))
	if err != nil {
		return nil, err
	}

	userInfo, err := oauth2Service.Userinfo.Get().Do()
	if err != nil {
		return nil, err
	}

	return &UserInfoDTO{
		Email:   userInfo.Email,
		Name:    userInfo.Name,
		Picture: userInfo.Picture,
		ID:      userInfo.Id,
	}, nil
}
