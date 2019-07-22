class QuestionsController < ApplicationController

  before_action :set_category, only: [:show, :edit, :update, :destroy]

  def question_creation
    @question = Question.new
    @question.save
  end

  private

  def question_params
    params.require(:question).permit(:id, :active, :title, :content)
  end

  def set_question
   @question = Question.find(params[:id])
  end

end
