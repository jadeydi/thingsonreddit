Rails.application.routes.draw do
  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html
  resources :things do
    get '/s/:subreddit', on: :collection, action: 'index'
  end

  resources :comments

  root 'things#index'
end
