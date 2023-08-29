# config.omniauth :twitter, Rails.application.credentials.dig(:twitter, :api_key), Rails.application.credentials.dig(:twitter, :api_secret)

# config.jwt do |jwt|
#   jwt.secret = Rails.application.credentials.dig(:jwt_key)
#   jwt.dispatch_requests = [
#       ["POST", %r{^/login$}],
#       ["GET", %r{^/auth/twitter/callback$}],
#     ]
#   jwt.revocation_requests = [
#     ["DELETE", %r{^/logout$}]
#   ]
#   jwt.expiration_time = 2.weeks.to_i
# end