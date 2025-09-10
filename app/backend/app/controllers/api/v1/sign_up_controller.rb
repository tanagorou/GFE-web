class Api::V1::SignUpController < ApplicationController
  def create
    user = User.new(sign_up_params.merge(activated: true))
    if user.save
       render json: { user: {id: user.id, name: user.name, email: user.email} }, status: :created
    else
      render json: { errors: user.errors.full_messages }, status: :unprocessable_entity
    end
  end

  def sign_up_params
    params.require(:user).permit(:name, :email, :password)
  end
end
