class PicksController < ApplicationController
  before_action :find_pick, except: [:create, :index]

  def index
    render json: Pick.all, include: :user, status: :ok
  end

  def create
    pick = Pick.create(pick_params)
    render json: pick, status: :created
  end

  def update
    @pick.update(pick_params)
    render json: @pick, status: :accepted
  end

  def destroy
    @pick.destroy
    head :no_content
  end

  private

  def find_pick
    @pick = Pick.find(params[:id])
  end

  def pick_params
    params.permit(:number, :text, :user_id, :card_id, :id, :pick, :outcome)
  end
end
