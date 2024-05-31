package authenticate

import (
	"auth/internal/app"
	"auth/internal/domain/model"
	"auth/internal/usecase"
	"errors"
	"net/http"

	"github.com/gin-gonic/gin"
)

type response struct {
	app.BaseResponse
	User model.User `json:"user"`
}

// AuthHandler returns a handler for OAuth2 authentication.
func Handler(service *usecase.UserAuthUseCase) gin.HandlerFunc {
	return func(c *gin.Context) {
		token := c.Query("token")
		if token == "" {
			app.RespondError(c, http.StatusBadRequest, errors.New("missing token"))
			return
		}

		user, err := service.AuthenticateUser(token)
		if err != nil {
			app.RespondError(c, http.StatusInternalServerError, err)
			return
		}

		c.JSON(http.StatusOK, &response{
			BaseResponse: app.BaseResponse{OK: true},
			User:         *user,
		})
	}
}
