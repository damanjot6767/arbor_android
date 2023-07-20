export function isValidEmail(email) {
  return /\S+@\S+\.\S+/.test(email);
}

const hasSpecialCharacters = (value) => /[^\w\s]/.test(value); // Special characters include everything except letters, numbers, and spaces

export const formValidation = (formData, lable) => {
  if (lable === "addClient") {
    if (!formData.clientName) {
      return "Client Name is required.";
    } else if (hasSpecialCharacters(formData.clientName)) {
      return "Client Name should not contain special characters.";
    }

    if (!formData.address) {
      return "Address is required.";
    } else if (hasSpecialCharacters(formData.address)) {
      return "Address should not contain special characters.";
    }

    if (!formData.clientType) {
      return "Client Type is required.";
    } else if (hasSpecialCharacters(formData.clientType)) {
      return "Client Type should not contain special characters.";
    }

    // if (!formData.clientLat) {
    //   return "Client Latitude is required.";
    // } else if (hasSpecialCharacters(formData.clientLat)) {
    //   return "Client Latitude should not contain special characters.";
    // }

    // if (!formData.clientLong) {
    //   return "Client Longitude is required.";
    // } else if (hasSpecialCharacters(formData.clientLong)) {
    //   return "Client Longitude should not contain special characters.";
    // }

    // Validate contacts array
    if (!formData.contacts || formData.contacts.length === 0) {
      return "At least one contact is required.";
    }
  }
  if (lable === "addClientContact") {
    // Validate Client contact object
    if (!formData.name) {
      return "Contact Name is required.";
    } else if (hasSpecialCharacters(formData.name)) {
      return "Contact Name should not contain special characters.";
    }

    if (!formData.email) {
      return "Contact Email is required.";
    } else if (!isValidEmail(formData.email)) {
      return "Invalid Contact Email format.";
    }

    if (!formData.phone) {
      return "Contact Phone is required.";
    } else if (hasSpecialCharacters(formData.phone)) {
      return "Contact Phone should not contain special characters.";
    }

    if (!formData.countryCode) {
      return "Contact Country Code is required.";
    }
  }
  return false;
};

export default formValidation;
