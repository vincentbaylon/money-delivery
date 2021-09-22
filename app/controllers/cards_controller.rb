class CardsController < ApplicationController
  def index
    render json: Card.all, status: :ok
  end

  def create
    card = Card.create(card_params)
    render json: card, status: :ok
  end

  def destroy
    Card.destroy_all
    head :no_content
  end

  private

  def card_params
    params.permit(:image_url, :start, :end, :week)
  end
end