export class UserModel {
  public id
  public name
  public email

  constructor(props: { id: string; name: string; email: string }) {
    this.id = props.id
    this.name = props.name
    this.email = props.email
  }
}
