class RenameUsersPasswordDijestToPassword < ActiveRecord::Migration[7.2]
  def change
    rename_column :users, :password_digest, :password
  end
end
