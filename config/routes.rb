Rails.application.routes.draw do
  mount Rswag::Ui::Engine => '/api-docs/v1'
  mount Rswag::Api::Engine => '/api-docs/v1'
  resources :recipes
end
