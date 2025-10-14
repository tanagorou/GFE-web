class UserAuthentication < ApplicationRecord
  include TokenGenerateService
  belongs_to :user

  def encode_access_token(payload = {})
    UserAuth::AccessToken.new(user_id: user_id, payload: payload)
  end

  def encode_refresh_token
    UserAuth::RefreshToken.new(user_id: user_id)
  end
end
