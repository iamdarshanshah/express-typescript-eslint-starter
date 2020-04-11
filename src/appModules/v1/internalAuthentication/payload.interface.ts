/**
 * @interface
 * @description This defines the data accepted by the payload for token verification in internal auth.
 * @exports Payload
 */
export default interface Payload{
  domain: string;
  secret: string;
  email: string;
}