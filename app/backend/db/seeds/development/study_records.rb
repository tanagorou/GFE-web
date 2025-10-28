50.times do |n|
  user_id = 14
  work_seconds = rand(100000..1000000000) / TimeUnits::ONE_SECONDS
  rest_seconds = rand(100000..1000000000) / TimeUnits::ONE_SECONDS
  
  StudyRecord.create!(
    user_id: user_id,
    work_seconds: work_seconds,
    rest_seconds: rest_seconds,
    created_at: Time.zone.now - rand(1..30).days,
    updated_at: Time.zone.now - rand(1..30).days
  )
end

puts "Study records created #{StudyRecord.count}"