class ApplicationController < ActionController::Base
    protect_from_forgery with: :exception

    helper_method :current_user, :logged_in?, :get_portfolio
    # helper_method :current_user, :logged_in?          # OLD

    def current_user
        @current_user ||= User.find_by(session_token: session[:session_token])
    end

    def logged_in?
        !!current_user
    end

    def login!(user)
        session[:session_token] = user.reset_session_token!
        # redirect_to products_url    # ? not needed
    end

    def logout
        current_user.reset_session_token!
        session[:session_token] = nil
        @current_user = nil
        # redirect_to new_session_url
    end

    def ensure_logged_in
        # redirect_to new_session_url unless logged_in?
    end

    def get_portfolio
        current_user.get_portfolio
    end
end



# ?
# To test logging out user on the window:
# $.ajax({
#     method: 'DELETE',
#     url: 'api/session',
# 	  data: { user:  { email: 'harry@gmail.com', password: '12345678' } }
# })