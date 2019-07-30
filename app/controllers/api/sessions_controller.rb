class Api::SessionsController < ApplicationController
    def create                                                                  # login
        user = User.find_by_credentials(
            session_params[:email],
            session_params[:password]
        )

        if user
            login!(user)
            render json { id: user.id, email: user.email }
        else
            render json: { 'Invalid username and/oor password', status: 401 }   # ? could also be 422
        end
    end


    def destroy                                                                 # logout
        if logged_in?
            logout
            render json: {}
        else
            render json: { 'There is no user to log out', status 404 }
        end
    end


    private
    def session_params
        params.require(:user).permit(:email, :password)
    end
end



# To test logging out user on the window:
# req = $.ajax({
#     method: 'DELETE',
#     url: 'api/session',
# 	data: { user:  { username: 'test1', password: '123456' } }
# })