require 'sinatra'
require 'json'

class MyApp < Sinatra::Base
  set :bind, '0.0.0.0'
  set :port, 4567

  SERVER_NUMBER = 42

  # Allow CORS
  before do
    response.headers['Access-Control-Allow-Origin'] = '*'
    response.headers['Access-Control-Allow-Methods'] = 'GET, POST, OPTIONS'
    response.headers['Access-Control-Allow-Headers'] = 'Content-Type'
  end

  # Handle preflight OPTIONS request
  options "*" do
    200
  end

  # Root route
  get '/' do
    content_type :html
    "<html><body><h1>Server Number: #{SERVER_NUMBER}</h1></body></html>"
  end

  # New API endpoint to return the server number
  get '/server-number' do
    content_type :json
    { number: SERVER_NUMBER }.to_json
  end

  run! if app_file == $0
end
