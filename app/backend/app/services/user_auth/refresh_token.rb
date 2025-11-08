require 'jwt'

module UserAuth
  class RefreshToken
    include TokenCommons

    attr_reader :user_id, :payload, :token

    def initialize(user_id: nil, token: nil)
      if token.present?
        # decode
        @token = token
        Rails.logger.info "RefreshToken#initialize: decoding token"
        #[{payload},{header}]が返ってくる
        begin
          @payload = JWT.decode(@token.to_s, decode_key, true, verify_claims).first
          @user_id = get_user_id_from(@payload)
          Rails.logger.info "RefreshToken#initialize: token decoded successfully, user_id=#{@user_id.present? ? 'present' : 'nil'}"
        rescue => e
          Rails.logger.error "RefreshToken#initialize: JWT decode error - #{e.class.name}: #{e.message}"
          Rails.logger.error e.backtrace.first(5).join("\n")
          raise
        end
      else
        # encode
        @user_id = encrypt_for(user_id)
        @payload = claims
        @token = JWT.encode(@payload, secret_key, algorithm, header_fields)
        remember_jti(user_id)
      end
    end

    # 暗号化されたuserIDからユーザーを取得する
    def entity_for_user(id = nil)
      id ||= @user_id
      User.find(decrypt_for(id))
    end

    private

      # リフレッシュトークンの有効期限
      def token_lifetime
        UserAuth.refresh_token_lifetime
      end

      # 有効期限をUnixtimeで返す(必須)
      def token_expiration
         token_lifetime.from_now.to_i
      end

      # jwt_idの生成(必須)
      # Digest::MD5.hexdigest => 複合不可のハッシュを返す
      # SecureRandom.uuid => 一意性の値を返す
      def jwt_id
        Digest::MD5.hexdigest(SecureRandom.uuid)
      end

      # エンコード時のデフォルトクレーム
      def claims
        {
          user_claim => @user_id,
          jti: jwt_id,
          exp: token_expiration
        }
      end

      # @payloadのjtiを返す
      def payload_jti
        @payload.with_indifferent_access[:jti]
      end

      # jtiをUsersテーブルに保存する
      def remember_jti(user_id)
        User.find(user_id).remember(payload_jti)
      end

      ##  デコードメソッド

      # デコード時のjwt_idを検証する(エラーはJWT::DecodeErrorに委託する)
      def verify_jti?(jti, payload)
        user_id = get_user_id_from(payload)
        Rails.logger.info "verify_jti?: user_id from payload=#{user_id.present? ? 'present' : 'nil'}, jti=#{jti}"
        decode_user = entity_for_user(user_id)
        Rails.logger.info "verify_jti?: user found=#{decode_user.present?}, user_id=#{decode_user&.id}, user.refresh_jti=#{decode_user&.refresh_jti}, token.jti=#{jti}"
        result = decode_user.refresh_jti == jti
        Rails.logger.info "verify_jti?: result=#{result}"
        result
      rescue UserAuth.not_found_exception_class => e
        Rails.logger.error "verify_jti?: User not found - #{e.message}"
        false
      rescue => e
        Rails.logger.error "verify_jti?: Unexpected error - #{e.class.name}: #{e.message}"
        Rails.logger.error e.backtrace.first(5).join("\n")
        false
      end

      # デコード時のデフォルトオプション
      # Doc: https://github.com/jwt/ruby-jwt
      # default: https://www.rubydoc.info/github/jwt/ruby-jwt/master/JWT/DefaultOptions
      def verify_claims
        {
          verify_expiration: true,           # 有効期限の検証するか(必須)
          verify_jti: proc { |jti, payload|  # jtiとセッションIDの検証
            verify_jti?(jti, payload)
          },
          algorithm: algorithm               # decode時のアルゴリズム
        }
      end
  end
end
