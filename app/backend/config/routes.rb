Rails.application.routes.draw do
  # メモ：api/v1/usersのもとにregistrationsやsessionsコントローラーを置くとうまく動作しない。
  #      そのためdeviseのGithubに書かれたようにcontrollers/users/~~としたほうがいい
  # devise_for :users, path: '', path_names: {
  #   sign_in: 'login',
  #   sign_out: 'logout',
  #   registration: 'signup'
  # },
  # controllers: {
  #   sessions: 'users/sessions',
  #   registrations: 'users/registrations',
  #   omniauth_callbacks: 'users/omniauth_callbacks'
  # }

  namespace :api, default: { format: :json } do
    namespace :v1 do
      resources :users, only: [:index]

      resources :sign_up, only: [:create]
      
      resources :auth_token, only: [:create] do
        post :refresh, on: :collection
        delete :destroy, on: :collection
      end
    end
  end
#    # google認証にアクセス
#   get '/auth/:provider/callback', to: 'sessions#create'

#  # ユーザー登録のルート(API)
#   namespace :api do
#    namespace :v1 do
#        # カレントユーザーの呼び出し
#      get 'users/current', to: 'users#current'
#     end
#   end
  # Define your application routes per the DSL in https://guides.rubyonrails.org/routing.html

  # Reveal health status on /up that returns 200 if the app boots with no exceptions, otherwise 500.
  # Can be used by load balancers and uptime monitors to verify that the app is live.
  get "up" => "rails/health#show", as: :rails_health_check

  # Defines the root path route ("/")
  # root "posts#index"
  
  # Mount Action Cable
  mount ActionCable.server => '/ws'
end
