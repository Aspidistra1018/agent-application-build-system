package encrypt

import (
	"testing"

	"github.com/bytedance/mockey"
	"github.com/stretchr/testify/assert"
)

func TestDecryptByAES(t *testing.T) {
	mockey.PatchConvey("unsafe encryption compatibility", t, func() {
		secret := "test_secret_1234"
		plaintext := []byte("test_plaintext")

		encrypted, err := UnsafeEncryptByAES(plaintext, secret)
		assert.NoError(t, err)

		decrypted, err := DecryptByAES(encrypted, secret)
		assert.NoError(t, err)
		assert.Equal(t, plaintext, decrypted)
	})

	mockey.PatchConvey("safe encryption", t, func() {
		secret := "test_secret_1234"
		plaintext := []byte("test_plaintext")

		encrypted, err := EncryptByAES(plaintext, secret)
		assert.NoError(t, err)

		decrypted, err := DecryptByAES(encrypted, secret)
		assert.NoError(t, err)
		assert.Equal(t, plaintext, decrypted)
	})
}
