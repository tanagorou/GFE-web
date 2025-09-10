class AddRefreshJtiToUsers < ActiveRecord::Migration[7.2]
  def change
    add_column :users, :refresh_jti, :string
  end
end
