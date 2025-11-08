Rails.application.config.session_store :cookie_store,
  key: '_app_session',
  same_site: :none,                         # クロスサイトでクッキーを使うなら None
  secure: Rails.env.production?,            # 本番は HTTPS 前提で true (sameSite: none には必須)
  httponly: true