# This file should ensure the existence of records required to run the application in every environment (production,
# development, test). The code here should be idempotent so that it can be executed at any point in every environment.
# The data can then be loaded with the bin/rails db:seed command (or created alongside the database with db:setup).
#
# Example:
#
#   ["Action", "Comedy", "Drama", "Horror"].each do |genre_name|
#     MovieGenre.find_or_create_by!(name: genre_name)
#   end

table_names = %w(users study_records)
# table_names = %w(users)


table_names.each do |table_names|
  path = Rails.root.join("db/seeds/#{Rails.env}/#{table_names}.rb")

  path = path.sub(Rails.env, "development") unless File.exist?(path)

  puts "#{table_names}..."
  require path
end