# Homepage (Root path)
get '/' do
  erb :index
end

get '/contacts' do
	@contacts = Contact.all.to_json
end

get '/contact/:id' do
	@contact = Contact.find(params[:id]).to_json
end

post '/contact' do
	@contact = Contact.new(first_name: params[:first_name], last_name: params[:last_name], phone: params[:phone], email: params[:email])
	if @contact.save
		@contact.to_json
	else
		errors.add(:base, "Unsuccessfully added contact")
	end
end