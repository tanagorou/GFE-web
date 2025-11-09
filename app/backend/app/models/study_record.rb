class StudyRecord < ApplicationRecord
  belongs_to :user

  validates :work_seconds, presence: true,
                           numericality: { greater_than: 0}

  validates :rest_seconds, presence: true

  # 今日の勉強時間を記録
  def get_today_work_records(user_id)
    today = Date.today
    day_records = StudyRecord.where(user_id: user_id).where(created_at: today.beginning_of_day..today.end_of_day)
    day_records.sum(:work_seconds) / TimeUnits::ONE_MINUTES
  end

  # 週の記録を計算
  def get_week_work_records(user_id)
    from, to = get_week_start_date
    week_records = StudyRecord.where(user_id: user_id).where(created_at: from..to)
    week_records.sum(:work_seconds) / TimeUnits::ONE_MINUTES
  end

  # 月の記録を計算
  def get_month_work_records(user_id)
    from, to = get_month_start_date
    month_records = StudyRecord.where(user_id: user_id).where(created_at: from..to)
    month_records.sum(:work_seconds) / TimeUnits::ONE_MINUTES
  end


  # 全ての勉強時間を計算
  def sum_all_work_records(user_id)
    all_records = get_all_records(user_id)
    all_records.sum(:work_seconds) / TimeUnits::ONE_MINUTES
  end

  # 勉強した全ての日を取得
  def get_study_days(user_id)
    all_records = get_all_records(user_id)
    study_days = all_records.select("DATE(created_at) as date").group("DATE(created_at)")
  end

  # その日ごとの勉強時間を取得(月曜から日曜にかけて,日付も取得)
  def get_each_day_study_time(user_id, week_offset=0)
    each_day_study_time = []
    point_date = Date.today.beginning_of_week - week_offset.week
    for i in 0..6
      each_day_data = {time: [], date: []}
      day = point_date + i.days #Dateオブジェクトget_day_start_dateに渡す
      puts day, i
      from, to = get_day_start_date(day)
      record = StudyRecord.where(user_id: user_id).where(created_at: from..to)
      if(record.exists?)
        # each_day_study_time << record.sum(:work_seconds) / TimeUnits::ONE_MINUTES
        each_day_data[:time] = record.sum(:work_seconds) / TimeUnits::ONE_MINUTES
        each_day_data[:date] = day
        each_day_study_time << each_day_data
      else
        each_day_data[:time] = 0
        each_day_data[:date] = day
        each_day_study_time << each_day_data
      end
    end
    puts each_day_study_time
    each_day_study_time
  end



    

  private

  # 日の開始日と終了日を取得
  def get_day_start_date(day)
    day_start_date = day.beginning_of_day
    day_end_date = day.end_of_day
    [day_start_date, day_end_date]
  end

  # 週の開始日と終了日を取得
  def get_week_start_date(week_offset=0)
    today = Date.today - week_offset.weeks
    day_of_week = today.wday

    from = today.prev_occurring(:monday)
    to = today.next_occurring(:sunday)
    
    if day_of_week == 1
      from = today
    elsif day_of_week == 0
      to = today
    end

    [from, to]
  end

  # 月の開始日と終了日を取得
  def get_month_start_date
    today = Date.today
    month_start_date = today.beginning_of_month
    month_end_date = today.end_of_month
    [month_start_date, month_end_date]
  end

  def get_all_records(user_id)
    StudyRecord.where(user_id: user_id)
  end

end
