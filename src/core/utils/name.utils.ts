export const getFirstNameAndLastName = (firstName: string, lastName: string): string => {
    //const firstNamePart = firstName.split(' ')[0];
    const lastNames = lastName.split(' ');
    const firstLastName = lastNames[0];
    const secondLastName = lastNames[1];
    
    const formattedLastName = secondLastName 
      ? `${firstLastName} ${secondLastName[0]}.` 
      : firstLastName;
      
    return `${firstName} ${formattedLastName}`;
  };
  
export const getInitials = (firstName: string, lastName: string): string => {
    const firstInitial = firstName.charAt(0);
    const lastInitial = lastName.charAt(0);
    return `${firstInitial}${lastInitial}`.toUpperCase();
  };