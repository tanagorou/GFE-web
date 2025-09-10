class Api::V1::UsersController < ApplicationController
  # skip_before_action :authenticate_request, only: [:index, :show]
  before_action :authenticate_user
  
  # それぞれアプリ要件に従って設定
  def index
    # users = User.all
    render json: current_user.as_json(only: [:id, :name, :email, :created_at])
  end


  # カレントユーザーを返す
  # def current
  #   if @current_user
  #     render json: { user: @current_user }
  #   else
  #     render json: { error: '認証情報を取得できません' }, status: :unauthorized
  #   end
  # end
  
end
