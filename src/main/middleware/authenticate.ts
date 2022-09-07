import { employeeService } from '../../common/service/employee/employee.service';
import { userService } from '../../common/service/user/user.service';

export async function authEmployee(request, reply) {
  try {
    const { _id } = await request.jwtVerify();

    const employee = await employeeService.findByIdError(_id, {}, { _v: 0, deletedAt: 0 });

    const method: string = request.method;
    switch (method.toLocaleLowerCase()) {
      case 'delete': {
        request.body
          ? (request.body.deletedBy = employee._id.toString())
          : (request.body = {
            deletedBy: employee._id,
          });
        break;
      }
      case 'put': {
        request.body ? (request.body.updatedBy = employee._id.toString()) : '';
        break;
      }
      case 'post': {
        request.body ? (request.body.createdBy = employee._id.toString()) : '';
        break;
      }
      default: {
      }
    }

    request.employee = employee;
  } catch (error) {
    console.log(error);
    return reply.status(401).send({
      success: false,
      code: 401,
      statusCode: 401,
      message: 'Authorization failed',
    });
  }
}



export async function mightyUserAuth(request, reply) {
  try {
    const { _id } = await request.jwtVerify();
    const user = await userService.findByIdError(_id, {});
    request.user = user;
  } catch (error) { }
}