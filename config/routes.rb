Rails.application.routes.draw do
  devise_for :users
  root "faqs#index"
  resources :faqs
  
  post "/app/controllers/questions_controller.rb", to: "questions#question_creation"

  get "/app/views/questions/question_creation.html.haml", to: "questions#question_creation", as: "question_creation"

  get "/app/views/faqs/index.html.haml", to: "faqs#index", as: "index"
  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html
end
