class Api::UsersController < ApplicationController              # ? :: Api namespace
    def create                                                  # signup
        @user = User.new(user_params)
        if @user.save                                           # ? save! or no ! 
            login!(@user)
        else 
            render json: { @user.errors.full_messages.join(', '), status: 422 }
        end
    end

    private
    def user_params
        params.require(:user).permit(:password, :email)
    end
end


# To test on the browser/console window: 
# for signing up a user
# req = $.ajax({
#     method: 'POST',
#     url: 'api/users',   # look at be rails routes to see path
# 	data: { user:  { username: 'test1', password: '123456' } }
# })
# => should get a json obj back with promise, and responseJSON keys