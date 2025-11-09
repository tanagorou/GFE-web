class User < ApplicationRecord
  has_secure_password
  has_many :study_records
  include TokenGenerateService

  validates :name, presence: true,
                   length: { maximum: 30, allow_blank: true}
  
  VALID_EMAIL_REGEX = /\A[\w+\-.]+@[a-z\d\-.]+\.[a-z]+\z/i
  validates :email, presence: true, length: { maximum: 255},
                    format: { with: VALID_EMAIL_REGEX},
                    uniqueness: { case_sensitive: false}

  VALID_PASSWORD_REGEX = /\A[\w\-]+\z/
  validates :password, presence: true,
                       length: { minimum: 8 },
                       format: {
                         with: VALID_PASSWORD_REGEX
                       },
                       allow_nil: true

  validates :activated, inclusion: { in: [ true, false ] }

  class << self
    def find_by_activated(email)
      find_by(email: email, activated: true)
    end
  end

  def email_activated?
    users = User.where.not(id: id)
    users.find_by_activated(email).present
  end

  #リフレッシュトークンのJWT IDを記憶する
  def remember(jti)
    update!(refresh_jti: jti)
  end

  def forget
    update!(refresh_jti: nil)
  end

  def response_json(payload = {})
    as_json(only: [:id, :name, :email]).merge(payload).with_indifferent_access
  end


  private

  def downcase_email
    self.email.downcase! if email
  end
end
