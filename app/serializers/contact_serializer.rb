class ContactSerializer
  include FastJsonapi::ObjectSerializer
  attributes :firstName, :lastName, :email, :phoneNumber
end
