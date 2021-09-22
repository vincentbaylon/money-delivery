Rails.application.routes.draw do
  
  resources :cards, only: [:index, :create]
  resources :picks, only: [:index, :create, :update, :destroy]
  resources :users, only: [:index, :show, :update]

  delete '/cards/destroy', to: 'cards#destroy'
  
  # Routing logic: fallback requests for React Router.
  # Leave this here to help deploy your app later!
  get "*path", to: "fallback#index", constraints: ->(req) { !req.xhr? && req.format.html? }
end
