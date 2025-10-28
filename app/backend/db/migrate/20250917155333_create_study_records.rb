class CreateStudyRecords < ActiveRecord::Migration[7.2]
  def change
    create_table :study_records do |t|
      t.references :user, null: false, foreign_key: true
      t.integer :work_minutes, null: false
      t.integer :rest_minutes, null: false
      t.timestamps
    end
  end
end
