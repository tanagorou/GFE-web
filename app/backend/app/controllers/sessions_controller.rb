class SessionsController < ApplicationController
  include UserSessionizeService
  # OmniAuthではXHRリクエストはやめたほうがいいので追記
  skip_before_action :xhr_request?, only: [:create]

  # skip_before_action :authenticate_user, only: [:create]
  
  def create
    user_info = request.env['omniauth.auth']
    auth = user_info['info']
    
    google_user_id = user_info['uid']
    provider = user_info['provider']

    google_user_email = auth['email']
    google_user_name = auth['name']
    password = SecureRandom.urlsafe_base64(32)
    @user = UserAuthentication.find_by(uid: google_user_id, provider: provider)

    if @user
      Rails.logger.info('アプリユーザー登録されています。')
      set_refresh_token_to_cookie
      token = access_token
      # 1. クエリーにアクセストークンlを渡して送信。
      # 2. フロント側でアクセストークンを読み込み、その後/auth_tokenにリクエスト
      # 3. リフレッシュトークンとアクセストークンを発行して送信。
      redirect_to 'http://localhost:8000/?email=#{token}', allow_other_host: true
    else
      Rails.logger.info('アプリユーザーは登録されていなかったので、作成します。')
      user = User.create(name: google_user_name,
                         email: google_user_email,
                         password_digest: password,
                         activated: 1,
                         admin: 0,
                         )
      UserAuthentication.create(
                         user_id: user.id,
                         uid: google_user_id,
                         provider: provider
                         )
      set_refresh_token_to_cookie
      token = access_token
      redirect_to 'http://localhost:8000/?email=#{token}', allow_other_host: true
    end
  end

  private
  def set_refresh_token_to_cookie
    cookies[session_key] = {
      value: refresh_token,
      expires: refresh_token_expiration,
      secure: Rails.env.production?,
      http_only: true
    }
  end

  def encode_refresh_token
    @_encode_refresh_token ||= @user.encode_refresh_token
  end
  
  def refresh_token_expiration
    Time.at(encode_refresh_token.payload[:exp])
  end

  def refresh_token
    encode_refresh_token.token
  end

  def encode_access_token
    @_encode_access_token ||= @user.encode_access_token
  end

  def access_token
    encode_access_token.token
  end

end

