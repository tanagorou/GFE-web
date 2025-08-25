module ApplicationCable
  class Connection < ActionCable::Connection::Base
    identified_by :current_user

    def connect
      # 開発環境では認証をスキップ
      if Rails.env.development?
        self.current_user = "guest_#{SecureRandom.hex(4)}"
      else
        # 本番環境では適切な認証を行う
        reject_unauthorized_connection
      end
    end

    private

    def find_verified_user
      # ここでユーザー認証を行う
      # 例: JWTトークンの検証など
    end
  end
end
