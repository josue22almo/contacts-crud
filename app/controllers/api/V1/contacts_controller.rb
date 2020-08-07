module Api
  module V1
    class ContactsController < ApplicationController
      def index
        if request.query_parameters[:email]
          contact = Contact.find_by(email: request.query_parameters[:email])
          render json: ContactSerializer.new(contact).serialized_json
        else
          contacts = Contact.all
          render json: ContactSerializer.new(contacts).serialized_json
        end
      end

      def show
        contact = Contact.find(params[:id])

        render json: ContactSerializer.new(contact).serialized_json
      end

      def create
        contact = Contact.new(contact_params)

        if contact.save
          render json: ContactSerializer.new(contact).serialized_json
        else
          render json: { error: contat.errors.message }, status: 422
        end
      end

      def update
        contact = Contact.find(params[:id])

        if contact.update(contact_params)
          render json: ContactSerializer.new(contact).serialized_json
        else
          render json: { error: contat.errors.message }, status: 422
        end
      end

      def destroy
        contact = Contact.find(params[:id])

        if contact.destroy
          head :no_content
        else
          render json: { error: contat.errors.message }, status: 422
        end
      end

      private
        def contact_params
          params.require(:contact).permit(:firstName, :lastName, :email, :phoneNumber)
        end
    end
  end
end