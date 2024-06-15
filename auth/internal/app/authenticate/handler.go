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
	User model.User `json:"user" binding:"required"`
}

// @Summary		User authentication
// @Description	This handles both user creation and user authentication using OAuth2, via the google provider,
// @Tags			authenticate
// @Produce		json
// @Success		200	{object}	response
// @Failure		400	{object}	app.BaseErrorResponse
// @Failure		500	{object}	app.BaseErrorResponse
// @Router			/authenticate/{token} [get]
func Handler(service *usecase.UserAuthUseCase) gin.HandlerFunc {
	return func(c *gin.Context) {
		token := c.Param("token")
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
