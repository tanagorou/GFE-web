class RenameWorkMinutesToWorkSecondsAndRestMinutesToRestSeconds < ActiveRecord::Migration[7.2]
  def change
    change_table :study_records do |t|
      t.rename :work_minutes, :work_seconds
      t.rename :rest_minutes, :rest_seconds
    end
  end
end
