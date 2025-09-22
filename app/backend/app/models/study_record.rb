class StudyRecord < ApplicationRecord
  belongs_to :user

  validates :work_seconds, presence: true,
                           numericality: { greater_than: 0}

  validates :rest_seconds, presence: true,
                           numericality: { greater_than: 0}

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
    week_records.sum(:work_seconds)
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

  # その日ごとの勉強時間を取得
  def get_study_time_by_day(user_id, date)
  end
    

  private

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
