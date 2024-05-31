package healthcheck

import (
	"auth/internal/app"
	"net/http"

	"github.com/gin-gonic/gin"
)

type response struct {
	app.BaseResponse
	ServiceName string `json:"serviceName"`
}

func Handler() gin.HandlerFunc {
	var staticResponse response
	staticResponse.OK = true
	staticResponse.ServiceName = "AuthService"

	return func(c *gin.Context) {
		c.JSON(http.StatusOK, &staticResponse)
	}
}
