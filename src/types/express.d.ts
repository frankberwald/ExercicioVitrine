import { User } from "../entities/User";

declare global {
  namespace Express {
    interface Request {
      user: User;
    }
  }
}

export default express.d