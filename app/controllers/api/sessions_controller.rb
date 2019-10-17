class Api::SessionsController < ApplicationController
    def create                                                                  # login
        user = User.find_by_credentials(
            session_params[:email],
            session_params[:password]
        )

        if user                                                                 # if user exists
            login!(user)

            # render 'api/users/show'
            render json:  { 
                id: user.id, 
                email: user.email,  
                cash_balance: user.cash_balance
                transactions: user.get_wallet_transactions
            }                    
        else
            render json: ["Invalid email or password. Try clicking 'Forgot Password' if you're having trouble signing in."], status: 401       # ? could also be 422
        end
    end
    
    
    def destroy                                                                 # logout
        if logged_in?
            logout
            # render 'api/users/show'
            render json: {}
        else
            render json: ['There is no user to log out'], status: 404
        end
    end


    private
    def session_params
        params.require(:user).permit(:email, :password)
    end
end


# To test logging in user on the window:
# $.ajax({
#     method: 'POST',
#     url: 'api/session',
# 	  data: { user:  { email: 'harry@gmail.com', password: '12345678' } }
# })


# To test logging out user on the window:
# $.ajax({
#     method: 'DELETE',
#     url: 'api/session',
# 	  data: { user:  { email: 'harry@gmail.com', password: '12345678' } }       # ? this line not needed?
# })