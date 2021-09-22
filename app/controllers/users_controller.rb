class UsersController < ApplicationController
  def index
    render json: User.all, include: :picks, status: :ok
  end

  def show
    user = User.find_by(name: params[:id])
    render json: user, status: :ok
  end

  def update
    user = User.find(params[:id])
    user.update(user_params)
    render json: user, status: :accepted
  end

  private

  def user_params
    params.permit(:name, :wins, :losses, :pushes, :id, :user)
  end
end
