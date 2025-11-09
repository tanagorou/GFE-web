module UserSessionizeService

  # セッションユーザーが居ればtrue、存在しない場合は401を返す
  def sessionize_user
    
    Rails.logger.info "Origin: #{request.headers['Origin']}"
    Rails.logger.info "RAW Cookie (headers['Cookie']): #{request.headers['Cookie'].inspect}"
    Rails.logger.info "RAW Cookie (env['HTTP_COOKIE']): #{request.env['HTTP_COOKIE'].inspect}"
    Rails.logger.info "request.cookies keys: #{request.cookies.keys}"
    Rails.logger.info "cookies helper keys: #{cookies.to_h.keys}"

    rt_plain      = request.cookies['refresh_token']      # ←まずこれで見る
    rt_helper     = cookies[:refresh_token]               # ←helperでも確認
    rt_encrypted  = (cookies.encrypted[:refresh_token] rescue nil)

    Rails.logger.info "rt_plain=#{rt_plain.present?} rt_helper=#{rt_helper.present?} rt_encrypted=#{rt_encrypted.present?}"
  
    session_user.present? || unauthorized_user
  end

  # セッションキー
  def session_key
    UserAuth.session_key
  end

  # セッションcookieを削除する
  def delete_session
    cookies.delete(session_key)
  end

  private

    # cookieのtokenを取得
    def token_from_cookies
      cookies[session_key]
    end

    # refresh_tokenから有効なユーザーを取得する
    def fetch_user_from_refresh_token
      token = token_from_cookies
      Rails.logger.info "fetch_user_from_refresh_token: token存在=#{token.present?}, token長=#{token&.length}"
      
      user = User.from_refresh_token(token)
      Rails.logger.info "fetch_user_from_refresh_token: ユーザー取得成功 user_id=#{user&.id}"
      user
    rescue JWT::InvalidJtiError => e
      # jtiエラーの場合はcontrollerに処理を委任
      Rails.logger.error "JWT::InvalidJtiError: #{e.message}, #{e.backtrace.first(3).join(', ')}"
      catch_invalid_jti
    rescue UserAuth.not_found_exception_class => e
      Rails.logger.error "UserAuth.not_found_exception_class: #{e.message}, #{e.backtrace.first(3).join(', ')}"
      nil
    rescue JWT::DecodeError => e
      Rails.logger.error "JWT::DecodeError: #{e.message}, #{e.backtrace.first(3).join(', ')}"
      nil
    rescue JWT::ExpiredSignature => e
      Rails.logger.error "JWT::ExpiredSignature: #{e.message}, #{e.backtrace.first(3).join(', ')}"
      nil
    rescue JWT::EncodeError => e
      Rails.logger.error "JWT::EncodeError: #{e.message}, #{e.backtrace.first(3).join(', ')}"
      nil
    rescue => e
      Rails.logger.error "予期しないエラー: #{e.class.name}: #{e.message}, #{e.backtrace.first(5).join(', ')}"
      nil
    end

    # refresh_tokenのユーザーを返す
    def session_user
      token = token_from_cookies
      return nil unless token
      Rails.logger.info "session_user: トークンからユーザー取得を試行"
      @_session_user ||= fetch_user_from_refresh_token
    end

    # jtiエラーの処理
    def catch_invalid_jti
      delete_session
      raise JWT::InvalidJtiError
    end

    # 認証エラー
    def unauthorized_user
      delete_session
      head(:unauthorized)
    end
end
