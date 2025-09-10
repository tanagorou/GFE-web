class ApplicationController < ActionController::API
  include ActionController::MimeResponds # APIモード
  # before_action :configure_permitted_parameters, if: :devise_controller?
  # before_action :set_cors_headers
  # before_action :authenticate_request

  # Cookieを扱う
  include ActionController::Cookies
  # 認可を行う
  include UserAuthenticateService

  # CSRF対策
  before_action :xhr_request?

  private

    # XMLHttpRequestでない場合は403エラーを返す
    def xhr_request?
      # リクエストヘッダ X-Requested-With: 'XMLHttpRequest' の存在を判定
      return if request.xhr?
      render status: :forbidden, json: { status: 403, error: "Forbidden" }
    end

    # Internal Server Error
    def response_500(msg = "Internal Server Error")
      render status: 500, json: { status: 500, error: msg }
    end

  def set_cors_headers
    response.headers['Access-Control-Allow-Origin'] = 'http://localhost:8000'
    response.headers['Access-Control-Allow-Methods'] = 'GET, POST, PUT, PATCH, DELETE, OPTIONS'
    response.headers['Access-Control-Allow-Headers'] = 'Origin, Content-Type, Accept, Authorization, X-Requested-With'
    response.headers['Access-Control-Allow-Credentials'] = 'true'
  end

  # def configure_permitted_parameters
  #   devise_parameter_sanitizer.permit(:sign_up, keys: [ :email, :password, :password_confirmation ])
  #   devise_parameter_sanitizer.permit(:sign_in, keys: [ :email, :password ])
  #   devise_parameter_sanitizer.permit(:account_update, keys: [ :password, :password_confirmation ])
  # end


#   def authenticate_request
#     header = request.headers['Authorization']
#     header = header.split(' ').last if header
#     begin
#       @decoded = JwtService.decode(header)
#       if @decoded["provider"] == "guest"
#         @current_user = User.find(@decoded["user_id"])
#       else
#         user_auth = User.find_by(uid: @decoded["google_user_id"], provider: @decoded["provider"])
#         @current_user = user_auth.user if user_auth
#       end
#       Rails.logger.info(@current_user)
#       unless @current_user
#         raise ActiveRecord::RecordNotFound, 'User not found'
#       end
#     rescue ActiveRecord::RecordNotFound, JWT::DecodeError => e
#       Rails.logger.error "認証エラー: #{e.message}"
#       render json: { errors: e.message }, status: :unauthorized
#     end
#   end
end