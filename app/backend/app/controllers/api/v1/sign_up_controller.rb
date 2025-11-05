class Api::V1::SignUpController < ApplicationController
  include UserSessionizeService

  def create
    @user = store_user
    if @user.save
      set_refresh_token_to_cookie
      render json: signup_response
    else
      # delete_signup_user(@user.id)
      render json: { errors: @user.errors.full_messages }, status: :unprocessable_entity
    end
  end

  private

  def sign_up_params
    params.require(:user).permit(:name, :email, :password)
  end

  # ユーザ情報を保存する
  def store_user
    User.new(sign_up_params.merge(activated: true))
  end

  # ユーザーを返す
  def signup_user
    @_signup_user = User.find_by_activated(sign_up_params[:email])
  end

  # Cookieにrefresh_tokenをセットする
  def set_refresh_token_to_cookie
    cookies[session_key] = {
      value: refresh_token,
      expires: refresh_token_expiration,
      secure: Rails.env.production?,
      http_only: true
    }
  end

  # サインアップ時のデフォルトレスポンス
  def signup_response
    {
      token: access_token,
      expires: access_token_expiration,
      user: @user.response_json(sub: access_token_subject)
    }
  end

  # signup時にエラーが起きた際にそのユーザー情報を削除する
  def delete_signup_user(id)
    User.find(:id).destroy
  end

  # リフレッシュトークンのインスタンスを作成
  def encode_refresh_token
    @_encode_refresh_token ||= @user.encode_refresh_token
  end

  # リフレッシュトークン
  def refresh_token
    encode_refresh_token.token
  end

  # リフレッシュトークンの有効期限
  def refresh_token_expiration
    Time.at(encode_refresh_token.payload[:exp])
  end

  # アクセストークンのインスタンス生成
  def encode_access_token
    @_encode_access_token ||= @user.encode_access_token
  end

  # アクセストークン
  def access_token
    encode_access_token.token
  end

  # アクセストークンの有効期限
  def access_token_expiration
    encode_access_token.payload[:exp]
  end

  # アクセストークンのsubjectクレーム
  def access_token_subject
    encode_access_token.payload[:sub]
  end

  # # 404ヘッダーのみの返却を行う
  # # Doc: https://gist.github.com/mlanett/a31c340b132ddefa9cca
  # def not_found
  #   head(:not_found)
  # end

  # # decode jti != user.refresh_jti のエラー処理
  # def invalid_jti
  #   msg = "Invalid jti for refresh token"
  #   render status: 401, json: { status: 401, error: msg }
  # end

  # def auth_params
  #   params.require(:auth).permit(:email, :password)
  # end

end
