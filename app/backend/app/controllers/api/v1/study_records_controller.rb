class Api::V1::StudyRecordsController < ApplicationController
  include UserAuthenticateService
  before_action :authenticate_user

  # 勉強時間を記録、現在はフロントエンドからmsで渡しているのでmに変換して保存する必要があります。
  def create
    record = current_user.study_records.new(format_record(get_parms))
    if record.save
      render json: { study_records: {work_seconds: record.work_seconds, rest_seconds: record.rest_seconds}}, status: :created
    else
      render  json: { errors: record.errors.full_messages}, status: :unprocessable_entity
    end
  end

  def index
    # 今日の勉強時間
    day_records = StudyRecord.new.get_today_work_records(current_user.id)

    # 週の勉強時間
    week_records = StudyRecord.new.get_week_work_records(current_user.id)

    # 月の勉強時間
    month_records = StudyRecord.new.get_month_work_records(current_user.id)

    # 全ての勉強時間
    all_records = StudyRecord.new.sum_all_work_records(current_user.id)

    # その日ごとの勉強時間(グラフに表示)
    each_day_study_time = StudyRecord.new.get_each_day_study_time(current_user.id)

    render json: { study_records: { day_records: day_records,
                                    week_records: week_records,
                                    month_records: month_records,
                                    all_records: all_records,
                                    each_day_study_time: each_day_study_time}}
  end

  # その週の勉強時間を取ってくる
  def search
    week_offset = params[:week_offset].to_i || 0
    each_day_study_time = StudyRecord.new.get_each_day_study_time(current_user.id, week_offset = week_offset)
    render json: { study_records: { each_day_study_time: each_day_study_time}}
  end

  private

  # パラメータを取得
  def get_parms
    params.require(:study_record).permit(:work_seconds, :rest_seconds)
  end

  # 週の記録を取ってくる
  # week_offset, today
  # def get_week_records(user_id, week_offset, today)


  # 受け取ったmsをsに変換（テーブルのカラムがMinituesになっているが保存するときはSecondsのまま保存）
  def convert_ms_to_seconds(ms)
    ms / TimeUnits::ONE_SECONDS
  end

  # パラメータを変換、ユーザーidを追加
  def format_record(record)
    record[:work_seconds] = convert_ms_to_seconds(record[:work_seconds])
    record[:rest_seconds] = convert_ms_to_seconds(record[:rest_seconds])
    record.merge(user: current_user)
  end

end