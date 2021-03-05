Rails.application.routes.draw do
  namespace :api, defaults: {format: 'json'} do
    namespace :v1 do
      resources :crop_polygons
    end
  end
  
  # For details on the DSL available within this file, see https://guides.rubyonrails.org/routing.html
	root 'welcome#index'
end
