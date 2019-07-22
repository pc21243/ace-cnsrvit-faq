class Question < ApplicationRecord

  scope :content, -> { where.not(content: nil) }
  scope :active, -> { where(active: true) }

  def destroy
    puts "what"
  end

end
