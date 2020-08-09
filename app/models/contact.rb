class Contact < ApplicationRecord
  def mailExist
    Contact.exists?({email: self.attributes["email"]})
  end
end
