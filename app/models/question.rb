class Question < ApplicationRecord

  scope :content, -> { where.not(content: nil) }
  scope :active, -> { where(active: true) }

end
