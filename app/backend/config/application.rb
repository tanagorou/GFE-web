require_relative "boot"

require "rails/all"

# Require the gems listed in Gemfile, including any gems
# you've limited to :test, :development, or :production.
Bundler.require(*Rails.groups)

module App
  class Application < Rails::Application
    config.time_zone = 'Tokyo'
    config.active_record.default_timezone= :local

    # 追記：CORSエラー解消
    # config.middleware.insert_before 0, Rack::Cors do
    #   allow do
    #     origin "http://localhost:8000"
    #     resource "*",
    #     headers: :any,
    #     methods: [:get, :post, :put, :patch, :delete, :options, :head],
    #     expose: %w[Authorization Uid],
    #     credentials: true
    #   end
    # end
    # ここまで
    config.force_ssl = true

    config.middleware.use ActionDispatch::Cookies
    
    config.action_dispatch.cookies_same_site_protection = ENV["COOKIES_SAME_SITE"].to_sym if Rails.env.production?


    config.middleware.use ActionDispatch::Session::CookieStore
    # Initialize configuration defaults for originally generated Rails version.
    config.load_defaults 7.2

    # Please, add to the `ignore` list any other `lib` subdirectories that do
    # not contain `.rb` files, or that should not be reloaded or eager loaded.
    # Common ones are `templates`, `generators`, or `middleware`, for example.
    config.autoload_lib(ignore: %w[assets tasks])

    # Configuration for the application, engines, and railties goes here.
    #
    # These settings can be overridden in specific environments using the files
    # in config/environments, which are processed later.
    #
    # config.time_zone = "Central Time (US & Canada)"
    # config.eager_load_paths << Rails.root.join("extras")

    # Only loads a smaller set of middleware suitable for API only apps.
    # Middleware like session, flash, cookies can be added back manually.
    # Skip views, helpers and assets when generating a new resource.
    config.api_only = true
  end
end
