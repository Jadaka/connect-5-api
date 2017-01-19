/**
 *
 *  isRequestInvalid: @return Promise<Boolean>
 *
 *  Validation responder utility function
 *
 *  @param {OBJECT} req - express request object
 *  @param {OBJECT} res - express resopnse object
 */
export const isRequestInvalid = async (req, res) => {
  try {
    const result = await req.getValidationResult();
    if (!result.isEmpty()) {
      res.status(400).json({
        err: result.mapped(),
      });
      return true;
    }
  } catch (e) {
    console.log(e);
    res.status(500).json({
      success: false,
      err    : e.toString(),
    });
    return true;
  }
  return false;
};

/**
 *
 *  Custom request validators for express-validator
 *
 *  @url https://github.com/ctavan/express-validator
 */
export const customValidators = {
  isArray: value => Array.isArray(value),
};
