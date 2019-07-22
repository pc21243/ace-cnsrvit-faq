class AddContentToAnswers < ActiveRecord::Migration[5.2]
  def change
    add_column :answers, :content, :string
  end
end
