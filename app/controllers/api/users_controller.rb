class Api::UsersController < ApplicationController              # ? :: Api namespace
    def create                                                  # signup
        @user = User.new(user_params)
        if @user.save                                           # ? save! or no ! 
            login!(@user)
            render :show
            # render 'api/users/show'                           # ? DOESN'T WORK!!
        else 
            
            render json: @user.errors.full_messages, status: 422     # ? json is method, takes in two args here
        end
    end

    private
    def user_params
        params.require(:user).permit(
            :password, 
            :email,
            :first_name,
            :last_name,
            :state
        )
    end
end


# To test on the browser/console window: 
# for signing up a user
# $.ajax({
#   method: 'POST',
#   url: 'api/users',
#   data: { user: { email: 'harry@gmail.com', 
#       password: '12345678',
#       first_name: 'harry',
#       last_name: 'hobart',
#       state: 'New York' } }
# })
# => should get a json obj back with promise, and responseJSON keys

# email: 'harry@gmail.com', 
#       password: '12345678',
#       first_name: 'harry',
#       last_name: 'hobart',
#       state: 'New York'
