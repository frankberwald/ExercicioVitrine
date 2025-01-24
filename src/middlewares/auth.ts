import { NextFunction, Request, Response } from "express"


const authMiddle = (req: Request, res: Response, next: NextFunction) => {
  console.log(req.headers)
  const authHeader = req.headers.authorization
  if (authHeader === "123") {
    next()
    return;
  } else {
    res.status(401).json({ message: "Unauthorized" })
  }
}

export default authMiddle