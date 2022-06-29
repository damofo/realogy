import { Request, Response } from "express";
import User from "../models/users";

class UserController {
  /*
   * @api [post] /users
   * summary: "Create a user"
   * @body {object} - user data
   * responses:
   *   "201":
   *     description: "Returns a JSON object contains the created user"
   *   "422":
   *     description: "Returned in case of internal server error."
   */
  async createUser(req: Request, res: Response) {
    try {
      const user = await User.create(req.body);
      res.status(201).json({ data: user, success: true });
    } catch (error: any) {
      console.log(error);
      res.status(422).json({
        message: error.message,
        success: false,
      });
    }
  }

  /*
   * @api [get] /users
   * summary: "Returns list of users"
   * @param {number} [skip] - offset
   * @param {number} [limit] - number of records to retrieve
   * responses:
   *   "200":
   *     description: "Returns a JSON object contains an array of results"
   *   "422":
   *     description: "Returned in case of internal server error."
   */
  async getUsers(req: Request, res: Response) {
    try {
      const limit = parseInt((req.query.limit as string) || "10");
      const skip = parseInt((req.query.skip as string) || "0");

      const users = await User.find({}, null, { skip, limit });
      res.json({
        success: true,
        limit,
        skip,
        data: users,
      });
    } catch (error: any) {
      console.log(error);
      res.status(422).json({
        message: error.message,
        success: false,
      });
    }
  }

  /*
   * @api [put] /users/:id
   * summary: "update a user"
   * @body {object} - user data
   * responses:
   *   "200":
   *     description: "Returns a JSON object contains the updated user"
   *   "404":
   *     description: "Returned in case no data is available."
   *   "422":
   *     description: "Returned in case of internal server error."
   */
  async update(req: Request, res: Response) {
    const { id } = req.params;
    try {
      Object.assign(req.dataModal, req.body);

      const result = await req.dataModal.save();
      res.json({
        success: true,
        data: result,
      });
    } catch (error: any) {
      console.log(error);
      res.status(422).json({
        message: error.message,
        success: false,
      });
    }
  }

  /*
   * @api [delete] /users/:id
   * summary: "delete a user by id"
   * responses:
   *   "200":
   *     description: "Returns a JSON object contains success flag"
   *   "404":
   *     description: "Returned in case no data is available."
   *   "422":
   *     description: "Returned in case of internal server error."
   */
  async delete(req: Request, res: Response) {
    const { id } = req.params;
    try {
      await User.deleteOne({ _id: id });

      res.json({
        success: true,
      });
    } catch (error: any) {
      console.log(error);
      res.status(422).json({
        message: error.message,
        success: false,
      });
    }
  }

  // this is a middleware function that get a user by id and return 404 error if no
  // also it attach user model to request so that it can be used in update/delete/read
  async getById(req: Request, res: Response, next: any, id: string) {
    try {
      const data = await User.findById(id).populate("departmentId");

      if (!data) {
        return res
          .status(404)
          .send({ message: "Data not found", success: false });
      }
      req.dataModal = data;
      next();
    } catch (error: any) {
      next(error);
    }
  }

  /*
   * @api [get] /users/:id
   * summary: "get a user by id"
   * responses:
   *   "200":
   *     description: "Returns a JSON object contains a user data"
   *   "404":
   *     description: "Returned in case no data is available."
   *   "422":
   *     description: "Returned in case of internal server error."
   */
  async read(req: Request, res: Response) {
    res.json({ data: req.dataModal, success: true });
  }
}

export default new UserController();
