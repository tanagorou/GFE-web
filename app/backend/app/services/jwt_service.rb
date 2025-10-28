class JwtService
  SECRET_KEY = ENV.fetch('JWT_SECRET_KEY') { Rails.application.credentials.fetch(:secret_key_base) }

  def self.encode(payload, exp: 24.hours.from_now)
    data = payload.dup
    data[:exp] ||= exp.to_i
    JWT.encode(data, SECRET_KEY, 'HS256')
  end

  def self.decode(token)
    decoded = JWT.decode(token, SECRET_KEY, true, { algorithm: 'HS256' })
    decoded.first
  end
end


