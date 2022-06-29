import { Request, Response } from "express";
import Department from "../models/departments";

class DepartmentController {
  /*
   * @api [post] /departments
   * summary: "Create a department"
   * @body {object} - department data
   * responses:
   *   "201":
   *     description: "Returns a JSON object contains the created department"
   *   "422":
   *     description: "Returned in case of internal server error."
   */
  async createDepartment(req: Request, res: Response) {
    try {
      const department = await Department.create(req.body);
      res.status(201).json({ data: department, success: true });
    } catch (error: any) {
      console.log(error);
      res.status(422).json({
        message: error.message,
        success: false,
      });
    }
  }

  /*
   * @api [get] /departments
   * summary: "Returns list of departments"
   * @param {number} [skip] - offset
   * @param {number} [limit] - number of records to retrieve
   * responses:
   *   "200":
   *     description: "Returns a JSON object contains an array of results"
   *   "422":
   *     description: "Returned in case of internal server error."
   */
  async getDepartments(req: Request, res: Response) {
    try {
      const limit = parseInt((req.query.limit as string) || "10");
      const skip = parseInt((req.query.skip as string) || "0");

      const departments = await Department.find({}, null, { skip, limit });
      res.json({
        success: true,
        limit,
        skip,
        data: departments,
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
   * @api [put] /departments/:id
   * summary: "update a department"
   * @body {object} - department data
   * responses:
   *   "200":
   *     description: "Returns a JSON object contains the updated department"
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
   * @api [delete] /departments/:id
   * summary: "delete a department by id"
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
      await Department.deleteOne({ _id: id });

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

  // this is a middleware function that get a department by id and return 404 error if no
  // also it attach department model to request so that it can be used in update/delete/read
  async getById(req: Request, res: Response, next: any, id: string) {
    try {
      const data = await Department.findById(id);

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
   * @api [get] /departments/:id
   * summary: "get a department by id"
   * responses:
   *   "200":
   *     description: "Returns a JSON object contains a department data"
   *   "404":
   *     description: "Returned in case no data is available."
   *   "422":
   *     description: "Returned in case of internal server error."
   */
  async read(req: Request, res: Response) {
    res.json({ data: req.dataModal, success: true });
  }
}

export default new DepartmentController();
