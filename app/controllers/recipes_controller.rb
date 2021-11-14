class RecipesController < ApplicationController
	before_action :set_recipes, only: [:destroy, :show, :update]

	def index
    begin
      @recipe = Recipe.select(:id, :title, :making_time, :serves, :ingredients, :cost).all
      render status: 200, json: {
  			recipes: @recipe.as_json
  		}
    rescue => e
      render status: 500, json: {status: 500, message: e}
    end
  end

  def show
  	begin
	  	if @recipe.present?
				render status: 200, json: {
					message: 'Recipe details by id',
	  			recipe: [{id: @recipe.id, title: @recipe.title, making_time: @recipe.making_time, serves: @recipe.serves, ingredients: @recipe.ingredients, cost: @recipe.cost}]
	  		}
	  	else
	  		render status: 200, json: {
	  			message: 'No recipe found'
	  		}
	  	end
	  rescue => e
      render status: 500, json: {status: 500, message: e}
    end
  end

  def create
  	begin
    	@recipe = Recipe.new(recipes_params)
    	if @recipe.valid?
    		@recipe.save
    		render status: 200, json: {
    			message: 'Recipe successfully created!',
    			recipe: [@recipe.as_json]
    		}
    	else
    		render status: 200, json: {
    			message: 'Recipe creation failed!',
    			required: 'title, making_time, serves, ingredients, cost'
    		}
    	end
    rescue => e
      render status: 500, json: {status: 500, message: e}
    end
  end

  def update
  	begin
	  	if @recipe.present?
	  		@recipe.update(recipes_params)
				render status: 200, json: {
					message: 'Recipe successfully updated!',
	  			recipe: {title: @recipe.title, making_time: @recipe.making_time, serves: @recipe.serves, ingredients: @recipe.ingredients, cost: @recipe.cost}
	  		}
	  	else
	  		render status: 200, json: {
	  			message: 'No recipe found'
	  		}
	  	end
	  rescue => e
      render status: 500, json: {status: 500, message: e}
    end
  end

  def destroy
  	begin
	  	if @recipe.present?
	  		@recipe.destroy
				render status: 200, json: {
					message: 'Recipe successfully removed!'}
	  	else
	  		render status: 200, json: {
	  			message: 'No recipe found'
	  		}
	  	end
	  rescue => e
      render status: 500, json: {status: 500, message: e}
    end
  end

  private

    def set_recipes
      @recipe = Recipe.find_by(id: params[:id])
    end

    def recipes_params
      params.permit(:title, :making_time, :serves, :ingredients, :cost)
    end
end
