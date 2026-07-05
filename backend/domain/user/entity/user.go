package entity

type User struct {
	UserID int64

	Name         string // nickname
	UniqueName   string // unique name
	Email        string // email
	Description  string // user description
	IconURI      string // avatar URI
	IconURL      string // avatar URL
	UserVerified bool   // Is the user authenticated?
	Locale       string
	SessionKey   string // session key

	CreatedAt int64 // creation time
	UpdatedAt int64 // update time
}

type UserBenefit struct {
	UserID        int64
	UserLevel     UserLevel
	UsedCount     int32
	TotalCount    int32
	IsUnlimited   bool
	ResetDatetime int64
	CallQPS       int32
}

type SaasUserData struct {
	UserID    string `json:"user_id"`
	UserName  string `json:"user_name"`
	NickName  string `json:"nick_name"`
	AvatarURL string `json:"avatar_url"`
}
