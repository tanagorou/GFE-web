module UserAuth
  # access tokenの有効期限
  mattr_accessor :access_token_lifetime
  self.access_token_lifetime = 10.minutes

  # refresh tokenの有効期限
  mattr_accessor :refresh_token_lifetime
  self.refresh_token_lifetime = 1.day

  # cookieからrefresh tokenを取得する際のキー
  mattr_accessor :session_key
  self.session_key = :refresh_token

  # userを識別するクレーム名
  mattr_accessor :user_claim
  self.user_claim = :sub

  # JWTの発行者を識別する文字列(認可サーバーURL)
  mattr_accessor :token_issuer
  self.token_issuer = ENV["BASE_URL"]

  # JWTの受信者を識別する文字列(保護リソースURL)
  mattr_accessor :token_audience
  self.token_audience = ENV["BASE_URL"]

  # JWTの署名アルゴリズム
  mattr_accessor :token_signature_algorithm
  self.token_signature_algorithm = "HS256"

  # 署名・検証に使用する秘密鍵
  # 環境変数SECRET_KEY_BASEを優先し、なければcredentialsから取得
  mattr_accessor :token_secret_signature_key
  self.token_secret_signature_key = begin
    if ENV['SECRET_KEY_BASE'].present?
      Rails.logger.info "UserAuth: SECRET_KEY_BASE環境変数を使用"
      ENV['SECRET_KEY_BASE']
    else
      Rails.logger.info "UserAuth: credentials.secret_key_baseを使用"
      Rails.application.credentials.secret_key_base
    end
  rescue => e
    Rails.logger.error "UserAuth: secret_key_baseの取得に失敗: #{e.message}"
    raise
  end

  # 署名・検証に使用する公開鍵(RS256)
  mattr_accessor :token_public_key
  self.token_public_key = nil

  # ユーザーが見つからない場合のエラーを指定
  mattr_accessor :not_found_exception_class
  self.not_found_exception_class = ActiveRecord::RecordNotFound
end
