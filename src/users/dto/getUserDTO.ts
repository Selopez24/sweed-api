interface getUserDTO {
  id: string;
  firstName: string;
  lastName: string;
  username: string;
  email: string;
  isActive: boolean;
  createDate: Date;
  updateDate: Date;
}

export default getUserDTO;
